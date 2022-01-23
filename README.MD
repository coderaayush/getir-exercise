# Getir-App!

Prerequisites: 
-	Node.js and Mongo Db installed on local machine
-	`.env` file with default configuration in project root folder 

My environment: 
- Node.js: v16.13.1
- Mongodb: 5.0.5
- Vscode IDE for coding and debugging.
- Postman for Endpoints testing.

Commands for setting up the app:
 - `npm install` - To install the packages 
 - `npm start` - To run the demo
 - `npm test` - To run tests cases with code coverage

I have used the provided cloud hosted Mongodb instance for running the demo and the local instance is used for running the tests.

I am using jest test suite with supertest and I have added some test cases for checking the records filtering conditions on  the exercise. Code coverage is available in `coverage` directory.

**Live Endpoint Details:**
Running on AWS EC2 VM
`Public IP:` 3.111.101.29
`Port:` 3000
Using PM2 process manager for running node application and monitoring.

**Description:** Get Records API
-   **Endpoint:** [http://3.111.101.29:3000/records](http://3.111.101.29:3000/records)
-   **Method:** POST
-   **Headers:** Content-Type  **:** application/json
-   **Sample Request**: { "startDate": "26-03-2001", "endDate": "2016-05-02", "minCount": 2990, "maxCount": 3000 }
-   **Sample Response:** { "code": 0, "msg": "Success", "records": [ { "key": "bxoQiSKL", "createdAt": "2016-01-29T01:59:53.494Z", "totalCount": 2991 }, { "key": "coDQRdwh", "createdAt": "2016-01-16T16:27:15.711Z", "totalCount": 2993 } ] }
-   **Curl Command:** curl --location --request POST '3.111.101.29:3000/records' \ --header 'Content-Type: application/json' \ --data-raw '{ "startDate": "26-03-2001", "endDate": "2016-05-02", "minCount": 2990, "maxCount": 3000 }'

**PS**: I haven't added validations and error responses for the request input to avoid over engineering in the current scope. 