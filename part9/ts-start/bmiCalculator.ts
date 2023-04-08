export const calculateBmi = (height: number, weight: number): string => {
  const height_in_meters = height / 100;
  const BMI:number = weight / (height_in_meters*height_in_meters);
  if (BMI < 16) return 'Underweight (Severe thinness)';
  if (BMI < 16.9) return 'Underweight (Moderate thinness)';
  if (BMI < 18.4) return 'Underweight (Mild thinness)';
  if (BMI < 24.9) return 'Normal (Healthy weight)';
  if (BMI < 29.9) return 'Overweight (Pre-obese)';
  if (BMI < 34.9) return 'Obese (Class I)';
  if (BMI < 39.9) return 'Obese (Class II)';
  if (BMI >= 40) return 'Obese (Class III)';
  return '';
};

interface Input {
  height: number;
  weight: number;
}

export const parseArgs = (args: string[]): Input => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  const height = parseInt(args[2]);
  const weight = parseInt(args[3]);

  const input: Input = {
    height: height,
    weight: weight
  };

  return input;
};

// const args = process.argv

// const { weight, height } = parseArgs(args)

// console.log(calculateBmi(height, weight))