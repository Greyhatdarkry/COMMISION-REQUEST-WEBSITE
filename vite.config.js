import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The GitHub repository should be named "circuitworks".
// If you choose a different repository name, change the base below to "/YOUR-REPO-NAME/".
export default defineConfig({
  plugins: [react()],
  base: '/COMMISION-REQUEST-WEBSITE/',
})
