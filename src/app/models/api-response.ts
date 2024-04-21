export interface ApiResponse<T> {
    Data: T | null
    Message: string
    Success: boolean
    IsAuthorized: boolean
}
