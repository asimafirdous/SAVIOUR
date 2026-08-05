import { GoogleGenerativeAI } from "@google/generative-ai";
import * as chrono from "chrono-node";


const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);


export type AIResult = {
  isCareerRelated: boolean;

  category:
  | "internship"
  | "job"
  | "interview"
  | "assessment"
  | "hackathon"
  | "scholarship"
  | "webinar"
  | "meeting"
  | "certification"
  | "other";

  importance:
  | "high"
  | "medium"
  | "low";

  title: string | null;

  company: string | null;

  role: string | null;

  status:
  | "Applied"
  | "OA Pending"
  | "Interview"
  | "Rejected"
  | "Offer"
  | "Unknown";

  actionRequired: string | null;

  deadlineText: string | null;

  meetingText: string | null;

  summary: string;
};


export function extractDate(
  text?: string | null
): Date | null {

  if (!text) return null;

  const parsed = chrono.parse(text);

  return parsed[0]?.start?.date() ?? null;
}


export async function analyzeEmail(
  subject: string,
  sender: string,
  body: string
): Promise<AIResult> {


  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });


  const prompt = `
You are SAVIOUR AI, a career intelligence assistant.

Analyze this email.

Return ONLY JSON.

Rules:

Detect:
- internships
- jobs
- interviews
- coding assessments
- hackathons
- scholarships
- webinars
- certification events
- placement drives
- career related meetings

Ignore:
- marketing emails
- newsletters
- promotions
- generic learning emails

Determine:

category:
internship/job/interview/assessment/hackathon/scholarship/webinar/meeting/certification/other

importance:
high:
- deadline within 7 days
- interview
- assessment
- urgent action

medium:
- future opportunity

low:
- informational

Extract:

title:
Opportunity name

company:
Organization name

role:
Job role if available

status:
Applied
OA Pending
Interview
Rejected
Offer
Unknown

deadlineText:
Exact deadline phrase

meetingText:
Meeting date/time if available

actionRequired:
What user needs to do

summary:
Maximum 40 words

Email:

Subject:
${subject}

Sender:
${sender}

Body:
${body.slice(0, 4000)}
`;

  const result =
    await model.generateContent(prompt);


  const text =
    result.response.text()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();


  return JSON.parse(text) as AIResult;
}