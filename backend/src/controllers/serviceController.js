import Service from '../models/Service.js';

export const createService = async (req, res, next) => {
  try {
    const service = await Service.create({
      userId: req.user.id,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: Number(req.body.price) || 0,
      deliveryTime: req.body.deliveryTime || '',
      tags: Array.isArray(req.body.tags) ? req.body.tags : [],
      thumbnail: req.body.thumbnail || '',
      features: Array.isArray(req.body.features) ? req.body.features : [],
      revisions: Number(req.body.revisions) || 0,
      status: req.body.status || 'Draft',
      publishedAt: req.body.status === 'Active' ? new Date() : undefined,
    });

    res.status(201).json({ service });
  } catch (error) {
    next(error);
  }
};

export const getServices = async (req, res, next) => {
  try {
    const isMarketplace = req.query.marketplace === 'true';
    const query = {};

    if (isMarketplace) {
      query.status = 'Active';
    } else {
      query.userId = req.user.id;
    }

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.minPrice) {
      query.price = { ...query.price, $gte: Number(req.query.minPrice) };
    }

    if (req.query.maxPrice) {
      query.price = { ...query.price, $lte: Number(req.query.maxPrice) };
    }

    if (req.query.tags) {
      query.tags = { $in: req.query.tags.split(',').map((tag) => tag.trim()) };
    }

    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { category: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    if (req.query.userId) {
      query.userId = req.query.userId;
    }

    let sort = { createdAt: -1 };
    if (req.query.sort === 'priceAsc') {
      sort = { price: 1 };
    } else if (req.query.sort === 'priceDesc') {
      sort = { price: -1 };
    }

    const services = await Service.find(query).sort(sort);
    res.json({ services });
  } catch (error) {
    next(error);
  }
};

export const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (service.status !== 'Active' && service.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Service is not available' });
    }

    res.json({ service });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const updatePayload = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: Number(req.body.price) || 0,
      deliveryTime: req.body.deliveryTime || '',
      tags: Array.isArray(req.body.tags) ? req.body.tags : [],
      thumbnail: req.body.thumbnail || '',
      features: Array.isArray(req.body.features) ? req.body.features : [],
      revisions: Number(req.body.revisions) || 0,
      status: req.body.status || 'Draft',
    };

    if (req.body.status === 'Active') {
      updatePayload.publishedAt = new Date();
    }

    const service = await Service.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      updatePayload,
      { new: true },
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found or unauthorized' });
    }

    res.json({ service });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted' });
  } catch (error) {
    next(error);
  }
};
