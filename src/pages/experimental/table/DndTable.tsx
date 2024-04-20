/* eslint-disable react/prop-types */
import { FC, memo, useCallback, useState } from 'react'
import { DataGrid, GridColDef, GridRow, GridRowProps } from '@mui/x-data-grid'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core'
import { restrictToVerticalAxis, restrictToWindowEdges, restrictToParentElement } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export interface Row {
  id: number
  lastName: string
  firstName: string | null
  age: number | null
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160
  }
]
const initialRows: Row[] = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 11, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 12, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 13, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 14, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 15, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 16, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 17, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 18, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 19, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 21, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 22, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 23, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 24, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 25, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 26, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 27, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 28, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 29, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
]

type Props = {
  columns: GridColDef[]
  rows: Row[]
  onChange: (rows: Row[]) => void
}

// eslint-disable-next-line react/display-name
const DraggableGridRow = memo((params: GridRowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: params.rowId })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <GridRow {...params} />
    </div>
  )
})

// eslint-disable-next-line react/display-name
const DraggableDataGrid: FC<Props> = memo(({ columns, rows, onChange }) => {
  // ドラッグ可能なセンサーを設定
  const sensors = useSensors(useSensor(PointerSensor))

  // ドラッグ終了時の処理
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (over) {
        const oldIndex = rows.findIndex((rows) => rows.id === active.id)
        const newIndex = rows.findIndex((rows) => rows.id === over.id)
        onChange(arrayMove(rows, oldIndex, newIndex))
      }
    },
    [rows, onChange]
  )

  return (
    <div style={{ height: '400px' }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToWindowEdges, restrictToParentElement]}
        autoScroll={false}
      >
        <SortableContext items={rows.map((row) => row.id)} strategy={verticalListSortingStrategy}>
          <DataGrid rows={rows} columns={columns} slots={{ row: DraggableGridRow }} autoHeight checkboxSelection disableRowSelectionOnClick />
        </SortableContext>
      </DndContext>
    </div>
  )
})

export default function App() {
  const [rows, setRows] = useState(initialRows)

  const handleCangeRows = useCallback(
    (rows: Row[]) => {
      setRows(rows)
    },
    [setRows]
  )

  return (
    <div className="App">
      <DraggableDataGrid columns={columns} rows={rows} onChange={handleCangeRows} />
    </div>
  )
}
