import { useRouter } from 'next/navigation';
import React from 'react'
import { IoReturnDownBackSharp } from "react-icons/io5";


const BackButton = () => {
    const router = useRouter()

    return (
        <button type='button' className='bg-primary-main px-2 py-1 rounded-sm' onClick={() => router.back()}>
            <IoReturnDownBackSharp size={20} className='text-white' />
        </button>
    )
}

export default BackButton