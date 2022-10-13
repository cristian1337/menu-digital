import React, {useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProduct } from '../../hooks'
import { HiArrowCircleLeft } from 'react-icons/hi'
import { ListProducts } from '../../components/Client'

export function Products() {
    const { idCategory, tableNumber } = useParams()
    const { loading, products, getProductByCategory } = useProduct()

    useEffect(() => {
      getProductByCategory(idCategory)
    }, [idCategory])
    
  return (
    <div>
        <div className='flex items-center justify-start mb-3'>
            <HiArrowCircleLeft className='w-6 h-6' />
            <Link className='font-bold text-lg ml-1' to={`/client/${tableNumber}`} >Volver a categorias</Link>
        </div>
        {loading ? <p>Cargando...</p>
        : <ListProducts products={products} />}
    </div>
  )
}
