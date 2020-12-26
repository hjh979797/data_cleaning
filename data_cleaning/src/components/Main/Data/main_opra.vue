<template>
    <el-container class="box-container">
      <el-header height="5%"></el-header>
      <el-main><outlier/></el-main>
      <el-footer height="5%"></el-footer>
    </el-container>


    <!-- <div>
    <fillitem></fillitem>
    </div> -->
</template>

<script>
import filteritem from '../../yumiao/filter.vue'
import fillitem from '../../yumiao/fill.vue'
import outlier from "./Opras/outlierDetection.vue"
export default {
  components:{
    filteritem,
    fillitem,
    outlier
  }
}
</script>

<style lang="less" scoped>
.box-container{
  background-color: #fff;
  position: relative;
  top: 2%;
  right: 2%;
  left: 2%;
  display: flex;
  flex-flow: column;
  width: 95%;
  height: 95%;
  box-shadow:0 0 9px 3px #336699;
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
    padding: 15px;
  }
}
</style>