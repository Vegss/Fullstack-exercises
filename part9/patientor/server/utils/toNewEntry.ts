import { Diagnosis, Discharge, HealthCheckEntry, HealthCheckEntryWithoutId, HealthCheckRating, HospitalEntry, HospitalEntryWithoutId, OccupationalEntryWithoutId, OccupationalHealthcare, SickLeave } from '../types';
import { isDischarge, isHealthRating, isSickleave, isString } from './typeGuards';
import { v1 as uuid } from 'uuid';

const parseId = (id: unknown): string => {
  if (id && isString(id)) return id;
  throw new Error('Invalid id: ' + id);
};

const parseDescription = (description: unknown): string => {
  if (description && isString(description)) return description;
  throw new Error('Invalid description: ' + description);
};

const parseDate = (date: unknown): string => {
  if (date && isString(date)) return date;
  throw new Error('Invalid date: ' + date);
};

const parseSpecialist = (specialist: unknown): string => {
  if (specialist && isString(specialist)) return specialist;
  throw new Error('Invalid specialist: ' + specialist);
};

const parseDiagnosisCodes = (diagnosis: unknown): Array<Diagnosis['code']> => {
  if (!diagnosis || typeof diagnosis !== 'object' || !('diagnosisCodes' in diagnosis)) return [] as Array<Diagnosis['code']>;
  return diagnosis.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (discharge && isDischarge(discharge)) return discharge;
  throw new Error('Invalid discharge: ' + discharge);
};

const parseEmployerName = (employerName: unknown): string => {
  if (employerName && isString(employerName)) return employerName;
  throw new Error('Invalid employerName: ' + employerName);
};

const parseSickLeave = (sickleave: unknown): SickLeave => {
  if (sickleave && isSickleave(sickleave)) return sickleave;
  return {} as SickLeave;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (rating && isHealthRating(rating)) {
    switch (String(rating)) {
      case 'CriticalRisk':
        return HealthCheckRating.CriticalRisk;
      case 'Healthy':
        return HealthCheckRating.Healthy;
      case 'HighRisk':
        return HealthCheckRating.HighRisk;
      case 'LowRisk':
        return HealthCheckRating.LowRisk;
    }
  }
  throw new Error('Invalid healthCheckRating: ' + rating);
};

export const toHospitalEntry = (entry: HospitalEntryWithoutId): HospitalEntry => {
  const id: string = uuid();
  return {
    id: parseId(id),
    description: parseDescription(entry.description),
    date: parseDate(entry.date),
    specialist: parseSpecialist(entry.specialist),
    diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
    discharge: parseDischarge(entry.discharge),
    type: 'Hospital'
  };
};

export const toOccupationalEntry = (entry: OccupationalEntryWithoutId): OccupationalHealthcare => {
  const id: string = uuid();
  return {
    id: parseId(id),
    description: parseDescription(entry.description),
    date: parseDate(entry.date),
    specialist: parseSpecialist(entry.specialist),
    diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
    employerName: parseEmployerName(entry.employerName),
    sickLeave: parseSickLeave(entry.sickLeave),
    type: 'OccupationalHealthcare'
  };
};

export const toHealthCheckEntry = (entry: HealthCheckEntryWithoutId): HealthCheckEntry => {
  const id: string = uuid();
  return {
    id: parseId(id),
    description: parseDescription(entry.description),
    date: parseDate(entry.date),
    specialist: parseSpecialist(entry.specialist),
    diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
    healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
    type: 'HealthCheck'
  };
};