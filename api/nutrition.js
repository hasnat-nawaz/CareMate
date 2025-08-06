export default async function handler(req, res) {
    const { query } = req.query; // food query from frontend

    if (!query) {
        return res.status(400).json({ error: "Missing query parameter" });
    }

    try {
        const apiRes = await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${query}`, {
            headers: {
                'X-Api-Key': process.env.NINJA_API_KEY
            }
        });

        if (!apiRes.ok) {
            return res.status(apiRes.status).json({ error: "Failed to fetch data from API-Ninjas" });
        }

        const data = await apiRes.json();
        res.status(200).json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
