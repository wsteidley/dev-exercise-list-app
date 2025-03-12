This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

- To get the app running in your local environment
  - You will need Clerk API keys (clerk.com) - super easy to sign up and get some keys to test with.
  - Configure a `.env` file (see the .env.template in the repo) for the local docker Postgres or feel free to use a database provider of your choice to spin up a free database (eg. Neon, Supabases).
  - You should be able to sign up, login, view veggie listings in the marketplace, and create new listings from your dashboard.

### Postgres

Running `docker-compose up` in the repo will bring up the Postgres container.

You can grab the credentials to configure the `.env` file from the `docker-compose.yaml` file.

If `prisma` has an issue connecting please verify you can connect with the credentials via the `psql` cli tool.

```
$ sql postgresql://someUsernameHere:somePasswordHere@localhost:5432/mydb
```

If that does not work you may need to connect to the container directly and set the user password:

```
$ docker exec -it postgres-prisma psql -U prisma -d mydb

mydb=# ALTER USER prisma WITH PASSWORD 'somePasswordHere';

mydb=# \n
```

### Prisma

This project uses [prisma](https://www.prisma.io/)

- If you are unfamiliar with Prisma, here are some commands that may be helpful:
  - `npx prisma db push` will update your DB schema based on the `schema.prisma` file in the repo and also regenerate the Prisma Client so prisma types are up to date.
  - `npx prisma studio` will launch a Admin UI for your database at localhost:5555

### Run the App

Assuming all the configuration is correct and the DB is running:

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
