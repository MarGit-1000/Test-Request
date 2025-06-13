export default async function handler(req, res) {
  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  // Hardcode API key langsung di URL
  const apiKey = "AIzaSyBQ9BJULO0jesdq8-lQMIOPhtP5XBZ-_lo";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [prompt] }],
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini Response:", JSON.stringify(data, null, 2));

    if (!data.candidates || data.candidates.length === 0) {
      return res.status(200).json({ reply: "Error: No reply candidates found." });
    }

    const reply = data.candidates[0].content.parts[0] || "Error: No reply text.";
    res.status(200).json({ reply });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to contact Gemini API" });
  }
}
