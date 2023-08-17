import axios from 'axios'
export { AxiosError } from 'axios'

export const fetcher = async (method: string, url: string, headers: any, data?: any) => {
  return await axios({ method, url, headers, data })
    .then((res) => {
      return res.data
    })
    .catch(async (err) => {
      return await Promise.reject(err)
    })
}
