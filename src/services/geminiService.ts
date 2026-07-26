import { GoogleGenAI } from '@google/genai';

let aiInstance: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      aiInstance = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
  }
  return aiInstance;
}

export async function generateGeminiContent(
  systemInstruction: string,
  userPrompt: string
): Promise<string | null> {
  try {
    const ai = getGeminiClient();
    if (!ai) {
      return null; // Signals fallback to agent persona engine
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || null;
  } catch (err) {
    console.warn('Gemini API call warning/fallback:', err);
    return null;
  }
}
