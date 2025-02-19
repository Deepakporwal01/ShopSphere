 

const backenddomain = "http://localhost:8080"

 export const SummaryApi = {
    signUp:{
        url :`${backenddomain}/api/signup`,
        method:"post"
    },
    signIn:{
        url:`${backenddomain}/api/signin`,
        method:"post"
    },
    current_user:{
        url:`${backenddomain}/api/user-details`,
        method:"get"
    },
    logout_user:{
        url:`${backenddomain}/api/userLogout`,
        method:"get"
    },
    all_users:{
        url:`${backenddomain}/api/all-users`,
        method:"get"
    },
    update_user:{
        url:`${backenddomain}/api/update-user`,
        method:"post"
    },
    upload_product:{
        url:`${backenddomain}/api/upload-product`,
        method:"post"
    },
    get_product:{
        url:`${backenddomain}/api/get-product`,
        method:"get"
    },
     update_product:{ 
        url:`${backenddomain}/api/update-product`, 
        method:"post" 
    },
     get_categoryProduct:{
        url:`${backenddomain}/api/get-categoryProduct`,
        method:"get"
    },
     get_eachcategoryProduct:{
        url:`${backenddomain}/api/get-eachCategoryProduct`,
        method:"post"
    },
     get_productdetails:{
        url:`${backenddomain}/api/get-productdetails`,
        method:"post"
    },
    addtoCart:{
        url:`${backenddomain}/api/addtoCart`,
        method:"post"
    },
    countaddtoCart:{
        url:`${backenddomain}/api/countaddtoCart`,
        method:"get"
    },
     viewCart:{
        url:`${backenddomain}/api/viewCart`,
        method:"get"
    },
updateaddtoCart :{
 url:`${backenddomain}/api/updateCart`,
 method:"post"
},
removefromCart :{
 url:`${backenddomain}/api/removefromcart`,
 method:"post"
}
,
searchProduct :{
    url:`${backenddomain}/api/search`,
    method:"get"
   },
   filterproduct  :{
    url:`${backenddomain}/api/filter-product`,
    method:"post",
   }
}