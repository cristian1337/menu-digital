import React from 'react'
import {LoginForm} from '../../../components/Admin';

export function LoginAdmin() {
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
              Inicia sesión en tu cuenta
            </h2>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  )
}
