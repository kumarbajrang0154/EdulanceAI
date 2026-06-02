import Service from '../models/Service.js';
import Project from '../models/Project.js';
import { createNotification } from '../services/notificationService.js';
import { logActivity } from '../services/activityService.js';

const allowedStatusTransitions = {
  Pending: ['Accepted', 'Cancelled'],
  Accepted: ['In Progress', 'Cancelled'],
  'In Progress': ['Submitted', 'Cancelled'],
  Submitted: ['Completed', 'Cancelled'],
  Completed: [],
  Cancelled: [],
};

export const createProject = async (req, res, next) => {
  try {
    const { clientId, serviceId, title, description, deadline } = req.body;

    if (!clientId || !serviceId || !title || !description) {
      return res.status(400).json({ message: 'clientId, serviceId, title and description are required' });
    }

    const service = await Service.findById(serviceId);
    if (!service || service.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only create projects for your own services' });
    }

    const project = await Project.create({
      clientId,
      freelancerId: req.user.id,
      serviceId,
      title,
      description,
      servicePrice: service.price,
      deadline: deadline ? new Date(deadline) : undefined,
      status: 'Pending',
    });

    return res.status(201).json({ project });
  } catch (error) {
    next(error);
  }
};

export const getProjectsForFreelancer = async (req, res, next) => {
  try {
    const projects = await Project.find({ freelancerId: req.user.id })
      .populate('serviceId', 'title category price deliveryTime')
      .populate('clientId', 'fullName email');
    return res.json({ projects });
  } catch (error) {
    next(error);
  }
};

export const getProjectsForUser = async (req, res, next) => {
  try {
    const projects = await Project.find({ clientId: req.user.id })
      .populate('serviceId', 'title category price deliveryTime')
      .populate('freelancerId', 'fullName email profileImage');
    return res.json({ projects });
  } catch (error) {
    next(error);
  }
};

export const updateProjectStatus = async (req, res, next) => {
  try {
    const { status, submittedFiles } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.freelancerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the assigned freelancer can update project status' });
    }

    if (!allowedStatusTransitions[project.status].includes(status)) {
      return res.status(400).json({ message: `Status must transition from ${project.status} to one of: ${allowedStatusTransitions[project.status].join(', ')}` });
    }

    project.status = status;
    if (status === 'Completed') {
      project.completedAt = new Date();
      project.paymentStatus = 'pending';
    }
    if (Array.isArray(submittedFiles) && submittedFiles.length) {
      project.submittedFiles = [...project.submittedFiles, ...submittedFiles];
    }
    await project.save();

    await Promise.all([
      createNotification({
        userId: project.clientId,
        type: status === 'Completed' ? 'success' : 'info',
        title: 'Project status updated',
        message: `Project '${project.title}' has been moved to ${status}.`,
        category: 'project',
        targetUrl: '/projects/user',
        data: { projectId: project._id, status },
      }),
      logActivity({
        userId: req.user.id,
        activityType: 'project_status_updated',
        metadata: { projectId: project._id, status },
      }),
    ]);

    return res.json({ project });
  } catch (error) {
    next(error);
  }
};
