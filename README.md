# API Testing with Playwright

## Overview
This repository contains API tests for a login endpoint using Playwright. The tests cover various scenarios including successful login, invalid login, malformed JSON response, server errors, slow responses, and more.

## Tools Used
- **Playwright**: A Node.js library to automate Chromium, Firefox, and WebKit with a single API.
- **TypeScript**: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/<yourusername>/QA-Engineer-Take-Home-Evaluation.git
    cd QA-Engineer-Take-Home-Evaluation
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

### Configuration
Ensure that the `BASE_URL` in the `login.spec.ts` file is set to the correct endpoint for your API:
```typescript
const BASE_URL = 'https://mockapi.rapidextras.com/login';
```

### Running the Tests
To run the tests, use the following command:
```sh
npx playwright test
```

### Viewing the Report
After running the tests, you can generate and view the Playwright test report with the following command:
```sh
npx playwright show-report
```
This will open a browser window displaying the test results and detailed information about each test case.

#### Report Sections
- **Overview**: Provides a summary of the test run, including the number of tests passed, failed, and skipped.
- **Test Cases**: Lists all the test cases executed, with details on their status (passed, failed, or skipped).
- **Error Details**: For any failed tests, this section provides detailed error messages and stack traces to help diagnose issues.
- **Screenshots and Videos**: If configured, Playwright can capture screenshots and videos of the test run, which will be displayed in this section for visual debugging.

## Test Scenarios
The tests cover the following scenarios:
- **Successful login**: Valid username and password.
- **Empty username or password**: Missing credentials.
- **Invalid login**: Incorrect username or password.
- **Malformed JSON response**: Handling of malformed JSON responses.
- **Server error**: Simulating server errors.
- **Slow response**: Handling of slow responses.
- **Special characters in username or password**: Testing special characters.
- **Long username or password**: Testing excessively long credentials.
- **Invalid JSON structure**: Handling invalid JSON structures.
- **SQL Injection attempt**: Testing for SQL injection vulnerabilities.
- **Response headers validation**: Ensuring response headers contain the correct content type.
- **Response cookies validation**: Checking for cookies in the response and validating their properties.
- **Response token validation**: Ensuring the response contains a token when the login is successful.
- **Check headers and cookies**: Validating response headers and cookies for a successful login.

## Author
Gaucho Agregado