const path = "mmee1122";
const url = 'https://vue3-course-api.hexschool.io/v2'

//正常結構
// axios(method,url,data).then().catch();

//get、delete、head、options
//post、put、patch -data


//一種要token，一種不要，看api文件規定
// 六角後台要token，顧客不用
const hexApi = axios.create({
    baseURL: url,
});
const hexApiWithToken = axios.create({
    baseURL: url,
});

// ----- 登入及驗證 -----
//登入
export const Post_signin = (data) =>{
    hexApi.post(`/admin/signin`,data)
            .then(res=>{
            const { token, expired } = res.data;
            document.cookie = `meToken=${token};expires=${new Date(expired)}`;
            window.location = "product.html"
            })
            .catch(err=>alert(err.data.message))
        };
//登入後確認使用者
export const Post_check = ()=>hexApiWithToken.post(`/api/user/check`);

// ----- 管理控制台 - 產品 (Products) ----- 
//  產品清單
export const Get_products = ()=>hexApiWithToken.get(`/api/${path}/admin/products/all`)
// 產品清單(有分頁資訊)
export const Get_productsPage = ()=>hexApiWithToken.get(`/api/${path}/admin/products`)
// 新增產品
export const Post_product = (data)=>hexApiWithToken.post(`/api/${path}/admin/product`,data)
// 修改產品
export const Put_product = (data,id)=>hexApiWithToken.put(`/api/${path}/admin/product/${id}`,data)
// 刪除商品
export const Delete_product = (id)=>hexApiWithToken.delete(`/api/${path}/admin/product/${id}`)


// import引入完，需解構才能使用寫法
// export const adminApi = ()=>{
//     // ----- 登入及驗證 -----
//     //登入
//     const Post_signin = (data) =>{
//         hexApi.post(`/admin/signin`,data)
//                 .then(res=>{
//                 const { token, expired } = res.data;
//                 document.cookie = `meToken=${token};expires=${new Date(expired)}`;
//                 window.location = "product.html"
//                 })}
//     //登出 目前用在哪?
//     const Post_logout = ()=>hexApiWithToken.post(`/logout`)
//     //登入後確認使用者
//     const Post_check = ()=>hexApiWithToken.post(`/api/user/check`)

//     // ----- 管理控制台 - 產品 (Products) ----- 
//     // 產品清單
//     const Get_products = ()=>hexApiWithToken.get(`/api/${path}/admin/products/all`)
//     // 產品清單(有分頁資訊)
//     const Get_productsPage = ()=>hexApiWithToken.get(`/api/${path}/admin/products`)
//     // 新增產品
//     const Post_product = (data)=>hexApiWithToken.post(`/api/${path}/admin/product`,data)
//     // 修改產品
//     const Put_product = (data,id)=>hexApiWithToken.put(`/api/${path}/admin/product/${id}`,data)
//     // 刪除商品
//     const Delete_product = (id)=>hexApiWithToken.delete(`/api/${path}/admin/product/${id}`)

//     return {
//         Post_signin,
//         Post_logout,
//         Post_check,
//         Get_products,
//         Get_productsPage,
//         Post_product,
//         Put_product,
//         Delete_product
//     }
// }
