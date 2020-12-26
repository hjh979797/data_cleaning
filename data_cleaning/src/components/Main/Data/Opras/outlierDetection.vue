<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="text-align: center vertical-align: middle">
        总行数：{{outlierForm.rows}}
      </span>
      <div class="showall">
        <span>显示全部</span>
        <el-switch
          v-model="isAll"
          active-color="#13ce66"
          inactive-color="#000">
        </el-switch>
      </div>
    </div>
    <div>
      <div class="statistic-card">
        <el-card>
          <div slot="header" class="clearfix"><span>数据统计</span></div>
          <div class="resmain">数据</div>
        </el-card>
      </div>
      <div class="vis-card">
        <el-card>
          <div class="clearfix" slot="header"><span>可视化结果</span></div>
          <div class="visshow">可视化图</div>
        </el-card>
      </div>
      
    </div>
    <div class="btns">
      <el-button type="primary">确定</el-button>
      <el-button>取消</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      outlierForm: {
        rows: 1000
      },
      isAll: false
    }
  },
  methods: {
    onSubmit() {

    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  width: 100%;
  height: 100%;
  .statistic-card {
    height: 180px;
  }
  .vis-card {
    height: 150px;
  }
}
.btns {
  float: right;  
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.showall {
  float: right;
  padding: 3px 0;
  display:flex;
  flex-flow: column;
}
</style>