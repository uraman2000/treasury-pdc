# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

Steps to create a migration script : 

1. yarn typeorm migration:create -n CreateAdminUser
2. yarn migration:run


Hello To future me or dev to push this server in production you will need pm2.
you can install pm2 by using `npm install pm2 -g`.

to start the project make sure the ormconfig.json is  using this config 
`
  "entities": ["src/entity/**/*.js"],
  "migrations": ["src/migration/**/*.js"],
  "subscribers": ["src/subscriber/**/*.js"],

`

and not this.

`
  "entities": ["src/entity/**/*.ts"],
  "migrations": ["src/migration/**/*.ts"],
  "subscribers": ["src/subscriber/**/*.ts"],
`

why?? because I said so, just kiding because this is for development only and for ts-node but pm2 does not run in typescript..

you can now build the project by using 
`
yarn tsc

`
*before you start the build version make sure you cd to tresurey\server\build*
because I suck at folder structure and mess up the generated build but you will not notice it because you this shit >:).

start the prod using..

pm2 start src/index.jsx

read more about pm2 for more info about pm2 https://www.npmjs.com/package/pm2.
