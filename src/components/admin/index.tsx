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

const OutMenuLink = ({ href, children }: SidebarProps) => (
  <Link
    href={href}
    className='hover:shadow-xs flex items-center gap-3 rounded-lg px-4 py-2.5 font-semibold text-slate-600 hover:bg-white hover:shadow-slate-300/50 active:bg-white/75 active:text-slate-800 active:shadow-slate-300/10'
  >
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
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  // const [dropdownOpen, setDropdownOpen] = useState(false)

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

  // useEffect(() => {
  //   setIsSidebarOpen(prev => !prev)
  // }, [search])

  return (
    <div>
      <div className='mx-auto flex min-h-screen w-full min-w-[320px] flex-col bg-white lg:ps-64'>
        {/* Sidebar */}
        <nav
          className={`fixed bottom-0 start-0 top-0 z-50 flex h-full w-80 flex-col overflow-auto bg-slate-100 transition-transform duration-500 ease-out lg:w-64 ${
            mobileSidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0'
          }`}
          aria-label='Main Sidebar Navigation'
        >
          <div className='flex h-20 w-full flex-none items-center justify-between px-8'>
            <Link
              href='/'
              className='inline-flex items-center gap-2 text-lg font-bold tracking-wide text-slate-800 transition hover:opacity-75 active:opacity-100'
            >
              {/* <svg
                className='inline-block size-4 text-blue-600'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 16 16'
              >
                <path d='M2.5 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm1 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z' />
                <path d='M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v2H1V3a1 1 0 0 1 1-1h12zM1 13V6h4v8H2a1 1 0 0 1-1-1zm5 1V6h9v7a1 1 0 0 1-1 1H6z' />
              </svg> */}
              <span>
                Admin<span className='font-medium text-blue-600'> Pannel</span>
              </span>
            </Link>
            <div className='lg:hidden'>
              <button
                type='button'
                className='flex size-10 items-center justify-center text-slate-400 hover:text-slate-600 active:text-slate-400'
                onClick={() => setMobileSidebarOpen(false)}
              >
                <svg
                  className='inline-block size-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className='w-full grow space-y-3 p-4'>
            {/* Navigation Links */}
            {SIDEBAR_MENU_ITEMS.map(({ title, subMenu }, index) =>
              // <a
              //   key={text}
              //   href='#'
              //   className='hover:shadow-xs flex items-center gap-3 rounded-lg px-4 py-2.5 font-semibold text-slate-600 hover:bg-white hover:shadow-slate-300/50 active:bg-white/75 active:text-slate-800 active:shadow-slate-300/10'
              // >
              //   <i
              //     className={`bi ${icon} inline-block size-4 text-slate-400`}
              //   />
              //   <span>{text}</span>
              // </a>
              subMenu?.length == 1 ? (
                <OutMenuLink key={index} href={subMenu[0].href}>
                  {title}
                </OutMenuLink>
              ) : (
                <div>
                  <button
                    onClick={() => handleToggleMenu(index)}
                    className='hover:shadow-xs flex w-full items-center justify-between gap-3 rounded-lg px-4 py-2.5 font-semibold text-slate-600 hover:bg-white hover:shadow-slate-300/50'
                  >
                    <span className='flex items-center gap-3'>
                      <i className='bi bi-grid-fill inline-block size-4 text-slate-400' />
                      <span>{title}</span>
                    </span>
                    <i
                      className={`bi ${openMenuIndex == index ? 'bi-chevron-up' : 'bi-chevron-down'} text-slate-400`}
                    />
                  </button>
                  {openMenuIndex == index && (
                    <div className='ml-8 mt-2 space-y-2'>
                      {subMenu.map((item, subIndex) => (
                        <Link
                          key={subIndex}
                          href={item.href}
                          className='block text-sm text-slate-600 hover:text-slate-800'
                        >
                          {item.label}
                        </Link>
                      ))}
                      {/* <a
                        href='#'
                        className='block text-sm text-slate-600 hover:text-slate-800'
                      >
                        Subitem 1
                      </a>
                      <a
                        href='#'
                        className='block text-sm text-slate-600 hover:text-slate-800'
                      >
                        Subitem 2
                      </a> */}
                    </div>
                  )}
                </div>
              )
            )}

            {/* Dropdown Group */}
            {/* <div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className='hover:shadow-xs flex w-full items-center justify-between gap-3 rounded-lg px-4 py-2.5 font-semibold text-slate-600 hover:bg-white hover:shadow-slate-300/50'
              >
                <span className='flex items-center gap-3'>
                  <i className='bi bi-grid-fill inline-block size-4 text-slate-400' />
                  <span>More</span>
                </span>
                <i
                  className={`bi ${dropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'} text-slate-400`}
                />
              </button>
              {dropdownOpen && (
                <div className='ml-8 mt-2 space-y-2'>
                  <a
                    href='#'
                    className='block text-sm text-slate-600 hover:text-slate-800'
                  >
                    Subitem 1
                  </a>
                  <a
                    href='#'
                    className='block text-sm text-slate-600 hover:text-slate-800'
                  >
                    Subitem 2
                  </a>
                </div>
              )}
            </div> */}
          </div>

          <div className='w-full flex-none space-y-3 p-4'>
            {/* Sub Navigation */}
            {['Settings', 'Logout'].map((text, idx) => (
              <a
                key={text}
                href='#'
                className='hover:shadow-xs flex items-center gap-3 rounded-lg px-4 py-2.5 font-semibold text-slate-600 hover:bg-white hover:shadow-slate-300/50 active:bg-white/75 active:text-slate-800 active:shadow-slate-300/10'
              >
                <i
                  className={`bi ${idx === 0 ? 'bi-gear-fill' : 'bi-lock-fill'} inline-block size-4 text-slate-400`}
                />
                <span>{text}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Header */}
        <header className='shadow-xs fixed end-0 start-0 top-0 z-30 flex h-20 flex-none items-center bg-white lg:hidden'>
          <div className='container mx-auto flex justify-between px-4 lg:px-8 xl:max-w-7xl'>
            <div className='flex items-center gap-2'>
              <button
                type='button'
                className='shadow-xs focus:ring-3 focus:outline-hidden inline-flex items-center justify-center gap-2 rounded-sm border border-slate-200 bg-white px-2 py-1.5 font-semibold leading-6 text-slate-800 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-800 hover:shadow-sm focus:ring-slate-500/25 active:border-white active:bg-white active:shadow-none'
                onClick={() => setMobileSidebarOpen(true)}
              >
                <svg
                  className='inline-block size-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>

            <div className='flex items-center gap-2'>
              <a
                href='#'
                className='inline-flex items-center gap-2 text-lg font-bold tracking-wide text-slate-800 transition hover:opacity-75 active:opacity-100'
              >
                <svg
                  className='inline-block size-4 text-blue-600'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 16 16'
                >
                  <path d='M2.5 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm1 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z' />
                  <path d='M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v2H1V3a1 1 0 0 1 1-1h12zM1 13V6h4v8H2a1 1 0 0 1-1-1zm5 1V6h9v7a1 1 0 0 1-1 1H6z' />
                </svg>
                <span>
                  tail<span className='font-medium text-blue-600'>app</span>
                </span>
              </a>
            </div>
          </div>
        </header>

        {/* Placeholder for main content and footer, continue if needed */}
        <main className='flex max-w-full flex-auto flex-col pt-20 lg:pt-0'>
          <div className='container mx-auto p-4'>
            {/* <h1 className="text-3xl font-bold">Dashboard Content</h1> */}
            <SideBarContent />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminSidebar