import axios from 'axios';

export default async function handler(req, res) {
    const food = req.query.query;

    if (!food) {
        return res.status(400).json({ error: "Missing query parameter" });
    }

    try {
        const encodedFood = encodeURIComponent(food);

        const apiRes = await axios.get(`https://api.api-ninjas.com/v1/nutrition?query=${encodedFood}`, {
            headers: {
                'X-Api-Key': process.env.NINJAS_API_KEY
            }
        });

        res.status(200).json(apiRes.data);
    } catch (error) {
        console.error("API call failed:", error);
        if (error.response) {
            console.error("API response error:", error.response.status, error.response.data);
            return res.status(error.response.status).json({
                error: "External API error",
                details: error.response.data
            });
        } else if (error.request) {
            console.error("No response received:", error.request);
            return res.status(503).json({ error: "External API unavailable" });
        } else {
            console.error("Request setup error:", error.message);
            return res.status(500).json({ error: "Internal server error", details: error.message });
        }
    }
}