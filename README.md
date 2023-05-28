# ЗАДАЧА 1
## АГРЕГАТОР ПЛОЩАДОК И УСЛУГ КРЕАТИВНЫХ ИНДУСТРИЙ МОСКВЫ

___
## Актуальность задачи
 - Агентство креативных индустрий является единым окном для взаимодействия органов власти и представителей креативного предпринимательства Москвы.
 - На данный момент не существует единой платформы для бронирования креативных площадок и услуг (креативные кластеры, звукозаписывающие студии, галереи, киноплощадки для проведения съемок и кинотеатры для проведения показов и фестивалей и проч.), поэтому приходится искать данные о них из различных источников, что осложняет процесс как для горожан и бизнес-сообщества, так и для арендодателей и креативных площадок.
 - Создание единого онлайн-сервиса бронирования могло бы решить данную проблему.
 - Платформа позволит удовлетворить запросы горожан и бизнес-сообщества для организации тематического креативного досуга и оптимизации рабочего процесса

___
## Описание решения
 - Создано **WEB-приложение** с использованием ReactTs 18 и NestJS

## Стек технологий:
 - **Frontend-часть**
   - React TypeScript
   - Feature-Sliced Design (архитектура приложения)
   - Redux Toolkit (как стейт-менеджер)
   - RTK Query (для запросов на получение массивов данных)
   - react-yandex-maps (api Яндекс.Карт)
   - i18next (перевод сайта на несколько языков)
   - Headless UI (кастомные функциональные компоненты)
   - hookform (валидация форм)
- **Backend-часть**
  - **NestJS TypeScript** - Модульная и многоуровневая архитектура, которая способствует легкому разделению бизнес-логики и различных аспектов приложения. Также поддерживается внедрение зависимостей (dependency  
       injection), что делает код более чистым и тестируемым
  - **MongoDB** - документ-ориентированной база данных - данные хранятся в гибком формате документов BSON (Binary JSON), а не в традиционной таблице со схемой. Это позволяет легко менять структуру данных во время развития             приложения без необходимости обновления схемы базы данных. Такая гибкость особенно полезна при разработке приложений с быстро меняющимися требованиями или неопределенными схемами данных.
  - **nodemailer** - рассылка почты
  - **nestjs/swagger** - документация API
  - **jwt** - авторизация при помощи jsonwebtoken
   - **passport-yandex** - авторизация при помощи YandexID
___
### Использование сторонних сервисов:
 - Сервис "**Nodemailer**" для email-расслыки
 - Сервис "**SMSC**" для отправки кода подтверждения регистрации или сброса пароля на телефон
 - Сервис **Yandex.Maps** для отображения площадок на карте
 - Сервис **Yandex.ID** для авторизации на сайте через Яндекс-аккаунт
 - 
___ 
## Реализованные функции
 - **ГОСТЬ**:
   - Авторизация (JWT по номеру телефона или почте И через Яндекс)
   - Сброс пароля по почте или номеру телефона
 
 - **ПОЛЬЗОВАТЕЛЬ**:
   - Просмотр всех доступных площадок: с использованием Яндекс.Карт и через ПОИСК
   - Бронирование площадки с выбором количества даты, времени, мест и возможностью оставить комментарий для арендодателя
   - Подать жалобу на платформу с детальным описанием нарушения
   - Изменить личные данные (имя и фамилию)
   - Изменить пароль
   - Загрузить аватарку (с возможностью редактировать во встроенном редакторе)
   - Просмотреть все бронирования с разделением на завершенные и активные
     - для первой с возможностью отменить
     - для последней — оставить комментарий, который автоматически добавится к платформе
   - Просмотр и удаление комментариев, которые пользователь оставлял к площадкам

 - **АРЕНДОДАТЕЛЬ**:
   - Возможно добавить площадку, удалить ее
   - Просмотреть все бронирования данной площадки

 - **АДМИНИСТРАТОР**:
   - Просмотр всех пользователей
   - Возможность забанить/разбанить пользователя
   - Повысить пользователя до уровня АРЕНДОДАТЕЛЬ или понизить арендодателя до уровня ПОЛЬЗОВАТЕЛЬ
   - Принять или отклонить поданную на платформу жалобу

 - **Приятные фичи**:
   - Сайт переведен на три языка (русский, английский, испанский) для вовлечения иностранных туристов
   - Имеется механизм переключения тем приложения (светлая и темная). Логика построена так, что внедрение новой темы занимает 5 минут

___
## Запуск приложения
 - Из корня проекта: 
   - `cd frontend`
   - `npm install`
   - `npm run build:prod`
   - `cd ../server-dev`
   - `npm run build`
   - `node server/main.js`
 - В браузере открыть `http://localhost:9999`

___
## Сборка Frontend-части приложения
 - `npm run start`
 - `npm run start:server`
 - `npm run start:dev`
 - `npm run build:dev`
 - `npm run build:prod`
 - `npm run lint:ts`
 - `npm run lint:ts:fix`
 - `npm run lint:scss`
 - `npm run lint:scss:fix`

___
## Команда
 - [Грибанова Алина](https://t.me/toy_feels_vibe): UI/UX
 - [Корчак Родион](https://t.me/keyrea_dy): frontend-разработка
 - [Кофанов Валентин](https://t.me/VALI666KO): backend-разработка
 - [Поляков Дмитрий](https://t.me/operculum): UI/UX, перевод сайта
 - [Яроцкий Глеб](https://t.me/G_Rosman): Project Manager
