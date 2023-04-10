import React from 'react'
import { NonSensitiveDiaryEntry } from '../types'
import { useDiaries } from '../hooks'
import Diary from './Diary'

const Diaries = () => {
  const diaries = useDiaries()[0]

  if (!diaries) return <div>loading...</div>
  return (
    <div>
      <h2>Diary entries</h2>
      {
        diaries.map((diary: NonSensitiveDiaryEntry) => 
          <Diary key={diary.id} diary={diary} />
        )
      }
    </div>
  )
}

export default Diaries