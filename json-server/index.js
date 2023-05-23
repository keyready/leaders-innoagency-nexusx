/* eslint-disable camelcase */
const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const { generateAccessToken, generateRefreshToken } = require('./tokens');

const server = jsonServer.create();
const PORT = 9999;

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
// server.use(async (req, res, next) => {
//     await new Promise((res) => {
//         setTimeout(res, 2000);
//     });
//     next();
// });

server.post('/comments', (req, res) => {
    const { userId, platformId } = req.body;

    const { db } = router;
    const comments = db
        .get('comments')
        .find({ platformId })
        .value();

    console.log(comments);

    res.status(200).json(comments);
});

server.get('/error', (req, res) => {
    //
    res.status(401).json({ data: 'хых, ошибка' });
});
server.post('/book_platform', (req, res) => {
    res.status(201).json({ message: 'Успешно забронировано' });
});
server.post('/refresh', (req, res) => {
    const { refresh_token } = req.body;
    const { db } = router;

    const user = db
        .get('users')
        .find({ refresh_token })
        .value();

    if (!user) {
        return res
            .status(403)
            .json({ message: 'Ваша сессия истекла. Авторизуйтесь повторно' });
    }

    const newRefreshToken = generateRefreshToken();

    user.refresh_token = newRefreshToken;

    db.get('users')
        .find({ id: user._id })
        .assign({
            refresh_token: newRefreshToken,
        })
        .write();

    return res.status(200).json(user);
});

server.post('/logout', (req, res) => {
    const { refresh_token } = req.body;
    const { db } = router;

    const user = db.get('users').find({ refresh_token });

    if (!user) {
        return res
            .status(403)
            .json({ message: 'Ошибка аутентификации' });
    }

    db.get('users')
        .find({ id: user._id })
        .assign({
            access_token: '',
            refresh_token: '',
        })
        .write();

    return res.status(200).json({ message: 'Разлогинились' });
});

server.post('/submit_code', (req, res) => {
    //
    res.status(201).json({ message: 'Отлично! все круто' });
});

server.post('/register', (req, res) => {
    //
    res.status(201).json({ message: 'Регистрация норм' });
});

server.post('/checkEmail', (req, res) => {
    const { email, phoneNumber } = req.body;

    const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
    const { users = [] } = db;

    const userEmail = users.find(
        (user) => user.email === email,
    );

    const userPhone = users.find(
        (user) => user.phoneNumber === phoneNumber,
    );

    if (userEmail) {
        res.status(403).json({ message: 'Пользователь с таким Email уже существует' });
        return;
    }

    if (userPhone) {
        res.status(403).json({ message: 'Пользователь с таким номером телефона уже существует' });
        return;
    }

    res.status(201).json({ message: 'Регистрация норм' });
});

// Эндпоинт для логина
server.post('/login', (req, res) => {
    try {
        const { email, phoneNumber, password } = req.body;
        const { db } = router;

        let user;
        if (email && password) {
            user = db.get('users').find(
                { email },
            ).value();
            if (!user) {
                return res.status(403).json({
                    message: 'Пользователь с такой почтой не найден',
                });
            }
        }
        if (phoneNumber && password) {
            user = db.get('users').find(
                { phoneNumber },
            ).value();
            if (!user) {
                return res.status(403).json({
                    message: 'Пользователь с таким номером телефона не найден',
                });
            }
        }

        if (password !== user.password) {
            return res.status(401).json({
                message: 'Неверный пароль',
            });
        }

        const newAccessToken = generateAccessToken();
        const newRefreshToken = generateRefreshToken();

        user.access_token = newAccessToken;
        user.refresh_token = newRefreshToken;

        db.get('users')
            .find({ id: user._id })
            .assign({
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
            })
            .write();

        return res.status(200).json(user);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
});
server.use(router);

// проверяем, авторизован ли пользователь
// eslint-disable-next-line
// server.use((req, res, next) => {
//     const { db } = router;
//     const access_token = req.headers.authorization;
//     console.log(access_token);
//
//     const user = db
//         .get('users')
//         .find({ access_token })
//         .value();
//
//     if (!user) {
//         return res.status(444).json({ message: 'Not auth' });
//     }
//
//     return next();
// });

// запуск сервера
server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://localhost:${PORT}`);
});
