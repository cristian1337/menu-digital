import React, {useEffect} from 'react'
import { useCategory } from '../../hooks'
import { ListCategories } from '../../components/Client'

export function Categories() {
  const {loading, categories, getCategories } = useCategory()

  useEffect(() => {
    getCategories()
  }, [])
  

  return (
    <div>
      <h2 className='font-bold text-2xl text-center' >Categorias</h2>
      {loading ? <p>Cargando...</p> 
      : <ListCategories categories={categories} />}
    </div>
  )
}
