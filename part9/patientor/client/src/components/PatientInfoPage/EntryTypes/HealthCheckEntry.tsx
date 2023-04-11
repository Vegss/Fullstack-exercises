import React from 'react'
import { Diagnosis, HealthCheckEntry as HealthCheckEntryType } from '../../../types'
import { Favorite, HealthAndSafety, HeartBroken } from '@mui/icons-material'
import BaseEntry from './BaseEntry'
import { Divider, Stack } from '@mui/material'

const rating = (entry: HealthCheckEntryType) => {
  switch (entry.healthCheckRating) {
    case 0:
      return <Favorite sx={{ color: 'green' }} />
    case 1:
      return <Favorite sx={{ color: 'greenyellow' }} />
    case 2:
      return <Favorite sx={{ color: 'yellow' }} />
    case 3:
      return <HeartBroken sx={{ color: 'red' }} />
    default:
      return null;
  }
}

const HealthCheckEntry = ({ entry, diagnoses }: { entry: HealthCheckEntryType, diagnoses: Diagnosis[] }) => {
  return (
    <div>
      <BaseEntry entry={entry} Icon={HealthAndSafety} diagnoses={diagnoses} />
      <Stack direction='row' gap={2}>
        Health rating { rating(entry) }
      </Stack>
      <Divider />
        diagnose by {entry.specialist}
    </div>
  )
}

export default HealthCheckEntry