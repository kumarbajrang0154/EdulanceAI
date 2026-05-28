import https from 'https';
import axios from 'axios';
import assert from 'assert';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000/api';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

const randomEmail = () => `test_${Date.now()}@example.com`;

(async () => {
  try {
    console.log('Starting backend auth flow test...');

    const signupPayload = {
      fullName: 'Test User',
      email: randomEmail(),
      password: 'Test@1234',
      confirmPassword: 'Test@1234',
      role: 'student',
    };

    const signupRes = await client.post('/auth/signup', signupPayload);
    assert.strictEqual(signupRes.status, 201);
    assert.ok(signupRes.data.token, 'Signup response must include token');
    assert.strictEqual(signupRes.data.user.role, 'student');
    console.log('Signup passed.');

    const loginRes = await client.post('/auth/login', {
      email: signupPayload.email,
      password: signupPayload.password,
    });
    assert.strictEqual(loginRes.status, 200);
    assert.ok(loginRes.data.token, 'Login response must include token');
    assert.strictEqual(loginRes.data.user.email, signupPayload.email);
    console.log('Login passed.');

    const authToken = loginRes.data.token;
    const profileRes = await client.get('/auth/profile', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    assert.strictEqual(profileRes.status, 200);
    assert.strictEqual(profileRes.data.user.email, signupPayload.email);
    console.log('Profile fetch passed.');

    const logoutRes = await client.post('/auth/logout', {}, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    assert.strictEqual(logoutRes.status, 200);
    console.log('Logout passed.');

    console.log('Backend auth flow test completed successfully.');
    process.exitCode = 0;
  } catch (error) {
    console.error('Auth flow test failed:', error.message || error);
    process.exitCode = 1;
  }
})();
