## Share-A-Meal Project
Environment Variables
Your application will require the following environment variables:

MONGODB_URI: The connection string for your MongoDB database.
AWS_REGION: The AWS region where your Cognito User Pool is located.
COGNITO_USER_POOL_ID: The ID of your Cognito User Pool.
COGNITO_CLIENT_ID: The ID of your Cognito Client (App Client).

You can store these environment variables in a .env file in the root directory of your server. Make sure to add this file to your .gitignore to prevent sensitive information from being committed to your repository.
API Routes
Your application will have the following API routes:

Authentication Routes (/auth)

POST /auth/register: Register a new user (restaurant or individual)
POST /auth/login: Authenticate and login a user


Listing Routes (/listings)

POST /listings/create: Create a new food listing (for restaurants)
GET /listings/all: Get all available food listings
PUT /listings/claim/:listingId: Claim a food listing (for individuals)


Restaurant Routes (/restaurants)

GET /restaurants/profile: Get the current restaurant's profile
PUT /restaurants/profile: Update the current restaurant's profile


Rating Routes (/ratings)

POST /ratings: Submit a rating and feedback for a restaurant or meal


Admin Routes (/admin)

GET /admin/users: Get a list of all users (for admins)
GET /admin/listings: Get a list of all food listings (for admins)
GET /admin/reports: Get a list of all reported issues (for admins)