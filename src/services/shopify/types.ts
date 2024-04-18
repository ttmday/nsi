export interface Order {
    email: string;
    product_title: string;
    product_id: number | string;
    variant_id: number | string;
    quantity: number;
    currency?: string;
    send_receipt?: boolean;

}