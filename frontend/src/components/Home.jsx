import React, { useEffect, useMemo, useState } from 'react'
import AxiosInstance from './Axios'
import { MaterialReactTable } from 'material-react-table';
import Dayjs from 'dayjs';
import { Box, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Home = () => {

  const [fetchedData, setFetchedData] = useState()
  const [loading, setLoading] = useState(true)

  const GetData = () => {
    AxiosInstance.get('project/').then((res) => {
      console.log(res.data)
      setFetchedData(res.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    GetData();
  }, [])
  const columns = useMemo(() => [
    {
      accessorKey: 'name', //access nested data with dot notation
      header: 'Name',
      size: 150,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 150,
    },
    {
      accessorKey: 'comments', //normal accessorKey
      header: 'Comments',
      size: 200,
    },
    {
      accessorFn: (row) => Dayjs(row.start_date).format('DD MMM YYYY'),
      header: 'Start Date',
      size: 150,
    },
    {
      accessorFn: (row) => Dayjs(row.end_date).format('DD MMM YYYY'),
      header: 'End Date',
      size: 150,
    },
  ],
    [],
  );

  return (
    <div>
      { loading ? <p>Loading Data..</p> :
        <MaterialReactTable
          columns={columns}
          data={fetchedData}
          enableRowActions
          renderRowActions={({row}) => (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
              <IconButton color="secondary" component={Link} to={`edit/${row.original.id}`}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" component={Link} to={`delete/${row.original.id}`}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        />
      }
    </div>
  )
}

export default Home