/// <reference types="vitest" />
import { ConfigEnv, defineConfig, loadEnv, UserConfigExport } from 'vite'
import react from '@vitejs/plugin-react-swc'
// also don't forget to "npm i -D @types/node", so __dirname won't complain
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, process.cwd())

  // https://github.com/vitejs/vite/issues/1149#issuecomment-857686209
  // expose .env as process.env instead of import.meta since jest does not import meta yet
  const envWithProcessPrefix = Object.entries(env).reduce((prev, [key, val]) => {
    return { ...prev, ['process.env.' + key]: `"${val}"` }
  }, {})

  return defineConfig({
    // vite の設定
    define: envWithProcessPrefix,
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
    },
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom'
    }
  })
}
