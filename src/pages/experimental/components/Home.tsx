import { Box, Grid, Card, Typography } from '@mui/material'

export default function Home() {
  return (
    <Grid>
      <Card elevation={3} sx={{ p: 4, width: '380px', m: '20px auto' }}>
        <Box>
          <Typography variant="caption">実験用のページ</Typography>
        </Box>
      </Card>
    </Grid>
  )
}
