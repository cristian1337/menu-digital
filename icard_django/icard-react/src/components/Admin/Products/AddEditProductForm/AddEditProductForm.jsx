import React, { useEffect, useCallback, useState } from 'react'
import { Label, TextInput, Button, ToggleSwitch, Select } from 'flowbite-react'
import { HiPhotograph } from 'react-icons/hi'
import { useDropzone } from 'react-dropzone'
import { useProduct, useCategory } from '../../../../hooks'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { map } from 'lodash'

export function AddEditProductForm(props) {
  const { product, onClose, onRefresh } = props
  const [previewImage, setPreviewImage] = useState(product ? product.image : null)

  const { getCategories, categories } = useCategory()
  const { addProduct, updateProduct } = useProduct()

  const formik = useFormik({
    initialValues: initialValues(product),
    validationSchema: Yup.object(product ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        if (product) {
          await updateProduct(product.id, formValues)
        } else {
          await addProduct(formValues)
        }
        onRefresh()
        onClose()
      } catch (error) {
        console.error(error);
      }
    }
  })

  useEffect(() => {
    getCategories()
  }, [])

  const uploadImage = useCallback( async (acceptedFile) => {
    const file = acceptedFile[0];
    await formik.setFieldValue('image', file)
    setPreviewImage(URL.createObjectURL(file))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    noKeyboard: true,
    multiple: false,
    onDrop: uploadImage
  })

  return (
    <form className="flex flex-col gap-1" onSubmit={formik.handleSubmit}>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="title"
            value="Nombre de producto"
          />
        </div>
        <TextInput
          id="title"
          name='title'
          value={formik.values.title}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="price"
            value="Precio"
          />
        </div>
        <TextInput
          id="price"
          name='price'
          value={formik.values.price}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="categorie"
            value="Categoria"
          />
        </div>
        <Select
          id="categorie"
          name='categorie'
          value={formik.values.categorie}
          onChange={formik.handleChange}
        >
          {map(categories, (categorie, index) => (
            <option key={index} value={categorie.id}>
              {categorie.title}
            </option>
          ))}
        </Select>
      </div>
      <div className='m-2'>
        <ToggleSwitch
          id='active'
          name='active'
          label="Activo"
          checked={formik.values.active}
          onChange={(data) => formik.setFieldValue('active', data)}
        />
      </div>
      <div className='mb-3'>
        <div className="mb-2 block">
          <Label
            htmlFor="image"
            value="Subir imagen de producto"
          />
        </div>
        <div className='flex items-center p-2 rounded-md border border-black gap-1 bg-black cursor-pointer' {...getRootProps()} >
          <HiPhotograph />
          {previewImage ? 'Actualizar imagen' : 'Subir imagen'}
        </div>
        <input {...getInputProps()} />
        <img className='contain w-full h-36' src={previewImage} />
      </div>
      <Button type="submit">
        {product ? 'Actualizar' : 'Crear'}
      </Button>
    </form>
  )
}

function initialValues(data) {
  return {
    title: data?.title || '',
    image: data?.image || '',
    price: data?.price || 0,
    active: data?.active ? true : false,
    categorie: data?.categorie || ''
  }
}

function newSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string().required(true),
    price: Yup.number().required(true),
    active: Yup.boolean().required(true),
    categorie: Yup.number().required(true)
  }
}

function updateSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string(),
    price: Yup.number().required(true),
    active: Yup.boolean().required(true),
    categorie: Yup.number().required(true)
  }
}