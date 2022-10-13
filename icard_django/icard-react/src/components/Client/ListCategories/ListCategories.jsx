import React from 'react'
import { map } from 'lodash';
import { HiArrowCircleRight } from 'react-icons/hi'
import { useLocation, useNavigate } from 'react-router-dom'
import '../../../assets/custom.css'

export function ListCategories(props) {
    const { categories } = props;
    const location = useLocation()
    const navigate = useNavigate()

    const goToCategory = (id) => {
        navigate(`${location.pathname}/${id}`)
    }

  return (
    <div className='w-full flex justify-around my-5 card-categorie-container'>
        {map(categories, (categorie) => (
            <div key={categorie.id} onClick={() => goToCategory(categorie.id)} className='card-categorie flex flex-col items-center px-2 py-3'>
                <img className='p-3' src={categorie.image} alt="cocteles" />
                <p className='my-3 text-sm' >{categorie.title}</p>
                <HiArrowCircleRight className='w-6 h-6' />
            </div>
        ))}
    </div>
  )
}
