import React from 'react'

const Home = () => {
  return (
    <main id='page-content' className=''>
      <div className='p-4 lg:p-8'>
        <div className='grid grid-cols-1 md:gap-20 lg:grid-cols-12'>
          <div className='lg:col-span-9'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-12 md:gap-6'>
              {[
                { label: 'Accounts today', value: 63 },
                { label: 'Sales today', value: 6 },
                { label: 'Open Tickets', value: 5 },
                { label: 'Pending Invoices', value: 10 }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className='rounded-lg border border-slate-200 bg-white p-6 sm:col-span-6 xl:col-span-3'
                >
                  <dl>
                    <dt className='text-2xl font-bold'>{item.value}</dt>
                    <dd className='text-sm font-medium text-slate-500'>
                      {item.label}
                    </dd>
                  </dl>
                </div>
              ))}

              {/* Total Earnings Section */}
              <div className='overflow-hidden rounded-xl border border-slate-200 bg-white sm:col-span-12 lg:col-span-6'>
                <dl className='px-6 pt-6'>
                  <dt className='text-2xl font-bold'>$168,682</dt>
                  <dd className='text-sm font-medium text-slate-500'>
                    Total Earnings
                  </dd>
                </dl>
                <div className='-m-2'>
                  <svg
                    className='w-auto text-indigo-100'
                    fill='currentColor'
                    viewBox='0 0 1000 500'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M 0,493.91...Z' fill='#E0E7FF' />
                  </svg>
                </div>
              </div>

              {/* Total Pageviews Section */}
              <div className='overflow-hidden rounded-xl border border-slate-200 bg-white sm:col-span-12 lg:col-span-6'>
                <dl className='px-6 pt-6'>
                  <dt className='text-2xl font-bold'>768,541</dt>
                  <dd className='text-sm font-medium text-slate-500'>
                    Total Pageviews
                  </dd>
                </dl>
                <div className='-m-2'>
                  <svg
                    className='w-auto text-indigo-100'
                    fill='currentColor'
                    viewBox='0 0 1000 500'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M 0,491.97...Z' />
                  </svg>
                </div>
              </div>

              {/* Latest Sales Table */}
              <div className='overflow-hidden rounded-xl border border-slate-200 bg-white sm:col-span-12'>
                <div className='px-6 pt-6'>
                  <h2 className='text-2xl font-bold'>Latest Sales</h2>
                  <h3 className='text-sm font-medium text-slate-500'>
                    You have 6 new sales today, keep it up!
                  </h3>
                </div>
                <div className='p-6'>
                  <div className='min-w-full overflow-x-auto rounded-sm'>
                    <table className='min-w-full align-middle text-sm'>
                      <thead>
                        <tr className='border-b-2 border-slate-100'>
                          <th className='px-3 py-2 text-start text-sm font-semibold uppercase tracking-wider text-slate-700'>
                            id
                          </th>
                          <th className='hidden px-3 py-2 text-start text-sm font-semibold uppercase tracking-wider text-slate-700 md:table-cell'>
                            Email
                          </th>
                          <th className='hidden px-3 py-2 text-start text-sm font-semibold uppercase tracking-wider text-slate-700 md:table-cell'>
                            Status
                          </th>
                          <th className='px-3 py-2 text-end text-sm font-semibold uppercase tracking-wider text-slate-700'>
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            id: 'order_0006578',
                            email: 'g.taylor@example.com',
                            status: 'Pending',
                            total: '$185.13'
                          },
                          {
                            id: 'order_0006577',
                            email: 'j.keily@example.com',
                            status: 'Pending',
                            total: '$280.63'
                          },
                          {
                            id: 'order_0006576',
                            email: 'n.hart@example.com',
                            status: 'Completed',
                            total: '$110.69'
                          },
                          {
                            id: 'order_0006575',
                            email: 'j.doe@example.com',
                            status: 'Completed',
                            total: '$120.37'
                          },
                          {
                            id: 'order_0006574',
                            email: 'o.smith@example.com',
                            status: 'Completed',
                            total: '$150.27'
                          },
                          {
                            id: 'order_0006573',
                            email: 'n.hart@example.com',
                            status: 'Completed',
                            total: '$215.25'
                          }
                        ].map((sale, idx) => (
                          <tr
                            key={sale.id}
                            className={idx % 2 !== 0 ? 'bg-slate-50' : ''}
                          >
                            <td className='p-3 text-start'>
                              <a
                                href='#'
                                className='font-medium text-indigo-500 hover:text-indigo-700'
                              >
                                {sale.id}
                              </a>
                            </td>
                            <td className='hidden p-3 text-slate-600 md:table-cell'>
                              {sale.email}
                            </td>
                            <td className='hidden p-3 text-start md:table-cell'>
                              <div
                                className={`inline-block rounded-full border px-2 py-1 text-xs font-semibold leading-4 ${sale.status === 'Completed' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-orange-200 bg-orange-50 text-orange-700'}`}
                              >
                                {sale.status}
                              </div>
                            </td>
                            <td className='p-3 text-end font-medium'>
                              {sale.total}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* End Latest Sales Table */}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
