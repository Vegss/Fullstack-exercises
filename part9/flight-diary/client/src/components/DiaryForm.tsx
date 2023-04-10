import React, { useState } from 'react'
import diaryService from '../services/diaryService';
import { Visibility, Weather } from '../types';
import { isVisibility, isWeather, toNewDiary } from '../utils';
import { useDiaries } from '../hooks';

const DiaryForm = () => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>();
  const [weather, setWeather] = useState<Weather>();
  const [comment, setComment] = useState('');

  const updateDiaries = useDiaries()[1]

  const addDiary = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (date && weather && visibility && comment) {
      const newDiary = toNewDiary(date, weather, visibility, comment);
      const createdDiary = await diaryService.createEntry(newDiary);
      updateDiaries(createdDiary);
      setDate('')
      setVisibility(undefined)
      setWeather(undefined)
      setComment('')
    } else {
      alert('Fill the form completely, please.');
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
      <form onSubmit={addDiary}>
        <label>date</label>
        <input type='date' value={date} onChange={(e) => setDate(e.target.value)} /><br />

        <fieldset onChange={toVisibility}>
          <legend>Select visibility:</legend>
          <input type='radio' value='great' checked={visibility === 'great'} /> great
          <input type='radio' value='good' checked={visibility === 'good'} /> good
          <input type='radio' value='ok' checked={visibility === 'ok'} /> ok
          <input type='radio' value='poor' checked={visibility === 'poor'} /> poor
        </fieldset>

        <fieldset onChange={toWeather}>
          <legend>Select weather:</legend>
          <input type='radio' value='sunny' checked={weather === 'sunny'} /> sunny
          <input type='radio' value='rainy' checked={weather === 'rainy'} /> rainy
          <input type='radio' value='cloudy' checked={weather === 'cloudy'} /> cloudy
          <input type='radio' value='stormy' checked={weather === 'stormy'} /> stormy
          <input type='radio' value='windy' checked={weather === 'windy'} /> windy
        </fieldset>

        <label>comment</label>
        <input type='text' value={comment} onChange={(e) => setComment(e.target.value)} /><br />

        <button type='submit'>add</button>
      </form>
    </div>
  );
};

export default DiaryForm;