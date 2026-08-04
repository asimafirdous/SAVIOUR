export async function extractOpportunityDetails({
  subject,
  content,
  sender,
}: {
  subject: string;
  content: string;
  sender: string;
}) {
  // Temporary fallback while OpenAI billing is not enabled
  // Uses the email subject as the role and lets route.ts infer status/deadline

  return {
    company: "Unknown",
    role: subject,
    status: "Unknown",
    deadline: null,
  };
}