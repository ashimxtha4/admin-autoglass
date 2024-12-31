import { useSearchParams } from 'next/navigation'
import React from 'react'
import AddProduct from './product/add-product'
import ImportProducts from './product/import-products'
import ProductList from './product/product-list'
import VehicleMake from './vehicle/vehicle-make'
import VehicleModel from './vehicle/vehicle-model'
import VehicleSeries from './vehicle/vehicle-series'
import VehicleType from './vehicle/vehicle-type'
import VehicleGroup from './vehicle/vehicle-group'
import ProductOrders from './customer/orders/product-orders'
import QuoteList from './customer/quote/quote-list'
import ImportProduct from './product/import-products'
import AddGlassType from './glass-type/add-glass-type'
import ListGlassType from './glass-type/list-glass.type'

const SideBarContent = () => {
  const searchParams = useSearchParams()
  const search = searchParams?.get('ref')

  switch (search) {
    case 'add-products':
      return <AddProduct />
    case 'import-products':
      return <ImportProducts />
    case 'product-list':
      return <ProductList />
    case 'vehicle-make':
      return <VehicleMake />
    case 'vehicle-model':
      return <VehicleModel />
    case 'vehicle-series':
      return <VehicleSeries />
    case 'vehicle-year':
      return <>vehicle-year</>
    case 'vehicle-body':
      return <VehicleType />
    case 'vehicle-group':
      return <VehicleGroup />
    case 'product-orders':
      return <ProductOrders />
    case 'import-product':
      return <ImportProduct />
    case 'quote-list':
      return <QuoteList />
    case 'add-glass-type':
      return <AddGlassType />
    case 'glass-type-list':
      return <ListGlassType />
    default:
      return
  }
}

export default SideBarContent
