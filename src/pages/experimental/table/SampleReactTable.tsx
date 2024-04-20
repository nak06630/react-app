import { useMemo } from 'react'
import { Card, CardContent } from '@mui/material'
//import BasicReactTable from '@/components/BasicTable'
import VirtualTable from '@/components/Virtual'

function range() {
  const array = []
  for (let i = 0; i < 50; i++) {
    array.push({ id: i, name: 'aaa' })
  }
  return array
}

export default function SampleTable() {
  const data = range()

  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: 'First Name', size: 150 },
      { accessorKey: 'name', header: 'Last Name', size: 150 },
      { accessorKey: 'username', header: 'Address', size: 200 },
      { accessorKey: 'email', header: 'City', size: 150 }
    ],
    []
  )

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent></CardContent>
      <h2>ユーザ一覧</h2>
      <VirtualTable />
      {/*
<BasicReactTable columns={columns} data={data} />
 */}
    </Card>
  )
}
