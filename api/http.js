import axios from "axios"
const http =axios.create({
    baseURL:"http://175.27.228.178:3434/api/private/v1/",
    timeout:5000
})

// 请求拦截
http.interceptors.request.use(config=>{
    var token=localStorage.getItem("token")
    if(token){
        config.headers.Authorization=token
    }
    return config
},err=>{
    return Promise.reject(err)
})
http.interceptors.response.use(res=>{
    return res.data
},err=>{
    return Promise.reject(err)
})
export default http