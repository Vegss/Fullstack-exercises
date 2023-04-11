import { Container, SvgIcon } from '@mui/material'
import React from 'react'
import { Diagnosis, Entry } from '../../../types'
import { SvgIconComponent } from '@mui/icons-material';

interface BaseEntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
  Icon: SvgIconComponent;
}

const BaseEntry = (props: BaseEntryProps) => {
  const { entry, diagnoses, Icon } = props;

  const findDiagnosis = (code: string): string => {
    const diagnosis = diagnoses?.find(diagnosis => diagnosis.code === code)
    if (!diagnosis) throw new Error('Could not find Diagnosis ' + code)
    return diagnosis.name
  }

  return (
    <Container>
      {entry.date} <SvgIcon component={Icon} /> <br />
      <i>{entry.description}</i> <br />
      <div>
        <ul>
          { entry.diagnosisCodes && 
            entry.diagnosisCodes.map((code) => {
              return  <li key={code}>
                        {code} {findDiagnosis(code)}
                      </li>
            })
          }
        </ul>
      </div>
    </Container>
  )
}

export default BaseEntry