import { Discharge, Gender, HealthCheckRating, SickLeave } from "../types";


export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isDate = (date: unknown): date is Date => {
  return Boolean(Date.parse(date as string));
};

export const isGender = (gender: unknown): gender is Gender => {
  return isString(gender) && Object.values(Gender).map(v => v.toString()).includes(gender);
};

export const isSSN = (ssn: string): boolean => {
  return ssn.length === 10 && /\d\d\d\d\d\d/.test(ssn);
};

export const isDischarge = (discharge: unknown): discharge is Discharge => {
  if (!discharge) return false;
  return typeof discharge === 'object' && 'date' in discharge && 'criteria' in discharge;
};

export const isSickleave = (sickleave: unknown): sickleave is SickLeave => {
  if (!sickleave) return false;
  if (!(typeof sickleave === 'object')) return false;
  return 'startDate' in sickleave && 'endDate' in sickleave && isString(sickleave.startDate) && isString(sickleave.endDate);
};

export const isHealthRating = (rating: unknown): rating is HealthCheckRating => {
  if (!rating) return false;
  return isString(rating) && Object.keys(HealthCheckRating).map(v => v.toString()).includes(rating);

};