import { useEffect, useState } from "react"
import { NonSensitiveDiaryEntry, Notification } from "../types"
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

  return [diaries, updateDiaries] as const;
}

export const useNotification = () => {
  const [notification, setNotification] = useState<Notification>();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification]);

  return [notification, setNotification] as const;
}