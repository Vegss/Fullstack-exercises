import React, { useState } from 'react'
import diaryService from '../services/diaryService';
import { Visibility, Weather } from '../types';
import { isVisibility, isWeather, toNewDiary } from '../utils';
import { useDiaries, useNotification } from '../hooks';

const DiaryForm = () => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>();
  const [weather, setWeather] = useState<Weather>();
  const [comment, setComment] = useState('');

  const updateDiaries = useDiaries()[1]
  const [notification, setNotification] = useNotification()

  const addDiary = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!date) setNotification('date is not set');
    else if (!visibility) setNotification('visibility is not set');
    else if (!weather) setNotification('weather is not set');
    else if (!comment) setNotification('comment is not set');
    else {
      const newDiary = toNewDiary(date, visibility, weather, comment);
      const createdDiary = await diaryService.createEntry(newDiary);
      updateDiaries(createdDiary);
      setDate('')
      setVisibility(undefined)
      setWeather(undefined)
      setComment('')
    }
  };

const toVisibility = (e: React.SyntheticEvent) => {
  const target = e.target as HTMLButtonElement;
  if (target && isVisibility(target.value)) setVisibility(target.value);
  else throw Error('Current visibility value is not valid for type Visibility');
}

const toWeather = (e: React.SyntheticEvent) => {
  const target = e.target as HTMLButtonElement;
  if (target && isWeather(target.value)) setWeather(target.value);
  else throw Error('Current weather value is not valid for type Weather');
}


  return (
    <div>
      <h2>Add new entry</h2>
      <h2 style={{ color: 'red' }}>{notification}</h2>
      <form onSubmit={addDiary}>
        <label>date</label>
        <input type='date' value={date} onChange={(e) => setDate(e.target.value)} /><br />

        <fieldset>
          <legend>Select visibility:</legend>
          <input type='radio' value='great' onChange={toVisibility} checked={visibility === 'great'} /> great
          <input type='radio' value='good' onChange={toVisibility} checked={visibility === 'good'} /> good
          <input type='radio' value='ok' onChange={toVisibility} checked={visibility === 'ok'} /> ok
          <input type='radio' value='poor' onChange={toVisibility} checked={visibility === 'poor'} /> poor
        </fieldset>

        <fieldset>
          <legend>Select weather:</legend>
          <input type='radio' value='sunny' onChange={toWeather} checked={weather === 'sunny'} /> sunny
          <input type='radio' value='rainy' onChange={toWeather} checked={weather === 'rainy'} /> rainy
          <input type='radio' value='cloudy' onChange={toWeather} checked={weather === 'cloudy'} /> cloudy
          <input type='radio' value='stormy' onChange={toWeather} checked={weather === 'stormy'} /> stormy
          <input type='radio' value='windy' onChange={toWeather} checked={weather === 'windy'} /> windy
        </fieldset>

        <label>comment</label>
        <input type='text' value={comment} onChange={(e) => setComment(e.target.value)} /><br />

        <button type='submit'>add</button>
      </form>
    </div>
  );
};

export default DiaryForm;