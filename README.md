🐱 Profile API with Cat Facts

A lightweight RESTful API that returns user profile details along with random cat facts fetched from an external API.


✨ Features

RESTful JSON responses

Dynamic timestamps (UTC ISO 8601)

Integration with Cat Facts API

CORS-enabled with error handling

Environment-based configuration and logging

🛠 Tech Stack

Runtime: Node.js (v18+)

Framework: Express.js

HTTP Client: Axios

Env Management: dotenv

📖 API Endpoints
GET /me

Returns user info with a random cat fact.
Example Response:

{
  "status": "success",
  "user": {
    "email": "your.email@example.com",
    "name": "Your Full Name",
    "stack": "Node.js/Express"
  },
  "timestamp": "2025-10-17T14:23:45.678Z",
  "fact": "Cats sleep 70% of their lives."
}

GET /health

Health check endpoint.

{ "status": "ok", "timestamp": "2025-10-17T14:23:45.678Z" }

💻 Setup
1. Clone & Install
git clone https://github.com/Samuel-odunayo/profile-api.git
cd profile-api
npm install

2. Configure Environment

Create a .env file:

PORT=3000
USER_EMAIL=Odunakomolede@gmail.com
USER_NAME=Odunayo Akomolede
USER_STACK=Node.js/Express
CAT_API_URL=https://catfact.ninja/fact

🏃 Run Locally

Development:

npm run dev


📁 Structure
profile-api/
├── server.js
├── package.json
├── .env
├── .gitignore
└── README.md

🔧 Error Handling

503 → External Cat API failure
