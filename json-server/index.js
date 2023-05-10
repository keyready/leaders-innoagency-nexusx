const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const PORT = 9999;
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 1000);
    });
    next();
});

server.get('/error', (req, res) => {
    //
    res.status(401).json({ data: 'хых, ошибка' });
});

server.post('/submit_code', (req, res) => {
    //
    res.status(404).json({ message: 'Извините, но код неверный' });
});

// Эндпоинт для логина
server.post('/login', (req, res) => {
    try {
        const { email, phoneNumber, password } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { users = [] } = db;

        let userFromBd;
        if (email && password) {
            userFromBd = users.find(
                (user) => user.email === email,
            );
            if (!userFromBd) {
                return res.status(403).json({
                    message: 'Пользователь с такой почтой не найден',
                });
            }
        }
        if (phoneNumber && password) {
            userFromBd = users.find(
                (user) => user.phoneNumber === phoneNumber,
            );
            if (!userFromBd) {
                return res.status(403).json({
                    message: 'Пользователь с таким номером телефона не найден',
                });
            }
        }

        if (password !== userFromBd.password) {
            return res.status(401).json({
                message: 'Неверный пароль',
            });
        }

        return res.json(userFromBd);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
});

// проверяем, авторизован ли пользователь
// eslint-disable-next-line
server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'AUTH ERROR' });
    }

    next();
});

server.use(router);

// запуск сервера
server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://localhost:${PORT}`);
});
