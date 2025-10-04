#!/usr/bin/env node

/**
 * TinaCMS Setup Script
 * 
 * This script helps you set up TinaCMS for your Astro blog.
 * 
 * Steps to complete setup:
 * 1. Go to https://tina.io and create an account
 * 2. Create a new project
 * 3. Get your Client ID and Token
 * 4. Update the config files with your credentials
 */

console.log(`
🎉 TinaCMS Setup Complete!

Next steps:
1. Go to https://tina.io and create an account
2. Create a new project for your blog
3. Get your Client ID and Token from the dashboard
4. Update these files with your credentials:
   - tina/config.ts
   - public/admin/index.html

5. Set environment variables in Vercel:
   - TINA_PUBLIC_CLIENT_ID
   - TINA_TOKEN

6. Install dependencies:
   npm install

7. Start the development server:
   npm run tina-dev

Your admin panel will be available at:
- Local: http://localhost:4321/admin/
- Production: https://your-domain.vercel.app/admin/

Happy editing! ✨
`)
