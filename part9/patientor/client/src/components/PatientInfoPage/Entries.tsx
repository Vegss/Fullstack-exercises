import React from 'react'
import { Diagnosis, Patient } from '../../types'
import EntryDetails from './EntryDetails'
import { Box, Stack } from '@mui/material'

const entryStyle = { 
  border: '1px solid black',
  borderRadius: '4px',
  paddingX: '10px',
  backgroundColor: 'rgba(0, 100, 255, 0.25)'
}

const Entries = ({ patient, diagnoses }: { patient: Patient, diagnoses: Diagnosis[] }) => {

  return (
    <Stack
    direction='column'
    justifyContent='center'
    alignItems='left'
    spacing={3}
    >
      { patient.entries &&
          patient.entries.map((entry) => {
            return (
              <Box key={entry.id} sx={entryStyle}>
                <EntryDetails entry={entry} diagnoses={diagnoses} />
              </Box>
            )
          })
        }
    </Stack>
  )
}

export default Entries