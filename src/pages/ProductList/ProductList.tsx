import AsideFilter from './AsideFilter/AsideFilter'
import Product from './Product/Product'
import SortProductList from './SortProductList/SortProductList'

export default function ProductList() {
  return (
    <div className='py-6 bg-gray-200'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='grid grid-cols-2 mt-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap3'>
              {Array(30)
                .fill(0)
                .map((_, index) => (
                  <div className='col-span-1' key={index}>
                    <Product />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
