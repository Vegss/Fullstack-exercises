import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils/toNewPatient';
import { EntryWithoutId } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getEntries();
  res.send(patients);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatientById(id);
  res.json(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const createdPatient = patientService.createPatient(newPatient);
    res.json(createdPatient);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send({ error: err.message }).end();
    }
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = req.body as EntryWithoutId; // body validity is checked later 
    const createdEntry = patientService.createEntry(id, newEntry);
    res.json(createdEntry);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send({ error: err.message }).end();
    }
  }
});

export default router;