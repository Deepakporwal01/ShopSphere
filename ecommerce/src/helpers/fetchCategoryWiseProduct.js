import { SummaryApi } from "../common"

export const fetchCategoryWiseProduct = async (category) =>{

    const response = await fetch(SummaryApi.get_eachcategoryProduct.url,{
        method:SummaryApi.get_eachcategoryProduct.method,
        headers:{
            "content-type" :"application/json",
        },
            body: JSON.stringify({
                category :category
            })
    })
    const data = await response.json()
    return data
} 