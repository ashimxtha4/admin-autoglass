import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'
import AddProduct from './product/add-product'
import ImportProducts from './product/import-products'
import ProductList from './product/product-list'
import ProductOrders from './customer/orders/product-orders'
import QuoteList from './customer/quote/quote-list'
import ImportProduct from './product/import-products'
import AddGlassType from './glass-type/add-glass-type'
import ListGlassType from './glass-type/list-glass.type'
import { LoadingSpinner } from '../ui/loading-spinner'
import ProductDetail from './product/product-detail'
import VehicleMake from './vehicle/make/vehicle-make'
import VehicleModel from './vehicle/model/vehicle-model'
import VehicleSeries from './vehicle/series/vehicle-series'
import VehicleGroup from './vehicle/group/vehicle-group'
import VehicleType from './vehicle/type/vehicle-type'

const SideBarContent = () => {
  const searchParams = useSearchParams()
  const search = searchParams?.get('ref')

  switch (search) {
    case 'add-products':
      return <Suspense fallback={<LoadingSpinner />}>
        <AddProduct />
      </Suspense>
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
    case 'product-details':
      return <ProductDetail />
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
