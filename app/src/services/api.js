// process.env.REACT_APP_API_GATEWAY_URL
import axios from 'axios'

const client = axios.create({
  baseURL: `https://${process.env.REACT_APP_API_GATEWAY_URL}`,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const load = async link => {
  const { data } = await client.post('load', { link })
  return data
}

export const save = async (link, text) => {
  const { data } = await client.post('save', { link, text })
  return data
}
