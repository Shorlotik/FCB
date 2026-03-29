# FCB

Маркетинговый сайт на **Next.js** (приложение в каталоге `fcb-web`). В корне — **Docker Compose** для сборки и запуска в контейнере.

## Локальная разработка

```bash
cd fcb-web
npm ci
npm run dev
```

Сайт: [http://localhost:3000](http://localhost:3000).

Сборка и прод-режим локально:

```bash
npm run build
npm run start
```

Линт: `npm run lint`.

## Docker

Из корня репозитория:

```bash
docker compose up --build
```

Сервис слушает порт **3000**.

## Переменные окружения (опционально)

Для отправки писем с форм (лиды, отклики на вакансии) через [Resend](https://resend.com) задайте:

| Переменная | Назначение |
|------------|------------|
| `RESEND_API_KEY` | API-ключ Resend |
| `FCB_RESEND_FROM` | Отправитель, например `FCBMINSK <noreply@ваш-домен.by>` |
| `FCB_LEAD_NOTIFY_EMAIL` | Куда приходят заявки «Стать клиентом» |
| `FCB_HR_NOTIFY_EMAIL` | Куда приходят отклики «Работа у нас» |

Без них формы работают, но уведомления на почту не отправляются (в dev в консоль пишется предупреждение).

В Docker передайте переменные через `environment` в `docker-compose.yml` или файл `.env` рядом с compose (не коммить секреты).

## Структура

- `fcb-web/` — Next.js 16 (App Router), Tailwind, контент в `fcb-web/content/`.
- `docker-compose.yml` — образ и запуск `fcb-web`.
