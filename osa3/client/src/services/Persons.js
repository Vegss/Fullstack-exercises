import axios from "axios";
const baseUrl = '/api/persons';

const getAll = () => {
    return axios.get(baseUrl)
};

const create = (newObject) => {
    return axios.post(baseUrl, newObject)
};

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
};

const update = (personObject, id) => {
    return axios.put(`${baseUrl}/${id}`, personObject)
}

const personService = {getAll, create, remove, update}

export default personService