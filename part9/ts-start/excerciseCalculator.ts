export interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: rating
  ratingDescription: string;
}

type rating = 1 | 2 | 3;

export const calculateExcercises = (hours: number[], target: number): Result => {
  if (isNaN(Number(target))) throw new Error('Target must be a number.');
  const periodLength = hours.length;
  const trainingDays = hours.filter((day) =>  day > 0).length;
  const average = hours.reduce((s, cur) => s + cur, 0) / periodLength;
  if (isNaN(average)) throw new Error('Daily hours must be numbers.');

  let rating: rating;
  if (average > 2) rating = 3;
  else if (average > 1) rating = 2;
  else rating = 1;

  let ratingDescription = '';
  if (rating === 1) ratingDescription = "You should excercise more!";
  if (rating === 2) ratingDescription = "Not too bad but could be better";
  if (rating === 3) ratingDescription = "Great! Keep excercising like this!";

  const result:Result = { 
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: rating > target ? true : false,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };

  return result;
};

interface Input {
  dailyHours: number[];
  target: number;
}

export const parseArgs = (args: string[]): Input => {
  if (args.length < 3) throw new Error('Not enough arguments');
  const target = parseInt(args[2]);
  const dailyHours = args.splice(3, args.length-3).map(hours => Number(hours));

  const input: Input = {
    dailyHours: dailyHours,
    target: target
  };

  return input;
};

// const args = process.argv;

// const input = parseArgs(args);

// console.log(calculateExcercises(input.dailyHours, input.target));