import patientData from "../data/patients";
import { v1 as uuid } from 'uuid';
import { Patient, NonSensitivePatient, NewPatient, Entry, EntryWithoutId } from "../types";
import { toHealthCheckEntry, toHospitalEntry, toOccupationalEntry } from "../utils/toNewEntry";

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
      case 'OccupationalHealthcare':
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

const assertNever = (obj: never): never => {
  throw new Error('Invalid discriminator: ' + JSON.stringify(obj));
};

const createEntry = (patientId: string, newEntry: EntryWithoutId): Entry => {
  const patient = patientData.find(patient => patient.id === patientId);
  let createdEntry: Entry;
  if (!patient) throw new Error('Patient not found');
  switch (newEntry.type) {
    case 'Hospital':
      createdEntry = toHospitalEntry(newEntry);
      patient.entries.push(createdEntry);
      return createdEntry;
    case 'OccupationalHealthcare':
      createdEntry = toOccupationalEntry(newEntry);
      patient.entries.push(createdEntry);
      return createdEntry;
    case 'HealthCheck':
      createdEntry = toHealthCheckEntry(newEntry);
      patient.entries.push(createdEntry);
      return createdEntry;
    default:
      assertNever(newEntry);
  }
  throw new Error('Failed to create entry: ' + newEntry);
};

export default {
  getEntries,
  createEntry,
  createPatient,
  getPatientById
};