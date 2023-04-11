import React from 'react'
import { Diagnosis, Entry } from '../../../types'
import { MonitorHeartRounded } from '@mui/icons-material'
import BaseEntry from './BaseEntry'
import { Divider } from '@mui/material'

const HospitalEntry = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
  return (
    <div>
      <BaseEntry entry={entry} Icon={MonitorHeartRounded} diagnoses={diagnoses} />
      <Divider />
      diagnose by {entry.specialist}
    </div>
  )
}

export default HospitalEntry