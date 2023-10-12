import app from './app'; 
import request from 'supertest';

describe('GET /healthz', () => {
  it('should return status code 200', async () => {
    const response = await request(app).get('/healthz');
    expect(response.status).toBe(200);
  });
});
