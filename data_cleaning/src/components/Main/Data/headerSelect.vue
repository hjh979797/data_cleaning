<template>
  <span class="header_container">
    <span>{{this.label}}</span>
     <!-- <vxe-button size="mini" type="text" >
      <template v-slot:dropdowns>
        <vxe-button type="text" content="下拉按钮1"></vxe-button>
        <vxe-button type="text" status="primary" content="下拉按钮2"></vxe-button>
        <vxe-button type="text" content="下拉按钮3"></vxe-button>
      </template>
    </vxe-button> -->
    <el-dropdown trigger="click" type="text">
      <span class="el-dropdown-link" @click="handleClick">
        <el-button type="text" style="color: #C0C0C0" class="el-icon-menu el-icon--right"></el-button>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>文本透视</el-dropdown-item>
        <el-dropdown-item>数字透视</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </span>
</template>

<script>
export default {
  props:{
    label: "",
    column: ""
  },
  methods: {
    handleClick(flag){
      console.log("列： ")
      console.log(this.column)
      console.log(this.$refs)
      if(flag){
        // 出现下拉框
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header_container {
  position: relative;
  bottom: 0px;
}
</style>