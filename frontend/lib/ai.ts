import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function extractOpportunityDetails(email: {
  subject: string;
  content: string;
  sender: string;
}) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
You are an AI career assistant.

Extract structured internship/job information from this email.

Return ONLY valid JSON.

{
  "company": "",
  "role": "",
  "deadline": "YYYY-MM-DD or null",
  "status": "Applied | OA Pending | Interview | Offer | Rejected | Unknown"
}

Email sender:
${email.sender}

Email subject:
${email.subject}

Email content:
${email.content}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);

  } catch (error) {
    // Gemini unavailable — using fallback extraction

    const text =
      `${email.subject} ${email.content}`.toLowerCase();

    return {
      company: null,
      role: email.subject,
      deadline: null,
      status: text.includes("interview")
        ? "Interview"
        : text.includes("assessment") ||
          text.includes("oa")
        ? "OA Pending"
        : "Applied",
    };
  }
}