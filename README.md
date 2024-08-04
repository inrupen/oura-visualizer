# Oura Visualizer

This project visualizes sleep and health data from the Oura ring using a React frontend and a Node.js backend. The application is Dockerized for easy deployment.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/oura-visualizer.git
cd oura-visualizer
```

### Building and Running with Docker

Build the Docker images:
```bash
docker-compose build
```

Start the Docker containers:
```bash
docker-compose up
```

After running docker-compose up, your React application should be available at http://localhost:3000, and your backend server should be running at http://localhost:5500.

Stopping the Application
To stop the running containers, press Ctrl+C in the terminal where docker-compose up is running. Then, remove the stopped containers with:
docker-compose down

### Development

#### Running the Frontend Locally

Navigate to the frontend directory:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm start
```

The frontend should now be running on http://localhost:3000.

#### Running the Backend Locally

Navigate to the backend directory:

```bash
cd backend
npm install
```

Start the server:

```bash
node server.js
```

The backend should now be running on http://localhost:5500.

## File Upload

To upload a CSV file with your Oura data, navigate to the application in your browser and use the file upload feature. The data will be processed and visualized accordingly.

## Technologies Used:

React
Node.js
Docker
Chart.js for visualizations

