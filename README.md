# API проекта NewsExplorer

###### Версия проекта: 1.0.4

## О проекте
API для аутентификации пользователей и сохранения статей.
> Это дипломный проект, сделан в [Яндекс.Практикуме](https://praktikum.yandex.ru). Код проходил код-ревью.

К API можно обратиться по доменному имени [api.news-app.cf](https://api.news-app.cf) или IP-адресу [84.201.179.85](http://84.201.179.85).

## Функционал
1. Регистрация нового пользователя
2. Аутентификация пользователя по адресу почты и паролю
3. Получение информации о пользователе
4. Получение всех статей, сохранённых пользователем
5. Создание новой статьи
6. Удаление сохранённой статьи

## Взаимодействие с API
### 1. Регистрация пользователя
#### Запрос
```POST https://api.news-app.cf/signup```
#### Тело запроса
```
{
  "name": "User1",
  "email": "user1@ya.ru",
  "password": "userpassword1"
}
```
#### Ответ
```
{
  "_id": "5eaaca9ca229b0235b91e628",
  "name": "User1",
  "email": "user1@ya.ru",
  "__v": 0
}
```
#### Правила валидации полей
- **name:** обязательное поле, строка от 2 до 30 символов
- **email:** обязательное поле, уникальное для каждого пользователя, строка
- **password:** обязательное поле, строка не менее 8 символов
> Пароль хранится в базе в зашифрованном виде. API не возвращает хеш пароля пользователю.

### 2. Аутентификация пользователя по электронной почте и паролю
#### Запрос
```POST https://api.news-app.cf/signin```
#### Тело запроса
```
{
  "email": "user1@ya.ru",
  "password": "userpassword1"
}
```
#### Ответ
В случае успешной аутентификации пользователю будет отправлен токен JWT.

#### Правила валидации полей
- **email:** обязательное поле, уникальное для каждого пользователя, строка;
- **password:** обязательное поле, строка не менее 8 символов.

### 3. Загрузка информации о пользователe
#### Запрос
```GET https://api.news-app.cf/users/me```
#### Ответ
```
{
  "_id": "5eaaca9ca229b0235b91e628",
  "name": "User1",
  "email": "user1@ya.ru",
  "__v": 0
} 
```
### 4. Загрузка всех статей, сохранённых пользователем
#### Запрос
```https://api.news-app.cf/articles```
#### Ответ
```
[
  {
    "_id": "5eaacf76a229b0235b91e629",
    "keyword": "bitcoin",
    "title": "Tools You Should Know To Protect Bitcoins",
    "text": "The option of cryptocurrencies or electronic currencies...",
    "date": "2020-04-28T09:17:25Z",
    "source": "Spyrestudios.com",
    "link": "https://spyrestudios.com/tools-you-should-know-to-protect-bitcoins/",
    "image": "https://spyrestudios.com/wp-content/uploads/bitcoin-2007912_1280.jpg",
    "__v": 0
  }
]
```
Если у пользователя нет сохранённых статей, вернётся пустой массив:
```
[]
```

### 5. Создание новой статьи
#### Запрос
```POST https://api.news-app.cf/articles```
#### Тело запроса
```
{
  "keyword": "bitcoin",
  "title": "Tools You Should Know To Protect Bitcoins",
  "text": "The option of cryptocurrencies or electronic currencies...",
  "date": "2020-04-28T09:17:25Z",
  "source": "Spyrestudios.com",
  "link": "https://spyrestudios.com/tools-you-should-know-to-protect-bitcoins/",
  "image": "https://spyrestudios.com/wp-content/uploads/bitcoin-2007912_1280.jpg"
}
```
#### Ответ
```
{
  "_id": "5eaad1aaa229b0235b91e62a",
  "keyword": "bitcoin",
  "title": "Tools You Should Know To Protect Bitcoins",
  "text": "The option of cryptocurrencies or electronic currencies...",
  "date": "2020-04-28T09:17:25Z",
  "source": "Spyrestudios.com",
  "link": "https://spyrestudios.com/tools-you-should-know-to-protect-bitcoins/",
  "image": "https://spyrestudios.com/wp-content/uploads/bitcoin-2007912_1280.jpg",
  "__v": 0
} 
```
#### Правила валидации полей
- **keyword:** обязательное поле, строка;
- **title:** обязательное поле, строка;
- **text:** обязательное поле, строка;
- **date:** обязательное поле, строка;
- **source:** обязательное поле, строка;
- **link:** обязательное поле, строка, должно быть URL-адресом;
- **image:** обязательное поле, строка, должно быть URL-адресом.

### 6. Удаление сохранённой статьи
#### Запрос
```DELETE https://api.news-app.cf/articles/5eaacf76a229b0235b91e629```
#### Ответ
Пользователю будет отправлено сообщение:
```
{
  "message": "Статья удалена"
}
```

## Установка проекта
Установите базу данных [MongoDB](https://docs.mongodb.com/manual/administration/install-community/).

Клонируйте репозиторий на компьютер:

```git clone https://github.com/romcath/news-explorer-api.git```

Установите зависисмости:

```npm install```

Запустите сервер:

```npm start```


## Стек технологий
JavaScript, GIT, Node.js, Express.js, MongoDB
