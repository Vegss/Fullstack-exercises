import { Diagnose } from '../types';
import diagnoseData from '../data/diagnoses';

const diagnoses: Diagnose[] = diagnoseData;

const getEntries = (): Diagnose[] => {
  return diagnoses;
};

export default {
  getEntries
};