# Ingenta

## Introduction

Welcome to the documentation for the **Ingenta** project. This document provides detailed instructions on how to start, build, and run the project using various methods, along with insights into its key features, tech stack, and file structure.

## Features

- **Target Schools**: Visualizes a list of target schools along with their rankings and predicted acceptance probabilities. Features include:

  - **Drag and Drop**: Users can drag and drop schools to update their rankings.

- **Improvement Plans**: Displays improvement plans with progress bars for different subjects, helping users track their progress. Features include:

  - **Select Box**: Users can select among different improvement plans for viewing.

- **Score Distribution**: Shows the distribution of scores and their importance, providing insights into performance. Features include:
  - **Hover State**: Data point dots have a hover state for enhanced interactivity and visualization.

## Tech Stack

The **Ingenta** project utilizes the following technologies:

- **Next.js**: A React framework for building server-side rendered and statically generated web applications.
- **React**: A JavaScript library for building user interfaces.
- **D3.js**: A JavaScript library for manipulating documents based on data, primarily used for creating data visualizations.
- **Tailwind CSS**: A utility-first CSS framework for quickly building custom designs without having to leave your HTML.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **ESLint**: A pluggable linting utility for JavaScript and JSX.
- **PostCSS**: A tool for transforming CSS with JavaScript plugins.
- **@types**: Type definitions for TypeScript.

## File Structure

- **/api**: Contains files for handling API calls.
- **/type**: Includes type definitions.
- **/src/components**: Houses all the components used in the project.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (v18 or later)
- npm (Node Package Manager)
- Docker (if you want to run the project using Docker)

### Installation

To install the project dependencies, navigate to the project directory and run:

```
npm install
```

This will install all the required dependencies listed in the package.json file.

This will install all the required dependencies listed in the `package.json` file.

## Development

During development, you can use the Next.js development server to preview your application. Run the following command:

```
npm run dev
```

This will start the development server, and you can access the application in your browser at `http://localhost:3000`.

## Build

To build the project for production deployment, run the following command:

```
npm run build
```

This will generate the production-ready build of your application in the `out` directory.

## Running with Docker

If you prefer to run the project using Docker, follow these steps:

1. Build the Docker image:
   ```
   docker-compose build
   ```
2. Run the Docker container: `docker-compose up` This will start the Docker container and serve the production build of your application. You can access it in your browser at `http://localhost:3000`.
