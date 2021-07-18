## Installation

In order to run application perform following steps:

```bash
$ npm install
```

Create database:

```bash
$ docker compose up
```

All necessary environement variables are stored in file `development.env`

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Routes

### Create user

```
POST /api/user
```

Requires obligatory parameters: `firstName`, `secondName`, `email` and `photo`

Example:

```
POST http://localhost:3000/api/user
```

### Search user

```
GET /api/user/:id
```

Existing user id must be passed as parameter `:id`

Examples:

```bash
# Retreives user with id: 1
GET localhost:3000/api/user/1
```

Get all existing users

```bash
# Retreives all users
GET localhost:3000/api/user
```

### Serving images

All stored images can be opened from host's `/public` folder

Example:

```
http://localhost:3000/public/image-name.jpg
```
