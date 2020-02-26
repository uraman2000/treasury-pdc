# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

Steps to create a migration script : 

1. yarn typeorm migration:create -n CreateAdminUser
2. yarn migration:run