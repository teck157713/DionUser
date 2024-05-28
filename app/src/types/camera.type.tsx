export interface CameraResponse {
    id: string,
    name: string,
    username?: string,
    password?: string,
    host: string,
    port: string
}

export interface GetAllCameraResponse {
    lastVisible?: any,
    docs: CameraResponse[]
}