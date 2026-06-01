import ProposalHistory from '../models/ProposalHistory.js';
import PricingSuggestion from '../models/PricingSuggestion.js';
import { AIService } from '../services/aiService.js';
import { createNotification } from '../services/notificationService.js';
import { logActivity } from '../services/activityService.js';

const parseSkills = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === 'string' && value.trim().length > 0) {
    return value
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const sanitizeText = (value) => (typeof value === 'string' ? value.trim() : '');

export const generateProposal = async (req, res) => {
  try {
    const projectTitle = sanitizeText(req.body.projectTitle);
    const projectDescription = sanitizeText(req.body.projectDescription);
    const budget = sanitizeText(req.body.budget);
    const timeline = sanitizeText(req.body.timeline);
    const proposalStyle = sanitizeText(req.body.proposalStyle) || 'Professional';
    const templateType = sanitizeText(req.body.templateType) || 'web development';
    const category = sanitizeText(req.body.category) || templateType;
    const deliveryExpectations = sanitizeText(req.body.deliveryExpectations);
    const skills = parseSkills(req.body.skills);

    if (!projectTitle || !projectDescription) {
      return res.status(400).json({ message: 'Project title and description are required.' });
    }

    const aiResponse = await AIService.generateFreelancerProposal({
      projectTitle,
      projectDescription,
      budget,
      timeline,
      proposalStyle,
      templateType,
      category,
      deliveryExpectations,
      skills,
    });

    const proposalRecord = new ProposalHistory({
      userId: req.user.id,
      projectTitle,
      proposalType: proposalStyle,
      templateType,
      generatedProposal: aiResponse.proposal,
      sourceInput: {
        projectDescription,
        budget,
        timeline,
        proposalStyle,
        templateType,
        category,
        deliveryExpectations,
        skills,
      },
      projectDescription,
      budget,
      timeline,
      skills,
    });

    await proposalRecord.save();

    await Promise.all([
      createNotification({
        userId: req.user.id,
        type: 'success',
        title: 'Proposal generated',
        message: 'Your AI proposal draft is ready for review.',
        category: 'freelancer',
        targetUrl: '/freelancer/proposal-history',
      }),
      logActivity({
        userId: req.user.id,
        activityType: 'proposal_generated',
        metadata: { projectTitle, templateType, budget, timeline },
      }),
    ]);

    return res.status(201).json({
      proposal: aiResponse.proposal,
      rawResponse: aiResponse.rawResponse,
      history: proposalRecord,
    });
  } catch (error) {
    console.error('Proposal Generation Error:', error);
    return res.status(500).json({ message: 'Proposal generation failed', error: error.message });
  }
};

export const generateCoverLetter = async (req, res) => {
  try {
    const projectTitle = sanitizeText(req.body.projectTitle);
    const projectDescription = sanitizeText(req.body.projectDescription);
    const skills = parseSkills(req.body.skills);
    const timeline = sanitizeText(req.body.timeline);
    const proposalStyle = sanitizeText(req.body.proposalStyle) || 'Professional';
    const deliveryExpectations = sanitizeText(req.body.deliveryExpectations);

    if (!projectTitle || !projectDescription) {
      return res.status(400).json({ message: 'Project title and description are required for cover letter generation.' });
    }

    const aiResponse = await AIService.generateCoverLetter({
      projectTitle,
      projectDescription,
      skills,
      timeline,
      proposalStyle,
      deliveryExpectations,
    });

    return res.status(201).json({
      coverLetter: aiResponse.coverLetter,
      rawResponse: aiResponse.rawResponse,
    });
  } catch (error) {
    console.error('Cover Letter Generation Error:', error);
    return res.status(500).json({ message: 'Cover letter generation failed', error: error.message });
  }
};

export const suggestPricing = async (req, res) => {
  try {
    const category = sanitizeText(req.body.category);
    const projectComplexity = sanitizeText(req.body.projectComplexity) || 'Medium';
    const skills = parseSkills(req.body.skills);
    const deliveryExpectations = sanitizeText(req.body.deliveryExpectations);
    const budget = sanitizeText(req.body.budget);
    const timeline = sanitizeText(req.body.timeline);

    if (!category) {
      return res.status(400).json({ message: 'Category is required to provide pricing suggestions.' });
    }

    const aiResponse = await AIService.suggestPricing({
      category,
      projectComplexity,
      skills,
      deliveryExpectations,
      budget,
      timeline,
    });

    const pricingRecord = new PricingSuggestion({
      userId: req.user.id,
      category,
      projectComplexity,
      estimatedPrice: aiResponse.estimatedPrice,
      estimatedTimeline: aiResponse.estimatedTimeline,
      recommendationSummary: aiResponse.recommendationSummary,
      inputDetails: {
        skills,
        deliveryExpectations,
        budget,
        timeline,
      },
    });

    await pricingRecord.save();

    await Promise.all([
      createNotification({
        userId: req.user.id,
        type: 'info',
        title: 'Pricing suggestion ready',
        message: 'AI pricing guidance has been generated for your project.',
        category: 'freelancer',
        targetUrl: '/freelancer/pricing-suggestions',
      }),
      logActivity({
        userId: req.user.id,
        activityType: 'pricing_suggestion_generated',
        metadata: { category, projectComplexity, budget, timeline },
      }),
    ]);

    return res.status(201).json({ pricing: aiResponse, record: pricingRecord });
  } catch (error) {
    console.error('Pricing Suggestion Error:', error);
    return res.status(500).json({ message: 'Pricing suggestion failed', error: error.message });
  }
};

export const getProposalHistory = async (req, res) => {
  try {
    const proposals = await ProposalHistory.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    return res.json({ proposals });
  } catch (error) {
    console.error('Proposal History Error:', error);
    return res.status(500).json({ message: 'Unable to fetch proposal history', error: error.message });
  }
};

export const getPricingHistory = async (req, res) => {
  try {
    const pricingHistory = await PricingSuggestion.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    return res.json({ pricingHistory });
  } catch (error) {
    console.error('Pricing History Error:', error);
    return res.status(500).json({ message: 'Unable to fetch pricing history', error: error.message });
  }
};

export const getProposalById = async (req, res) => {
  try {
    const { id } = req.params;
    const proposal = await ProposalHistory.findOne({ _id: id, userId: req.user.id }).lean();

    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    return res.json({ proposal });
  } catch (error) {
    console.error('Get Proposal Error:', error);
    return res.status(500).json({ message: 'Unable to fetch proposal details', error: error.message });
  }
};

export const deleteProposal = async (req, res) => {
  try {
    const { id } = req.params;
    const proposal = await ProposalHistory.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    return res.json({ message: 'Proposal deleted successfully' });
  } catch (error) {
    console.error('Delete Proposal Error:', error);
    return res.status(500).json({ message: 'Unable to delete proposal', error: error.message });
  }
};
