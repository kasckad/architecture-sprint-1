# Выбор фреймворка для создания микрофронтендов

## Анализ проекта

Проанализировав структуру проекта, можно выделить следующие особенности:

1. Основная технология фронтенда — **React (17.0.2)**.
2. Используется редирект по URL для **Log in** и **Sign up**.
3. Некоторые компоненты переиспользуются. Например, **PopupWithForm** используется в нескольких поп-апах (**AddPlacePopup, EditAvatarPopup** и т. д.).
4. В `App.js` создаются общие состояния, такие как **currentUser** и **email**.
5. Приложение использует общий слой утилит (**API** и **auth**), доступный для всех компонентов.

## Выбор технологии

Оптимальным решением для разбиения приложения на микрофронтенды является **Module Federation**, так как он хорошо подходит для:

1. Проектов с единым техническим стеком (в данном случае **React.js**).
2. Приложений с переиспользуемыми компонентами и модулями.
3. Оптимизации загрузки библиотек и динамической подгрузки микрофронтендов.

### Недостатки

- **Module Federation** не предназначен для полного разделения микрофронтендов с разными маршрутами. Однако в **Mesto** сложная маршрутизация не требуется.
- При необходимости маршрутизацию можно реализовать через **SSR**.

Исходя из этого, **Module Federation** является наиболее подходящим выбором.

---

# Разделение на микрофронтенды

Приложение разделено на микрофронтенды по принципу **вертикальной нарезки** — каждый микрофронтенд отвечает за свою бизнес-функцию.

### Разделение функционала:

- **auth-microfrontend** — логин и регистрация.
- **profile-microfrontend** — работа с профилем.
- **card-microfrontend** — работа с карточками.
- **info-microfrontend** — отображение информационных сообщений (тултипы).
- **place-microfrontend** — добавление новых мест.

Общие стили и утилиты остаются в **host**, который управляет микрофронтендами и отвечает за общий интерфейс.

Такой подход позволяет эффективно управлять зависимостями, переиспользовать код и обеспечивать гибкость разработки.

---

## Структура проекта

```plaintext
/host-microfrontend
    /src
        /components
            App.js
            Footer.js
            Header.js
            Main.js
            ProtectedRoute.js
        /styles
            /page
            /content
        /utils
            api.js
        /contexts
            CurrentUserContext.js
        index.js
    package.json
    webpack.config.js

/auth-microfrontend
    /src
        /components
            Login.js
            Register.js
        /styles
            login.css
            /auth-form
        /utils
            auth.js
        index.js
    package.json
    webpack.config.js

/profile-microfrontend
    /src
        /components
            EditAvatarPopup.js
            EditProfilePopup.js
            PopupWithForm.js
        /styles
            /profile
            /popups
        /utils
            api.js
        index.js
    package.json
    webpack.config.js

/card-microfrontend
    /src
        /components
            Card.js
            ImagePopup.js
            PopupWithForm.js
        /styles
            /card
            /popup
        /utils
            api.js
        index.js
    package.json
    webpack.config.js

/info-microfrontend
    /src
        /components
            InfoTooltip.js
        /styles
            /popup
        index.js
    package.json
    webpack.config.js

/place-microfrontend
    /src
        /components
            AddPlacePopup.js
            PopupWithForm.js
        /styles
            /places
            /popups
        index.js
    package.json
    webpack.config.js
```

Данный подход позволяет упростить поддержку и масштабирование проекта.

---

# Задание 2

Файл схемы архитектуры находится в репозитории рядом с `readme.md` и называется `arch_template_task2.drawio`. Он содержит визуальное представление структуры микрофронтендов проекта.

