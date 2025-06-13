export default async function handler(req, res) {
  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  const apiKey = process.env.API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not set" });

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Error: No reply.";
    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to contact Gemini API" });
  }
}
