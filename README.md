## Quick Overview

The next-generation version of [my personal blog](https://github.com/artndev/artndev-blog) with a lot of improvements and an upgraded tech stack.

> In this version, Back-end and Front-end work on the same domain without any CORS policy issues. Thanks to the Maven plugin called _frontend-maven-plugin_, REST API is available at the _/api_ subpath.

## Tech Stack

**Front-end:** React + Vite, Tailwind CSS, shadcn/ui, MagicUI, BundUI.
</br>
**Back-end:** Spring Boot, MySQL.

## Dependencies

- Install [Git](https://git-scm.com/) on your machine to clone the Github repository.
- Install [Docker](https://www.docker.com/) (Docker Desktop or Docker Engine on Linux) on your machine to build and run the application locally.

## Clone Repository

Create a new directory where you want to deploy the application, then clone the Github repository into it:

```bash
git clone https://github.com/artndev/artndev-blog-v2.git .
```

Navigate to the project directory:

```bash
cd root
```

Change the working branch from _master_ (production branch) to _dev-public_ (public development branch) due to the specialties of the production and development environments:

```bash
git checkout dev-public
```

## Configure Environmental Variables

Open the _.env_ file located in the root directory and fill in the required environmental variables:

```env
# IP of admin (other IPs will be blacklisted)
VITE_ADMIN_AUTH_IP=...
# UUIDv4 token used for signing in to admin panel
# To generate UUIDv4 token, follow link below:
# https://www.uuidgenerator.net/version4
VITE_ADMIN_AUTH_TOKEN=...

# API URL remains untouchable (if you are running project locally)
# Otherwise, change API URL to something like this:
# https://your-domain.com/api
VITE_API_URL=http://localhost:8080/api

# URL of source code in header
VITE_SOURCE_URL=https://github.com/artndev/artndev-blog-v2

# URLs in footer
VITE_GITHUB_URL=https://github.com/artndev
VITE_TELEGRAM_URL=...
VITE_LICENSE_URL=https://github.com/artndev/artndev-blog-v2/blob/master/LICENSE.md

# Your DB credentials
# Table schemas can be found in src\main\java\com\blog\blog\schemas
DB_HOST=...
DB_NAME=...
DB_PASSWORD=...
DB_PORT=...
DB_USERNAME=...
```

## Build & Run Application with Docker

Run the _build.sh_ script located in the root directory to build and run the application with Docker:

```bash
bash build.sh
```

## Access Application

Once the build is completed successfully, the application will be available at http://localhost:8080.
