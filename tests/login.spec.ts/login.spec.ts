import { test, expect, APIRequestContext } from '@playwright/test';

const BASE_URL = 'https://mockapi.rapidextras.com/login';

async function postLoginRequest(
  request: APIRequestContext,
  username: string,
  password: string,
  expectedStatus: number,
  checkMalformed: boolean = false,
  slow: boolean = false
) {
  const start = Date.now();
  const response = await request.post(BASE_URL, {
    data: { username, password },
  });
  const end = Date.now();

  // Validate response status
  expect(response.status()).toBe(expectedStatus);

  // Validate specific conditions
  if (slow) {
    expect(end - start).toBeGreaterThanOrEqual(2000);
  }

  if (expectedStatus === 200) {
    const json = await response.json();
    expect(json).toHaveProperty('token');
  } else if (expectedStatus === 400) {
    const json = await response.json();
    expect(json.message).toBe('Username and password are required');
  } else if (expectedStatus === 401) {
    const json = await response.json();
    expect(json.error).toBe('Unauthorized');
  } else if (expectedStatus === 500) {
    const json = await response.json();
    expect(json.error).toBe('Internal Server Error');
  } else if (checkMalformed) {
    const text = await response.text();
    expect(() => JSON.parse(text)).toThrow();
  }
}

test('Successful login', async ({ request }) => {
  await postLoginRequest(request, 'validuser@example.com', 'validpassword', 200);
});

test('Empty username or password', async ({ request }) => {
  await postLoginRequest(request, '', '', 400);
});

test('Invalid login', async ({ request }) => {
  await postLoginRequest(request, 'invaliduser@example.com', 'password', 401);
});

test('Malformed JSON response', async ({ request }) => {
  await postLoginRequest(request, 'malformeduser@example.com', 'password', 200, true);
});

test('Server error', async ({ request }) => {
  await postLoginRequest(request, 'erroruser@example.com', 'password', 500);
});

test('Slow response', async ({ request }) => {
  await postLoginRequest(request, 'slowuser@example.com', 'password', 200, false, true);
});

test('Special characters in username or password', async ({ request }) => {
  await postLoginRequest(request, '!@#$%^&*()', 'password', 400);
});

test('Long username or password', async ({ request }) => {
  const longString = 'a'.repeat(1001);
  await postLoginRequest(request, longString, 'password', 400);
});

test('Invalid JSON structure', async ({ request }) => {
  const response = await request.post(BASE_URL, {
    headers: { 'Content-Type': 'application/json' },
    data: "{'username': 'user', 'password': 'pass'" // invalid JSON
  });
  expect(response.status()).toBe(400); // Adjust expected status based on API behavior
});

test('SQL Injection attempt', async ({ request }) => {
  await postLoginRequest(request, "' OR '1'='1", 'password', 400);
});