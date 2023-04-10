import { Diagnosis } from '../types';
import diagnoseData from '../data/diagnoses';

const diagnoses: Diagnosis[] = diagnoseData;

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getEntries
};