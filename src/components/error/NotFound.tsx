import { Box, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Container maxWidth="md">
        <Typography variant="h1">404</Typography>
        <Typography variant="h6">お探しのページは見つかりませんでした。</Typography>
        <Link to="/">Topに戻る</Link>
      </Container>
    </Box>
  )
}
