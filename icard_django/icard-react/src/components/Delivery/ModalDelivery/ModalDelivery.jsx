import React from 'react'
import { Button, Label, TextInput, Textarea, Modal } from 'flowbite-react'
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function ModalDelivery(props) {
    const { show, onClose, products } = props
    console.log(products);
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newValidationSchema()),
        validateOnChange: false,
        onSubmit: (formValues) => {
            console.log(formValues);
        }
    })
  return (
    <Modal
        show={show}
        onClose={onClose}
    >
        <Modal.Header>
            Agregar datos de domicilio
        </Modal.Header>
        <Modal.Body>
        <form className="flex flex-col gap-1" onSubmit={formik.handleSubmit}>
            <div>
                <div className="mb-2 block">
                <Label
                    htmlFor="name"
                    value="Nombre"
                />
                </div>
                <TextInput
                id="name"
                name='name'
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                required={false}
                />
            </div>
            <div>
                <div className="mb-2 block">
                <Label
                    htmlFor="address"
                    value="Dirección"
                />
                </div>
                <TextInput
                id="address"
                name='address'
                type="text"
                value={formik.values.address}
                onChange={formik.handleChange}
                required={false}
                />
            </div>
            <div>
                <div className="mb-2 block">
                <Label
                    htmlFor="phone"
                    value="Teléfono"
                />
                </div>
                <TextInput
                id="phone"
                name='phone'
                type="text"
                value={formik.values.phone}
                onChange={formik.handleChange}
                required={false}
                />
            </div>
            <div>
                <div className="mb-2 block">
                <Label
                    htmlFor="indicaciones"
                    value="Indicaciones adicionales"
                />
                </div>
                <Textarea
                id="indicaciones"
                name='indicaciones'
                type="text"
                value={formik.values.indicaciones}
                onChange={formik.handleChange}
                rows={4}
                />
            </div>
            <Button type="submit">
                Guardar
            </Button>
        </form>
        </Modal.Body>
    </Modal>
  )
}

function initialValues() {
    return {
        name: '',
        address: '',
        phone: '',
        indicaciones: ''
    }
}

function newValidationSchema() {
    return {
        name: Yup.string().required(true),
        address: Yup.string().required(true),
        phone: Yup.string().required(true),
        indicaciones: Yup.string()
    }
}
