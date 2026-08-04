export function summarizeEmail(
  subject: string,
  body: string
) {
  const text = `${subject} ${body}`.toLowerCase();

  let summary = "Career related email detected.";
  let actionRequired = "Review this email.";
  let priority = "Medium";

  if (text.includes("interview")) {
    summary =
      "You have received an interview related email.";
    actionRequired =
      "Prepare for the interview and check the schedule.";
    priority = "High";
  } else if (
    text.includes("assessment") ||
    text.includes("hackerrank") ||
    text.includes("codility")
  ) {
    summary =
      "An online assessment has been shared with you.";
    actionRequired =
      "Complete the assessment before the deadline.";
    priority = "High";
  } else if (text.includes("offer")) {
    summary =
      "You may have received an offer related email.";
    actionRequired =
      "Review the offer details and respond if required.";
    priority = "High";
  } else if (
    text.includes("application received") ||
    text.includes("thanks for applying")
  ) {
    summary =
      "Your application has been acknowledged.";
    actionRequired =
      "No immediate action is required.";
    priority = "Low";
  }

  return {
    summary,
    actionRequired,
    priority,
  };
}