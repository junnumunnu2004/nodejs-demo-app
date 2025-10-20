Good morning everyone — I’m excited to learn during this DevOps internship!

---

## Node.js Demo App (nodejs-demo-app)

This is a minimal Node.js app to demonstrate local development, containerization with Docker, and CI/CD via GitHub Actions pushing to DockerHub.

### What this app does
- Returns plain text response: "Hello from nodejs-demo-app" on port 3000
- Includes a simple smoke test that checks HTTP 200 on `/`
- Ships a lightweight Docker image based on `node:18-alpine`
- CI/CD: installs deps, runs tests, then builds and pushes Docker image

### Prerequisites
- Node.js 18+
- Docker (for container build/run)
- A DockerHub account (for CI/CD push)

### Run locally
```bash
npm install
npm start
# open http://localhost:3000
```

### Run tests (server must be running on localhost:3000)
```bash
npm test
```

### Run with Docker locally
```bash
docker build -t demo .
docker run -p 3000:3000 demo
# open http://localhost:3000
```

### CI/CD with GitHub Actions and DockerHub
- Pushes on branch `main` trigger the workflow in `.github/workflows/main.yml`:
  - Checkout repository
  - Setup Node 18
  - `npm ci`
  - Start app, smoke check with `curl`, run `npm test`, stop app
  - Login to DockerHub using GitHub Secrets
  - Build and push Docker image `DOCKERHUB_USERNAME/nodejs-demo-app:latest`

### Configure DockerHub secrets in GitHub
1. In your GitHub repo, go to: Settings → Secrets and variables → Actions → New repository secret
2. Add the following secrets:
   - `DOCKERHUB_USERNAME`: your DockerHub username
   - `DOCKERHUB_TOKEN`: a DockerHub access token (Account Settings → Security → New Access Token)
3. Push to `main` to trigger the pipeline

### Project structure
```
nodejs-demo-app/
├── package.json
├── package-lock.json
├── index.js
├── test.js
├── Dockerfile
├── .github/
│   └── workflows/
│       └── main.yml
└── README.md
```

