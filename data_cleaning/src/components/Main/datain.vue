<template>
  <div class="main-container">
    <el-form 
    class="box"
    :model="datainForm"
    :rules="datainFormRules"
    label-width="0px"
    ref="datainFormRef">
        <div class="row-box">
          <label style="height: 100%">导入的项目:</label>
          <el-form-item prop="proid">
            <el-select v-model="datainForm.proid" placeholder="请选择">
              <el-option
                v-for="item in this.$store.getters.getProList"
                :key="item.projectId"
                :label="item.projectName"
                :value="item.projectId">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="row-box">
          <label>导入的数据类型:</label>
          <el-form-item prop="data_value">
            <el-select v-model="datainForm.data_value" placeholder="请选择">
              <el-option
                v-for="item in datainForm.data_options"
                :key="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      <el-button @click="next">下一步</el-button>      
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datainForm: {
        data_options: [{
          value: '文本文件'
        },{
          value: '外部数据库'
        }],
        proid: '',
        data_value: ''
      },
      datainFormRules: {
        proid: [
          { required: true, message: '请选择项目', trigger: 'change' },
        ],
        data_value: [
          { required: true, message: '请选择需要导入', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    next() {
      this.$refs.datainFormRef.validate((valid) => {
        if(!valid) return
        if(this.datainForm.data_value==='文本文件') this.$router.push(`/textdatain/${this.datainForm.proid}`)
        if(this.datainForm.data_value==='外部数据库') this.$router.push(`/dbin/${this.datainForm.proid}`)
      })
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
.row-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px;
  width: 100%;
}
}
</style>