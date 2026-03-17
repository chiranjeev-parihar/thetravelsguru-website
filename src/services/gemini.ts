
import { GoogleGenAI } from "@google/genai";

export const generateItinerary = async (destination: string, duration: string, travelers: number, interests: string[]) => {
  if (!process.env.API_KEY) {
    return "AI services are currently unavailable. Please contact Mahavir Mahirrao directly for your custom plan.";
  }

  // Initializing exactly as required by guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const prompt = `Act as Mahavir Mahirrao, the senior travel consultant for TheTravelGuru. 
    Create a detailed, high-quality, and personalized travel itinerary for:
    - Destination: ${destination}
    - Duration: ${duration}
    - Number of Travelers: ${travelers}
    - Traveler Interests: ${interests.join(', ')}
    
    Structure the response with:
    1. A warm welcome from TheTravelGuru.
    2. A day-by-day breakdown with specific activity suggestions.
    3. Estimated local budget breakdown (Accommodation, Food, Transport).
    4. Pro-tips for this specific destination.
    5. A closing call-to-action to call 9099965751 to finalize bookings.
    
    Use clear Markdown formatting with bold headings and bullet points.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return "We encountered an error generating your custom plan. Please reach out to us at thetravelsguru@gmail.com for immediate assistance.";
  }
};
