

## scripts
```bash
compile:"npx tsc -w"
serve:"nodemon dist/src/index.js"
```


## knex migration
```bash
npx knex migrate:make create_Persons
npx knex migrate:latest 
```
   

## knex seed
```bash
npx seed:seeds
knex seed:run
```