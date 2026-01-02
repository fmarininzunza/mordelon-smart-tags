
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getPetCareAdvice = async (petData: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Proporciona un consejo de cuidado corto y profesional para un ${petData.species} de raza ${petData.breed} que tiene ${petData.age}. Menciona algo sobre su condición médica: ${petData.medicalConditions}. En español.`,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching AI advice", error);
    return "Recuerda visitar a tu veterinario regularmente para mantener a tu mascota sana.";
  }
};
