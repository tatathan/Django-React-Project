import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import AxiosInstance from './Axios'
import {useNavigate, useParams} from 'react-router-dom'

const Delete = () => {
    const params = useParams()
    const id = params.id
    const [fetchedData, setFetchedData] = useState()
    const [loading, setLoading] = useState(true)

    const GetData = () => {
        AxiosInstance.get(`project/${id}`).then((res) => {
            console.log(`delete id: ${id}`)
            setFetchedData(res.data)
            setLoading(false)
        })
    }

    useEffect(() => {
        GetData();
    }, [])

    const navigate = useNavigate()

    const submission = (data) => {
        AxiosInstance.delete(`project/${id}/`)
        .then((res) => {
            navigate('/')
        })
    }
  return (
    <div>
        { loading ? <p>Loading Data..</p> :
            <div>
                <Box sx={{display:'flex', width: '100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
                    <Typography sx={{marginLeft:'20px', color:'#fff'}}>
                        Delete Project: {fetchedData.name}
                    </Typography>
                </Box>

                <Box sx={{display:'flex', width: '100%', boxShadow:3, padding:4, flexDirection:'column'}}>
                    <Box sx={{display:'flex', justifyContent:'start', marginBottom:'40px'}}>
                        Are you sure that you want to delete project: {fetchedData.name}?
                    </Box>

                    <Box sx={{width:'30%'}}>
                        <Button variant='contained' onClick={submission} sx={{width:'100%'}}>
                            Delete the project
                        </Button>
                    </Box>
                </Box>
            </div>
        }
    </div>
  )
}

export default Delete