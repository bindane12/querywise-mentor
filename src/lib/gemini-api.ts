
// Gemini API utility
export const GEMINI_API_KEY = "AIzaSyBqIfTh7HMrgWD6iHJwamx6wWWXy09VrkI";
export const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export interface GeminiMessage {
  role: "user" | "model";
  parts: {
    text: string;
  }[];
}

export interface GeminiRequest {
  contents: GeminiMessage[];
}

export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

export async function generateGeminiResponse(messages: GeminiMessage[]): Promise<string> {
  try {
    const requestBody: GeminiRequest = {
      contents: messages,
    };

    const response = await fetch(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      return "Sorry, I encountered an error while processing your request.";
    }

    const data = await response.json() as GeminiResponse;
    return data.candidates[0]?.content.parts[0].text || "No response generated";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
}
