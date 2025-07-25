export const SIDEBAR_MENU_ITEMS = [
  {
    icon: 'm17.275 20.25l3.475-3.45l-1.05-1.05l-2.425 2.375l-.975-.975l-1.05 1.075zM6 9h12V7H6zm12 14q-2.075 0-3.537-1.463T13 18t1.463-3.537T18 13t3.538 1.463T23 18t-1.463 3.538T18 23M3 22V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v6.675q-.7-.35-1.463-.513T18 11H6v2h7.1q-.425.425-.787.925T11.675 15H6v2h5.075q-.05.25-.062.488T11 18q0 1.05.288 2.013t.862 1.837L12 22l-1.5-1.5L9 22l-1.5-1.5L6 22l-1.5-1.5z',
    title: 'Orders',
    subMenu: [{ href: '?ref=product-orders', label: 'Product Orders' }]
  },
  {
    icon: 'M5.7 18L8 14q-1.65 0-2.825-1.175T4 10t1.175-2.825T8 6t2.825 1.175T12 10q0 .575-.137 1.063T11.45 12L8 18zm9 0l2.3-4q-1.65 0-2.825-1.175T13 10t1.175-2.825T17 6t2.825 1.175T21 10q0 .575-.137 1.063T20.45 12L17 18z',
    title: 'Quote',
    subMenu: [{ href: '?ref=quote-list', label: 'Quote List' }]
  },
  // {
  //   title: 'Glass Type',
  //   subMenu: [
  //     { href: '?ref=add-glass-type', label: 'Add Glass Type' },
  //     { href: '?ref=glass-type-list', label: 'Glass Type List' }
  //   ]
  // },
  {
    icon: 'M14 13q.6 0 1.088-.325t.737-.875q.075-.35.35-.575T16.8 11H20V4H8v7h3.2q.35 0 .625.213t.35.562q.125.6.65.913T14 13m-6 5q-.825 0-1.412-.587T6 16V4q0-.825.588-1.412T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm-4 4q-.825 0-1.412-.587T2 20V7q0-.425.288-.712T3 6t.713.288T4 7v13h13q.425 0 .713.288T18 21t-.288.713T17 22z',
    title: 'Product',
    subMenu: [
      { href: '?ref=add-products', label: 'Add Products' },
      { href: '?ref=import-products', label: 'Import Products' },
      { href: '?ref=product-list', label: 'Product List' }
    ]
  },
  {
    icon: 'M6 19v1q0 .425-.288.713T5 21H4q-.425 0-.712-.288T3 20v-8l2.1-6q.15-.45.538-.725T6.5 5h11q.475 0 .863.275T18.9 6l2.1 6v8q0 .425-.287.713T20 21h-1q-.425 0-.712-.288T18 20v-1zm-.2-9h12.4l-1.05-3H6.85zm1.7 6q.625 0 1.063-.437T9 14.5t-.437-1.062T7.5 13t-1.062.438T6 14.5t.438 1.063T7.5 16m9 0q.625 0 1.063-.437T18 14.5t-.437-1.062T16.5 13t-1.062.438T15 14.5t.438 1.063T16.5 16',
    title: 'Vehicle',
    subMenu: [
      { href: '?ref=vehicle-make', label: 'Make' },
      { href: '?ref=vehicle-model', label: 'Model' },
      { href: '?ref=vehicle-series', label: 'Series' },
      // { href: '?ref=vehicle-year', label: 'Year' },
      { href: '?ref=vehicle-body', label: 'Body' },
      { href: '?ref=vehicle-group', label: 'Group' }
    ]
  },
  {
    icon: 'M19.523 21.99H4.488c-1.503 0-2.663-1.134-2.466-2.624l.114-.869c.207-1.2 1.305-1.955 2.497-2.214L11.928 15h.144l7.295 1.283c1.212.28 2.29.993 2.497 2.214l.114.88c.197 1.49-.963 2.623-2.466 2.623zM17 7A5 5 0 1 1 7 7a5 5 0 0 1 10 0',
    title: 'Users',
    subMenu: [{ href: '?ref=users', label: 'Users' }]
  }
]
