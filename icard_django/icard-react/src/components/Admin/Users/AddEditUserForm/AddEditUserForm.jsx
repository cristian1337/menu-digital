import React, {useState} from 'react';
import { Label, TextInput, ToggleSwitch, Button } from 'flowbite-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useUser } from '../../../../hooks'

export function AddEditUserForm(props) {
    const { onClose, onRefresh, user } = props;
    const {addUser, updateUser, error, loading} = useUser();

    const formik = useFormik({
      initialValues: initialValues(user),
      validationSchema: Yup.object(user ? updateValidationSchema() : newValidationSchema()),
      validateOnChange: false,
      onSubmit: async (formValue) => {
        try {
          if (user) {
            await updateUser(user.id, formValue)
          } else {
            await addUser(formValue)
          }
          console.log('usuario guardado');
          onRefresh();
          onClose();
        } catch (error) {
          console.error(error);
        }
      }
    })
  return (
    <form className="flex flex-col gap-1" onSubmit={formik.handleSubmit}>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="username"
            value="Nombre de usuario"
          />
        </div>
        <TextInput
          id="username"
          name='username'
          type="text"
          value={formik.values.username}
          onChange={formik.handleChange}
          required={false}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="email"
            value="Correo electrónico"
          />
        </div>
        <TextInput
          id="email"
          name='email'
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          required={false}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="first_name"
            value="Nombre"
          />
        </div>
        <TextInput
          id="first_name"
          name='first_name'
          type="text"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          required={false}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="last_name"
            value="Apellidos"
          />
        </div>
        <TextInput
          id="last_name"
          name='last_name'
          type="text"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          required={false}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password"
            value="Contraseña"
          />
        </div>
        <TextInput
          id="password"
          name='password'
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
      </div>
      <ToggleSwitch
        id='is_active'
        name='is_active'
        checked={formik.values.is_active}
        onChange={(data) => formik.setFieldValue('is_active', data)}
        label="Activo"
      />
      <ToggleSwitch
        id='is_staff'
        name='is_staff'
        checked={formik.values.is_staff}
        onChange={(data) => formik.setFieldValue('is_staff', data)}
        label="Administrador"
      />
      <Button type="submit">
        {user ? 'Actualizar' : 'Crear'}
      </Button>
    </form>
  )
}

function initialValues(data) {
  return {
    username: data?.username || '',
    email: data?.email || '',
    first_name: data?.first_name || '',
    last_name: data?.last_name || '',
    password: '',
    is_active: data?.is_active ? true : false,
    is_staff: data?.is_staff ? true : false,
  }
}

function newValidationSchema() {
  return {
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    first_name: Yup.string(),
    last_name: Yup.string(),
    password: Yup.string().required(true),
    is_active: Yup.bool().required(true),
    is_staff: Yup.bool().required(true)
  }
}

function updateValidationSchema() {
  return {
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    first_name: Yup.string(),
    last_name: Yup.string(),
    password: Yup.string(),
    is_active: Yup.bool().required(true),
    is_staff: Yup.bool().required(true)
  }
}
