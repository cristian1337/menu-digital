import React, {useEffect} from 'react'
import { HeaderPage, TableHistoryPayments } from '../../components/Admin'
import { usePayment } from '../../hooks'
import { Spinner } from 'flowbite-react'

export function PaymentsHistory() {
    const { loading, error, payments, getPayments } = usePayment()

    useEffect(() => {
      getPayments()
    }, [])

    console.log(payments);
    
  return (
    <>
    <HeaderPage title='Historial de pagos' />
    {loading ? (
        <div className='text-center' >
        <Spinner
            aria-label="loading"
            size="xl"
            />
        </div>
      ) :
        <TableHistoryPayments payments={payments} />
    }
    </>
  )
}
