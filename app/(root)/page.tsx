import ProductList from '@/components/shared/product/product-list'
import sampleData from '@/db/sample-data'
import React from 'react'

export default function HomePage() {
  return (
    <div>
        <ProductList data={sampleData.products} title='Mi lista' limit={4} />
      
    </div>
  )
}
