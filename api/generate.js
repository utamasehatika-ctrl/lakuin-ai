export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: "No image provided" });
  }

  // MODE DEMO
  return res.status(200).json({
    result: image,
    mode: "DEMO"
  });
}
