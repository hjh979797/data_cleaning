<template>
  <div class="main-container">
    <div class="box">
      <el-form 
        :model="dbinfoForm"
        :rules="dbinfoFormRules"
        label-width="0px"
        ref="dbinfoFormRef">
        <div class="in_box">
          <label style="margin: 10px">数据库类型</label>
          <el-form-item prop="dbtype">
            <el-select v-model="dbinfoForm.dbtype" placeholder="请选择">
              <el-option
                v-for="item in dbinfoForm.dbtype_options"
                :key="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="in_box">
          <label style="margin: 10px">服务器IP</label>
          <el-form-item prop="ServerIP">
            <el-input v-model="dbinfoForm.ServerIP" placeholder="请输入信息"></el-input>
          </el-form-item>
        </div>
        <div class="in_box">
          <label style="margin: 10px">服务器端口号</label>
          <el-form-item prop="Serverport">
            <el-input v-model="dbinfoForm.Serverport" placeholder="请输入信息"></el-input>
          </el-form-item>
        </div>
        <div class="in_box">
          <label style="margin: 10px">用户名</label>
          <el-form-item prop="username">
            <el-input v-model="dbinfoForm.username" placeholder="请输入信息"></el-input>
          </el-form-item>
        </div>
        <div class="in_box">
          <label style="margin: 10px">密码</label>
          <el-form-item prop="password">
            <el-input v-model="dbinfoForm.password" placeholder="请输入信息"></el-input>
          </el-form-item>
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
      </el-form>

      <el-form
        :model="dbinForm"
        :rules="dbinFormRules"
        label-width="0px"
        ref="dbinFormRef"
        :disabled="istest">
        <div class="in_box">
          <label style="margin: 10px">数据库</label>
          <el-form-item prop="db">
            <el-select v-model="dbinForm.db" placeholder="请选择">
              <el-option
                v-for="item in dbinForm.db_options"
                :key="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="in_box">
          <label style="margin: 10px">表名</label>
          <el-form-item prop="tablename">
            <el-select v-model="dbinForm.tablename" placeholder="请选择">
              <el-option
                v-for="item in dbinForm.table_options"
                :key="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="in_box">
          <label style="margin: 10px">数据集名称</label>
          <el-form-item prop="dataname">
            <el-input v-model="dbinForm.dataname" placeholder="请输入信息"></el-input>
          </el-form-item>
        </div>
        <el-button @click="justifyLookData" class="look_button">预览数据</el-button>
      </el-form>
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
  created() {
    this.proid = this.$route.params.proid
  },
  data() {
    var t = (rule, value, callback) => {
      console.log(value)
    }
    return{
      proid: "",
      dbinfoForm: {
        dbtype: '',
        ServerIP: '',
        Serverport: '',
        username: '',
        password: '',
        dbtype_options: [{
          value: 'mysql'
        },{
          value: 'postgresql'
        },{
          value: 'oracle'
        },{
          value: 'SQL Server'
        }]
      },
      dbinfoFormRules: {
        dbtype: [
          { required: true, message: '请输入数据库类型', trigger: 'blur' }
        ],
        ServerIP: [
          { required: true, message: '请输入服务器IP', trigger: 'blur' }
        ],
        Serverport: [
          { required: true, message: '请输入服务器端口号', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      dbinForm: {
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
        dataname: '',
        db: '',
        tablename: ''
      },
      dbinFormRules: {
        db: [
          { required: true, message: '请输入数据库名', trigger: 'blur' }
        ],
        tablename: [
          { required: true, message: '请输入表名', trigger: 'blur' }
        ],
        dataname: [
          { required: true, message: '请输入数据集名称', trigger: 'blur' }
        ],
      },
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
      istest: true,
      issuccess: true,
      isshow: false,
      lookData: false
    }
  },
  methods: {
    test() {
      this.$refs.dbinfoFormRef.validate((valid) => {
        if(!valid) return
        this.$http({
          url:  "/data/DBTest",
          methods: "get",
          params: {
            DBUrl: 'jdbc:mysql://localhost:3308',
            User: 'root',
            Password: '123456'
          },
          headers: {
            Authorization: this.$store.getters.getToken
          },
          success: function (msg) {
            console.log(msg)
          },
          error: function(msg){
            console.log(msg)
          }
        })
        this.isshow = true
        this.istest = false
      })
    },
    inputData() {
      this.lookData = false
      this.$router.push('/maindata')
    },
    justifyLookData() {
      this.$refs.dbinFormRef.validate((valid) => {
        if(!valid) return
        this.lookData = true
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
    background-color: #fff;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: right;
    box-shadow:0 0 9px 3px #336699;
    height: 100%;
    width: 30%;
    .look_button{
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      // background-color: #99CCFF;
      // color: #336699;
    }
    .in_box {
      margin: 0px 10px 0px 10px;
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
        background-color: #99CCFF;
        color: #336699;
      }
      .el-select{
        margin-top: 5px;
        width: 60%
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