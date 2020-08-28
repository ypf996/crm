//对axios进行二次封装
axios.defaults.baseURL = "http://localhost:8888"
//数据以表单的形式扔给服务器
axios.defaults.headers['Content-Type']='application/x-www-form-urlencoded'

axios.defaults.transformRequest = function(data){
    if(!data) return data;
    let result = '';
    for(let attr in data){
        if(!data.hasOwnProperty(attr))break;
        result +=`&${attr}=${data[attr]}`
    }
    return result.substring(1)
}

//配置请求拦截器
axios.interceptors.request.use(config =>{
    return config
})
//配置响应拦截器
axios.interceptors.response.use(response =>{
    return response.data;
})