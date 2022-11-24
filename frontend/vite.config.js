import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

    
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Album-fotos-React/"  
  // build: {
  //   outDir: path.join( __dirname,'../backend/public')
  // }

})

