import React, {useState, useEffect} from 'react'
import { useCategory } from '../../hooks'
import { map } from 'lodash'
import { HiArrowCircleRight } from 'react-icons/hi'
import { ListProductsDelivery } from '../../components/Delivery/ListProductsDelivery/ListProductsDelivery'

export function DeliveryAdmin() {
  const { loading, categories, getCategories } = useCategory()
  const [categoryProduct, setCategoryProduct] = useState(null)

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div>
      <h2 className='font-bold text-2xl text-center' >Categorias</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className='w-full flex justify-around my-5 card-categorie-container'>
        {map(categories, (categorie) => (
            <div key={categorie.id} onClick={() => setCategoryProduct(categorie.id)} className='card-categorie flex flex-col items-center px-2 py-3'>
                <img className='p-3' src={categorie.image} alt="cocteles" />
                <p className='my-3 text-sm' >{categorie.title}</p>
                <HiArrowCircleRight className='w-6 h-6' />
            </div>
        ))}
        </div>
      )}
      <div>
        <ListProductsDelivery idCategory={categoryProduct} />
      </div>
    </div>
  )
}
