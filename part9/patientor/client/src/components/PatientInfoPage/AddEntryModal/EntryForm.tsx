import React from 'react'
import HospitalEntryForm from './EntryFormTypes/HospitalEntryForm'
import OccupationalHealthcareForm from './EntryFormTypes/OccupationalHealthcareForm'
import HealthCheckEntryForm from './EntryFormTypes/HealthCheckEntryForm'

const EntryForm = ({ type }: { type: string }) => {

  switch (type) {
    case 'Hospital':
      return <HospitalEntryForm />
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareForm />
    case 'HealthCheck':
      return <HealthCheckEntryForm />
    default:
      return <div>Type not known</div>
  }
}

export default EntryForm