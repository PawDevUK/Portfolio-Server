const request = require('supertest');
const app = require('../../../../server.js');

describe('GET /register', () => {
    it('should return status 200', async () => {
        const response = await request(app).get('/register');
        expect(response.status).toBe(200);
    });
});
