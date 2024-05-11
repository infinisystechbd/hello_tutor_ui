export default async function handler(req, res) {
    const response = await fetch(
        `${process.env.NEXT_API_URL}${req.body.endpoint}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: `Bearer ${JSON.parse(req.body.access_token)}`,
            },
            withCredentials: true,
        },
    )
    const resData = await response.json()
    res.status(200).json(resData)
}
