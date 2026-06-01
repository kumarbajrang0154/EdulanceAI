import Note from '../models/Note.js';
import User from '../models/User.js';
import PDFService from '../services/pdfService.js';
import { AIService } from '../services/aiService.js';
import { createNotification } from '../services/notificationService.js';
import { logActivity } from '../services/activityService.js';

// Upload PDF and generate summary
export const uploadAndSummarize = async (req, res) => {
  const startTime = Date.now();
  let savedNote = null;

  try {
    // Validate student
    if (!req.user || req.user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied. Only students can upload notes.' });
    }

    // Validate file
    const validation = PDFService.validateFile(req.file);
    if (!validation.isValid) {
      PDFService.deleteFile(req.file.path);
      return res.status(400).json({ errors: validation.errors });
    }

    // Extract text from PDF
    const { text: extractedText, pageCount } = await PDFService.extractTextFromFile(req.file.path);

    if (extractedText.length < 50) {
      PDFService.deleteFile(req.file.path);
      return res.status(400).json({
        message: 'Extracted text is too short. Please upload a valid PDF with sufficient content.',
      });
    }

    // Create note record (before AI processing, in case of error)
    const note = new Note({
      studentId: req.user.id,
      originalFileName: req.file.originalname,
      extractedText,
      textLength: extractedText.length,
      aiSummary: '',
      status: 'processing',
    });

    savedNote = await note.save();

    // Generate AI summary
    const aiResponse = await AIService.generateNoteSummary(extractedText);

    // Update note with AI response
    savedNote.aiSummary = aiResponse.summary;
    savedNote.keyConcepts = aiResponse.keyConcepts;
    savedNote.importantPoints = aiResponse.importantPoints;
    savedNote.examTips = aiResponse.examTips;
    savedNote.summaryLength = aiResponse.summary.length;
    savedNote.processingTime = Date.now() - startTime;
    savedNote.status = 'completed';

    await savedNote.save();

    // Increment student stat
    await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { 'stats.aiUsageCount': 1 } }
    );

    await Promise.all([
      createNotification({
        userId: req.user.id,
        type: 'success',
        title: 'AI summary completed',
        message: 'Your uploaded document has been processed and the summary is ready.',
        category: 'ai',
        targetUrl: '/student/summary-history',
      }),
      logActivity({
        userId: req.user.id,
        activityType: 'ai_summary_generated',
        metadata: { noteId: savedNote._id, textLength: savedNote.textLength },
      }),
    ]);

    // Clean up temporary file
    PDFService.deleteFile(req.file.path);

    return res.status(201).json({
      message: 'PDF processed and summary generated successfully',
      note: {
        _id: savedNote._id,
        fileName: savedNote.originalFileName,
        summary: savedNote.aiSummary,
        keyConcepts: savedNote.keyConcepts,
        importantPoints: savedNote.importantPoints,
        examTips: savedNote.examTips,
        pageCount,
        createdAt: savedNote.createdAt,
        processingTime: savedNote.processingTime,
      },
    });
  } catch (error) {
    console.error('Upload Error:', error);

    // Update note with error status if it was created
    if (savedNote) {
      savedNote.status = 'failed';
      savedNote.errorMessage = error.message;
      await savedNote.save();
    }

    // Clean up file
    if (req.file) {
      PDFService.deleteFile(req.file.path);
    }

    return res.status(500).json({
      message: 'Failed to process PDF and generate summary',
      error: error.message,
    });
  }
};

// Get note history for student
export const getNoteHistory = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const notes = await Note.find({
      studentId: req.user.id,
      status: 'completed',
    })
      .select('_id originalFileName createdAt summaryLength textLength processingTime')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Note.countDocuments({
      studentId: req.user.id,
      status: 'completed',
    });

    res.json({
      notes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('History Fetch Error:', error);
    res.status(500).json({ message: 'Failed to fetch history', error: error.message });
  }
};

// Get single note details
export const getNoteById = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { id } = req.params;

    const note = await Note.findOne({
      _id: id,
      studentId: req.user.id,
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ note });
  } catch (error) {
    console.error('Get Note Error:', error);
    res.status(500).json({ message: 'Failed to fetch note', error: error.message });
  }
};

// Delete note
export const deleteNote = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { id } = req.params;

    const note = await Note.findOneAndDelete({
      _id: id,
      studentId: req.user.id,
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Delete Note Error:', error);
    res.status(500).json({ message: 'Failed to delete note', error: error.message });
  }
};

// Get statistics for dashboard
export const getAIStats = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const stats = await Note.aggregate([
      {
        $match: {
          studentId: req.user.id,
          status: 'completed',
        },
      },
      {
        $group: {
          _id: null,
          totalNotes: { $sum: 1 },
          totalTextProcessed: { $sum: '$textLength' },
          avgProcessingTime: { $avg: '$processingTime' },
          totalTextLength: { $sum: '$textLength' },
        },
      },
    ]);

    const result = stats[0] || {
      totalNotes: 0,
      totalTextProcessed: 0,
      avgProcessingTime: 0,
      totalTextLength: 0,
    };

    res.json({ stats: result });
  } catch (error) {
    console.error('Stats Fetch Error:', error);
    res.status(500).json({ message: 'Failed to fetch statistics', error: error.message });
  }
};
