import { Autocomplete, Button, Stack, TextField } from '@mui/material'
import diagnosisService from '../../../../services/diagnoses'
import React, { useEffect, useState } from 'react'
import { Diagnosis } from '../../../../types'
import { useParams } from 'react-router-dom'
import patientService from '../../../../services/patients'

const HealthCheckEntry = () => {
  const [ratingValue, setRatingValue] = useState<string>()
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>()
  const [diagnoseCodes, setDiagnoseCodes] = useState<Diagnosis[]>()
  const [description, setDescription] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [specialist, setSpecialist] = useState<string>('')

  const ratingOptions = ['Healthy', 'LowRisk', 'HighRisk', 'CriticalRisk']
  const patientId = useParams().id

  const createEntry = async (e: React.SyntheticEvent) => {
    const newEntry = {
      date: date,
      description: description,
      specialist: specialist,
      diagnosisCodes: diagnoseCodes ? diagnoseCodes.map(d => d.code) : null,
      healthCheckRating: ratingValue,
      type: 'HealthCheck'
    }
    if (patientId) {
      await patientService.createEntry(patientId, newEntry)
    }
  }

  useEffect(() => {
    const getDiagnoses = async () => {
      const fetchedDiagnoses: Diagnosis[] = await diagnosisService.getAll()
      setDiagnoses(fetchedDiagnoses)
    }
    getDiagnoses()
  }, [])

  if (!diagnoses) return <div>loading...</div>

  return (
    <form onSubmit={createEntry}>
      <Stack spacing={2}>
        <TextField
          required
          label='Description'
          variant='standard'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />
        <TextField
          required
          type='date'
          label='Date'
          variant='standard'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          required
          label='Specialist'
          variant='standard'
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
          fullWidth
        />
        <Autocomplete
          aria-required
          defaultValue=''
          isOptionEqualToValue={(option, value) => option === value}
          onChange={(e, newValue) => newValue ? setRatingValue(newValue) : ''}
          options={ratingOptions}
          renderInput={(params) => <TextField {...params} label='HealthCheckRating' variant='standard' required />}
        />
        { diagnoses &&
          <Autocomplete
            aria-required
            multiple
            disableCloseOnSelect
            defaultValue={[]}
            options={diagnoses}
            onChange={(e, newCodes) => setDiagnoseCodes(newCodes) }
            getOptionLabel={option => option.code}
            isOptionEqualToValue={(option, value) => option.code === value.code}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                {option.code}
              </li>
            )}
            renderInput={(params) => {
              return (
              <TextField {...params} label="Diagnosis Codes" placeholder="Search For Code" variant='standard' />
            )}}
          />
        }
      </Stack>
      <Button type='submit' variant='contained' sx={{ marginTop: '2vh' }}>Submit</Button>
    </form>
  )
}

export default HealthCheckEntry