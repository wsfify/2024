<template>
  <div class="home">
       <el-container>
      <el-header>
        <div class="top">
          <div class="dv1">
            <img src="../assets/积云图.png" >
            <p>积云后台管理系统</p>
          </div>
            <el-button type="primary" class="btn">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" class="aside">
          <el-menu
        :default-active="$route.path"
        router
      >
        <el-sub-menu :index="'/'+item.path" v-for="item in menu" :key="item.id">
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{item.authName}}</span>
          </template>
          <el-menu-item-group v-for="ele in item.children" :key="ele.id">
            <el-menu-item :index="'/'+ele.path">{{ele.authName}}</el-menu-item>
          </el-menu-item-group>

        </el-sub-menu>
       
      </el-menu>
        </el-aside>
        <el-main class="main">
             <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{$route.meta.names}}</el-breadcrumb-item>
  </el-breadcrumb>

          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {ref,reactive} from "vue"
import {getmenu} from "../../api/second/index"
const menu=ref([])
const gomenu=()=>{
  getmenu().then((res)=>{
    console.log(res);
    menu.value=res.data
  })
}
gomenu()
</script>
<style lang="scss" scoped>
  .top{
    width: 100%;
    height: 60px;
    background-color: #57cc7f;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .dv1{
    display: flex;
    color: #fff;
    img{
      width: 50px;
      height: 50px;
    }
    p{
      margin-top: 10px;
      margin-left: 10px;
    }
  }
  .btn{
    margin-top: 10px;
  }
  .aside{
    height: 100vh;
    background-color: #a6f2cf;
  }
  .main{
    background-image: url(/public/积云.png);
    width: 100%;
    height: 100vh;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 10px 20px;
    box-sizing: border-box;
  }
  .elmain{
    background-color: #a6f2cf;
  }
</style>