import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { GetParams } from "whatsapp-api-js/types";

import WhatsAppAPI from "whatsapp-api-js/index";
import { Node18 } from "whatsapp-api-js/setup/node";

const Whatsapp = new WhatsAppAPI(Node18({
    token: process.env.WHATSAPP_TOKEN,
    appSecret: process.env.WHATSAPP_APP_SECRET,
    webhookVerifyToken: process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN
}));

import { Text, Image, Document } from 'whatsapp-api-js/messages';
const message = new Text('Hi');

Whatsapp.on.message = console.log;

export default async function (req: VercelRequest, res: VercelResponse) {
    if (req.method == "POST") {
        console.log("Headers", req.headers["x-hub-signature-256"]);

        const chunks = [];
        req.on('data', (chunk) => {
            chunks.push(chunk);
        }).on('end', () => {
            const body = Buffer.concat(chunks).toString();

            console.log("Body", body);

            try {
                Whatsapp.post(JSON.parse(body), body, req.headers["x-hub-signature-256"] as string);
            } catch (error) {
                return res.status(error).send("Error");
            }

            return res.status(200).send("Success");
        }).on("error", () => {
            return res.status(500).send("Error");
        });
    }

    else if (req.method == "GET") {
        try {
            console.log(req.query);
        } catch (error) {
            return res.status(400).send("Error");
        }

        try {
            return res.status(200).send(Whatsapp.get(req.query as GetParams));
        } catch (error) {
            return res.status(error).send("Error");
        }
    }

    else return res.status(501).send("Error");
}
