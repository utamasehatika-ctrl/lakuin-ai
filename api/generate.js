import Replicate from "replicate";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: "No image provided" });
  }

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  try {
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7d52b84c7e6c5a5c9bcd8d2b7c4a9",
      {
        input: {
          image,
          prompt: "professional product photo, clean background, studio lighting, ecommerce style",
        },
      }
    );

    res.status(200).json({ result: output[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
