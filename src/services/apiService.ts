import { axiosInstance } from 'axiosInstances/mainInstances'
import { paths } from 'helpers/config'

const { apiEndpoint } = paths

export default class ApiService {
    static async fetchSmile(inputText: string) {
        const response = await axiosInstance.post(apiEndpoint, JSON.stringify({ inputText }))
        return response.data.filteredResponse
    }
}
