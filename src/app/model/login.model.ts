export interface LoginResponse {
  statusCode: number
  message: String
  data: Data
}

export interface Data {
  id: number
  name: string
  roll_no: string
  token: string
}