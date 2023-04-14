import axios, { isAxiosError } from "axios";
import { Entry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getPatientById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
}

const createEntry = async (id: string, newEntry: Object) => {
  try {
    console.log(newEntry)
    const response = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, newEntry);
    console.log(response.data);
    return response.data
  } catch (e) {
    if (isAxiosError(e))
      console.log(e.response?.data)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, getPatientById, createEntry
};

