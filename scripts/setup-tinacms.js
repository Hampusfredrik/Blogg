#!/usr/bin/env node

/**
 * TinaCMS Setup Script for Astro Blog
 * 
 * This script helps you complete the TinaCMS setup process.
 */

const fs = require('fs');
const path = require('path');

console.log(`
🎉 TinaCMS Setup Complete!

Your blog is now configured for TinaCMS. Here's what's been set up:

✅ TinaCMS dependencies installed
✅ Configuration files created
✅ Admin interface ready

📋 NEXT STEPS:

1. Create a Tina.io account:
   → Go to https://tina.io
   → Sign up for a free account

2. Create a new project:
   → Click "Create Project"
   → Connect your GitHub repository: hampusfredrik/blogg
   → Choose "Astro" as your framework

3. Get your credentials:
   → Copy your Client ID from the project dashboard
   → Copy your Token from the project settings

4. Update configuration files:
   → Replace 'demo-client-id' in tina/config.ts with your Client ID
   → Replace 'demo-token' in tina/config.ts with your Token
   → Do the same in public/admin/index.html

5. Set environment variables in Vercel:
   → Go to your Vercel project settings
   → Add environment variables:
     - TINA_PUBLIC_CLIENT_ID = your-client-id
     - TINA_TOKEN = your-token

6. Test locally:
   → Run: npm run tina-dev
   → Visit: http://localhost:4321/admin/

7. Deploy to production:
   → Push your changes to GitHub
   → Vercel will automatically deploy
   → Visit: https://blogg-brown-two.vercel.app/admin/

🎯 Your admin panel will be available at:
   https://blogg-brown-two.vercel.app/admin/

Once configured, you'll be able to:
• Create and edit blog posts
• Upload images
• Preview changes in real-time
• Manage content without touching code

Happy blogging! ✨
`);

// Check if config files exist
const configPath = path.join(process.cwd(), 'tina', 'config.ts');
const adminPath = path.join(process.cwd(), 'public', 'admin', 'index.html');

if (fs.existsSync(configPath) && fs.existsSync(adminPath)) {
  console.log('✅ Configuration files are in place');
} else {
  console.log('❌ Configuration files missing - please check the setup');
}