import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
   
dotenv.config({path: ".env.local"});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mailchimp newsletter endpoint
app.post('/api/newsletter', async (req, res) => {
    try {
        console.log("Incoming body:", req.body);
        console.log("Environment check:", {
            datacenter: process.env.DATACENTER,
            listId: process.env.LIST_ID,
            hasApiKey: !!process.env.MAILCHIMP_API_KEY
        });
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
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`Newsletter endpoint: http://localhost:${PORT}/api/newsletter`);
});

export default app;
