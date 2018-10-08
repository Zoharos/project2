import path from 'path';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import https from 'https';
import fs from 'fs';
import pagesRouter from './pagesRouter';
import apiRouter from './api_router'

//Encryption assests
const privateKey  = fs.readFileSync('./app/server/encryption/localhost.key', 'utf8');
const certificate = fs.readFileSync('./app/server/encryption/localhost.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const app = express();

const assets = express.static(path.join(__dirname, '../'));

app.use(cors());
app.use(assets);

//Database connection
const uri = "mongodb+srv://real-nadlan-users:z8LzAyjpdk4tXpOI@golancorporation-cyaxt.gcp.mongodb.net/Real-Nadlan?retryWrites=true";
mongoose.connect(uri, {useNewUrlParser: true});

//Every route with api
app.use('/api', apiRouter);
//Every route that doesn't have api
app.get(/^((?!api).)*$/, pagesRouter);

//https connection
const httpsServer = https.createServer(credentials,app, () => {
    console.log('Listening HTTPs')
  });
httpsServer.listen(8443);  

export default app;
