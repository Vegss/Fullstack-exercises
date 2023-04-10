import React, { ReactElement, useEffect, useState } from 'react'
import { Diagnosis, Patient } from '../../types';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { FemaleRounded, MaleRounded, Transgender } from '@mui/icons-material';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses'


const getGenderIcon = (gender: string): ReactElement | null => {
  switch (gender) {
    case 'male':
      return <MaleRounded />
    case 'female':
      return <FemaleRounded /> 
    case 'other':
      return <Transgender />
    default:
      return null
  }
}

const isPatient = (patient: Patient): patient is Patient => {
  if (patient.id && patient.name && patient.gender && patient.dateOfBirth && patient.ssn && patient.entries) {
    return true
  }
  return false
}

const PatientInfoPage = () => {
  const [patient, setPatient] = useState<Patient>()
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>()
  const { id } = useParams();

  useEffect(() => {
    const getPatient = async (id: string) => {
      const responsePatient = await patientService.getPatientById(id)
      if (isPatient(responsePatient)) setPatient(responsePatient)
    }
    const getDiagnoses = async (id: string) => {
      const responseDiagnoses = await diagnosisService.getAll()
      setDiagnoses(responseDiagnoses)
    }
    if (id) {
      getPatient(id)
      getDiagnoses(id)
    }

  }, [id])

  const findDiagnosis = (code: string): string => {
    const diagnosis = diagnoses?.find(diagnosis => diagnosis.code === code)
    if (!diagnosis) return ''
    return diagnosis.name
  }
  
  if (!patient) return null
  
  const genderIcon = getGenderIcon(patient.gender);

  return (
    <Container style={{ marginTop: '2vh' }}>
      <Typography variant='h5' marginBottom='4vh'>
        {patient.name} {genderIcon}
      </Typography>
      <Typography variant='body1' marginBottom='4vh'>
        ssn: {patient.ssn} <br/>
        occupation: {patient.occupation}
      </Typography>
      <Typography variant='h6' marginBottom='2vh'>
        Entries
      </Typography>
      <Typography component={'span'} variant='body1'>
        { patient.entries &&
          patient.entries.map((entry) => {
            return (
              <div key={entry.id}>
                {entry.date} <i>{entry.description}</i>
                <div>
                  <ul>
                    { entry.diagnosisCodes && diagnoses &&
                      entry.diagnosisCodes.map((code) => {
                        return <li key={code}>{code} {findDiagnosis(code)}</li>
                      })
                    }
                  </ul>
                </div>
              </div>
            )
          })
        }
      </Typography>
    </Container>
  )
}

export default PatientInfoPage