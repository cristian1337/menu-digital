import React from 'react'
import { Table, Button } from 'flowbite-react'
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import { map } from 'lodash';
import '../../../../assets/custom.css'

export function TableCategories(props) {
    const { categories, updateCategory, onDeleteCategory } = props;
  return (
    <Table striped={true}>
        <Table.Head>
            <Table.HeadCell>
                Titulo
            </Table.HeadCell>
            <Table.HeadCell>
                Imagen
            </Table.HeadCell>
            <Table.HeadCell>
                Acciones
            </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
            {map(categories, (categorie, index) => (
                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {categorie.title}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        <img className='contain w-24 h-14' src={categorie.image} alt={categories.title}/>
                    </Table.Cell>
                    
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex gap-1.5 items-center">
                        <Button size='xs' onClick={() => updateCategory(categorie)}>
                        <HiOutlinePencil />
                            editar
                        </Button>
                        <Button size='xs' color='failure' onClick={() => onDeleteCategory(categorie) }>
                        <HiOutlineTrash />
                            eliminar
                        </Button>
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    </Table>
  )
}
