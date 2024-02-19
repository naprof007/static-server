require('dotenv').config();

const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const useHttps = process.env.USE_HTTPS === 'true';

const app = express();

// Используем middleware для обработки статических файлов
app.use(express.static(path.join(__dirname, 'public'), { dotfiles: 'allow' }));

// Создаем HTTPS сервер с использованием самоподписанного сертификата и ключа
const options = {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    passphrase: '1234',
};

const server = (useHttps ? https : http).createServer(options, app);

server.listen(port, () => {
    console.log(`Server is running on ${useHttps ? 'https' : 'http'}://${host}:${port}`);
});