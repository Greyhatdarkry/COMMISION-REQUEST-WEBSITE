# CircuitWorks

A React + Three.js landing page for IoT, embedded systems, electronics and prototype engineering inquiries.

## Live deployment

This project is now live and deployed as `@Greyhatdarkry/COMMISION-REQUEST-WEBSITE`:

- GitHub Pages: https://greyhatdarkry.github.io/COMMISION-REQUEST-WEBSITE/

## Run locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Create a public GitHub repository named `circuitworks`.
2. Upload all files in this folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions** as the source.
5. Push to the `main` branch. The workflow in `.github/workflows/deploy.yml` builds and deploys the site.
6. Your site will be available at `https://YOUR-GITHUB-USERNAME.github.io/circuitworks/`.

If you use a different repository name, update `base` in `vite.config.js` to `/<repository-name>/` before deploying.

## Project inquiry form

The form is currently in preview mode and does not send or store submissions. Configure a trusted backend endpoint before publishing the form as live. Do not put Gmail passwords, API keys, or private credentials into client-side code or form fields.

## Academic integrity

For academic projects, provide transparent prototype, tutoring, debugging and technical-development services. Clients should understand the work, participate appropriately, and follow their institution's policies and ethical expectations.
