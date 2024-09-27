require("dotenv").config()

// const PORT = 8000
const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())

const apiKey = process.env.API_KEY

app.post("/completions", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content:
            "Answer this question as if you were a cat. Include a couple of 'meows' and use some cat emojis in your response while still providing a clear answer:" +
            req.body.message,
        },
      ],
    }),
    max_tokens: 100,
  }
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    )
    const data = await response.json()
    res.status(200).send(data)
  } catch (e) {
    console.error(e)
    res.status(500).send("Server Error")
  }
})

module.exports = app
// app.listen(PORT, () => console.log("Your server is running on port", PORT))
