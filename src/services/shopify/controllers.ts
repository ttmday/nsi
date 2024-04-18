
import { Response, Request } from "express";
import { ShopifyApiService } from "./service";

const shopifyApiService = new ShopifyApiService();

export const getAllProducts = async (req: Request, res: Response) => {

    try {
        const response = await shopifyApiService.getAllProducts(
        );

        const data = await response.json()
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error)

    }
}

export const getProduct = async (req: Request, res: Response) => {

    const { id } = req?.params;

    if (id == null) {
        res.status(400).json({
            message: "Must be provide a id"
        });

        return;
    }

    try {
        const response = await shopifyApiService.getProduct(
            Number(id)
        );

        const data = await response.json()
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error)

    }
}

export const createAOrder = async (req: Request, res: Response) => {

    const { order } = req?.body;

    if (order == null) {
        res.status(400).json({
            message: "Must be provide a order"
        });

        return;
    }

    console.log("Order ==> ", order);

    try {
        const response = await shopifyApiService.createAOrder(
            order
        );


        const data = await response.json()
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error)

    }
}

export const getAllOrders = async (req: Request, res: Response) => {

    try {
        const response = await shopifyApiService.getAllOrders(
        );

        const data = await response.json()
        res.status(200).json(data);
    } catch (error) {
        console.log("error orders", error);
        res.status(400).json(error)

    }
}