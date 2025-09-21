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
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Valid email is required" });
    }

    // First attempt: Try to add new subscriber
    let response = await fetch(
      `https://${process.env.DATACENTER}.api.mailchimp.com/3.0/lists/${process.env.LIST_ID}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
          tags: ["newsletter"],
        }),
      }
    );

    let data = await response.json();
    console.log("Mailchimp newsletter response:", data);

    if (response.ok) {
      return res.json({
        success: true,
        message: "Successfully subscribed to newsletter!",
      });
    }

    // If member exists, check their tags and update if needed
    if (data.title === "Member Exists") {
      console.log("Member exists, checking tags...");
      
      // Get member info to check existing tags
      const memberHash = email.toLowerCase();
      const memberResponse = await fetch(
        `https://${process.env.DATACENTER}.api.mailchimp.com/3.0/lists/${process.env.LIST_ID}/members/${memberHash}`,
        {
          method: "GET",
          headers: {
            Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (memberResponse.ok) {
        const memberData = await memberResponse.json();
        const existingTags = memberData.tags || [];
        const hasNewsletterTag = existingTags.some(tag => tag.name === "newsletter");

        if (hasNewsletterTag) {
          // Member already has newsletter tag
          return res.status(200).json({
            success: true,
            message: "You're already subscribed to our newsletter!",
          });
        } else {
          // Member exists but doesn't have newsletter tag - add it
          console.log("Adding newsletter tag to existing member...");
          
          const tagResponse = await fetch(
            `https://${process.env.DATACENTER}.api.mailchimp.com/3.0/lists/${process.env.LIST_ID}/members/${memberHash}/tags`,
            {
              method: "POST",
              headers: {
                Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                tags: [
                  {
                    name: "newsletter",
                    status: "active"
                  }
                ]
              }),
            }
          );

          if (tagResponse.ok) {
            return res.json({
              success: true,
              message: "Successfully subscribed to newsletter!",
            });
          } else {
            const tagError = await tagResponse.json();
            console.error("Failed to add newsletter tag:", tagError);
            return res.status(500).json({
              error: "Failed to update subscription. Please try again later.",
            });
          }
        }
      } else {
        console.error("Failed to get member info:", await memberResponse.json());
        return res.status(500).json({
          error: "Failed to check subscription status. Please try again later.",
        });
      }
    }

    // Handle other errors
    return res.status(response.status).json({
      error: data.detail || "Failed to subscribe to newsletter",
    });

  } catch (err) {
    console.error("Newsletter signup error:", err);
    return res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
}