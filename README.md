# Graphic Define – Agency Site

Website for [Graphic Define](https://graphicdefine.com): web design and development agency. Design inspired by [Linear](https://linear.app/).

## Run locally

```sh
npm install
npm run dev
```

## Build for production

```sh
npm run build
```

Static output is in `dist/`. The `api/` folder is used by Vercel as serverless functions.

## Deploy with GitHub + Vercel

1. **Create a GitHub repo** (e.g. `graphic-define-site`). Do not add a README or .gitignore when creating it.

2. **Push this project:**
   ```sh
   git remote add origin https://github.com/YOUR_USERNAME/graphic-define-site.git
   git branch -M main
   git push -u origin main
   ```

3. **In Vercel:** [vercel.com/new](https://vercel.com/new) → Import your GitHub repo. Framework Preset: **Vite**. Build Command: `npm run build`. Output Directory: `dist`. Leave as-is.

4. **Environment variables:** In the Vercel project → Settings → Environment Variables, add:
   - `GEMINI_API_KEY` – your [Google AI Studio](https://aistudio.google.com/apikey) key (chat widget).
   - `RESEND_API_KEY` – your [Resend](https://resend.com) API key (contact form).
   - To send form submissions to riley@graphicdefine.com (not just your Resend account email): verify **graphicdefine.com** at [resend.com/domains](https://resend.com/domains), add the DNS records they give you, then add `CONTACT_FROM_EMAIL` = `Graphic Define <contact@graphicdefine.com>` (or another address on that domain).  
   Redeploy after adding or changing env vars.
