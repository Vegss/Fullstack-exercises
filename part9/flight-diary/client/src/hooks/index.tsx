import { useEffect, useState } from "react"
import { NonSensitiveDiaryEntry } from "../types"
import diaryService from "../services/diaryService"

export const useDiaries = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])

  useEffect(() => {
    const getDiaries = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries)
    }
    getDiaries()
  }, [diaries])

  const updateDiaries = (newDiary: NonSensitiveDiaryEntry) => {
    setDiaries(diaries.concat(newDiary));
  }

  return [diaries, updateDiaries] as const
}