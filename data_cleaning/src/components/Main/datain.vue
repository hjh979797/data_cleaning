<template>
  <div class="main-container">
    <div class="box">
      <div style="margin: 30px">
        <label>导入的项目:</label>
        <el-select v-model="pro_value" placeholder="请选择">
          <el-option
            v-for="item in pro_options"
            :key="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div style="margin: 30px">
        <label>导入的数据类型:</label>
        <el-select v-model="data_value" placeholder="请选择">
          <el-option
            v-for="item in data_options"
            :key="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button @click="next">下一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pro_options: [{
        value: '项目一'
      },{
        value: '项目二'
      }],
      data_options: [{
        value: '文本文件'
      },{
        value: '外部数据库'
      }],
      pro_value: '',
      data_value: ''
    }
  },
  methods: {
    next() {
      console.log(this.data_value)
      if(this.data_value==='') this.$message.error("请选择数据类型")
      if(this.data_value==='文本文件') this.$router.push('/textdatain')
      if(this.data_value==='外部数据库') this.$router.push('/dbin')
    }
  }
}
</script>

<style lang="less" scoped>
.main-container {
  width: 100%;
  height: 100%;
  .box {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    text-align: right;
    .el-button{
      position: absolute;
      left: 50%;
      transform: translate(-50%);
    }
}
}
</style>