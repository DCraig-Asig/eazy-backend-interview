# EazyInsure - Backend Interview

### Prerequisites
* Node 18+
* PNPM 9+
* Docker + Docker Compose

### Installation
1. Clone the repository
2. Run `pnpm install` to install the dependencies
3. Run `docker-compose up` to start the database and the server

### Interview Requirement
* Create a RESTful API that allows users to retrieve and save the latest exchange rate from the BNR website (https://www.bnr.ro/nbrfxrates.xml) for a given currency against RON.
* The API needs to accept a single currency code as a parameter and return the exchange rate for that currency against RON. 
* Before returning the exchange rate, the API should check if the exchange rate is already stored in the database. If it is not, the API should fetch the latest exchange rate from the BNR website and store it in the database before returning it.
* The database, database table, typeorm entity, controller and service are already created. You need to implement the logic in the service to fetch the exchange rate from the BNR website and store it in the database.
* The API should be implemented using NestJS and TypeORM.
* Use the @nestjs/axios module to make the HTTP request to the BNR website.
* Use the @nestjs/typeorm module to interact with the database.
* Use the fast-xml-parser module to parse the XML response from the BNR website.
* Data validation should be done using the class-validator module.