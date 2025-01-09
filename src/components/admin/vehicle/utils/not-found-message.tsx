import React from 'react'

const NotFoundMessage = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="text-center text-xl font-medium text-primary-text py-4 text-nowrap">{children}</div>
    )
}

export default NotFoundMessage