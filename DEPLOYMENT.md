# Deployment Guide for Mini Venue Booking Dashboard

This guide will help you deploy the Mini Venue Booking Dashboard to Vercel.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account for the database
3. [Node.js](https://nodejs.org/) installed on your local machine
4. [Git](https://git-scm.com/) installed on your local machine

## Step 1: Set Up MongoDB Atlas

1. Create a new cluster in MongoDB Atlas
2. Create a database user with read/write permissions
3. Add your IP address to the IP Access List
4. Get your MongoDB connection string

## Step 2: Update Environment Variables

1. Update the `.env` file in the root directory with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/venue-booking?retryWrites=true&w=majority
   ```
   Replace `<username>`, `<password>`, and the cluster address with your actual MongoDB Atlas credentials.

## Step 3: Deploy to Vercel

### Option 1: Deploy using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```

4. Follow the prompts to complete the deployment.

### Option 2: Deploy using Vercel Dashboard

1. Push your code to a GitHub repository.

2. Log in to your Vercel account.

3. Click "Import Project" and select "Import Git Repository".

4. Enter your repository URL and click "Import".

5. Configure the project:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: frontend/build

6. Add the environment variable:
   - MONGODB_URI: Your MongoDB connection string

7. Click "Deploy".

## Step 4: Seed the Database

After deployment, you need to seed the database with sample venues:

1. Make a POST request to the `/api/seed` endpoint:
   ```
   https://your-vercel-app.vercel.app/api/seed
   ```

   You can use tools like Postman or curl:
   ```bash
   curl -X POST https://your-vercel-app.vercel.app/api/seed
   ```

## Troubleshooting

- If you encounter CORS issues, check that your frontend is correctly accessing the API endpoints.
- If database connections fail, verify your MongoDB Atlas connection string and ensure your IP is whitelisted.
- For other issues, check the Vercel deployment logs in your Vercel dashboard.

## Updating Your Deployment

To update your deployment after making changes:

1. Push your changes to your Git repository.
2. Vercel will automatically redeploy your application.

Or, if using Vercel CLI:

```bash
vercel --prod
```