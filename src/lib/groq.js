import Groq from "groq-sdk";

// Initialize the API with the key from environment variables
// Using the variable name provided by the user, ensuring it works with Vite
const apiKey = import.meta.env.VITE_ScoutAPI || import.meta.env.VITE_GROQ_API_KEY || '';

const groq = new Groq({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true // Required for client-side usage
});

export const generateActivityIdeas = async (formData) => {
    if (!apiKey) {
        throw new Error("API Key is missing. Please check your .env file.");
    }

    try {
        const prompt = `
      You are an expert scout leader and activity planner. 
      Generate 5 unique, exciting, and detailed scout activity ideas based on the following criteria:
      
      - Number of Kids: ${formData.numKids}
      - Age Range: ${formData.minAge} to ${formData.maxAge} years old
      - Location: ${formData.location}
      - Theme: ${formData.theme || "General Scouting Fun"}
      - Budget: ${formData.budgetType} ${formData.budgetType === 'money' ? `($${formData.budgetAmount})` : ''}
      - Materials Available: ${formData.materials || "Standard scout gear"}
      - Accessibility: ${formData.accessible ? `Must be accessible for: ${formData.disability || "General accessibility needs"}` : "Standard"}
      - Format: ${formData.format}
      - Purpose: ${formData.purpose || "Fun and learning"}

      Return the response ONLY as a valid JSON array of objects. Do not include markdown formatting or backticks.
      Each object in the array must have these fields:
      - id: (number, 0-4)
      - title: (string, a catchy title)
      - description: (string, a 2-sentence summary)
      - action: (string, the main activity verb/mission, e.g., "Build a bridge")
      - location: (string, specific context, e.g., "by the creek")
      - constraint: (string, a fun twist or rule, e.g., "without talking")
      - item: (string, a key item needed)
      - duration: (string, e.g., "90-120 minutes")
      - groupSize: (string, e.g., "Teams of 4-5")
      - materialsList: (array of strings, specific items needed)
      - safetySteps: (array of strings, key safety considerations)
      - restrictions: (array of strings, weather/mobility considerations)
      - inspiration: (string, topics, games, websites, or categories where this activity was inspired from)
    `;

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "openai/gpt-oss-20b",
            temperature: 0.7,
        });

        const content = completion.choices[0]?.message?.content;

        if (!content) {
            throw new Error("No content received from AI");
        }

        // Clean up the response in case it contains markdown code blocks
        const cleanText = content.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(cleanText);
    } catch (error) {
        console.error("Error generating ideas:", error);
        throw error;
    }
};
