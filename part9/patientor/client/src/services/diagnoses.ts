import axios from "axios";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const response = await axios.get(`${apiBaseUrl}/diagnoses`);
  return response.data
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll };