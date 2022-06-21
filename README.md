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
`MONGODB_CONNECTION_STRING=mongodb+srv://mongoDBadmin:pg8B3Jk4SguSs0lP@gymvault.15i2jjh.mongodb.net/gymvaultDB`
`JWT_SECRET=mksejklfw38yhio336`
`JWT_EXPIRATION=2h`
