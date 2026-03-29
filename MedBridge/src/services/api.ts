import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '',
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface SendSmsPayload {
  phoneNumber: string
  message: string
}

export async function sendSms(payload: SendSmsPayload) {
  const response = await apiClient.post('/send-sms', payload)
  return response.data
}

export default apiClient
