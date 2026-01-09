import Replicate from "replicate";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { gender, location } = req.body;

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run(
      "stability-ai/sdxl",
      {
        input: {
          prompt: `seorang ${gender} berada di ${location}, foto realistis, pencahayaan profesional, kualitas tinggi`,
          width: 768,
          height: 768,
        },
      }
    );

    res.status(200).json({ image: output[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
