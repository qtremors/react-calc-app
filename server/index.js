const express = require('express');
const cors = require('cors');
const { create, all } = require('mathjs');

const math = create(all);
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/calculate', (req, res) => {
  try {
    const { expression } = req.body;
    const result = math.evaluate(expression);
    res.json({ result });
  } catch (error) {
    let errorMessage = 'Invalid expression';
    if (error.message.includes('divide by zero')) {
      errorMessage = 'Division by zero';
    } else if (error.message) {
      errorMessage = error.message;
    }
    res.status(400).json({ error: errorMessage });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});