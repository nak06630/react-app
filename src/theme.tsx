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
