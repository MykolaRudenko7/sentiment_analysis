import axios from 'axios'
import { paths } from 'helpers/config'

const { baseURL } = paths

export const axiosInstance = axios.create({
    baseURL,
})
