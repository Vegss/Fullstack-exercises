import { Gender, NewPatient } from "../types";
import { isDate, isGender, isSSN, isString } from "./typeGuards";

const throwError = (field: string) => {
  throw new Error(`Incorrect or missing ${field}`);
};

const parseName = (name: unknown): string => {
  if (name && isString(name)) return name;
  throwError('name');
  return '';
};

const parseDate = (date: unknown): string => {
  if (date && isString(date) && isDate(date)) return date;
  throwError('date');
  return '';
};

const parseSsn = (ssn: unknown): string => {
  if (ssn && isString(ssn) && isSSN(ssn)) return ssn;
  throwError('ssn');
  return '';
};

const parseGender = (gender: unknown): Gender | string => {
  if (gender && isString(gender) && isGender(gender)) return gender;
  throwError('gender');
  return '';
};

const parseOccupation = (occupation: unknown): string => {
  if (occupation && isString(occupation)) return occupation;
  throwError('occupation');
  return '';
};

const toNewPatient = (body: unknown): NewPatient => {
  const patientBody = body as NewPatient;
  const newPatient: NewPatient = {
    name: parseName(patientBody.name),
    dateOfBirth: parseDate(patientBody.dateOfBirth),
    ssn: parseSsn(patientBody.ssn),
    gender: parseGender(patientBody.gender),
    occupation: parseOccupation(patientBody.occupation),
    entries: []
  };
  return newPatient;
};

export default toNewPatient;