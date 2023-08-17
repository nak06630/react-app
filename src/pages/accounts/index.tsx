import { useRecoilState } from 'recoil'
import { userState } from '@/store/user'
import DialogMFASetup from '@/components/auth/dialogMFASetup'
import { Card, CardContent, CardHeader } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { DataGrid, GridColDef, GridRowsProp, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid'
import { useState, useCallback } from 'react'
import { utc2jst } from '@/utils/misc'

export default function Profile() {
  const [user] = useRecoilState(userState)
  const [mfa, setMFA] = useState(false)

  // アイコンをクリックしたときの処理
  const handleDetailClick = useCallback(
    (params: GridRowParams) => (event: { stopPropagation: () => void }) => {
      event.stopPropagation()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (params.row.key == 'MFA') setMFA(true)
      console.log(`handleDetailClick=${JSON.stringify(params.row, null, 2)}`)
      console.log(mfa)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // 表示するアクションを返す関数です
  const getDetailAction = useCallback(
    (params: GridRowParams) => [
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      <GridActionsCellItem label="詳細" icon={params.row.action ? <EditIcon /> : <></>} onClick={handleDetailClick(params)} color="inherit" key={params.id} />
    ],
    [handleDetailClick]
  )

  const columns: GridColDef[] = [
    { field: 'key', headerName: 'key', width: 200 },
    { field: 'val', headerName: 'value', width: 500 },
    { field: 'actions', headerName: 'action', type: 'actions', getActions: getDetailAction }
  ]
  const rows: GridRowsProp = [
    { id: 1, key: 'Username', val: user?.id, action: false },
    { id: 2, key: 'Sub', val: user?.sub, action: false },
    { id: 3, key: 'Name', val: user?.name, action: false },
    { id: 4, key: 'Email', val: user?.email, action: false },
    { id: 5, key: 'auth_time', val: user ? utc2jst(user.auth_time * 1000) : '', action: false },
    { id: 6, key: 'iat', val: user ? utc2jst(user.iat * 1000) : '', action: false },
    { id: 7, key: 'exp', val: user ? utc2jst(user.exp * 1000) : '', action: false },
    { id: 8, key: 'MFA', val: '', action: true }
  ]

  if (!user) return <div>Error</div>

  return (
    <>
      <Card>
        <CardHeader title="ログイン"></CardHeader>
        <CardContent>
          <DataGrid rows={rows} columns={columns} density="compact" autoHeight />
        </CardContent>
      </Card>
      {<DialogMFASetup open={mfa} onClose={() => setMFA(false)} />}
    </>
  )
}
