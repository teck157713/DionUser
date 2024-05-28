export interface ServiceModel {
    description: string,
    price: number
}

export interface InvoiceModel {
    services: ServiceModel[]
}

export interface GetDraftInvoiceRequest {
    caseId: string,
    specialistUID: string
}

export interface UpdateDraftInvoiceRequest {
    caseId: string,
    specialistUID: string,
    invoice: ServiceModel[]
}
