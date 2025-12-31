import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://api.spaceflightnewsapi.net/v4',
  timeout: 10_000,
})

