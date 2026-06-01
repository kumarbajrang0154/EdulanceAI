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

  static buildFreelancerProposalPrompt({
    projectTitle,
    projectDescription,
    budget,
    timeline,
    skills,
    proposalStyle,
    templateType,
    category,
    deliveryExpectations,
  }) {
    return `You are an AI-powered freelance proposal assistant. Use the client project details to write a polished proposal for a ${templateType} engagement.

Project title: ${projectTitle}
Category: ${category}
Project description: ${projectDescription}
Skills: ${skills.join(', ')}
Budget: ${budget || 'Not specified'}
Timeline: ${timeline || 'Flexible'}
Delivery expectations: ${deliveryExpectations || 'Standard professional delivery'}
Proposal style: ${proposalStyle}

Write a professional proposal that explains the freelancer's understanding of the project, proposed approach, relevant skills, timeline, and why the freelancer is the best fit.

Format your response as JSON with the keys: proposal, summary, and recommendations.
Respond using complete sentences and keep the proposal concise, compelling, and client-focused.`;
  }

  static buildPricingSuggestionPrompt({
    category,
    projectComplexity,
    skills,
    deliveryExpectations,
    budget,
    timeline,
  }) {
    return `You are an AI pricing advisor for freelance projects. Based on the following project details, suggest a realistic price and delivery timeline.

Category: ${category}
Project complexity: ${projectComplexity}
Skills required: ${skills.join(', ')}
Delivery expectations: ${deliveryExpectations || 'Standard professional delivery'}
Estimated budget: ${budget || 'Not specified'}
Desired timeline: ${timeline || 'Flexible'}

Provide a pricing recommendation. Format the response as JSON with keys: estimatedPrice, estimatedTimeline, serviceRecommendations, recommendationSummary.
Explain the rationale clearly for a freelancer to use when presenting pricing to a client.`;
  }

  static buildCoverLetterPrompt({
    projectTitle,
    projectDescription,
    skills,
    timeline,
    proposalStyle,
    deliveryExpectations,
  }) {
    return `You are an AI assistant writing a strong freelancing cover letter. Use the project details below to generate a compelling client-facing message.

Project title: ${projectTitle}
Project description: ${projectDescription}
Skills: ${skills.join(', ')}
Timeline: ${timeline || 'Flexible'}
Delivery expectations: ${deliveryExpectations || 'Professional and timely delivery'}
Cover letter style: ${proposalStyle}

Write a professional cover letter that includes:
- Client introduction
- Project understanding
- Why the freelancer is a strong fit
- Delivery commitment
- Next-step invitation

Format the response as JSON with keys: coverLetter and talkingPoints.`;
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

  static async generateFreelancerProposal(payload) {
    const {
      projectTitle,
      projectDescription,
      budget,
      timeline,
      skills,
      proposalStyle,
      templateType,
      category,
      deliveryExpectations,
    } = payload;

    if (!projectTitle || !projectDescription) {
      throw new Error('Project title and description are required.');
    }

    try {
      const prompt = PromptBuilder.buildFreelancerProposalPrompt({
        projectTitle,
        projectDescription,
        budget,
        timeline,
        skills,
        proposalStyle,
        templateType,
        category,
        deliveryExpectations,
      });
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
        proposal: parsedResponse.proposal || text,
        recommendations: parsedResponse.recommendations || '',
        summary: parsedResponse.summary || '',
        rawResponse: text,
      };
    } catch (error) {
      console.error('AI Proposal Error:', error);
      throw new Error(`Proposal Generation Failed: ${error.message}`);
    }
  }

  static async suggestPricing(payload) {
    const {
      category,
      projectComplexity,
      skills,
      deliveryExpectations,
      budget,
      timeline,
    } = payload;

    if (!category) {
      throw new Error('Project category is required for pricing suggestions.');
    }

    try {
      const prompt = PromptBuilder.buildPricingSuggestionPrompt({
        category,
        projectComplexity,
        skills,
        deliveryExpectations,
        budget,
        timeline,
      });
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
        estimatedPrice: parsedResponse.estimatedPrice || 'To be determined',
        estimatedTimeline: parsedResponse.estimatedTimeline || 'To be determined',
        serviceRecommendations: parsedResponse.serviceRecommendations || '',
        recommendationSummary: parsedResponse.recommendationSummary || '',
        rawResponse: text,
      };
    } catch (error) {
      console.error('AI Pricing Error:', error);
      throw new Error(`Pricing Suggestion Failed: ${error.message}`);
    }
  }

  static async generateCoverLetter(payload) {
    const { projectTitle, projectDescription, skills, timeline, proposalStyle, deliveryExpectations } = payload;

    if (!projectTitle || !projectDescription) {
      throw new Error('Project title and description are required for cover letter generation.');
    }

    try {
      const prompt = PromptBuilder.buildCoverLetterPrompt({
        projectTitle,
        projectDescription,
        skills,
        timeline,
        proposalStyle,
        deliveryExpectations,
      });
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
        coverLetter: parsedResponse.coverLetter || text,
        talkingPoints: Array.isArray(parsedResponse.talkingPoints) ? parsedResponse.talkingPoints : [],
        rawResponse: text,
      };
    } catch (error) {
      console.error('AI Cover Letter Error:', error);
      throw new Error(`Cover Letter Generation Failed: ${error.message}`);
    }
  }
}

export { AIService, PromptBuilder };
