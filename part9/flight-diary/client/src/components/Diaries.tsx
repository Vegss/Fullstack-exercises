import React from 'react'
import { NonSensitiveDiaryEntry } from '../types'
import { useDiaries } from '../hooks'

const Diaries = () => {
  const diaries = useDiaries()[0]

  if (!diaries) return <div>loading...</div>
  return (
    <div>
      <h2>Diary entries</h2>
      {
        diaries.map((diary: NonSensitiveDiaryEntry) => {
          return (
            <div key={diary.id}>
              <h3>{diary.date}</h3>
              <li>visibility: {diary.visibility}</li>
              <li>weather: {diary.weather}</li>
            </div>
          )
        })
      }
    </div>
  )
}

export default Diaries