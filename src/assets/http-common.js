import axios from 'axios'

axios.defaults.headers.common['Content-Type'] = "application/json";

export const HTTP = axios.create({
  baseURL: `http://85.143.223.149:2020`,
})

export const HTTP_game=axios.create({
  baseURL: `http://85.143.223.149:4040`,
})