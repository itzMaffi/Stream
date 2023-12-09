# stream

stream is journaling app where every edit tells a story.
stream is built on Nextjs 14, Prisma and mySQL, styled using Tailwind, unit test with jest and e2e test with cypress.

![Stream intro](https://github.com/muzixiaowuwuyi/Stream/blob/main/assets/stream.gif)

![Stream tech stack](https://github.com/muzixiaowuwuyi/Stream/blob/main/assets/Tech%20stack.jpg)

## Installation

### 0. Prerequisites

stream requires `node 18` or above, and `docker` to run.

### 1. Clone and install dependencies

To start, clone this repo and navigate to its folder

```
# Using HTTPS
$ git clone https://github.com/muzixiaowuwuyi/Stream.git

# Using SSH
$ git clone git@github.com:muzixiaowuwuyi/Stream.git

$ cd Stream
```

Then run `npm i` to install the app dependencies

### 2. Set up Prisma and your database

The first step is to add your database url to the newly created `.env.local` file, following the url scheme below and replacing the placeholders. You don't need to create the database beforehand, prisma will take care of it during migration

```
DATABASE_URL="mysql://<username>:<password>@<host>:<port>/<dbname>"
```

**_Start your mySQL server docker image_** and execute the following command to migrate the Prisma schema to your database

```
$ npm run dockerDB
$ npm run migrate:dev
```

This command also generates the Prisma client used by the application.

#### A note on Prisma and environment variables

By default, when initialized Prisma creates a `.env` file in your root folder. While this is not necessarily bad per se, it makes the app use two different `.env` files which could cause conflicts (`.env` is also not ignored by git default). We decided to keep only the file that Next uses, and used the `dotenv` package to make prisma use the same one.

To make prisma commands run with the correct environment variables, you will need to run the new prisma scripts added to the `package.json` using `npm run`.

### 3. Run the app

To start the app

```
$ npm run dockerDB
$ npm run dev
```

### 4. Test the app

#### Unit test

```
$ npm run test
```

#### End to end test

befor perform end to end test, please make the dev instance is running.

```
$ npm run e2e
```

### Contributors

[Guangzheng Li](https://github.com/muzixiaowuwuyi)

[Michele Maffei](https://github.com/itzMaffi/)

[Mads Baddsmand](https://github.com/MadsPB/)
