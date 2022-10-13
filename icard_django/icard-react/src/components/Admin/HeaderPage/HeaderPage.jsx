import React from 'react';
import { Button } from 'flowbite-react';

export function HeaderPage(props) {
    const { title, btnTitle, btnClick, btnTitleTwo, btnClickTwo } = props;
  return (
    <div className='flex justify-between items-center w-full mb-4'>
        <div>
            <h2 className='text-xl font-semibold'>{title}</h2>
        </div>
        <div className='flex gap-2'>
            {btnTitle && (
                <Button onClick={btnClick}>
                    {btnTitle}
                </Button>
            )}
            {btnTitleTwo && (
                <Button color='purple' onClick={btnClickTwo}>
                    {btnTitleTwo}
                </Button>
            )}
        </div>
    </div>
  )
}
