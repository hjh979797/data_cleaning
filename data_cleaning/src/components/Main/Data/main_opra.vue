<template>
  <el-container class="box-container">
    <el-header height="5%"></el-header>
    <el-main>
      <nullOpra v-if="this.$store.getters.getOpraType==='null'"/>
      <outlier v-if="this.$store.getters.getOpraType==='outlier'"/>
      <sortitem v-if="this.$store.getters.getOpraType==='sort'"/>
      <filteritem v-if="this.$store.getters.getOpraType==='filter'"/>
      <resetColumnitem v-if="this.$store.getters.getOpraType==='resetColumn'"/>
    </el-main>
    <el-footer height="5%"></el-footer>
  </el-container>
</template>

<script>
import filteritem from '../../yumiao/filter.vue'
import fillitem from '../../yumiao/fill.vue'
import sortitem from '../../yumiao/sort.vue'
import outlier from "./Opras/outlierDetection.vue"
import nullOpra from './Opras/nullOpra.vue'
import resetColumnitem from '../../yumiao/resetColumn.vue'
export default {
  components:{
    filteritem,
    fillitem,
    outlier,
    sortitem,
    nullOpra,
    resetColumnitem
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