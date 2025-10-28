// FIX: Implement the geminiService to interact with the Google Gemini API.
import { GoogleGenAI, Type } from "@google/genai";
import { JournalEntry } from "../types";

// FIX: Initialize the GoogleGenAI client. The API key is automatically sourced from process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// FIX: Define the JSON schema for the expected response from the Gemini API.
const insightsSchema = {
    type: Type.OBJECT,
    properties: {
        summary: {
            type: Type.STRING,
            description: "A brief, empathetic summary of the journal entry in 2-3 sentences."
        },
        positive_aspects: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 2-3 positive aspects, strengths, or moments of gratitude found in the entry."
        },
        areas_for_reflection: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 2-3 gentle, open-ended questions to prompt deeper reflection on the topics mentioned."
        },
        key_takeaways: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 1-2 key takeaways or general pieces of advice based on the entry's themes."
        },
    },
    required: ["summary", "positive_aspects", "areas_for_reflection", "key_takeaways"]
};


export const analyzeJournalEntry = async (entryText: string): Promise<Partial<JournalEntry> | null> => {
    const prompt = `
        Analyze the following journal entry. Act as a compassionate and insightful wellness coach. 
        Your goal is to provide supportive and constructive feedback. 
        Do not be judgmental. Focus on identifying themes, emotions, and potential areas for growth.
        Based on the entry, provide a summary, identify positive aspects, suggest areas for reflection, and offer key takeaways.
        
        Journal Entry:
        "${entryText}"
    `;

    try {
        // FIX: Use the correct method to generate content with a JSON response.
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', // Using a fast and capable model for this task.
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: insightsSchema,
                temperature: 0.5,
            },
        });
        
        // FIX: Access the text response directly and parse it.
        const text = response.text;
        if (text) {
             const parsedJson = JSON.parse(text);
             return parsedJson as Partial<JournalEntry>;
        }
        return null;
    } catch (error) {
        console.error("Error analyzing journal entry with Gemini:", error);
        throw new Error("Failed to generate insights from AI.");
    }
};

const suggestionsSchema = {
    type: Type.OBJECT,
    properties: {
        suggestions: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING,
                description: 'A personalized wellness tip related to health, hygiene, or beauty.',
            },
            description: "A list of 3-5 personalized wellness tips."
        }
    },
    required: ["suggestions"],
};

export const getWellnessSuggestions = async (entryText: string): Promise<string[] | null> => {
    const prompt = `
        You are a friendly and caring wellness advisor.
        Based on the following journal entry, provide 3-5 personalized and actionable wellness tips.
        Focus specifically on practical suggestions for health, hygiene, and beauty.
        The tone should be positive, gentle, and encouraging. Do not be preachy or clinical.
        For example, if the user mentions feeling tired, suggest a calming bedtime routine. If they mention skin concerns, suggest a simple hydration tip.

        Journal Entry:
        "${entryText}"
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: suggestionsSchema,
                temperature: 0.7,
            },
        });

        const text = response.text;
        if (text) {
             const parsedJson = JSON.parse(text);
             return parsedJson.suggestions as string[];
        }
        return null;
    } catch (error) {
        console.error("Error getting wellness suggestions from Gemini:", error);
        throw new Error("Failed to generate wellness suggestions from AI.");
    }
};