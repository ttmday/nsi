import '@shopify/shopify-api/adapters/node';
import { ApiVersion, Session, shopifyApi } from "@shopify/shopify-api";

import { RestClient } from '@shopify/shopify-api/lib/clients/admin/rest/client';

import { Order } from "./types";

import { config } from "dotenv";
config();


export const shopify = shopifyApi({
    apiSecretKey: process.env.SECRET_KEY ?? "",
    apiVersion: ApiVersion.April24,
    apiKey: process.env.API_KEY,
    scopes: ['read_products,read_orders'],
    hostName: process.env.SHOP_NAME ?? "",
    adminApiAccessToken: process.env.TOKEN ?? "",
    isEmbeddedApp: false,
});


export const getSession = (): Session => {
    const session = shopify.session.customAppSession(process.env.SHOP_NAME!);
    session.accessToken ||= process.env.TOKEN;
    // session.scope ||= "read_products, read_orders"
    return session;
}

export const getClient = (): RestClient => {
    return new shopify.clients.Rest({ session: getSession(), apiVersion: ApiVersion.January24 });
}


export class ShopifyApiService {

    async getAllProducts(): Promise<Response> {
        const { client, apiVersion } = getClient();
        return await client.get("products.json", {
            apiVersion
        }
        );
    }

    async getProduct(id: number): Promise<Response> {
        const { client, apiVersion } = getClient();
        return await client.get(`products/${id}.json`, {
            apiVersion,
        }
        );
    }
    async getAllOrders(): Promise<Response> {
        const { client } = getClient();
        return await client.get("orders.json", {
            searchParams: {
                status: "any",
            }
        }
        );
    }


    async createAOrder(params: Order): Promise<Response> {
        const line_items = [
            {
                "title": params.product_title,
                "quantity": params.quantity,
                "product_id": params.product_id,
                "variant_id": params.variant_id
            }
        ];

        // Crear un objeto de pedido con la información del cliente y la línea de pedido
        let order: any = {
            email: params.email,
            line_items: line_items,
            inventory_behaviour: "decrement_obeying_policy"
        };

        if (params.currency) order["currency"] = params.currency

        if (params.send_receipt) {
            order = {
                ...order,
                fulfillment_status: "fulfilled",
                send_receipt: true,
                send_fulfillment_receipt: true,
            }
        }

        const { client } = getClient();

        return client.post("/orders.json", {
            data: { order }
        }
        );
    }
}