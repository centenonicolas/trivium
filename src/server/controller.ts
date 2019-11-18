// import express from 'express';
// import ReactDOMServer from 'react-dom/server';
// import { UInt8 } from 'bitwise/types';
import cors from "cors";
import { cipher } from "./cipher";
import multer from 'multer';
import express from 'express';

const upload = multer({ storage: multer.memoryStorage() })
const app = express();
const port = Number(process.env['SERVER_PORT']) || 8080;

const options: cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "http://localhost:3000",
    preflightContinue: false
};

app.use(cors(options));

app.post('/encrypt', upload.single('file'), (req, res) => {
    console.log('Encriptando');
    const fileBuffer = req.file.buffer;
    const iv = '1234567890'; // TODO: recibir iv por parametro o hacerlo random
    const key = '1234567890'; // TODO: recibir key por parametro
    if (iv.length != 10 && key.length != 10) {
        return res.status(400)
            .json({ error: 'Key and IV should have 10 characters (80 bits)' });
    }

    const cipheredFile = cipher(fileBuffer, key, iv);

    res.status(200).attachment('ciphered_data.ciph').send(cipheredFile);
});

app.options("*", cors(options));
app.listen(port);
