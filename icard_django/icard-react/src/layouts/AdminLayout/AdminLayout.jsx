import React from 'react';
import {LoginAdmin} from '../../pages/Admin';
import { TopMenu } from '../../components/Admin';
import { useAuth } from '../../hooks';

export function AdminLayout(props) {
    const {children} = props;
    const { auth } = useAuth();

    if(!auth) return <LoginAdmin />
  return (
    <>
      <div>
        <TopMenu />
      </div>
      <div className='p-4'>
        {children}
      </div>
    </>
  )
}
