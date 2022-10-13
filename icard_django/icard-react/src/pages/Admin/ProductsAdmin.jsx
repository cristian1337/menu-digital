import React, { useState, useEffect } from 'react'
import { Spinner } from 'flowbite-react'
import { HeaderPage, TableProducts, AddEditProductForm } from '../../components/Admin'
import { ModalBasic } from '../../components/Common'
import { useProduct } from '../../hooks'

export function ProductsAdmin() {
  const { error, loading, products, getProducts, deleteProduct } = useProduct();
  const [show, setShow] = useState(false)
  const [titleModal, setTitleModal] = useState(null)
  const [contentModal, setContentModal] = useState(null)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    getProducts();
  }, [refresh])

  const openCloseModal = () => setShow((prev) => !prev);
  const onRefresh = () => setRefresh((prev) => !prev);

  function addProduct() {
    setTitleModal('Agregar producto')
    setContentModal(<AddEditProductForm onClose={openCloseModal} onRefresh={onRefresh} />)
    openCloseModal()
  }

  const onUpdateProduct = (data) => {
    setTitleModal('Actualizar producto')
    setContentModal(<AddEditProductForm onClose={openCloseModal} onRefresh={onRefresh} product={data} />)
    openCloseModal()
  }

  const onDeleteProduct = async (data) => {
    const result = window.confirm(`Desea eliminar el producto ${data.title}?`);

      if (result) {
        try {
          await deleteProduct(data.id);
          onRefresh();
        } catch (error) {
          console.error(error);
        }
      }
  }


  return (
    <>
      <HeaderPage title='Productos' btnTitle='Nuevo producto' btnClick={addProduct} />
      {loading ? (
        <div className='text-center' >
        <Spinner
            aria-label="loading"
            size="xl"
            />
        </div>
      ) :
        <TableProducts products={products} onUpdateProduct={onUpdateProduct} onDeleteProduct={onDeleteProduct} />
      }
      <ModalBasic show={show} title={titleModal} onClose={openCloseModal} children={contentModal} />
    </>
  )
}
