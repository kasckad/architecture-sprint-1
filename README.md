# Уровень 1: Проектирование

Для разделения фронтенда на микрофронтенды выбран **Module Federation (Webpack 5)**. Этот подход обеспечивает удобную интеграцию независимых приложений в единое целое, сохраняя возможность их раздельной разработки и развертывания. **Module Federation** позволяет каждому микрофронтенду разрабатывать свой стек технологий, при этом обеспечивая динамическую загрузку зависимостей.

### Почему **Module Federation**, а не **Single SPA**?
- **Гибкость**: Возможность независимой работы команд над разными частями проекта.
- **Производительность**: Загружаются только нужные модули, а не целые приложения.
- **Единый фреймворк**: Используется общий React-стек, обеспечивая унификацию и снижение дублирования кода.
- **Простота интеграции**: Хост-приложение может динамически подгружать микрофронтенды.
- **Масштабируемость**: Позволяет легко добавлять новые микрофронтенды без значительных изменений в хост-приложении.

# Уровень 2: Планирование изменений

## Общая структура проекта

```
/microfrontend
  ├── /host               # Основное приложение (контейнер)
  │   ├── /src
  │   │   ├── /components
  │   │   │   ├── App.js
  │   │   │   ├── Header.js
  │   │   │   ├── Footer.js
  │   │   │   ├── Main.js
  │   │   │   ├── ProtectedRoute.js
  │   │   │   ├── PopupWithForm.js
  │   │   │   ├── ImagePopup.js
  │   │   │   ├── AddPlacePopup.js
  │   │   │   ├── EditAvatarPopup.js
  │   │   │   ├── EditProfilePopup.js
  │   │   │   ├── InfoTooltip.js
  │   │   │   ├── CardList.js
  │   │   │   ├── Card.js
  │   │   ├── /contexts
  │   │   ├── /images
  │   │   ├── /utils
  │   │   ├── index.js
  │   ├── module-federation.config.js
  │   ├── rspack.config.js
  │   ├── package.json
  │
  ├── /auth               # Микрофронтенд авторизации
  │   ├── /src
  │   │   ├── /components
  │   │   │   ├── Login.js
  │   │   │   ├── Register.js
  │   │   ├── /styles
  │   │   │   ├── login.css
  │   │   │   ├── register.css
  │   │   ├── /utils
  │   │   │   ├── auth.js
  │   │   ├── index.js
  │   ├── module-federation.config.js
  │   ├── rspack.config.js
  │   ├── package.json
  │
  ├── /cards              # Микрофронтенд карточек
  │   ├── /src
  │   │   ├── /components
  │   │   │   ├── Card.js
  │   │   │   ├── CardList.js
  │   │   ├── /styles
  │   │   │   ├── card.css
  │   │   ├── /utils
  │   │   │   ├── cardsApi.js
  │   │   ├── index.js
  │   ├── module-federation.config.js
  │   ├── rspack.config.js
  │   ├── package.json
  │
  ├── /user               # Микрофронтенд профиля пользователя
  │   ├── /src
  │   │   ├── /components
  │   │   │   ├── Profile.js
  │   │   │   ├── EditProfile.js
  │   │   ├── /styles
  │   │   │   ├── profile.css
  │   │   ├── /utils
  │   │   │   ├── userApi.js
  │   │   ├── index.js
  │   ├── module-federation.config.js
  │   ├── rspack.config.js
  │   ├── package.json
```

## Обоснование декомпозиции

### **1. `host`** - Основное приложение
- Управляет маршрутизацией и контейнеризацией микрофронтендов.
- Отвечает за общие UI-элементы (Header, Footer, ProtectedRoute).
- Подключает микрофронтенды через `Module Federation`.

### **2. `auth`** - Микрофронтенд авторизации
- Отвечает за вход и регистрацию пользователей.
- Включает `Login.js` и `Register.js`.
- Работает с API авторизации (`auth.js`).
- Передаёт токен в `localStorage`, который использует `host`.

### **3. `cards`** - Микрофронтенд карточек
- Управляет созданием, отображением и взаимодействием с карточками.
- Содержит `Card.js`, `CardList.js`.
- Взаимодействует с API карточек через `cardsApi.js`.

### **4. `user`** - Микрофронтенд профиля пользователя
- Управляет отображением и редактированием профиля пользователя.
- Включает `Profile.js`, `EditProfile.js`.
- Работает с API пользователей (`userApi.js`).

## Задание №2
В репозитойрий добавлен drawio файл - microsercives.drawio