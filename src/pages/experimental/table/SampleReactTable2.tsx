import { useMemo } from 'react'
import { Card } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/hooks/fetcher'
import BasicReactTable from './BasicReactTable'

const useFetchUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => fetcher('get', 'https://jsonplaceholder.typicode.com/users', {})
  })
}

export default function SampleTable() {
  const { data, isLoading, error } = useFetchUsers()

  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: 'First Name', size: 150 },
      { accessorKey: 'name', header: 'Last Name', size: 150 },
      { accessorKey: 'username', header: 'Address', size: 200 },
      { accessorKey: 'email', header: 'City', size: 150 }
    ],
    []
  )

  if (isLoading) return 'Loading...'
  if (error) {
    if (error instanceof Error) return <span>Error: {error.message}</span>
    return <span>Error: {String(error)}</span>
  }

  return (
    <Card sx={{ width: '100%' }}>
      <h2>ユーザ一覧</h2>
      <BasicReactTable columns={columns} data={data} />
    </Card>
  )
}
