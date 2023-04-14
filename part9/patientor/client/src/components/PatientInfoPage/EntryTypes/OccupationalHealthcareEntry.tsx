import React from 'react'
import { Diagnosis, OccupationalHealthcare } from '../../../types'
import { WorkRounded } from '@mui/icons-material'
import BaseEntry from './BaseEntry'
import { Box, Divider } from '@mui/material'

const OccupationalHealthcareEntry = ({ entry, diagnoses }: { entry: OccupationalHealthcare, diagnoses: Diagnosis[] }) => {
  console.log(entry.sickLeave)
  return (
    <div>
      <BaseEntry entry={entry} Icon={WorkRounded} diagnoses={diagnoses} />
      <Box display='flex' flexDirection='column'>
        <span>Employer name: {entry.employerName}</span>
        { entry.sickLeave?.startDate && entry.sickLeave?.endDate &&
          <div>
            <span>
              Sickleave duration: 
              {entry.sickLeave.startDate}-{entry.sickLeave.endDate}
            </span>
          </div>
        }
      </Box>
      <Divider />
      diagnose by {entry.specialist}
    </div>
  )
}

export default OccupationalHealthcareEntry