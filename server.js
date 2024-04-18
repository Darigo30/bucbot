const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const OpenAI = require("openai")
require('dotenv').config()


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// app.post('/embedding', async (req, res) => {
//   try {
//     const text = req.body.text;
//     const embedding = await openai.embeddings.create({
//       model: "text-embedding-3-small",
//       input: text,
//       encoding_format: "float",
//     });
//     res.json(embedding.data[0].embeddings);
//   } catch (error) {
//     console.error("Error al procesar la solicitud:", error);
//     res.status(500).json({ error: "Ocurrió un error al procesar la solicitud" });
//   }
// });


// chat GPT-3
app.post('/completion', async (req, res) => {
  const text = req.body.text;

  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": text},
      ],
    model: "gpt-3.5-turbo",
  });
  console.log(completion.choices[0]);
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))