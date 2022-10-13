import React, { useState } from 'react'
import { TextInput, Button } from 'flowbite-react'
import logo from '../../../assets/img/Delorean-Logo.png'
import { useTable } from '../../../hooks'
import { useNavigate } from 'react-router-dom'

export function SelectTable(props) {
  const navigate = useNavigate()
  console.log(props);
  const [tableNum, setTableNum] = useState(null)
  const [error, setError] = useState(null)
  const { isExistTable } = useTable()

  const onSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    if (!tableNum) {
      setError('No has introducido ninguna mesa')
    } else {
      const exist = await isExistTable(tableNum)
      if (exist) navigate(`/client/${tableNum}`)
      else setError('El numero de mesa no existe')
    }
  }

  return (
    <div className='bg-blue-900 h-screen flex flex-col justify-center items-center'>
      <div className='flex flex-col items-center text-white'>
        <img src={logo} alt="Delorean logo" />
        <h2 className='text-xl font-bold' >Bienvenido a VirtualBar</h2>
        <p className='mb-3' >Introduce tu número de mesa</p>
        <form onSubmit={onSubmit}>
          <TextInput 
            name='table'
            placeholder='Numero de mesa'
            required={true}
            onChange={(data) => setTableNum(data.target.value)}
          />
          <div className='flex flex-col items-center mt-3 w-full' >
            <Button gradientDuoTone='purpleToBlue' type='submit'>
              Entrar
            </Button>
          </div>
        </form>
        <p className='text-md text-red-700 font-bold' >{error}</p>
      </div>
    </div>
  )
}
