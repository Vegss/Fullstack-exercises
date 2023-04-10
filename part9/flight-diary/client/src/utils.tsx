import { NewDiaryEntry, Visibility, Weather } from "./types"

export const toNewDiary = (date: string, visibility: Visibility, weather: Weather,  comment: string): NewDiaryEntry => {
  return {
    date: date,
    weather: weather,
    visibility: visibility,
    comment: comment
  }
}

export const isVisibility = (visibility: string): visibility is Visibility => 
Object.values(Visibility).includes(visibility as Visibility);

export const isWeather = (weather: string): weather is Weather => 
Object.values(Weather).includes(weather as Weather);