
import { GoogleGenAI, Type } from "@google/genai";
import { FamilyMember } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateBiography = async (member: FamilyMember, context: FamilyMember[]) => {
  const ai = getAI();
  const prompt = `
    Write a beautiful, engaging 200-word biography for ${member.name}.
    Current known facts:
    - Birth: ${member.birthDate || 'Unknown'}
    - Death: ${member.deathDate || 'Present'}
    - Known bio: ${member.bio || 'None'}
    
    Context about relatives in the tree:
    ${context.filter(m => m.id !== member.id).map(m => `- ${m.name} (Relationship: ${m.parentId === member.id ? 'Child' : m.id === member.parentId ? 'Parent' : 'Relative'})`).join('\n')}
    
    Make the story feel warm and personal, suitable for a family heirloom.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text || "Failed to generate biography.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to AI service.";
  }
};

export const suggestMissingConnections = async (members: FamilyMember[]) => {
  const ai = getAI();
  const dataString = JSON.stringify(members);
  
  const prompt = `
    Analyze this family tree data and suggest potential historical contexts or missing research directions:
    ${dataString}
    
    Provide a bulleted list of insights.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
    });
    return response.text || "No insights found.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to analyze tree.";
  }
};
