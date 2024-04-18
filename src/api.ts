import express, { Response } from 'express'
import { config } from 'dotenv';
import { router, router as shopifyRouter } from './services/shopify/routes';
config();

const port = process.env.PORT;
const app = express();

export const run = () => {
    app.set('port', port);

    app.use(
        express.urlencoded({
            extended: true,
        })
    );

    app.use(express.json());

    router.use('/', (_, res: Response) => {
        res.send("<h1>Hello World</h1>")
    });

    app.use(shopifyRouter);




    app.listen(port, () => {
        console.log("Listening in ", port);
    })
}

