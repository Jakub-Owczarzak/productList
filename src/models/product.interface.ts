export interface ProductBase {
    name: string,
    quantity: number,
    date: Date,
    description: string,
    email: string,
}

export interface ProductId {
    id: number
}


export interface Product extends ProductId {
    name: string,
    quantity: number,
    date: Date,
    description: string,
    email: string,
}