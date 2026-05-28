import { GoogleGenerativeAI } from '@google/generative-ai';

const getGeminiModel = async () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY must be defined in environment variables');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: 'gemini-pro' });
};

class PromptBuilder {
  static buildNoteSummaryPrompt(extractedText) {
    return `You are an expert tutor and study guide generator. Analyze the following study notes and provide a comprehensive summary.

EXTRACTED TEXT:
${extractedText}

Please provide:
1. **Concise Summary**: A brief overview (2-3 paragraphs) of the main topic
2. **Key Concepts**: List the 5-7 most important concepts explained briefly
3. **Important Points**: 5-10 bullet points highlighting critical information
4. **Exam Tips**: Strategic advice for students preparing to be tested on this material

Format your response as JSON with keys: summary, keyConcepts (array), importantPoints (array), examTips

Make the summary student-friendly, clear, and exam-focused.`;
  }

  static buildQuestionGenerationPrompt(extractedText) {
    return `Based on these study notes, generate practice questions:

${extractedText}

Generate 5-10 multiple choice questions with 4 options each and correct answers.
Format as JSON array with objects containing: question, options (array), correctAnswer (number).`;
  }
}

class AIService {
  static parseAIResponse(text, regex, failureMessage) {
    const jsonMatch = text.match(regex);
    if (!jsonMatch) {
      throw new Error(failureMessage);
    }

    try {
      return JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      throw new Error(`Unable to parse JSON from AI response: ${parseError.message}`);
    }
  }

  static async generateNoteSummary(extractedText) {
    if (!extractedText || extractedText.trim().length === 0) {
      throw new Error('No text extracted from PDF');
    }

    try {
      const prompt = PromptBuilder.buildNoteSummaryPrompt(extractedText);
      const model = await getGeminiModel();
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const parsedResponse = this.parseAIResponse(
        text,
        /\{[\s\S]*\}/,
        'Invalid AI response format: expected a JSON object',
      );

      return {
        summary: parsedResponse.summary || text,
        keyConcepts: Array.isArray(parsedResponse.keyConcepts) ? parsedResponse.keyConcepts : [],
        importantPoints: Array.isArray(parsedResponse.importantPoints) ? parsedResponse.importantPoints : [],
        examTips: parsedResponse.examTips || '',
        rawResponse: text,
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error(`AI Summary Generation Failed: ${error.message}`);
    }
  }

  static async generateQuestions(extractedText) {
    if (!extractedText || extractedText.trim().length === 0) {
      throw new Error('No text extracted from PDF');
    }

    try {
      const prompt = PromptBuilder.buildQuestionGenerationPrompt(extractedText);
      const model = await getGeminiModel();
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const questions = this.parseAIResponse(
        text,
        /\[[\s\S]*\]/,
        'Invalid AI response format: expected a JSON array',
      );

      return Array.isArray(questions) ? questions : [];
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error(`Question Generation Failed: ${error.message}`);
    }
  }
}

export { AIService, PromptBuilder };
