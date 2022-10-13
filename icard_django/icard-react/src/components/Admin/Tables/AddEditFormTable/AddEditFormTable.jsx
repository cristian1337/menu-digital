import React from 'react'
import { Label, TextInput, Button } from 'flowbite-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTable } from '../../../../hooks/useTable'

export function AddEditFormTable(props) {
    const { onRefresh, onClose, tables } = props
    const { addTable, updateTable } = useTable()

    const formik = useFormik({
        initialValues: initialValues(tables),
        validationSchema: Yup.object( newSchema() ),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            try {
                if (tables) {
                  await updateTable(tables.id, formValues)
                } else {
                  await addTable(formValues)
                }
                onRefresh()
                onClose()
            } catch (error) {
                console.error(error);
            }
        }
    })

  return (
    <form className="flex flex-col gap-1" onSubmit={formik.handleSubmit} >
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="number"
            value="Número de mesa"
          />
        </div>
        <TextInput
          id="number"
          name='number'
          value={formik.values.number}
          onChange={formik.handleChange}
        />
      </div>
      <Button type="submit">
        {tables ? 'Actualizar' : 'Crear'}
      </Button>
    </form>
  )
}

function initialValues(data) {
    return {
        number: data?.number ? data.number : 0
    }
}

function newSchema() {
    return {
        number: Yup.number().required(true)
    }
}
