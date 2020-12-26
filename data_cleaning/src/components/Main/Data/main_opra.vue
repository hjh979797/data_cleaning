<template>
  <div>
    <el-container class="box-container">
      <el-header height="5%"></el-header>
      <el-main><outlier/></el-main>
      <el-footer height="5%"></el-footer>
    </el-container>


    <div>
      <sortitem></sortitem>
    </div>
  </div>
</template>

<script>
import filteritem from '../../yumiao/filter.vue'
import fillitem from '../../yumiao/fill.vue'
import sortitem from '../../yumiao/sort.vue'
import outlier from "./Opras/outlierDetection.vue"
import Sort from '../../yumiao/sort.vue'
export default {
  methods: {
    add:function(amount) {
      // 最好不要直接修改数据,可以调用mutations中方法
      // this.$store.commit("add")
      // 调用actions中的add
      this.$store.dispatch("add", amount)
    }
  },
  components:{
    filteritem,
    fillitem,
    outlier,
    sortitem,
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