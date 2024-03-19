import { axiosInstance } from 'axiosInstances/mainInstances'
import { paths } from 'helpers/config'

const { apiEndpoint } = paths

export default class ApiService {
    static async fetchSmile(inputText: string) {
        if (inputText.trim() !== '') {
            const endpoint = apiEndpoint || ''
            const response = await axiosInstance.post(endpoint, JSON.stringify({ inputText }))
            return response.data.filteredResponse
        }
        throw new Error('Input text is empty')
    }
}
