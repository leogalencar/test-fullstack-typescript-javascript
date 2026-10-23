import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const FRONTEND_PORT = Number(process.env.FRONTEND_PORT ?? 3000)

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: { port: FRONTEND_PORT }
})
