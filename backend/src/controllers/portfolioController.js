import Portfolio from '../models/Portfolio.js';

export const createPortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.create({
      userId: req.user.id,
      title: req.body.title,
      description: req.body.description,
      technologies: Array.isArray(req.body.technologies) ? req.body.technologies : [],
      images: Array.isArray(req.body.images) ? req.body.images : [],
      liveLink: req.body.liveLink || '',
      githubLink: req.body.githubLink || '',
    });

    res.status(201).json({ portfolio });
  } catch (error) {
    next(error);
  }
};

export const getPortfolios = async (req, res, next) => {
  try {
    const portfolios = await Portfolio.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ portfolios });
  } catch (error) {
    next(error);
  }
};

export const updatePortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        title: req.body.title,
        description: req.body.description,
        technologies: Array.isArray(req.body.technologies) ? req.body.technologies : [],
        images: Array.isArray(req.body.images) ? req.body.images : [],
        liveLink: req.body.liveLink || '',
        githubLink: req.body.githubLink || '',
      },
      { new: true },
    );

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }

    res.json({ portfolio });
  } catch (error) {
    next(error);
  }
};

export const deletePortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    res.json({ message: 'Portfolio item deleted' });
  } catch (error) {
    next(error);
  }
};
