import React from 'react'
import { Diagnosis, HospitalEntry as HospitalEntryType } from '../../../types'
import { MonitorHeartRounded } from '@mui/icons-material'
import BaseEntry from './BaseEntry'
import { Box, Divider } from '@mui/material'

const HospitalEntry = ({ entry, diagnoses }: { entry: HospitalEntryType, diagnoses: Diagnosis[] }) => {
  return (
    <div>
      <BaseEntry entry={entry} Icon={MonitorHeartRounded} diagnoses={diagnoses} />
      <Box display='flex' flexDirection='column'>
        <span>
          Discharge {entry.discharge.date}: {entry.discharge.criteria}
        </span>
      </Box>
      <Divider />
      diagnose by {entry.specialist}
    </div>
  )
}

export default HospitalEntry