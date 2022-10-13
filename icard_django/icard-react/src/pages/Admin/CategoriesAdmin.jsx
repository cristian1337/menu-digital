import React, { useEffect, useState } from 'react'
import { HeaderPage } from '../../components/Admin'
import { useCategory } from '../../hooks/useCategory'
import { Spinner } from 'flowbite-react'
import { TableCategories, AddEditCategoryForm } from '../../components/Admin'
import { ModalBasic } from '../../components/Common'

export function CategoriesAdmin() {
    const [titleModal, setTitleModal] = useState(null)
    const [show, setShow] = useState(false)
    const [contentModal, setContentModal] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const { getCategories, categories, loading, deleteCategory } = useCategory();

    useEffect(() => {
      getCategories()
    }, [refresh])

    const openCloseModal = () => setShow((prev) => !prev);
    const onRefresh = () => setRefresh((prev) => !prev);

    const addCategory = () => {
        setTitleModal('Agregar categoria');
        setContentModal(<AddEditCategoryForm onClose={openCloseModal} onRefresh={onRefresh} />);
        openCloseModal();
    }
    
    const updateCategory = (data) => {
      setTitleModal('Actualizar categoria');
      setContentModal(<AddEditCategoryForm onClose={openCloseModal} onRefresh={onRefresh} categorie={data} />);
      openCloseModal();
    }

    const onDeleteCategory = async (data) => {
      const result = window.confirm(`Desea eliminar la categoria ${data.title}?`);

      if (result) {
        try {
          await deleteCategory(data.id);
          onRefresh();
        } catch (error) {
          console.error(error);
        }
      }
    }
    
  return (
    <>
    <HeaderPage title='Categorias' btnTitle='Nueva categoria' btnClick={addCategory}/>
    {loading ? (
        <div className='text-center' >
            <Spinner
                aria-label="loading"
                size="xl"
            />
        </div>
    ):
        <TableCategories categories={categories} updateCategory={updateCategory} onDeleteCategory={onDeleteCategory} />
    }

    <ModalBasic show={show} title={titleModal} onClose={openCloseModal} children={contentModal} />
    </>
  )
}
