import React, {useEffect, useState} from 'react'
import { HeaderPage, TableUsers, AddEditUserForm } from '../../components/Admin'
import { ModalBasic } from '../../components/Common'
import { useUser } from '../../hooks'

export function UsersAdmin() {
  const [titleModal, setTitleModal] = useState(null);
  const [show, setShow] = useState(false);
  const [contentModal, setContentModal] = useState(null)
  const { loading, users, getUsers, deleteUser } = useUser();
  const [refresh, setRefresh] = useState(false)

    useEffect(() => {
      getUsers();
    }, [refresh])
    
    const openCloseModal = () => setShow((prev) => !prev);
    const onRefresh = () => setRefresh((prev) => !prev);

    const addUser = () => {
      setTitleModal('Agregar usuario');
      setContentModal(<AddEditUserForm onClose={openCloseModal} onRefresh={onRefresh}/>);
      openCloseModal();
    }

    const updateUser = (data) => {
      setTitleModal('Actualizar usuario');
      setContentModal(<AddEditUserForm onClose={openCloseModal} onRefresh={onRefresh} user={data}/>);
      openCloseModal();
    }

    const onDeleteUser = async (data) => {
      const result = window.confirm(`Desea eliminar el usuario ${data.username} ?`);

      if (result) {
        try {
          await deleteUser(data.id);
          onRefresh();
        } catch (error) {
          console.error(error);
        }
      }
    }
  return (

    <>
        <HeaderPage title='Usuarios' btnTitle='Nuevo usuario' btnClick={addUser}/>
        <TableUsers loading={loading} users={users} updateUser={updateUser} onDeleteUser={onDeleteUser}/>

        <ModalBasic show={show} title={titleModal} onClose={openCloseModal} children={contentModal}/>
    </>
  )
}
