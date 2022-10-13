import React, { useState, useEffect } from 'react'
import { Spinner } from 'flowbite-react'
import { HeaderPage } from '../../components/Admin'
import { ModalBasic } from '../../components/Common'
import { TableMesas, AddEditFormTable } from '../../components/Admin'
import { useTable } from '../../hooks/useTable'

export function TablesAdmin() {
  const { getTables, loading, error, tables, deleteTable } = useTable()
  const [show, setShow] = useState(false)
  const [titleModal, setTitleModal] = useState(null)
  const [contentModal, setContentModal] = useState(null)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    getTables()
  }, [refresh])
  

  const openCloseModal = () => {
    setShow((prev) => !prev);
  }

  const onRefresh = () => setRefresh((prev) => !prev)

  const onAddTable = () => {
    setTitleModal('Agregar mesa')
    setContentModal(<AddEditFormTable onRefresh={onRefresh} onClose={openCloseModal} />)
    openCloseModal()
  }

  const onUpdateTable = (data) => {
    setTitleModal('Actualizar mesa')
    setContentModal(<AddEditFormTable onRefresh={onRefresh} onClose={openCloseModal} tables={data} />)
    openCloseModal()
  }

  const onDeleteTable = async (data) => {
    const result = window.confirm(`Desea eliminar la mesa ${data.number}?`);

      if (result) {
        try {
          await deleteTable(data.id);
          onRefresh();
        } catch (error) {
          console.error(error);
        }
      }
  }
  return (
    <>
      <HeaderPage title='Mesas' btnTitle='Nueva mesa' btnClick={onAddTable} />
      {loading ? (
        <div className='text-center' >
        <Spinner
            aria-label="loading"
            size="xl"
            />
        </div>
      ) :
        <TableMesas tables={tables} onUpdateTable={onUpdateTable} onDeleteTable={onDeleteTable} />
      }
      <ModalBasic show={show} title={titleModal} onClose={openCloseModal} children={contentModal} />
    </>
  )
}
