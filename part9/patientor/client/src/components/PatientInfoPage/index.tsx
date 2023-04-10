import React, { ReactElement, useEffect, useState } from 'react'
import { Patient } from '../../types';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { FemaleRounded, MaleRounded, Transgender } from '@mui/icons-material';
import patientService from '../../services/patients';


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
  const { id } = useParams();

  useEffect(() => {
    const getPatient = async (id: string) => {
      const responsePatient = await patientService.getPatientById(id)
      if (isPatient(responsePatient)) setPatient(responsePatient)
    }
    if (id) getPatient(id)
  }, [id])
  
  if (!patient) return null
  
  const genderIcon = getGenderIcon(patient.gender);

  return (
    <Container style={{ marginTop: '2vh' }}>
      <Typography variant='h5'>
        {patient.name} {genderIcon}
      </Typography>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </Container>
  )
}

export default PatientInfoPage