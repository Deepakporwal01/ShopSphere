import React from 'react'
import CategoryWiseProductList from '../components/CategoryWiseProductList'
import BannerProducts from '../components/BannerProducts'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div className=' text-black'>
     <CategoryWiseProductList/>
     <BannerProducts/>
     <HorizontalCardProduct category={"airpods"} heading ={"Top Airpods"}/>
     <HorizontalCardProduct category={"camera"} heading ={"Top Cameras"}/>
    <VerticalCardProduct category={"earphone"} heading ={"Popular  Earphones"} />
    <VerticalCardProduct category={"mobiles"} heading ={"Popular Mobiles"} />
    <VerticalCardProduct category={"mouses"} heading ={" Top Mouses"} />
    <VerticalCardProduct category={"printers"} heading ={" Most Selling Printers"} />
    <VerticalCardProduct category={"refrigerators"} heading ={"Popular Refrigerators"} />
    <VerticalCardProduct category={"trimmers"} heading ={" Trending Trimers"} />
    <VerticalCardProduct category={"proccesor"} heading ={" Top Processors"} />
    <VerticalCardProduct category={"televisions"} heading ={"Popular Televisions"} />
    <VerticalCardProduct category={"watches"} heading ={"Trending Watches"} />
     
    </div>
  )
}
export default Home
