const url =`https://api.cloudinary.com/v1_1/dsmposhld/image/upload`

 export const uploadImage= async(image)=>{
const formData = new FormData()
formData.append("file",image);
formData.append("upload_preset","ecommerce")

const dataResponse = await fetch(url,{
    method:"post",
    body:formData
})
return dataResponse.json();

}