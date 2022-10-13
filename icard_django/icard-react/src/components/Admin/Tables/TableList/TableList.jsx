import React, { useState, useEffect } from 'react'
import { Button, ToggleSwitch, Card } from 'flowbite-react'
import { HiRefresh } from "react-icons/hi";
import { MdDeliveryDining } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { map } from 'lodash'
import { TableCard } from '../TableCard'

export function TableList(props) {
    const { tables } = props  
    const [refresh, setRefresh] = useState(false)
    const [autoRefresh, setAutoRefresh] = useState(false)

    const onRefresh = () => setRefresh((prev) => !prev)

    useEffect(() => {
      if(autoRefresh){
        const autoRefreshAction = () => {
            onRefresh()

            setTimeout(() => {
                autoRefreshAction()
            }, 5000)
        }
        autoRefreshAction();
      }
    }, [autoRefresh])

    const onCheckAutoRefresh = (check) => {
        if (check) {
            setAutoRefresh(check)
        } else {
            window.location.reload()
        }
    }
    

  return (
    <>
        <div className='flex justify-end gap-4 items-center'>
            <Button>
                <HiRefresh className='h-4 w-4' onClick={onRefresh} />
            </Button>
            <ToggleSwitch
                label='Actualización automatica'
                checked={autoRefresh}
                onChange={(data) => onCheckAutoRefresh(data)}
            />
        </div>
        <div className='flex gap-4'>
            <Link className='cursor-pointer mt-4' to={`/admin/mesa/`}>
                <Card>
                    <div className='flex flex-col items-center'>
                        <MdDeliveryDining className='w-auto h-11 border rounded-md p-1.5 m-3' />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                            Domicilios
                        </h5>
                    </div>
                </Card>
            </Link>
            {map(tables, (table, index) => (
                <TableCard table={table} index={index} refresh={refresh} />
            ))}
        </div>
    </>
  )
}
