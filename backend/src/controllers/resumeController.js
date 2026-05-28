import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import Resume from '../models/Resume.js';
import User from '../models/User.js';

const createTextLines = (text, maxWidth, font, size) => {
  const words = String(text || '').split(/\s+/);
  const lines = [];
  let line = '';

  words.forEach((word) => {
    const potentialLine = line ? `${line} ${word}` : word;
    const width = font.widthOfTextAtSize(potentialLine, size);
    if (width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = potentialLine;
    }
  });

  if (line) {
    lines.push(line);
  }

  return lines;
};

const drawWrappedText = (page, text, x, y, maxWidth, font, size, color = rgb(0.1, 0.1, 0.1), lineHeight = 14) => {
  const lines = createTextLines(text, maxWidth, font, size);
  lines.forEach((line, index) => {
    page.drawText(line, {
      x,
      y: y - index * lineHeight,
      size,
      font,
      color,
    });
  });
  return y - lines.length * lineHeight;
};

const buildResumePdf = async (resume) => {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([612, 792]);
  const { width, height } = page.getSize();
  const margin = 50;
  const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const bodyFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  let cursorY = height - margin;

  page.drawText(resume.title || 'Professional Resume', {
    x: margin,
    y: cursorY,
    size: 20,
    font: titleFont,
    color: rgb(0.06, 0.16, 0.38),
  });

  cursorY -= 28;

  const personal = resume.personalInfo || {};
  const contactLine = [personal.headline, personal.location, personal.email, personal.phone, personal.website]
    .filter(Boolean)
    .join(' • ');

  cursorY = drawWrappedText(page, contactLine, margin, cursorY, width - margin * 2, bodyFont, 10, rgb(0.35, 0.35, 0.35), 12) - 16;

  if (resume.about) {
    page.drawText('Professional Summary', { x: margin, y: cursorY, size: 12, font: titleFont, color: rgb(0.08, 0.2, 0.44) });
    cursorY -= 18;
    cursorY = drawWrappedText(page, resume.about, margin, cursorY, width - margin * 2, bodyFont, 10, rgb(0.1, 0.1, 0.1), 14) - 16;
  }

  const sectionHeader = (label) => {
    page.drawText(label, {
      x: margin,
      y: cursorY,
      size: 12,
      font: titleFont,
      color: rgb(0.08, 0.2, 0.44),
    });
    cursorY -= 18;
  };


  if (resume.experience?.length) {
    sectionHeader('Professional Experience');
    resume.experience.forEach((item) => {
      if (cursorY < margin + 90) {
        cursorY = height - margin;
        page = pdfDoc.addPage([612, 792]);
      }
      const heading = `${item.title || 'Title'} at ${item.company || 'Company'} • ${item.startDate || 'Start'} — ${item.endDate || 'Present'}`;
      cursorY = drawWrappedText(page, heading, margin + 8, cursorY, width - margin * 2 - 8, titleFont, 10, rgb(0.08, 0.2, 0.44), 14) - 6;
      cursorY = drawWrappedText(page, item.summary, margin + 8, cursorY, width - margin * 2 - 8, bodyFont, 10, rgb(0.14, 0.14, 0.14), 14) - 10;
    });
    cursorY -= 8;
  }

  if (resume.education?.length) {
    sectionHeader('Education');
    resume.education.forEach((item) => {
      if (cursorY < margin + 90) {
        cursorY = height - margin;
        page = pdfDoc.addPage([612, 792]);
      }
      const heading = `${item.institution || 'Institution'} — ${item.degree || 'Degree'}${item.fieldOfStudy ? `, ${item.fieldOfStudy}` : ''}`;
      cursorY = drawWrappedText(page, heading, margin + 8, cursorY, width - margin * 2 - 8, titleFont, 10, rgb(0.08, 0.2, 0.44), 14) - 6;
      cursorY = drawWrappedText(page, `${item.startDate || ''} • ${item.endDate || ''}${item.location ? ` • ${item.location}` : ''}`, margin + 8, cursorY, width - margin * 2 - 8, bodyFont, 10, rgb(0.35, 0.35, 0.35), 14) - 6;
      if (item.description) {
        cursorY = drawWrappedText(page, item.description, margin + 8, cursorY, width - margin * 2 - 8, bodyFont, 10, rgb(0.1, 0.1, 0.1), 14) - 10;
      }
    });
    cursorY -= 8;
  }

  if (resume.projects?.length) {
    sectionHeader('Projects');
    resume.projects.forEach((item) => {
      if (cursorY < margin + 90) {
        cursorY = height - margin;
        page = pdfDoc.addPage([612, 792]);
      }
      const heading = `${item.name || 'Project'}${item.link ? ` • ${item.link}` : ''}`;
      cursorY = drawWrappedText(page, heading, margin + 8, cursorY, width - margin * 2 - 8, titleFont, 10, rgb(0.08, 0.2, 0.44), 14) - 6;
      if (item.description) {
        cursorY = drawWrappedText(page, item.description, margin + 8, cursorY, width - margin * 2 - 8, bodyFont, 10, rgb(0.1, 0.1, 0.1), 14) - 10;
      }
      if (item.technologies) {
        cursorY = drawWrappedText(page, `Tech: ${item.technologies}`, margin + 8, cursorY, width - margin * 2 - 8, bodyFont, 10, rgb(0.35, 0.35, 0.35), 14) - 10;
      }
    });
    cursorY -= 8;
  }

  if (resume.skills?.length) {
    sectionHeader('Skills');
    cursorY = drawWrappedText(page, resume.skills.join(' · '), margin + 8, cursorY, width - margin * 2 - 8, bodyFont, 10, rgb(0.1, 0.1, 0.1), 14) - 16;
  }

  if (resume.certifications?.length) {
    sectionHeader('Certifications');
    resume.certifications.forEach((item) => {
      if (cursorY < margin + 90) {
        cursorY = height - margin;
        page = pdfDoc.addPage([612, 792]);
      }
      const heading = `${item.name || 'Certification'} • ${item.issuer || ''}${item.date ? ` • ${item.date}` : ''}`;
      cursorY = drawWrappedText(page, heading, margin + 8, cursorY, width - margin * 2 - 8, bodyFont, 10, rgb(0.1, 0.1, 0.1), 14) - 10;
    });
    cursorY -= 8;
  }

  if (resume.achievements?.length) {
    sectionHeader('Achievements');
    resume.achievements.forEach((item) => {
      if (cursorY < margin + 90) {
        cursorY = height - margin;
        page = pdfDoc.addPage([612, 792]);
      }
      cursorY = drawWrappedText(page, `• ${item}`, margin + 8, cursorY, width - margin * 2 - 8, bodyFont, 10, rgb(0.1, 0.1, 0.1), 14) - 10;
    });
    cursorY -= 8;
  }

  if (resume.socialLinks) {
    const links = [resume.socialLinks.linkedin, resume.socialLinks.github, resume.socialLinks.website, resume.socialLinks.twitter]
      .filter(Boolean)
      .join(' • ');
    if (links) {
      sectionHeader('Links');
      cursorY = drawWrappedText(page, links, margin + 8, cursorY, width - margin * 2 - 8, bodyFont, 10, rgb(0.1, 0.1, 0.1), 14) - 10;
    }
  }

  return pdfDoc.save();
};

const validateResumePayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Resume payload is required');
  }
  if (!payload.title || !payload.title.trim()) {
    throw new Error('Resume title is required');
  }
  if (!payload.personalInfo || !payload.personalInfo.name) {
    throw new Error('Personal name is required');
  }
};

export const createResume = async (req, res, next) => {
  try {
    validateResumePayload(req.body);
    const payload = Object.assign({}, req.body, { userId: req.user.id });
    const resume = await Resume.create(payload);
    await User.findByIdAndUpdate(req.user.id, { $inc: { 'stats.resumeCount': 1 } });
    res.status(201).json({ resume });
  } catch (error) {
    next(error);
  }
};

export const getResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json({ resumes });
  } catch (error) {
    next(error);
  }
};

export const getResumeById = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user.id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json({ resume });
  } catch (error) {
    next(error);
  }
};

export const updateResume = async (req, res, next) => {
  try {
    validateResumePayload(req.body);
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true },
    );
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json({ resume });
  } catch (error) {
    next(error);
  }
};

export const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    await User.findByIdAndUpdate(req.user.id, { $inc: { 'stats.resumeCount': -1 } });
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const duplicateResume = async (req, res, next) => {
  try {
    const original = await Resume.findOne({ _id: req.params.id, userId: req.user.id });
    if (!original) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    const duplicateData = original.toObject();
    delete duplicateData._id;
    delete duplicateData.createdAt;
    delete duplicateData.updatedAt;
    const duplicate = await Resume.create(Object.assign(duplicateData, {
      title: `${original.title} Copy`,
      userId: req.user.id,
    }));
    await User.findByIdAndUpdate(req.user.id, { $inc: { 'stats.resumeCount': 1 } });
    res.status(201).json({ resume: duplicate });
  } catch (error) {
    next(error);
  }
};

export const downloadResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user.id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const pdfBytes = await buildResumePdf(resume);
    const filename = `${resume.title.trim().replace(/[^a-zA-Z0-9_-]/g, '_') || 'resume'}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    next(error);
  }
};
