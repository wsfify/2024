<template>
    <div>
        <div class="box">
            <el-row>
                <el-col :span="10">
            <div class="mt-4">
    <el-input
      v-model="params.query"
      placeholder="请输入内容"
    >
      
      <template #append>
        <el-button :icon="Search"  />
      </template>
    </el-input>
  </div>
                </el-col>
              
                <el-col :span="2"><el-button type="primary" @click="add">添加用户</el-button></el-col>
            </el-row>
            <!--表格 -->
            <el-table :data="tableData" border >
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="username" label="姓名" ></el-table-column>
                <el-table-column prop="email" label="邮箱" ></el-table-column>
                <el-table-column prop="mobile" label="电话" ></el-table-column>
                <el-table-column prop="role_name" label="角色" ></el-table-column>
                <el-table-column prop="ms_state" label="状态" >
                    <template #default="scope">
                         <el-switch v-model="scope.row.mg_state" />    
                    </template>
                </el-table-column>
                <el-table-column label="操作" >
                    <template #default="scope">
                         <el-button type="primary" icon="Edit" @click="exit(scope.row)" />
                         <el-button type="danger" icon="Delete" @click="del(scope.row.id)"  />
                          <el-button type="warning" icon="Star"/>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 5, 10, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="golist"
      @current-change="golist"
    />

    <!-- 对话框 -->
    <el-dialog v-model="show" title="Shipping address">
    <el-form :model="form"
      ref="ruleFormRef"
      :rules="rules"
    >
      <el-form-item label="用户名"  prop="username">
        <el-input v-model="form.username"  />
      </el-form-item>
       <el-form-item label="密码"  prop="password">
        <el-input v-model="form.password"  />
      </el-form-item>
      <el-form-item label="邮箱" prop="email" >
        <el-input v-model="form.email"  />
      </el-form-item>
       <el-form-item label="电话"  prop="mobile">
        <el-input v-model="form.mobile"  />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">Cancel</el-button>
        <el-button type="primary" @click="oklist">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 对话框222 -->

  <el-dialog v-model="showing" title="编辑用户">
    <el-form :model="forming"  ref="ruleFormRef"
      :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="forming.username"  />
      </el-form-item>
       <el-form-item label="邮箱" prop="email">
        <el-input v-model="forming.email"  />
      </el-form-item>
       <el-form-item label="电话"  prop="mobile">
        <el-input v-model="forming.mobile"  />
      </el-form-item>
      
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showing = false">取消</el-button>
        <el-button type="primary" @click="bianji">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
        </div>
    </div>
</template>
<script setup>
import {ref ,reactive} from "vue"
import {getlist,addlist,dellist,exitlist} from "../../api/second/index"
import { Search } from '@element-plus/icons-vue'
const params=reactive({
    pagenum:1,
    pagesize:2,
    query:''
})
const total=ref(1)
const tableData=ref([])
const golist=()=>{
    getlist(params).then((res)=>{
        console.log(res);
        tableData.value=res.data.users
        total.value=res.data.total
    })
}
golist()


// 添加用户
const ruleFormRef=ref()
const show=ref(false)
const form=reactive({
  username:"",
  email:"",
  mobile:"",
  password:""
})
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
   email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' }
  ],
   mobile: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 6, max: 11, message: 'Length should be 6 to 11', trigger: 'blur' },
  ],
   password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 11', trigger: 'blur' },
  ],
})
const add=()=>{
    show.value=true
}
const oklist=()=>{
   addlist(form).then((res)=>{
      console.log();
       golist()
    })
    show.value=false
}

// 编辑用户
const showing =ref(false)
const forming=reactive({
    username:"",
    email:"",
    mobile:"",
    id:""
})
const exit=(val)=>{
 forming.username=val.username
 forming.email=val.email
 forming.mobile=val.mobile
 forming.id=val.id

//  forming=val
 console.log(val);
 showing.value=true
}
const bianji =()=>{
  exitlist(forming).then((res)=>{
    console.log(res);
    golist()
   
  })
   showing.value=false
}
// 删除
const del=(id)=>{
  dellist(id).then((res)=>{
    console.log(res);
    golist()
  })
}

// 搜索
const sel=()=>{
   golist()
}
</script>
<style lang="scss" scoped>
    .box{
        background-color: #fff;
        padding: 20px;
        box-sizing: border-box;
    }
    .input{
        width: 300px;
    }
    .icon{
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ccc;
    }
</style>