import pdfParse from 'pdf-parse';
import fs from 'fs';

class PDFService {
  static async extractTextFromFile(filePath) {
    try {
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        throw new Error('PDF file not found');
      }

      // Read file buffer
      const fileBuffer = fs.readFileSync(filePath);

      // Parse PDF
      const data = await pdfParse(fileBuffer);

      if (!data.text || data.text.trim().length === 0) {
        throw new Error('No text found in PDF. The PDF may be image-based or corrupted.');
      }

      // Clean extracted text
      const cleanedText = this.cleanText(data.text);

      return {
        text: cleanedText,
        pageCount: data.numpages,
        rawText: data.text,
      };
    } catch (error) {
      console.error('PDF Extraction Error:', error);
      throw new Error(`PDF Text Extraction Failed: ${error.message}`);
    }
  }

  static cleanText(text) {
    return text
      .replace(/\r\n/g, '\n')           // Normalize line breaks
      .replace(/\n\n+/g, '\n\n')        // Remove excessive line breaks
      .replace(/[^\S\n]/g, ' ')         // Normalize whitespace
      .trim();
  }

  static validateFile(file) {
    const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
    const ALLOWED_MIME_TYPE = 'application/pdf';

    const errors = [];

    if (!file) {
      errors.push('No file provided');
    } else {
      if (file.mimetype !== ALLOWED_MIME_TYPE) {
        errors.push(`Invalid file type. Only PDF files are allowed. Received: ${file.mimetype}`);
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.push(
          `File size exceeds limit. Maximum: ${MAX_FILE_SIZE / 1024 / 1024}MB, Received: ${(file.size / 1024 / 1024).toFixed(2)}MB`
        );
      }

      if (file.size === 0) {
        errors.push('File is empty');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static deleteFile(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error('File Deletion Error:', error);
    }
  }
}

export default PDFService;
