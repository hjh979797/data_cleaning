<template>
  <div class="main-container">
    <div class="box">
      <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip" style="text-align: left">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <div class="in_box">
        <label style="margin: 10px">数据集名称</label>
        <el-input v-model="dataname" placeholder="请输入数据集名称"></el-input>
      </div>
      <div class="in_box">
        <label style="margin: 10px">分隔符</label>
        <el-input v-model="sep" placeholder="请输入分隔符"></el-input>
      </div>
      <div class="in_box" style="height: 40.8px">
        <el-checkbox v-model="isfirstname">将第一行作为属性名称</el-checkbox>
      </div>
      <el-button @click="lookData = true" class="look_button">预览数据</el-button>
    </div>
    <el-dialog title="预览数据" :visible.sync="lookData" :modal-append-to-body="false" center>
      <el-container :v-model="form">
        <el-header>
          <div class="top-left">
            <label :v-model="form.totalrownum">{{"总共行数: " + form.totalrownum + "行"}}</label>
            <label :v-model="form.visrownum">{{"显示行数: " + form.visrownum + "行"}}</label>
            <label :v-model="form.colnum">{{"总共列数: " + form.colnum + "列"}}</label>
          </div>
          <div class="top-right">
            <label>列选择</label>
            <el-radio v-model="form.selctall" :label="true">全选</el-radio>
            <el-radio v-model="form.selctall" :label="false">全不选</el-radio>
          </div>
        </el-header>
        <el-main>
          <el-table :data="gridData">
            <el-table-column property="date" label="日期" width="150"></el-table-column>
            <el-table-column property="name" label="姓名" width="200"></el-table-column>
            <el-table-column property="address" label="地址"></el-table-column>
          </el-table>
        </el-main>
        <el-footer>
          <el-button @click="lookData = false">返 回</el-button>
          <el-button type="primary" @click="inputData">导 入</el-button>
        </el-footer>
      </el-container>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sep: '',
      dataname: '',
      isfirstname: false,
      lookData: false,
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      form: {
        totalrownum: 1000,
        visrownum: 50,
        colnum: 10,
        selctall: true,
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    inputData() {
      this.lookData = false
      this.$router.push('/maindata')
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
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: right;
    .look_button{
      position: absolute;
      left: 50%;
      transform: translate(-50%);
    }
    .in_box {
      margin: 15px;
      display: flex;
      justify-content: flex-end;
      .el-input {
        width: 60%;
      }
      .el-checkbox {
        position: absolute;
        left: 30%;
      }
    }
  }
}
.el-dialog{
  .el-header{
    display: flex;
    justify-content: space-between;
  }
  .top-left{
    display: flex;
    flex-flow: column;
    position: absolute;
    left: 20%;
  }
  .top-right{
    display: flex;
    flex-flow: column;
    position: absolute;
    right: 30%;
  }
  .el-footer{
    position: relative;
    left: 30%;
  }
}
</style>