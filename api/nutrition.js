import axios from 'axios'

export default async function handler(req, res) {
    const food = req.query.query;

    if (!food) {
        return res.status(400).json({ error: "Missing query parameter" });
    }

    try {
        const apiRes = await axios.get(`https://api.api-ninjas.com/v1/nutrition?query=${food}`, {
            headers: {
                'X-Api-Key': process.env.NINJAS_API_KEY
            }
        });

        res.status(200).json(apiRes.data);
    } catch (error) {
        console.error("API call failed:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}