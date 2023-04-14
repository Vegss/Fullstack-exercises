export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  type: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcare extends BaseEntry {
  type: 'OccupationalHealthcare'
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  }
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
export type Entry = OccupationalHealthcare | HospitalEntry | HealthCheckEntry;

export type HospitalEntryWithoutId = Omit<HospitalEntry, "id">;
export type OccupationalEntryWithoutId = Omit<OccupationalHealthcare, "id">;
export type HealthCheckEntryWithoutId = Omit<HealthCheckEntry, "id">;