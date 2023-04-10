import axios from "axios";
import { NewDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3001/api/diaries';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createEntry = async (newDiary: NewDiaryEntry) => {
  try {
    const response = await axios.post(baseUrl, newDiary);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response)
    } else {
      console.log(err)
    }
  }
}

export default { getAll, createEntry };