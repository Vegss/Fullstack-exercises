import React from 'react'
import { NonSensitiveDiaryEntry } from '../types'

const Diary = ({ diary }: { diary: NonSensitiveDiaryEntry }) => {
  return (
    <div>
      <h3>{diary.date}</h3>
      <li>visibility: {diary.visibility}</li>
      <li>weather: {diary.weather}</li>
    </div>
  )
}

export default Diary