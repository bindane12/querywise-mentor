
interface DeepseekMessage {
  role: "user" | "assistant";
  content: string;
}

export async function generateDeepseekResponse(messages: DeepseekMessage[]): Promise<string> {
  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-8ccef414b43c427194a342af9902365c"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`Deepseek API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating Deepseek response:", error);
    throw error;
  }
}
