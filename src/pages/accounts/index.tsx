import { useRecoilState } from 'recoil'
import { userState } from '@/store/user'
import DialogMFASetup from '@/components/dialogMFASetup'
import { Card, CardContent, CardHeader, Container } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { DataGrid, GridColDef, GridRowsProp, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid'
import { useState, useCallback } from 'react'

export default function Profile() {
  const [user] = useRecoilState(userState)
  const [mfa, setMFA] = useState(false)

  // アイコンをクリックしたときの処理
  const handleDetailClick = useCallback(
    (params: GridRowParams) => (event: { stopPropagation: () => void }) => {
      event.stopPropagation()
      console.log(`handleDetailClick=${JSON.stringify(params.row, null, 2)}`)
      console.log(mfa)
    },
    []
  )

  // 表示するアクションを返す関数です
  const getDetailAction = useCallback(
    (params: GridRowParams) => [
      <GridActionsCellItem icon={params.row.action ? <EditIcon /> : <div></div>} onClick={handleDetailClick(params)} color="inherit" key={params.id} />
    ],
    [handleDetailClick]
  )

  const columns: GridColDef[] = [
    { field: 'key', headerName: 'key', width: 200 },
    { field: 'val', headerName: 'value', width: 500 },
    { field: 'actions', headerName: 'action', type: 'actions', getActions: getDetailAction }
  ]
  const rows: GridRowsProp = [
    { id: 1, key: 'Id', val: user?.id, action: false },
    { id: 2, key: 'Name', val: user?.name, action: false },
    { id: 3, key: 'Email', val: user?.email, action: false },
    { id: 4, key: 'auth_time', val: user ? new Date(user.auth_time * 1000).toLocaleString() : '', action: false },
    { id: 5, key: 'iat', val: user ? new Date(user.iat * 1000).toLocaleString() : '', action: false },
    { id: 6, key: 'exp', val: user ? new Date(user.exp * 1000).toLocaleString() : '', action: false }
  ]

  if (!user) return <div>Error</div>

  return (
    <>
      <Container maxWidth="lg" sx={{ pt: 5 }}>
        <Card>
          <CardHeader title="ログイン"></CardHeader>
          <CardContent>
            <div style={{ width: '100%' }}>
              <DataGrid rows={rows} columns={columns} density="compact" autoHeight />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="ログイン"></CardHeader>
          <CardContent>
            <pre>user = {JSON.stringify(user, null, 2)}</pre>
          </CardContent>
        </Card>
        {<DialogMFASetup open={mfa} onClose={() => setMFA(false)} />}
      </Container>
    </>
  )
}
