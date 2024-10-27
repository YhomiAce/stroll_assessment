## Description

Dynamic Question Assignment

Technology

- Backend: Node.js, Express.js, Sequelize
- Database: PostgreSQL
- Scheduler: Node-cron
- Cache: Redis

Implementation

1. Database (Persistent Storage)
   A Nodejs app communicating with PostgreSQL through sequelize to store questions and cycles.

- Questions table where each row contains the question and its associated region (e.g., SG or US).
- Cycle table that stores how long each cycle lasts and when it starts (e.g., 7 days for Singapore starting at 7 pm Monday SGT).

2. Express.js (API Layer)

- This is the API users hit this endpoint to get the question for their region. It is a GET /question/:region route. In this example
  region can be <b>SG</b> or <b>US</b>

3. Caching with Redis (Performance Layer)

- Because questions for a region remain constant for a full cycle, it's wasteful to hit the database for every user request. Instead, Redis acts as a caching layer in Node.js. When a user asks for the current question, the system checks Redis first. If the question is already cached, it returns the cached version; otherwise, it fetches the question from the database and stores it in Redis.

4. Implement the Scheduler:

- Set up a cron job to to check for the start of a new cycle. 
- Update the Cycles table and the Cycle Cache when a new cycle starts.

Scalability Measures

1. Database Indexing: optimizes query performance.
2. Caching: implements Redis caching for frequent queries.
3. Load Balancing: distributes traffic across multiple instances.
4. Autoscaling: scales instances based on user traffic. suggest using kubernetics

## Prerequisites

<li>Node.js</li>
<li>Docker</li>
<li>Docker Compose</li>

## Getting Started

1. Clone this repository:

```bash
$ https://github.com/YhomiAce/stroll_assessment
```

2. Navigate to the project directory:

```bash
$ cd stroll_assessment
```

3. Create .env from .env.example:

```bash
$ cp .env.example .env
```

4. Build the Docker images and start the postgres container:

```bash
$ docker-compose up -d --build
```

5. Installation:

```bash
$ yarn install
```

6. Run Migrations:

```bash
$ yarn migrate
```

7. Run Seeder: To Seed the database with questions

```bash
$ yarn seed
```

## Running the app

```bash
# production mode
$ yarn start

# development mode
$ yarn dev

```

## Models and Migrations

<p> The ORM used for this project is <b>Sequelize</b> </p>
<p> The models are in the <b>src/models</b> folder</p>
<p> The migrations are in the <b>src/migrations</b> folder</p>
<p> To create a new empty migration:</p>

```bash
$ yarn migration:generate name-of-migration
```

<p> To run a migration:</p>

```bash
$ yarn migrate
```

<p> To Seed the database with questions:</p>

```bash
$ yarn seed
```
