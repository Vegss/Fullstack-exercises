import patientData from "../data/patients";
import { v1 as uuid } from 'uuid';
import { Patient, NonSensitivePatient, NewPatient, Entry } from "../types";

const entries: Patient[] = patientData;

const getEntries = (): NonSensitivePatient[] => {
  const nonSensitiveEntries = entries.map((entry: NonSensitivePatient) => {
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

const createPatient = (patient: NewPatient): NonSensitivePatient => {
  const id: string = uuid();

  const newPatient: Patient = { ...patient, entries: [], id: id };
  entries.push(newPatient);
  return {
    id: newPatient.id,
    name: newPatient.name,
    dateOfBirth: newPatient.dateOfBirth,
    gender: newPatient.gender,
    occupation: newPatient.occupation
  };
};

const correctType = (entries: Entry[]): boolean => {
  entries.forEach(entry => {
    switch (entry.type) {
      case 'Hospital':
        return true;
      case 'OccupationalHealth':
        return true;
      case 'HealthCheck':
        return true;
      default:
        return false;
    }
  });
  return true;
};

const getPatientById = (id: string): Patient => {
  const patient = entries.find(entry => entry.id === id);
  if (!patient) throw new Error(`Patient ${id} not found`);
  if (!correctType(patient.entries)) throw new Error(`Patients entry has wrong type`);
  return {
    id: patient.id,
    name: patient.name,
    ssn: patient.ssn,
    dateOfBirth: patient.dateOfBirth,
    entries: patient.entries,
    gender: patient.gender,
    occupation: patient.occupation
  };
};

export default {
  getEntries,
  createPatient,
  getPatientById
};