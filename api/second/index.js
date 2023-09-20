import http from "../http"
// 登录
export const getlogin=(params)=>http.post("/login",params)
// 左侧菜单
export const getmenu=(params)=>http.get("/menus",{params})
// 用户列表
export const getlist=(params)=>http.get("/users",{params})
// 添加用户
export const addlist=(params)=>http.post("/users",params)
// 删除用户
export const dellist=(id)=>http.delete("users/"+id)
// 编辑用户
export const exitlist=(params)=>http.put(`users/${params.id}`,params)