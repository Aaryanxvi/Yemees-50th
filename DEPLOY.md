# Deploying to Vercel

This guide will help you deploy your "yemee-50th-goa" project to Vercel for free.

## Prerequisites

1.  A GitHub account.
2.  A [Vercel account](https://vercel.com/signup).
3.  Your project pushed to a GitHub repository.

## Step 1: Push Code to GitHub

Since we just untracked the `.env` file for security, make sure to commit and push your changes:

```bash
git add .
git commit -m "feat: prepare for deployment, secure env vars"
git push origin main
```

## Step 2: Import into Vercel

1.  Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** > **"Project"**.
3.  Find your `yemee-50th-goa` repository in the list and click **"Import"**.

## Step 2.1: Choose Your URL Name

*   **Project Name**: By default, this will be `yemee-50th-goa`.
    *   **Change this now** if you want your URL to look different (e.g., `yemee-50`.vercel.app).
    *   The "Project Name" you set here becomes your free `.vercel.app` subdomain.

## Step 3: Configure Project

Vercel will automatically detect that you are using **Vite**.

1.  **Framework Preset**: Should be auto-detected as `Vite`.
    *   If it is not, select **Vite** from the dropdown.
2.  **Root Directory**: Check that it is set to `./` (default).
3.  **Build and Output Settings**:
    *   These should auto-populate, but if you need to enter them manually:
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
    *   **Install Command**: `npm install`

## Step 4: Add Environment Variables (CRITICAL)

You **MUST** add your Supabase keys here, as they are no longer in the code for security.

1.  Expand the **"Environment Variables"** section.
2.  Add the following keys (copy their values from your local `.env` file):

    *   **Key**: `VITE_SUPABASE_URL`
        *   **Value**: *[Your Project URL from Supabase]*
    *   **Key**: `VITE_SUPABASE_ANON_KEY`
        *   **Value**: *[Your Anon Key from Supabase]*

3.  Click **Add** for each one.

## Step 5: Deploy

1.  Click **"Deploy"**.
2.  Wait a minute or two.
3.  Once the confetti pops, your site is live! You will get a URL like `https://yemee-50th-goa.vercel.app`.

## Future Updates


## How to Change the URL Later

If you want to change the URL *after* deploying (or use a custom domain like `yemee50.com`):

1.  Go to your Project Dashboard on Vercel.
2.  Click **Settings** (top tab).
3.  Click **Domains** (side menu).
4.  You can **Edit** the existing domain or **Add** a new one.
