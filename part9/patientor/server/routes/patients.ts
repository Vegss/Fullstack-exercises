import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getEntries();
  res.send(patients);
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


export default router;