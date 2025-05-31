# WeatherWear

Help users decide what to wear based on local weather. This improves daily decision-making, especially in Canada's unpredictable climates, from freezing winters to sudden rain.

## 🌦️ Overview

WeatherWear is a full-stack application that provides clothing recommendations based on real-time weather data. No more overdressing or underdressing - get personalized suggestions that account for temperature, precipitation, wind, and other weather factors.

## ✨ Features

- **Real-time Weather Integration**: Get up-to-date weather information for any city
- **Personalized Clothing Recommendations**: Receive outfit suggestions tailored to your preferences
- **User Profiles**: Save your clothing preferences for better recommendations
- **History Tracking**: View your past recommendations and weather conditions
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## 🛠️ Technology Stack

### Frontend
- Next.js with TypeScript
- Tailwind CSS for styling
- React for interactive UI components

### Backend
- Spring Boot Java application
- RESTful API architecture
- OpenWeather API integration

### Infrastructure
- Docker containerization
- Docker Compose for local development
- GitHub Actions for CI/CD

## 🏗️ Architecture

WeatherWear follows a microservices architecture:

- **Frontend Container**: Next.js application serving the user interface
- **Backend Container**: Spring Boot application providing API endpoints
- **API Gateway**: Routes requests between frontend and backend

## 🚀 Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js (for local development)
- Java 17+ (for local development)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yannick-itoua/WeatherWear.git
   cd WeatherWear
   ```
2. Set up the backend
   - Navigate to the `backend` directory
   - Configure your `application.properties` with the necessary API keys and database settings
   - Build the backend application
     ```bash
     ./mvnw clean package
     ```
3. Set up the frontend
   - Navigate to the `frontend` directory
   - Install the necessary packages
     ```bash
     npm install
     ```
   - Configure your `.env.local` file with the backend API URL
4. Run the application
   - Start the backend
     ```bash
     ./mvnw spring-boot:run
     ```
   - In a new terminal, start the frontend
     ```bash
     npm run dev
     ```
5. Access WeatherWear
   - Open your browser and go to `http://localhost:3000`

## 📚 Usage

- Upon first visit, create a user profile and set your clothing preferences
- Allow location access or enter a city manually to get weather updates
- Receive clothing recommendations and view the weather forecast
- Provide feedback on recommendations to improve future suggestions

## 🤝 Contributing

We welcome contributions to WeatherWear!

1. Fork the repository
2. Create a new branch for your feature or bugfix
3. Make your changes and commit them
4. Push to your forked repository
5. Create a pull request describing your changes

Please ensure your code follows the existing style and includes appropriate tests.

## 📄 License

WeatherWear is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👀 Acknowledgements

- Inspired by the need for better personal weather applications
- Designed with user experience and accessibility in mind
