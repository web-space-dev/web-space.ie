import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == "POST") {
    const { body } = req;

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    const text = `
    New Contact Form Message ${date} ${time}:
    \n name: ${body.name}
    \n email: ${body.email}
    \n subject: ${body.subject || ""}
    \n number: ${body.number}
    \n message: ${body.message}`;

    try {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      res.status(200).json({ success: true }); // Return the data from the response
    } catch (error) {
      console.error("Error sending message to Slack:", error);
      res.status(500).json({ success: false, error: error.message }); // Return the error message
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
