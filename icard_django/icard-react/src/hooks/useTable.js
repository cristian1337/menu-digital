import { useState } from 'react'
import { useAuth } from './useAuth'
import { addTableApi, deleteTableApi, getTablesApi, updateTableApi, getTableApi, getTableByNumberApi } from '../api/table'
import { size } from 'lodash'

export function useTable() {
    const { auth } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [tables, setTables] = useState(null)
  const [table, setTable] = useState(null)

  const getTables = async () => {
    try {
        setLoading(true)
        const data = await getTablesApi()
        setLoading(false)
        setTables(data)
    } catch (error) {
        setLoading(false)
        setError(error)
    }
  }

  const addTable = async (data) => {
    try {
        setLoading(true)
        await addTableApi(data, auth.token)
        setLoading(false)
    } catch (error) {
        setLoading(false)
        setError(error)
    }
  }
  
  const updateTable = async (id, data) => {
    try {
       setLoading(true)
       await updateTableApi(id, data, auth.token) 
       setLoading(false)
    } catch (error) {
        setLoading(false)
        setError(error)
    }
  }

  const deleteTable = async (id) => {
    try {
        setLoading(true)
        await deleteTableApi(id, auth.token)
        setLoading(false)
    } catch (error) {
        setLoading(false)
        setError(error)
    }
  }

  const getTable = async (idTable) => {
    try {
      setLoading(true)
      const data = await getTableApi(idTable)
      setLoading(false)
      setTable(data)
    } catch (error) {
      setLoading(false)
      setError(error)
    }
  }

  const isExistTable = async (numberTable) => {
    try {
      const response = await getTableByNumberApi(numberTable)
      if (size(response) > 0) {
        return true
      }
      throw Error
    } catch (error) {
      setError(error)
    }
  }

  const getTableByNumber = async (numberTable) => {
    try {
      const response = await getTableByNumberApi(numberTable)
      return response
      throw Error
    } catch (error) {
      setError(error)
    }
  }

  return {
    loading,
    error,
    tables,
    getTables,
    addTable,
    updateTable,
    deleteTable,
    table,
    getTable,
    isExistTable,
    getTableByNumber
  }
}
