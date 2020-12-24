<template>
  <el-container class="box-container">
  <el-header height="5%"></el-header>
  <el-main><outlier/></el-main>
  <el-footer height="5%"></el-footer>
</el-container>
</template>

<script>
import outlier from "./Opras/outlierDetection.vue"
export default {
  components: {
    outlier
  }
}
</script>

<style lang="less" scoped>
.box-container{
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
   .el-header{
    // padding: 5px;
    margin-top: 5px;
  }
  .el-footer {
    background-color: #fff;
    opacity: 0.9;
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
  }
  .el-main {
    width: 100%;
  }
}
</style>