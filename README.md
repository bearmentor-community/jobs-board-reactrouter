# Jobs Board

Application to post and find jobs.

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
bun install
```

### Setup Database with Docker

To set up the database, you can use Docker. Make sure you have Docker installed and running.

Setup .env file

```bash
cp .env.example .env
```

```sh
POSTGRES_USER="jobsboard_user"
POSTGRES_PASSWORD="jobsboard_password"
POSTGRES_DB="jobsboard_db"

DATABASE_URL="postgresql://jobsboard_user:jobsboard_password@localhost:5432/jobsboard_db"
```

Then, run the following command to start the database:

```bash
docker compose up -d
```

### Migrate Database

Run the following command to create the database tables:

```bash
bun prisma migrate dev
```

Add some initial data through Prisma Studio:

```bash
bun prisma studio
```

### Development

Start the development server with HMR:

```bash
bun run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
bun run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
