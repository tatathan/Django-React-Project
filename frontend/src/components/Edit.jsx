import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import DatePickerField from './forms/DatePickerField'
import MultilineField from './forms/MultilineField'
import SelectField from './forms/SelectField'
import SingleTextField from './forms/SingleTextField'
import { useForm } from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import {useNavigate, useParams} from 'react-router-dom'
import MultiSelectField from './forms/MultiSelectField'

const Edit = () => {
    const params = useParams()
    const id = params.id

    const [projectManager, setProjectManager] = useState()
    const [employees, setEmployees] = useState()
    const [loading, setLoading] = useState(true)

    const status_options = [
        {id:'', name:'None'},
        {id:'Open', name:'Open'},
        {id:'In Progress', name:'In Progress'},
        {id:'Completed', name:'Completed'},
    ]

    const GetData = () => {
        AxiosInstance.get('projectmanager/').then((res) => {
            setProjectManager(res.data)
        })

        AxiosInstance.get('employees/').then((res) => {
            setEmployees(res.data)
        })
    
        AxiosInstance.get(`project/${id}`).then((res) => {
            setValue('name', res.data.name)
            setValue('project_manager', res.data.project_manager)
            setValue('employees', res.data.employees)
            setValue('comments', res.data.comments)
            setValue('status', res.data.status)
            setValue('start_date', Dayjs(res.data.start_date))
            setValue('end_date', Dayjs(res.data.end_date))
            setLoading(false)
        })
    }
    useEffect(() => {
        GetData();
    }, [])

    const navigate = useNavigate()
    const defaultValues = {
        name:'',
        comments:'',
        status:''
    }
    const {handleSubmit, setValue, control} = useForm({defaultValues:defaultValues})
    const submission = (data) => {
        console.log(data)

        const startDate = Dayjs(data.start_date['$d']).format("YYYY-MM-DD")
        const endDate = Dayjs(data.end_date['$d']).format("YYYY-MM-DD")

        AxiosInstance.put(`project/${id}/`, {
            name: data.name,
            project_manager: data.project_manager,
            employees: data.employees,
            comments: data.comments,
            status: data.status,
            start_date: startDate,
            end_date: endDate,
        })
        .then((res) => {
            navigate('/')
        })
    }
  return (
    <div>
        { loading ? <p>Loading Data..</p> :
            <form onSubmit={handleSubmit(submission)}>
                <Box sx={{display:'flex', width: '100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
                    <Typography sx={{marginLeft:'20px', color:'#fff'}}>
                        Create Record
                    </Typography>
                </Box>
                <Box sx={{display:'flex', width: '100%', boxShadow:3, padding:4, flexDirection:'column'}}>
                    <Box sx={{display:'flex', justifyContent:'space-around', marginBottom:'40px'}}>
                        <SingleTextField
                            label='Name'
                            name='name'
                            control={control}
                            placeholder='provide a project name'
                            width='30%'
                        />
                        <DatePickerField
                            label='Start Date'
                            name='start_date'
                            control={control}
                            width='30%'
                        />
                        <DatePickerField
                            label='End Date'
                            name='end_date'
                            control={control}
                            width='30%'
                        />
                    </Box>
                    <Box sx={{display:'flex', justifyContent:'space-around'}}>
                        <MultilineField
                            label='Comments'
                            name='comments'
                            control={control}
                            placeholder='provide project comment'
                            width='30%'
                        />
                        <SelectField
                            label='Status'
                            name='status'
                            control={control}
                            width='30%'
                            options={status_options}
                        />
                        <SelectField
                            label='Project Manager'
                            name='project_manager'
                            control={control}
                            width='30%'
                            options={projectManager}
                        />
                    </Box>

                    <Box sx={{display:'flex', justifyContent:'start', marginTop: '20px'}}>
                        <MultiSelectField
                        label='Employees'
                        name='employees'
                        control={control}
                        options={employees}
                        />
                    </Box>

                    <Box sx={{display:'flex', justifyContent:'center', marginTop: '40px'}}>
                        <Button variant='contained' type='submit' sx={{width:'20%'}}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </form>
        }
    </div>
  )
}

export default Edit