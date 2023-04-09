import { Gender, NewPatient } from "./types";

const throwError = (field: string) => {
  throw new Error(`Incorrect or missing ${field}`);
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: unknown): date is Date => {
  return Boolean(Date.parse(date as string));
};

const isGender = (gender: unknown): gender is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(gender as string);
};

const isSSN = (ssn: string): boolean => {
  return ssn.length === 10 && /\d\d\d\d\d\d/.test(ssn);
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
    occupation: parseOccupation(patientBody.occupation)
  };
  return newPatient;
};

export default toNewPatient;