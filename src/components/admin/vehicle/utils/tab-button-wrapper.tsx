import React from 'react'

const TabButtonWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid grid-cols-2 my-2 w-full justify-between bg-white rounded-full items-center">
            {children}
        </div>
    )
}

export default TabButtonWrapper