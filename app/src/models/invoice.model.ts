export interface ServiceResponse {
    description: string,
    price: number
}

export interface InvoiceResponse {
    services: ServiceResponse[]
}
