import { Diagnosis, Entry } from '../../types'
import { assertNever } from '../../utils'
import HealthCheckEntry from './EntryTypes/HealthCheckEntry'
import HospitalEntry from './EntryTypes/HospitalEntry'
import OccupationalHealthcareEntry from './EntryTypes/OccupationalHealthcareEntry'

const EntryDetails = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />
    default:
      return assertNever(entry)
  }
}

export default EntryDetails