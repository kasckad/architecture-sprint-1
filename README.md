Задание 1

Комментарий: выполнил декомпозицию, проект не запускал

# Microfrontend Architecture

## Обзор

Проект представляет собой микрофронтенд-приложение, использующее подход **Webpack Module Federation** для бесшовной интеграции нескольких фронтенд-модулей. Микрофронтенды взаимодействуют с хост-приложением, что позволяет независимо разрабатывать, развертывать и масштабировать каждый модуль.

## Структура микрофронтендов

Проект состоит из следующих микрофронтендов:

- **auth-microfrontend**: Отвечает за аутентификацию пользователей, включая вход и регистрацию.
- **profile-microfrontend**: Управляет профилями пользователей и настройками.
- **gallery-microfrontend**: Отображает галереи пользователей и медиаконтент.
- **common-assets**: Содержит общие компоненты и утилиты, используемые в микрофронтендах.
- **host-microfrontend**: Основное приложение, которое интегрирует все микрофронтенды.

### Frontend Structure

```
/frontend
  /auth-microfrontend
    /src
      /components
      /styles
      /utils
    package.json
    webpack.config.js
  /profile-microfrontend
    /src
      /components
      /styles
    package.json
    webpack.config.js
  /gallery-microfrontend
    /src
      /components
      /styles
    package.json
    webpack.config.js
  /common-assets
    /src
      /components
      /styles
    package.json
  /host-microfrontend
    /src
      /App.js
      /bootstrap.js
    package.json
    webpack.config.js
  package.json (root)
  README.md
```

## Почему Webpack Module Federation?

Выбрал **Webpack Module Federation**, потому что:

- Позволяет разрабатывать и развертывать каждый микрофронтенд независимо.
- Обеспечивает лучшую интеграцию во время выполнения без сложного оркестратора.
- Позволяет бесшовно делить зависимости между микрофронтендами, уменьшая размер бандла.

## Настройка маршрутизации

Каждый микрофронтенд загружается динамически и отвечает за свою собственную маршрутизацию. **Host-microfrontend** интегрирует микрофронтенды с помощью **React Router** для управления навигацией.



Задание 2

Комментарий: Межсервисное взамодействие не описал (очень сложный формат, с с4 было бы проще)

[drawio](./arch_task2.drawio)

