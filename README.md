# Backend demo

## Information

Backend demo developed using ExpressJS and Prisma as an ORM for a database that could be MySQL, PostgreSQL or MongoDB.

## Run the project locally

1. Clone the repo

2. Create an .env file in the root folder of the project with the following structure

`
DATABASE_URL='connection_string_of_the_database'
`

Tip: You can use a service like PlanetScale in order to manage an online MySQL database, PlanetScale provides you directly the connection string for Prisma.

3. Install npm dependencies:

Just run the following command.

```
npm install
```

4. Create your database structure from the Prisma schema (located at prisma/schema.prisma) running the following command:

```
npx prisma db push
```

5. Seed your database in order to insert initial data like available Flights and Users (using the seed file located at prisma/seed.js). Just run the following command:

```
npx prisma db seed
```

6. Open a database manager called Prisma Studio in order to review your database. Just run the following command:

```
npx prisma studio
```

7. Run the project generating the demo API just running the following command:

```
npm run dev
```