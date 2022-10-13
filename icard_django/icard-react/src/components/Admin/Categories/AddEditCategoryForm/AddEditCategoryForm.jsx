import React, { useCallback, useState } from 'react'
import { Label, TextInput, Button } from 'flowbite-react'
import { useCategory } from '../../../../hooks'
import { useDropzone } from 'react-dropzone'
import { HiPhotograph } from 'react-icons/hi'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export function AddEditCategoryForm(props) {
  const { categorie, onClose, onRefresh } = props;
  const [previewImage, setPreviewImage] = useState(categorie ? categorie.image : null)
  const { addCategory, updateCategory } = useCategory();

    const formik = useFormik({
        initialValues: initialValues(categorie),
        validationSchema: Yup.object(categorie ? updateSchema() : newSchema()),
        validateOnChange: false,
        onSubmit: async (formValues) => {
          try {
            if (categorie) {
              await updateCategory(categorie.id, formValues);
            } else {
              await addCategory(formValues);
            }
            onRefresh()
            onClose()
          } catch (error) {
            console.error(error);
          }
        }
    })

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
    <form className="flex flex-col gap-1" onSubmit={formik.handleSubmit} >
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="title"
            value="Nombre de categoria"
          />
        </div>
        <TextInput
          id="title"
          name='title'
          value={formik.values.title}
          onChange={formik.handleChange}
        />
      </div>
      <div className='mb-3'>
        <div className="mb-2 block">
            <Label
            htmlFor="image"
            value="Subir imagen de categoria"
            />
        </div>
        <div className='flex items-center p-2 rounded-md border border-black gap-1 bg-black cursor-pointer' {...getRootProps()}>
            <HiPhotograph />
            {previewImage ? 'Actualizar imagen' : 'Subir imagen'}
        </div>
        <input {...getInputProps()} />
        <img className='contain w-full h-36' src={previewImage} />
      </div>
      <Button type="submit">
        {categorie ? 'Actualizar' : 'Crear'}
      </Button>
    </form>
  )
}

function initialValues(data) {
    return {
        title: data?.title ? data.title : '',
        image: ''
    }
}

function newSchema() {
    return {
        title: Yup.string().required(true),
        image: Yup.string().required(true)
    }
}

function updateSchema() {
  return {
      title: Yup.string().required(true),
      image: Yup.string()
  }
}
