<template>
  <div class="menutwo">
    <el-dropdown @command="handleCommand" trigger="click">
            <span class="el-dropdown-link">
            <el-button type="text" icon="el-icon-more"></el-button>
            </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="rename">重命名</el-dropdown-item>
        <el-dropdown-item command="del">删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- index指向去处 -->
    <el-menu-item index="mainshoworopra">
      <template slot="title">
        <span>{{seconditem.dataname }}</span>
      </template>
    </el-menu-item>
  </div>
</template>
<script>
export default {
  data(){
    return{
      seconditem:{
        dataname:"数据1"
      }
    }
  }
}
</script>
