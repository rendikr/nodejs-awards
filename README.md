# nodejs-awards

## Installation

clone the repository

```bash
git clone
```

## Setup Environment

Copy the `.env.example` to `.env`

```bash
cp .env.example .env
```

## Setup database

Set your PostgreSQL credentials inside the `.env` file

## Run Migration

On the project root, run the sequelize migration

```bash
yarn sqlz db:migrate
```

## Run Seeder

On the project root, run the sequelize seeder

```bash
yarn sqlz db:seed:all
```

## Run the app

On the project root, run the following command

```bash
npm run watch
```

## Login Credentials

On the localhost, use the following credentials to login & run the app

```
user: member@member.id
password: secret
```
