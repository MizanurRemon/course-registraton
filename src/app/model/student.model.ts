export interface StudentResponse {
    statusCode: number
    data: Data
  }
  
  export interface Data {
    id: number
    name: string
    phone: string
    roll_no: string
    image: string
    status: string
    created_at: string
    updated_at: string
  }
  