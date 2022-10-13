import { useState } from 'react'
import { useAuth } from './useAuth'
import { getProductsApi, addProductApi, updateProductApi, deleteProductApi, getProductByIdApi, getProductByCategoryApi } from '../api/product'

export function useProduct() {
    const { auth } = useAuth();
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState(null)
    const [product, setProduct] = useState(null)

    const getProducts = async () => {
        try {
            setLoading(true)
            const data = await getProductsApi()
            setLoading(false)
            setProducts(data)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const addProduct = async (data) => {
        try {
            setLoading(true)
            await addProductApi(data, auth.token)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const updateProduct = async (id, data) => {
        try {
            setLoading(true)
            await updateProductApi(id, data, auth.token)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const deleteProduct = async (id, token) => {
        try {
            setLoading(true)
            await deleteProductApi(id, auth.token)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const getProductById = async (idProduct) => {
        try {
            const data = await getProductByIdApi(idProduct)
            return data
        } catch (error) {
            setError(error)
        }
    }

    const getProductByCategory = async (idCategory) => {
        try {
            setLoading(true)
            const response = await getProductByCategoryApi(idCategory)
            setLoading(false)
            setProducts(response)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    return {
        loading,
        error,
        products,
        getProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getProductByCategory
    }
}