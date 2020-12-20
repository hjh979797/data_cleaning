<template>
  <div class="main-container">
    <div class="box">
      <div class="in_box">
        <label style="margin: 10px">数据库类型</label>
        <el-select v-model="dbtype" placeholder="请选择">
          <el-option
            v-for="item in dbtype_options"
            :key="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="in_box">
        <label style="margin: 10px">服务器IP</label>
        <el-input v-model="ServerIP" placeholder="请输入信息"></el-input>
      </div>
      <div class="in_box">
        <label style="margin: 10px">服务器端口号</label>
        <el-input v-model="Serverport" placeholder="请输入信息"></el-input>
      </div>
      <div class="in_box">
        <label style="margin: 10px">用户名</label>
        <el-input v-model="username" placeholder="请输入信息"></el-input>
      </div>
      <div class="in_box">
        <label style="margin: 10px">密码</label>
        <el-input v-model="password" placeholder="请输入信息"></el-input>
      </div>
      <div class="in_box" style="height:40.8px">
        <el-button @click="test" size="mini">测试连接</el-button>
        <el-alert
          title="测试通过"
          type="success"
          :closable="false"
          v-show="issuccess&&isshow">
        </el-alert>
        <el-alert
          title="测试失败"
          type="error"
          :closable="false"
          v-show="!issuccess&&isshow">
        </el-alert>
      </div>
      <div class="in_box">
        <label style="margin: 10px">数据库</label>
        <el-select v-model="db" placeholder="请选择">
          <el-option
            v-for="item in db_options"
            :key="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="in_box">
        <label style="margin: 10px">表名</label>
        <el-select v-model="tablename" placeholder="请选择">
          <el-option
            v-for="item in table_options"
            :key="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="in_box">
        <label style="margin: 10px">数据集名称</label>
        <el-input v-model="dataname" placeholder="请输入信息"></el-input>
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
    return{
      dbtype_options: [{
        value: 'mysql'
      },{
        value: 'postgresql'
      },{
        value: 'oracle'
      },{
        value: 'SQL Server'
      }],
      db_options: [{
        value: '数据库1'
      },{
        value: '数据库2'
      }],
      table_options: [{
        value: '表1'
      },{
        value: '表2'
      }],
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
      dbtype: '',
      ServerIP: '',
      Serverport: '',
      username: '',
      password: '',
      dataname: '',
      db: '',
      tablename: '',
      issuccess: true,
      isshow: false,
      lookData: false
    }
  },
  methods: {
    test() {
      this.isshow = true
    },
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
    .el-select{
      width: 60%
    }
    .in_box {
      margin: 15px;
      display: flex;
      justify-content: flex-end;
      .el-input {
        width: 60%;
      }
      .el-alert{
        width: 40%;
      }
      .el-button{
        position: absolute;
        left: 20%;
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