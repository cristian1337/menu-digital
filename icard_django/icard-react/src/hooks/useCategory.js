import { useState } from 'react';
import { useAuth } from './useAuth';
import { getCategoriesApi, addCategoryApi, updateCategoryApi, deleteCategoryApi } from '../api/category';

export function useCategory(){
    const { auth } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState(null);

    const getCategories = async () => {
        try {
            setLoading(true)
            const data = await getCategoriesApi()
            setLoading(false)
            setCategories(data);
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const addCategory = async (data) => {
        try {
            setLoading(true)
            await addCategoryApi(data, auth.token)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const updateCategory = async (id, data) => {
        try {
            setLoading(true)
            await updateCategoryApi(id, data, auth.token)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const deleteCategory = async (id) => {
        try {
            setLoading(true)
            await deleteCategoryApi(id, auth.token)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    return {
        categories,
        error,
        loading,
        getCategories,
        addCategory,
        updateCategory,
        deleteCategory
    };
}