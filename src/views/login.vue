<template>
    <div>
        <div class="box">
           
            <div class="div">
                <div class="dv2">
                    <img src="../assets/积云图.png" alt="">
                </div>
              <div class="dv1">
                  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
  >
        <el-form-item prop="username" >
      <el-icon class="icon"><UserFilled /></el-icon>
      <el-input v-model="ruleForm.username" class="input" />
    </el-form-item>
        <el-form-item prop="password">
        <el-icon  class="icon"><Lock /></el-icon>
      <el-input type="password" v-model="ruleForm.password" class="input" />
    </el-form-item>
     <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
      <el-button >重置</el-button>
    </el-form-item>
                </el-form>
              </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref,reactive} from "vue"
import { ElMessage } from 'element-plus'
import {getlogin} from "../../api/second/index"
import {useRouter} from "vue-router"
const ruleFormRef=ref()
const router=useRouter()
const ruleForm=reactive({
    username:"admin",
    password:123456
})
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
        getlogin(ruleForm).then((res)=>{
            console.log(res);
            localStorage.setItem("token",res.data.token)
              ElMessage({
                showClose: true,
                message: '登录成功',
                type: 'success',
            })
            router.push("/")
        })
      
    } else {
      console.log('error submit!', fields)
    }
  })
}

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 6, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
   password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 6, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
})
</script>
<style lang="scss" scoped>
    .box{
        width: 100%;
        height: 100vh;
        background: url(/public/积云.png);
        background-repeat: no-repeat;
    }
    .div{
        width: 500px;
        height: 300px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        padding: 10px 10px;
        box-sizing: border-box;
        position: relative;
    }
    .dv1{
        width: 85%;
        height: 200px;
        margin-top: 80px;
        margin-left: 50px;
       .input{
        width: 320px;
        margin-left: 15px;
       }
    }
    .icon{
        color: #ccc;
        top: 0;
        left: 0;
        // position: absolute;
    }
    .dv2{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #fff;
        position: absolute;
        top: -47px;
        left: 39%;
        img{
            width: 100%;
            height: 100%;

        }
    }
</style>