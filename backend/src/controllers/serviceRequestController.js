import Service from '../models/Service.js';
import ServiceRequest from '../models/ServiceRequest.js';
import Project from '../models/Project.js';
import { createNotification } from '../services/notificationService.js';
import { logActivity } from '../services/activityService.js';

export const createServiceRequest = async (req, res, next) => {
  try {
    const { serviceId, message } = req.body;
    const service = await Service.findById(serviceId);
    if (!service || service.status !== 'Active') {
      return res.status(404).json({ message: 'Service not available for request' });
    }

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ message: 'Request message is required' });
    }

    if (service.userId.toString() === req.user.id) {
      return res.status(400).json({ message: 'You cannot request your own service' });
    }

    const existing = await ServiceRequest.findOne({
      senderId: req.user.id,
      serviceId,
      requestStatus: 'Pending',
    });

    if (existing) {
      return res.status(409).json({ message: 'You already have a pending request for this service' });
    }

    const request = await ServiceRequest.create({
      senderId: req.user.id,
      freelancerId: service.userId,
      serviceId,
      message,
      requestStatus: 'Pending',
    });

    await Promise.all([
      createNotification({
        userId: service.userId,
        type: 'info',
        title: 'New project request',
        message: `You have a new request for ${service.title}. Review and respond to the request.`,
        category: 'marketplace',
        targetUrl: '/requests/freelancer',
      }),
      logActivity({
        userId: req.user.id,
        activityType: 'project_request_created',
        metadata: { serviceId, freelancerId: service.userId, requestId: request._id },
      }),
    ]);

    return res.status(201).json({ request });
  } catch (error) {
    next(error);
  }
};

export const getRequestsForFreelancer = async (req, res, next) => {
  try {
    const requests = await ServiceRequest.find({ freelancerId: req.user.id })
      .populate('serviceId', 'title category price deliveryTime status')
      .populate('senderId', 'fullName email');
    return res.json({ requests });
  } catch (error) {
    next(error);
  }
};

export const getRequestsForUser = async (req, res, next) => {
  try {
    const requests = await ServiceRequest.find({ senderId: req.user.id })
      .populate('serviceId', 'title category price deliveryTime status')
      .populate('freelancerId', 'fullName email profileImage');
    return res.json({ requests });
  } catch (error) {
    next(error);
  }
};

export const updateServiceRequest = async (req, res, next) => {
  try {
    const { requestStatus } = req.body;
    const allowedStatuses = ['Accepted', 'Rejected', 'Cancelled'];
    if (!allowedStatuses.includes(requestStatus)) {
      return res.status(400).json({ message: 'Invalid request status' });
    }

    const request = await ServiceRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    const isFreelancer = request.freelancerId.toString() === req.user.id;
    const isSender = request.senderId.toString() === req.user.id;

    if (requestStatus === 'Cancelled' && !isSender && !isFreelancer) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    if (requestStatus !== 'Cancelled' && !isFreelancer) {
      return res.status(403).json({ message: 'Only freelancer can accept or reject requests' });
    }

    if (requestStatus === 'Accepted' && request.requestStatus !== 'Pending') {
      return res.status(400).json({ message: 'Only pending requests can be accepted' });
    }

    request.requestStatus = requestStatus;
    await request.save();

    let project = null;
    if (requestStatus === 'Accepted') {
      const service = await Service.findById(request.serviceId);
      if (service) {
        project = await Project.create({
          clientId: request.senderId,
          freelancerId: request.freelancerId,
          serviceId: service.id,
          title: `Project for ${service.title}`,
          description: request.message,
          status: 'Accepted',
        });
      }
    }

    await Promise.all([
      createNotification({
        userId: request.senderId,
        type: requestStatus === 'Accepted' ? 'success' : 'warning',
        title: `Request ${requestStatus.toLowerCase()}`,
        message: requestStatus === 'Accepted'
          ? 'Your request has been accepted and a project was created.'
          : 'Your request has been updated. Check the request status for details.',
        category: 'marketplace',
        targetUrl: '/requests/user',
      }),
      logActivity({
        userId: req.user.id,
        activityType: 'service_request_updated',
        metadata: { requestId: request._id, requestStatus },
      }),
    ]);

    return res.json({ request, project });
  } catch (error) {
    next(error);
  }
};
