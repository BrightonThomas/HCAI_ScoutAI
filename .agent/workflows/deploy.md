---
description: How to deploy the Scout Activity Planning App for free
---

# Deploying to the Web

You can deploy your React app for free using **Netlify** or **Vercel**. Here are the two easiest methods.

## Method 1: Netlify Drag & Drop (Easiest & Fastest)
This method requires no accounts linked to your code, just a Netlify account.

1. **Build your project** (if you haven't already):
   Run the following command in your terminal:
   ```powershell
   npm run build
   ```
   This creates a `dist` folder in your project directory containing the production-ready website.

2. **Go to Netlify**:
   - Visit [app.netlify.com/drop](https://app.netlify.com/drop).
   - Sign up or Log in if asked.

3. **Drag and Drop**:
   - Open your project folder in File Explorer: `D:\Studies\UZH-M.Sc\Semester 3\Human Centered AI\FINAL PROJECT`
   - Locate the `dist` folder.
   - Drag the **entire `dist` folder** onto the target area on the Netlify page.

4. **Done!**:
   - Netlify will give you a random URL (e.g., `scout-planner-123.netlify.app`).
   - You can change the site name in "Site Settings".

---

## Method 2: Vercel via GitHub (Best for updates)
This method is better if you plan to update the app frequently.

1. **Push your code to GitHub**:
   - Create a new repository on GitHub.
   - Push your code to it.

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign up.
   - Click "Add New..." -> "Project".
   - Select your GitHub repository.
   - Vercel detects it's a Vite project automatically.
   - Click **Deploy**.

3. **Done!**:
   - Vercel will give you a URL.
   - Every time you push code to GitHub, Vercel will automatically update your site.
