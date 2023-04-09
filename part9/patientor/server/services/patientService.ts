import patientData from "../data/patients";
import { v1 as uuid } from 'uuid';
import { Patient, CensoredPatient, NewPatient } from "../types";

const entries: Patient[] = patientData;

const getEntries = (): CensoredPatient[] => {
  const nonSensitiveEntries = entries.map((entry: CensoredPatient) => {
    return {
      id: entry.id,
      name: entry.name,
      dateOfBirth: entry.dateOfBirth,
      gender: entry.gender,
      occupation: entry.occupation
    };
  });

  return nonSensitiveEntries;
};

const createPatient = (patient: NewPatient): CensoredPatient => {
  const id: string = uuid();

  const newPatient: Patient = { ...patient, id: id };
  entries.push(newPatient);
  return {
    id: newPatient.id,
    name: newPatient.name,
    dateOfBirth: newPatient.dateOfBirth,
    gender: newPatient.gender,
    occupation: newPatient.occupation
  };
};

export default {
  getEntries,
  createPatient
};