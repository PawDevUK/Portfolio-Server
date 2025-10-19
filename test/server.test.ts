const request = require('supertest');
const app = require('../server'); // path to your exported app

describe('API Endpoints', () => {
	it('GET /covid should return 200', async () => {
		const res = await request(app).get('/covid/newsUK');
		expect(res.statusCode).toBe(200);
	});

	it('GET /chatBot should return 200', async () => {
		const res = await request(app).get('/chatBot');
		expect(res.statusCode).toBe(200);
	});

	it('GET /register should return 200', async () => {
		const res = await request(app).get('/register');
		expect(res.statusCode).toBe(200);
	});

	it('GET /tictactoe should return 200', async () => {
		const res = await request(app).get('/tictactoe');
		expect(res.statusCode).toBe(200);
	});

	it('GET /visitor should return 200', async () => {
		const res = await request(app).get('/visitor');
		expect(res.statusCode).toBe(200);
	});

	it('GET /contactForm should return 200', async () => {
		const res = await request(app).get('/contactForm');
		expect(res.statusCode).toBe(200);
	});

	it('GET /workTracker should return 200', async () => {
		const res = await request(app).get('/workTracker');
		expect(res.statusCode).toBe(200);
	});
});
