import axios from "axios";
import { NewDiaryEntry } from "../types";
import { useNotification } from "../hooks";

const setNotification = useNotification()[1]

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
      setNotification(err.message);
    }
  }
}

export default { getAll, createEntry };