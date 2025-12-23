import { GoogleGenAI } from "@google/genai";
import { FamilyMember } from "../types";

// Safe wrapper for GoogleGenAI initialization
const getAIClient = () => {
  const apiKey = typeof process !== 'undefined' ? process.env?.API_KEY : undefined;
  if (!apiKey) {
    console.warn("Gemini API Key is missing. AI features will be disabled.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateBiography = async (member: FamilyMember, context: FamilyMember[]) => {
  const ai = getAIClient();
  if (!ai) return "AI-biografi er ikke tilgængelig uden API-nøgle.";

  const prompt = `
    Skriv en smuk og personlig biografi på dansk til ${member.name} (ca. 150 ord).
    Fakta:
    - Født: ${member.birthDate || 'Ukendt'}
    - Død: ${member.deathDate || 'Nulevende'}
    - Sted: ${member.birthPlace || 'Ukendt'}
    
    Kontekst i familien:
    ${context.filter(m => m.id !== member.id).slice(0, 5).map(m => `- ${m.name}`).join('\n')}
    
    Gør fortællingen levende og varm.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "Kunne ikke generere biografi.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Der skete en fejl under genereringen af biografien.";
  }
};
