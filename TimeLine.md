# Development Timeline

## 19/10/25

**Vercel Deployment Configuration** - Converted Express app to serverless architecture and successfully deployed to Vercel. Added vercel.json configuration file and updated package.json scripts for Vercel compatibility. Modified server.js to export app for serverless functions and conditionally start server only in non-production/non-test environments.

**Code Fixes and Cleanup** - Fixed "writeFullYear is not a function" error in Tracker.js by correcting function imports. Resolved git merge conflicts in createCalendar.js and Tracker.js files, removing all conflict markers and fixing syntax issues. Cleaned up development.js by renaming variables and commenting out unused code. Added empty rota to store.js. Formatted createCalendar.js for better readability.

**Documentation and Configuration** - Created TimeLine.md to track project development progress. Updated README.md with project overview and deployment information. Added skills-tools.md documenting technologies used. Added development configuration files (launch.json, nodemon.json) for improved debugging. Updated .gitignore to exclude Vercel and dev files.

**Testing Infrastructure** - Created test/server.test.ts with endpoint tests for all routes (/, /covid, /chatBot, /register, /tictactoe, /visitor, /contactForm, /workTracker) using Jest and Supertest. Simplified register.test.js to test only GET /register endpoint returning status 200. Fixed module import issues by converting ES6 imports to CommonJS require statements. Commented out console.log statements in calculate.test.js for cleaner test output. Updated server.js to prevent server startup during Jest tests (NODE_ENV !== 'test').

**Route Updates** - Updated base routes in ContactForm.js, VisitorCounter.js, and WorkTracker/routes/register.js. Uncommented endpoint routes in server.js to enable all API endpoints.
