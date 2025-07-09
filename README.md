## Overview

The next-generation version of [my personal blog](https://github.com/artndev/artndev-blog) with a lot of improvements and an upgraded tech stack.

In this version Back-end (REST API is available at /api subpath) and Front-end work on the same domain without any CORS policy.

## Tech Stack

**Front-end:** React + Vite, Tailwind CSS, shadcn/ui, MagicUI, BundUI.
</br>
**Back-end:** Spring Boot, MySQL.

## Run Locally

Install [Git](https://git-scm.com/) on your machine to clone the repository.

## Clone repository

Create a new directory where you want to deploy the personal blog, then clone the repository into it:

```bash
git clone https://github.com/artndev/artndev-blog-v2.git .
```

Navigate to the project directory:

```bash
cd root
```

Change the working branch from _master_ (production branch) to _dev-public_ (public development branch) in the project directory to go through further steps without any issues:

```bash
git checkout dev-public
```

## Configure ENVs

### Front-end ENV

Navigate to the front-end directory:

```bash
cd src/main/client
```

Open the _.env_ file and fill in the required variables:

```env
# IP of admin (other IPs will be blacklisted)
VITE_ADMIN_AUTH_IP=...
# Token to sign in to admin panel using UUIDv4 format
# To generate UUIDv4 token, follow link below:
# https://www.uuidgenerator.net/version4
VITE_ADMIN_AUTH_TOKEN=...

# URL of API remains untouchable (if you are running project locally)
# Otherwise, change API URL to something like this:
# https://your-domain.com/api
VITE_API_URL=http://localhost:8080/api

# URL of source code in header
VITE_SOURCE_URL=https://github.com/artndev/artndev-blog-v2

# URLs in footer
VITE_GITHUB_URL=https://github.com/artndev
# Yours Telegram
VITE_TELEGRAM_URL=...
VITE_LICENSE_URL=https://github.com/artndev/artndev-blog-v2/blob/master/LICENSE.md
```

### Back-end ENV

Return to the root directory:

```bash
cd ../../..
```

Open the _.env_ file located in the root directory and fill in your database credentials:

```env
# Fetch your DB credentials to paste here
DB_HOST=...
DB_NAME=...
DB_PASSWORD=...
DB_PORT=...
DB_USERNAME=...
```

## Build using Docker

Install [Docker](https://www.docker.com/) (Docker Desktop or Docker Engine on Linux) on your machine to build and run the project locally.

In the root directory, run the _build.sh_ script to build the project with Docker:

```bash
bash build.sh
```

## Access application

Once the build completes successfully, the application will be available at http://localhost:8080.
