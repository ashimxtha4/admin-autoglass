'use client'

import React, { useEffect, useState } from 'react'
import { FaBars, FaChevronDown, FaTimes } from 'react-icons/fa'
import { Button } from '../ui/button'
import Link from 'next/link'
import SideBarContent from './sidebar-content'
import { SIDEBAR_MENU_ITEMS } from '@/constants/sidebar-menu-items'
import { useRouter, useSearchParams } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import toast from 'react-hot-toast'

type SidebarProps = { href: string; children: string }

const NestedMenuLink = ({ href, children }: SidebarProps) => (
  <Link href={href} className='block rounded-2xl px-4 py-1 bg-primary-text/85 hover:border-white/15 border border-white/5'>
    {children}
  </Link>
)

export function isTokenExpired(token: string) {
  try {
    const decoded: { exp: number } = jwtDecode(token)
    const currentTime = Date.now() / 1000
    return decoded.exp < currentTime
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message)
    }
    return true
  }
}

const AdminSidebar: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const search = searchParams?.get('ref')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null)

  const handleToggleMenu = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return router.push('/login')
    if (token) {
      if (isTokenExpired(token)) {
        localStorage.removeItem('token')
        router.push('/login')
      } else {
        router.push('/')
      }
    }
  }, [router])

  useEffect(() => {
    setIsSidebarOpen(prev => !prev)
  }, [search])

  return (
    <div className='container flex'>
      {/* Toggle Button for Mobile */}
      <Button
        variant='secondary'
        onClick={() => setIsSidebarOpen(prev => !prev)}
        className='mt-[24px] p-2 text-xl md:hidden'
      >
        <FaBars />
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 w-64 transform bg-primary-text text-white ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        <div className='mt-[24px] flex items-center justify-between p-2'>
          <span className='text-2xl font-bold cursor-pointer' onClick={() => router.push('/')}>Admin</span>
          {/* Close Button for Mobile */}
          <Button
            variant='secondary'
            onClick={() => setIsSidebarOpen(prev => !prev)}
            className='mt-2 p-2 text-xl md:hidden'
          >
            <FaTimes />
          </Button>
        </div>
        <nav className='mt-4 space-y-2'>
          {SIDEBAR_MENU_ITEMS.map((menu, index) => (
            <div key={index} className='p-1'>
              <Button
                onClick={() => handleToggleMenu(index)}
                className='flex w-full border border-white/10 hover:border-white/30 text-base md:text-lg items-center rounded-2xl px-4 py-2 bg-primary-text/60 hover:bg-primary-text/80 backdrop-blur-3xl shadow-xl'
              >
                {menu.title}
                <FaChevronDown
                  className={`ml-auto transition-transform ${openMenuIndex === index ? 'rotate-180' : 'rotate-0'}`}
                />
              </Button>
              {openMenuIndex === index && (
                <div className='ml-8 mt-2 space-y-2'>
                  {menu.subMenu.map((subMenuItem, subIndex) => (
                    <NestedMenuLink key={subIndex} href={subMenuItem.href}>
                      {subMenuItem.label}
                    </NestedMenuLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Content Wrapper */}
      <main className='flex-1 p-6 md:ml-64'>
        <div className='flex mb-1 w-full border-b border-b-primary-text pb-2 justify-between items-center'>
          <h1 className='text-2xl font-semibold'>
            {search?.split('-').join(' ').toUpperCase() || 'Admin Dashboard'}
          </h1>
          <button type='button' onClick={() => {
            localStorage.removeItem('token')
            router.push('/login')
          }} className='text-base font-bold rounded-full bg-red-400 text-white px-4 md:text-xl py-1 '>Logout</button>
        </div>
        <SideBarContent />
      </main>
    </div>
  )
}

export default AdminSidebar
