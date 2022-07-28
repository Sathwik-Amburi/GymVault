# GymVault

GymVault is an online platform to help gym owners and potential gym clients connect by allowing clients to browse a gyms catalog, choose the gym that matches their needs and pay for what they use digitally.

# Running the application

## Initial setup

- In `backend` run `npm install`
- In `frontend` run `npm install`

## To start the backend

### `cd backend && node index.js`

## To start the frontend

### `cd frontend && npm start`

## To setup environment variables

- Navigate to `prototype/backend` and create a `.env` file
- copy into `.env` the variables
  - MONGODB_CONNECTION_STRING=mongodb+srv://mongoDBadmin:pg8B3Jk4SguSs0lP@gymvault.15i2jjh.mongodb.net/gymvaultDB
  - JWT_SECRET=mksejklfw38yhio336
  - JWT_EXPIRATION=2h
  - GMAIL_GYMVAULT_ACCOUNT_USERNAME=gymvault.noreply@gmail.com
  - GMAIL_GYMVAULT_ACCOUNT_PASSWORD=dC!E9M[YU]\_Jwdd!d>8x
  - GOOGLE_CLIENT_ID=195046756501-pg2ktn9ociknvjsltlhi27c9b39hq7qb.apps.googleusercontent.com
  - STRIPE_SK=sk_test_51LG70WG5Luv4PP0963pHEyX1qVZnKWlIWYRGQIl8XVglZ6xrmDh2oKzO1u6RBBLblFgQm8aHbfyvL4O8MvqBNbOj00HeqcCLWq
  - AWS_ACCESS_KEY=AKIA6ME3SDQ2D6HIQHZF
  - AWS_SECRET_KEY=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
  - AWS_REGION=us-east-1
  - S3_BUCKET=gymvaultv1
