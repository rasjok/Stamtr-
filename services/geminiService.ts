
import { GoogleGenAI } from "@google/genai";
import { FamilyMember } from "../types";

// Always initialize the client using the apiKey named parameter and the required environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBiography = async (member: FamilyMember, context: FamilyMember[]) => {
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
    // Access the generated text directly using the .text property.
    return response.text || "Failed to generate biography.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to AI service.";
  }
};

export const suggestMissingConnections = async (members: FamilyMember[]) => {
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
    // Access the generated text directly using the .text property.
    return response.text || "No insights found.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to analyze tree.";
  }
};
