const app = require('./../app');
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require("mongoose");
const Records = require('../models/records');
let recordsData;

beforeAll( async () => {
    //create dummy data for testing in local db
    try {
        recordsData = [
            {
                createdAt: new Date('2015-02-01'),
                key: 'key001',
                value: 'value001',
                counts: [2000, 250, 120]
            },
            {
                createdAt: new Date('2015-06-28'),
                key: 'key002',
                value: 'value002',
                counts: [150, 250, 120]
            },
            {
                createdAt: new Date('2016-05-01'),
                key: 'key003',
                value: 'value003',
                counts: [3000, 100, 50]
            }
        ];

        await Records.insertMany(recordsData);
        console.log('Data inserted successfully');
    } catch (e) {
        console.log('Issue while inserting data', e);
    }

});
  
afterAll( async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe('Records Endpoint Test', () => {
    
    test('Should return success response payload', async () => {
        const res = await request.post('/records').send();
        expect.assertions(4)
        expect(res.statusCode).toEqual(200)
        expect(res.statusCode).not.toEqual(400)
        expect(res.body).toEqual(expect.objectContaining({code: 0, msg: 'Success'}));
        expect(res.body).not.toEqual({});
    });

    test('Should filter records for request data', async () => {
        let requestData = {
            "startDate": "2015-01-01",
            "endDate": "2015-12-01",
            "minCount": 1,
            "maxCount": 3000
        }
        
        const res = await request.post('/records').send(requestData);
        
        let records = recordsData.slice(0, 2);
        records = records.map(record => {
            let totalCount = record.counts.reduce((a, b) => a + b, 0);
            return {
                createdAt: record.createdAt.toISOString(),
                key: record.key,
                totalCount: totalCount 
            }
        });

        let expectedOutput = {
            code: 0,
            msg: 'Success',
            records: records
        };

        expect.assertions(4);
        expect(res.body).toMatchObject(expectedOutput);
        expect(res.body).not.toEqual({});
        expect(res.statusCode).toEqual(200);
        expect(res.statusCode).not.toEqual(400);
    })
});
