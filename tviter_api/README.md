# Adonis API application

This is an API server in AdonisJS for the Tviter app, it comes pre-configured with:

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

### Run the app locally

Run the command to run the app on http://localhost:3333

```js
adonis serve --dev
```