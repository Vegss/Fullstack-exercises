import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExcercises } from './excerciseCalculator';


const app = express();

app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('hello');
});

interface bmiResult {
  weight: number;
  height: number;
  bmi: string;
}

app.get('/bmi', (req, res) => {
  const weight = Number(req.query['weight']);
  const height = Number(req.query['height']);

  if (isNaN(weight) || isNaN(height)) res.send({ error: 'malformatted parameters' }).end();

  const bmi = calculateBmi(height, weight);
  const result: bmiResult = {
    weight: weight,
    height: height,
    bmi: bmi
  };
  res.send(result);
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) res.send({ error: 'parameters missing' }).end();
  try {
    const calculation = calculateExcercises(daily_exercises as number[], target as number);
    res.json(calculation);
  } catch (err) {
    const error = err as Error;
    res.send({ error: error.message }).end();
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});