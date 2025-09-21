// api/newsletter.js
export default async function handler(req, res) {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        console.log("Incoming body:", req.body);

        const requestBody = {
            email_address: req.body.email_address,
            status: "subscribed",
            merge_fields: {
                FNAME: req.body.name || "",
                MMERGE2: Number(req.body.phone) || 0, 
                MMERGE3: req.body.message || "",
            },
            interests: {
                ...req.body.interested_in,
                ...req.body.apply
            }
        };

        // First attempt with POST
        let response = await fetch(
            `https://${process.env.DATACENTER}.api.mailchimp.com/3.0/lists/${process.env.LIST_ID}/members`,
            {
                method: "POST",
                headers: {
                    Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            }
        );

        let data = await response.json();
        console.log("Mailchimp newsletter response:", data);

        // Check if member already exists
        if (!response.ok && data.title === 'Member Exists') {
            console.log("Member exists, retrying with PUT...");
            
            // Retry with PUT request using email as the subscriber hash
            const subscriberHash = req.body.email_address.toLowerCase();
            
            response = await fetch(
                `https://${process.env.DATACENTER}.api.mailchimp.com/3.0/lists/${process.env.LIST_ID}/members/${subscriberHash}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            data = await response.json();
            console.log("Mailchimp PUT response:", data);
        }

        if (!response.ok) {
            return res.status(response.status).json({ error: data.detail });
        }

        res.json({ success: true });
    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ error: err.message });
    }
}