import React, { ReactElement, useEffect, useState } from 'react'
import { Diagnosis, Patient } from '../../types';
import { useParams } from 'react-router-dom';
import { Box, Button, ButtonGroup, Container, Typography } from '@mui/material';
import { FemaleRounded, MaleRounded, Transgender } from '@mui/icons-material';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses'
import Entries from './Entries';
import AddEntryModal from './AddEntryModal';


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
  const [formOpen, setFormOpen] = useState(false)
  const [type, setType] = useState('')
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

  const handleClose = () => setFormOpen(false)

  const handleHospitalOpen = () => {
    setFormOpen(true)
    setType('Hospital')
  }

  const handleOccupationalOpen = () => {
    setFormOpen(true)
    setType('OccupationalHealthcare')
  }

  const handleHealthCheck = () => {
    setFormOpen(true)
    setType('HealthCheck')
  }
  
  if (!patient || !diagnoses) return <div>loading patient and diagnoses data...</div>
  
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
        <Entries patient={patient} diagnoses={diagnoses} />
      </Typography>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <ButtonGroup variant='outlined'>
          <Button onClick={handleHospitalOpen} sx={{ marginTop: "2vh" }}>create Hospital entry</Button>
          <Button onClick={handleOccupationalOpen} sx={{ marginTop: "2vh" }}>create OccupationalHealth entry</Button>
          <Button onClick={handleHealthCheck} sx={{ marginTop: "2vh" }}>create HealthCheck entry</Button>
        </ButtonGroup>
      </Box>
      <AddEntryModal formOpen={formOpen} handleClose={handleClose} type={type} />
    </Container>
  )
}

export default PatientInfoPage