export const SIDEBAR_MENU_ITEMS = [
  {
    title: 'Orders',
    subMenu: [{ href: '?ref=product-orders', label: 'Product Orders' }]
  },
  {
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
    title: 'Product',
    subMenu: [
      { href: '?ref=add-products', label: 'Add Products' },
      { href: '?ref=import-products', label: 'Import Products' },
      { href: '?ref=product-list', label: 'Product List' }
    ]
  },
  {
    title: 'Vehicle',
    subMenu: [
      { href: '?ref=vehicle-make', label: 'Make' },
      { href: '?ref=vehicle-model', label: 'Model' },
      { href: '?ref=vehicle-series', label: 'Series' },
      // { href: '?ref=vehicle-year', label: 'Year' },
      { href: '?ref=vehicle-body', label: 'Body' },
      { href: '?ref=vehicle-group', label: 'Group' }
    ]
  }
]
