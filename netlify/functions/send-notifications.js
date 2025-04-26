const fetch = require("node-fetch"); // Required for Netlify Functions

exports.handler = async (event) => {
  // Random messages
  const messages = [
    "Hello from Netlify! 🚀",
    "Button clicked! 🎉",
    "Random notification! 📱",
    "This is a test! ✅",
  ];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  try {
    // Send to Pushover API
    const response = await fetch("https://api.pushover.net/1/messages.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: process.env.PUSHOVER_TOKEN,
        user: process.env.PUSHOVER_USER,
        message: randomMessage,
      }),
    });

    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to send notification" }) };
  }
};