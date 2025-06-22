import React from 'react'

const NotFoundMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <tr>
      <td>
        <div className='text-nowrap py-4 text-center text-xl font-medium text-primary-text'>
          {children}
        </div>
      </td>
    </tr>
  )
}

export default NotFoundMessage
