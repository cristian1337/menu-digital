import React, { useEffect, useState } from 'react'
import { Label, Button } from 'flowbite-react'
import { HiTrash } from 'react-icons/hi'
import Select from 'react-select'
import { map } from 'lodash'
import { useProduct, useOrder } from '../../../../hooks'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import '../../../../assets/custom.css'

export function AddOrderForm(props) {
    const { idTable, onClose, onRefresh } = props
    const { getProducts, products, getProductById } = useProduct();
    const { addOrderToTable } = useOrder()
    const [productsFormat, setProductsFormat] = useState([])
    const [productList, setProductList] = useState([])

    console.log(productList);

    useEffect(() => {
      getProducts()
    }, [])
    
    useEffect(() => {
      setProductsFormat(formatSelectData(products))
    }, [products])

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            for await (const idProduct of formValue.products) {
                await addOrderToTable(idTable, idProduct)
            }
            onRefresh()
            onClose()
        }
    })

    useEffect(() => {
      addProductList()
    }, [formik.values])
    

    const addProductList = async () => {
        try {
            const productsId = formik.values.products

            const arrayTemp = []
            for await (const idProduct of productsId) {
                const response = await getProductById(idProduct)
                arrayTemp.push(response)
            }
            setProductList(arrayTemp)
        } catch (error) {
            console.error(error);
        }
    }

    const removeProductList = (index) => {
        const idProducts = [...formik.values.products];
        idProducts.splice(index, 1)
        formik.setFieldValue('products', idProducts)
    }
 
  return (
    <form className="flex flex-col gap-1" onSubmit={formik.handleSubmit}>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="product"
            value="Productos"
          />
        </div>
        <Select
          isSearchable={true}
          options={productsFormat}
          value=''
          onChange={(data) => formik.setFieldValue('products', [...formik.values.products, data.value])}
        />
      </div>
      <div>
        {map(productList, (product, index) => (
            <div className="flow-root" key={index}>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                        <div className="shrink-0">
                            <img
                            className="h-8 w-8 contain"
                            src={product.image}
                            alt={product.title}
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                {product.title}
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            <Button color='failure' size='xs' onClick={() => removeProductList(index)}>
                                Eliminar
                                <HiTrash />
                            </Button>
                        </div>
                        </div>
                    </li>
                </ul>
            </div>
        ))}
      </div>
      <div className='mt-3' >
        <Button type="submit">
            Añadir productos a pedido
        </Button>
      </div>
    </form>
  )
}

function formatSelectData(data) {
    return map(data, (item) => ({
        value: item.id,
        label: item.title
    }))
}

function initialValues() {
    return {
        products: []
    }
}

function validationSchema() {
    return {
        products: Yup.array().required(true)
    }
}
