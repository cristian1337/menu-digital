import React from 'react';
import { Table, Spinner, Badge, Button } from 'flowbite-react';
import { HiCheck, HiX, HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import { map } from 'lodash';

export function TableUsers(props) {
    const { loading, users, updateUser, onDeleteUser } = props;

  return (
    <div className='mt-4'>
    {loading ? (
        <div className='text-center' >
            <Spinner
                aria-label="loading"
                size="xl"
            />
        </div>
    ):
    <Table striped={true}>
    <Table.Head>
      <Table.HeadCell>
        Username
      </Table.HeadCell>
      <Table.HeadCell>
        Email
      </Table.HeadCell>
      <Table.HeadCell>
        Nombre
      </Table.HeadCell>
      <Table.HeadCell>
        Apellidos
      </Table.HeadCell>
      <Table.HeadCell>
        Activo
      </Table.HeadCell>
      <Table.HeadCell>
        Staff
      </Table.HeadCell>
      <Table.HeadCell>
        Acciones
      </Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y">
        {map(users, (user, index) => (
            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {user.username}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {user.email}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {user.first_name}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {user.last_name}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {user.is_active ? <Badge size='sm' icon={HiCheck} /> : <Badge size='sm' icon={HiX} />} 
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {user.is_staff ? <Badge size='sm' icon={HiCheck} /> : <Badge size='sm' icon={HiX} />}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex gap-1.5">
                    <Button size='xs' onClick={() => updateUser(user)}>
                      <HiOutlinePencil />
                      editar
                    </Button>
                    <Button size='xs' color='failure' onClick={() => onDeleteUser(user) }>
                      <HiOutlineTrash />
                      eliminar
                    </Button>
                </Table.Cell>
            </Table.Row>
        ))}
    </Table.Body>
    </Table>
    }
    </div>
  )
}
