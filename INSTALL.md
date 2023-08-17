# ReactApp

## step1

```
npm create vite -- react-app --template react-swc-ts
cd react-app
npx npm-check-updates -u
npm install
npm run dev
```

## step2 devtools

npm install --save-dev prettier eslint-config-prettier
npm install --save-dev eslint eslint-plugin-react
npm install --save-dev @tanstack/eslint-plugin-query
npm install --save-dev vitest @testing-library/jest-dom @testing-library/react @testing-library/user-event jsdom

## step3 setup

### .editorconfig

```
cat << EOF > .editorconfig
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.py]
indent_size = 4

[*.html]
indent_size = 2

[*.md]
indent_size = 4
insert_final_newline = false
trim_trailing_whitespace = false
EOF
```

### vscode (\*\*\*.code-workspace)

```
cat << EOF > react-app.code-workspace
{
  "folders": [
    {
      "path": "."
    }
  ],
  "settings": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  },
  "extensions": {
    "recommendations": [
      "editorconfig.editorconfig",
      "dbaeumer.vscode-eslint",
      "esbenp.prettier-vscode",
      "ms-vscode.live-server",
      "shd101wyy.markdown-preview-enhanced"
    ]
  }
}
EOF
```

### prettier (.prettierrc)

```
cat << EOF > .prettierrc
{
  "trailingComma": "none",
  "semi": false,
  "singleQuote": true,
  "printWidth": 160
}
EOF
```

### eslint (.eslintrc.cjs)

-   prettier を追加する。
-   parserOptions, plugins, extends を READMEのとおりに追加
-   ignorePatterns に 'vite.config.ts', 'tsconfig.json' を追加
-   rules をいくつか更新
-   reactのバージョンを追加（settings.react.version）

```
cat << EOF > .eslintrc.cjs
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'tsconfig.json'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname
  },
  plugins: ['react', 'react-refresh', '@tanstack/query'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    // https://github.com/orgs/react-hook-form/discussions/8020
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-misused-promises.md
    '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { arguments: false, attributes: false } }],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
  }
}
EOF
```

### tsconfig.json

-   include に tests ディレクトリを追加

```
cat << EOF > tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Alias */
    "types": ["node"],
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src", "tests"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF
```

### gitignore (.gitignore)

```
cat << EOF >> .gitignore

# dotenv environment variable files
.env
.env.development.local
.env.test.local
.env.production.local
.env.local
EOF
```

### index.html

```
cat << EOF > index.html
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
    <script>
      window.global = window
    </script>
  </body>
</html>
EOF
```

### .env

```
cat << EOF > .env
VITE_USER_POOL_ID=""
VITE_USER_POOL_WEB_CLIENT_ID=""
EOF
```

### .env.development

```
cat << EOF > .env.development
VITE_USER_POOL_ID=""
VITE_USER_POOL_WEB_CLIENT_ID=""
EOF
```

## step4

### vite.coinfig.ts

-   @/ のパスエイリアスが効くように設定 → path と resolve を追加
-   test で、vitest の基本設定を追加
-   process.envを使えるようにする。

vite.config.ts (catでは張り付けられないので書き換え)

```
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
```

## step5

```
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install @mui/lab @mui/x-date-pickers date-fns @mui/x-data-grid
npm install react-hook-form yup @hookform/resolvers
npm install react-router-dom
npm install recoil
npm install @tanstack/react-query
npm install axios
npm install @tanstack/react-table
npm install aws-amplify aws-jwt-verify
npm install chart.js react-chartjs-2 chartjs-adapter-date-fns
npm install leaflet react-leaflet @changey/react-leaflet-markercluster
npm install -D @types/leaflet
npm install qrcode.react
npm install vis-network
```

## step6

### src/theme.tsx

```
cat << EOF > src/theme.tsx
import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// A custom theme for this app
const theme = createTheme({
  typography: {
    fontFamily: ['Noto Sans JP', 'sans-serif'].join(',')
  },
  palette: {
    primary: { main: '#002b62' },
    secondary: { main: '#19857b' },
    background: { default: '#f5f5f5' },
    error: { main: red.A400 }
  },
  // https://qiita.com/honey32/items/b3585b75307b865267aa
  components: {
    // TextField 関連のコンポーネントのスタイルを調整する
    MuiInputLabel: {
      styleOverrides: {
        formControl: {
          // 移動をクリック時に動かないように固定
          position: 'static',
          transform: 'none',
          transition: 'none',
          // タイポグラフィを指定
          fontWeight: 'bold',
          fontSize: '0.85rem'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          marginTop: 4
        },
        input: {
          height: 'auto'
        },
        notchedOutline: {
          // デフォルトだと、 position が absolute、
          // ラベルをはみ出させるため上に少しの余白がある
          top: 0,
          legend: {
            // 内包された legend 要素によって、四角の左側の切り欠きが実現されているので、
            // 表示されないように。
            // (SCSS と同様にネスト記述が可能です。)
            display: 'none'
          }
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          // フォーム下部のテキスト、エラーメッセージ
          // お好みで左余白を無くしています。
          marginLeft: 0
        }
      }
    }
  }
})
export default theme
EOF
```

### src/main.tsx

```
cat << EOF > src/main.tsx
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { RecoilRoot } from 'recoil'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ja from 'date-fns/locale/ja'
import theme from './theme'
import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RecoilRoot>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </RecoilRoot>
  </StrictMode>
)
EOF
```

### src/aws-exports.ts

```
cat << EOF > src/aws-exports.ts
export default {
  aws_cognito_region: 'ap-northeast-1',
  aws_user_pools_id: process.env.VITE_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.VITE_USER_POOLS_WEB_CLIENT_ID,
  oauth: {}
}
EOF
```
