import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const recommendDoctor = async (req, res) => {

    try {

        const { symptoms } = req.body;

        if (!symptoms || symptoms.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Please provide symptoms."
            });
        }

        const prompt = `
You are an AI medical assistant.

Based on the user's symptoms, recommend ONLY ONE medical specialization.

Choose ONLY from this list:

- General Physician
- Cardiologist
- Dermatologist
- Neurologist
- Orthopedic
- Pediatrician
- Gynecologist
- ENT Specialist
- Ophthalmologist
- Psychiatrist
- Gastroenterologist
- Pulmonologist

Return ONLY valid JSON.

{
  "specialization": "",
  "conditions": [],
  "severity": "",
  "advice": ""
}

Symptoms:
${symptoms}
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        let text = response.text.trim();

        if (text.startsWith("```")) {
          text = text
          .replace(/^```json\s*/, "")
          .replace(/^```\s*/, "")
          .replace(/```$/, "")
          .trim();
        }

const result = JSON.parse(text);

        return res.status(200).json({
            success: true,
            result,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export { recommendDoctor };