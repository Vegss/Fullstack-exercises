import React from 'react'
import { Diagnosis, Entry } from '../../../types'
import { WorkRounded } from '@mui/icons-material'
import BaseEntry from './BaseEntry'
import { Divider } from '@mui/material'

const OccupationalHealthcareEntry = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
  return (
    <div>
      <BaseEntry entry={entry} Icon={WorkRounded} diagnoses={diagnoses} />
      <Divider />
      diagnose by {entry.specialist}
    </div>
  )
}

export default OccupationalHealthcareEntry