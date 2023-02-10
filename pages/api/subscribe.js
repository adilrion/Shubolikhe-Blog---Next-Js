// pages/api/subscribe.js

export default async (req, res) => {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzaK6QGb64aW5YUrs9SdR7y5QSlHIA-d_Yie1hDXhc3ruL5sgBNS8wJTXrMuX1EBcGKUw/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: req.body.email }),
      }
    );
    const data = await response.json();

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};
