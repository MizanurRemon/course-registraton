export interface CourseResponse {
    statusCode: number
    data: Daum[]
  }
  
  export interface Daum {
    id: number
    title: string
    credits: number
    status: string
  }