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
            <el-select v-model="dbinfoForm.db" placeholder="请选择" @change="select_db">
              <el-option
                v-for="(val, key, index) in dbinForm.dbInfo"
                :key="index"
                :value="val.dbName">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="in_box">
          <label style="margin: 10px">表名</label>
          <el-form-item prop="tablename">
            <el-select v-model="dbinForm.tablename" placeholder="请选择">
              <el-option
                v-for="(val, key, index) in dbinForm.tbInfo"
                :key="index"
                :value="val"
                :label="val">
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
            <el-table-column 
              v-for="(item, index) in cols"
              :key="index"
              :prop="item" 
              :label="item">
            </el-table-column>
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
        dbInfo: [],
        tbInfo: [],
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
      lookData: false,
      selectedDb: -1,
      cols: []
    }
  },
  methods: {
    select_db(data) {
      console.log("选中值为"+this.$refs.selectDbRef)
      console.log(data)
      for(var item in this.dbinForm.dbInfo){
        if(this.dbinForm.dbInfo[item].dbName === data){
          this.dbinForm.db = this.dbinForm.dbInfo[item].dbName
          this.dbinForm.tbInfo = this.dbinForm.dbInfo[item].tbName
          break
        }
      }
    },
    test() {
      this.$refs.dbinfoFormRef.validate(async valid => {
        if(!valid) return
        await this.$http({
          url:  "/data/DBTest",
          methods: "get",
          params: {
            // DBIP: this.dbinfoForm.ServerIP,
            // User: this.dbinfoForm.username,
            // Password: this.dbinfoForm.password
            DBIP: "212.64.87.241",
            User: "huangjiahui",
            Password: "Hyp123456!"
          },
          headers: {
            Authorization: this.$store.getters.getToken
          }
        }).then(res => {
          console.log("数据库测试结果返回： ")
          let dbForm = []
          for(var item in res.data.data) {
            let dic = {}
            dic['dbName'] = item
            dic['tbName'] = res.data.data[item]
            dbForm.push(dic)
          }
          console.log("整理后的数据： ")
          console.log(dbForm)
          this.dbinForm.dbInfo = dbForm
          this.isshow = true
          this.istest = false
        }, error => {
          console.log("错误；", error.message)
        })
      })
    },
    async inputData() {
      let that = this.$router
      this.lookData = false
      await this.$http({
        url: '/data/DBImport',
        method: "post",
        headers: {
          Authorization: this.$store.getters.getToken
        },
        data: {
          // DBIP: this.dbinfoForm.ServerIP,
          // User: this.dbinfoForm.username,
          // Password: this.dbinfoForm.password
          DBIP: "212.64.87.241",
          user: "huangjiahui",
          password: "Hyp123456!",
          DBName: this.dbinForm.db,
          tableName: this.dbinForm.tablename,
          dataName: this.dbinForm.dataname,
          importColumns: "["+Array.from({length: this.cols.length}, (x, i) => i).join(",")+"]",
          projectId: parseInt(this.proid)
        }
      }).then(res => {
        console.log("导入数据库数据的最终结果返回： ")
        console.log(res)
        console.log(res.data.data)
        let newDataId = res.data.data.dataId
        this.$router.push(`/mainshoworopra/${newDataId}`)
      }, error => {
        console.log("错误；", error.message)
      })
      this.getMenuList()
    },// 获取该用户的项目和数据信息
    async getMenuList() {
      // const {data:res}  = await this.$http.get('/projects')
      const {data:res}  = await this.$http({
        url: "/project/projects",
        headers: {
          "Authorization": this.$store.getters.getToken
        },
        type: "get",
        dataType: 'json'
      })
      if(res.code !== 0) return this.$message.error(res.msg)
      this.$store.dispatch("uploadProList",res.data)
      // this.prolist = res.data
    },
    justifyLookData() {
      this.$refs.dbinFormRef.validate(async valid => {
        if(!valid) return
        await this.$http({
          url:'/data/DBImportView',
          method: 'get',
          params: {
            TableName: this.dbinForm.tablename,
            // DBIP: this.dbinfoForm.ServerIP,
            // User: this.dbinfoForm.username,
            // Password: this.dbinfoForm.password
            DBIP: "212.64.87.241",
            User: "huangjiahui",
            Password: "Hyp123456!",
            DBName: this.dbinForm.db
          },
          headers: {
            Authorization: this.$store.getters.getToken
          }
        }).then(res => {
          console.log("预览数据库结果返回： ")
          if(res.data.code !== 0) return
          let datas = res.data.data.data
          let cols = res.data.data.columns
          let datastr = "["
          let len1 = datas.length
          let len2 = cols.length
          datas.forEach((element1,idx1)=>{
            datastr += "{"
            cols.forEach((element2,idx2) => {
              datastr += "\""
              datastr += element2+""
              datastr += "\":\""
              datastr += element1[idx2]
              datastr += "\""
              if(idx2 < len2-1) datastr += ","
            })
            datastr += "}"
            if(idx1 < len1-1) datastr += ","
          })
          datastr += "]"
          console.log("预览数据的结果字符串： " + datastr)
          console.log("字符串转为json: " + JSON.parse(datastr))
          this.gridData = JSON.parse(datastr)
          this.cols = cols
          this.lookData = true
        }, error => {
          console.log("错误；", error.message)
        })
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