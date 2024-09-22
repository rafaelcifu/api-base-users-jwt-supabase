## Overview

This project is a comprehensive analytics and survey platform designed to help companies track project performance and gather user feedback. It features a robust data model for managing users, companies, projects, analytics, and various types of surveys.

## Features

- User authentication with multiple provider support
- Company and project management
- Role-based access control
- Analytics tracking for projects
- Survey creation and response collection (NPS, CSAT, CES)

## Tech Stack

- Backend: Node.js with Nest
- Database: PostgreSQL
- ORM: Prisma

## Database Schema

The project uses Prisma ORM with a PostgreSQL database. Key models include:

- User
- Company
- Project
- Analytics
- Survey
- SurveyResponse

For a detailed view of the schema, please refer to the `prisma/schema.prisma` file.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your PostgreSQL database
4. Create a `.env` file and add your `DATABASE_URL`
5. Run Prisma migrations:
   ```
   npx prisma migrate dev
   ```
6. Start the development server (command depends on your setup)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
