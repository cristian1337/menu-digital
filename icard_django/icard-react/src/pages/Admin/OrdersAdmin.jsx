import React, { useEffect } from 'react'
import { HeaderPage } from '../../components/Admin'
import { useTable } from '../../hooks/useTable'
import { Spinner } from 'flowbite-react'
import { TableList } from '../../components/Admin'

export function OrdesAdmin() {
  const { error, loading, getTables, tables}  = useTable();

  useEffect(() => {
    getTables()
  }, [])

  console.log(tables);

  return (
    <>
      <HeaderPage title='VirtualBar APP' />

      {loading ? (
        <div className='text-center' >
            <Spinner
                aria-label="Cargando"
                size="xl"
            />
        </div>
    ):
      <TableList tables={tables} />
    }
    </>
    
  )
}
