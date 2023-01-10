import axios from 'axios'

export const HTTP = axios.create({
  baseURL: `http://85.143.223.149:2020`,
})