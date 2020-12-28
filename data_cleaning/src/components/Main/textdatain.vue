<template>
  <div class="main-container">
    <!-- <div class="box"> -->
    <el-form 
      class="box"
      :model="textdatainForm"
      :rules="textdatainFormRules"
      label-width="0px"
      ref="textdatainFormRef">
      <el-form-item class="in_box" prop="upload">
        <el-upload
          class="upload-demo"
          drag
          action="http://120.26.162.152:8088/data/importView"
          ref="upload"
          :on-change="uploadChange"
          :on-remove="remove"
          :auto-upload="false"
          :on-success="handleSuccess"
          :headers="myHeader"
          :data="myData"
          :on-error="handleError">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip" style="text-align: left">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <div class="in_box">
        <label style="margin: 10px">数据集名称</label>
        <el-form-item prop="dataname">
          <el-input v-model="textdatainForm.dataname" placeholder="请输入数据集名称"></el-input>
        </el-form-item>
      </div>
      <div class="in_box">
        <label style="margin: 10px">分隔符</label>
        <el-form-item prop="sep">
          <el-input v-model="textdatainForm.sep" placeholder="请输入分隔符"></el-input>
        </el-form-item>
      </div>
      <div class="in_box" style="height: 40.8px">
        <el-form-item>
          <el-checkbox v-model="textdatainForm.isfirstname">将第一行作为属性名称</el-checkbox>
        </el-form-item>
      </div>
      <el-button @click="justifyLookData" class="look_button">预览数据</el-button>
        
    </el-form>
    <!-- </div> -->
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
    this.proid = parseInt(this.$route.params.proid)
  },
  data() {
    return {
      proid: '',
      fileType: "",
      textdatainForm: {
        sep: '',
        dataname: '',
        isfirstname: false
      },
      textdatainFormRules: {
        upload: [
          { required: true, message: '请上传文件', trigger: 'change' }
        ],
        dataname: [
          { required: true, message: '请输入数据集名称', trigger: 'blur' }
        ],
        sep: [
          { required: true, message: '请输入分隔符', trigger: 'blur' }
        ]
      },
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
      cols: [],
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
      let that = this.$router
      this.lookData = false
      this.$http({
        url: '/data/import',
        method: "post",
        headers: {
          Authorization: this.$store.getters.getToken
        },
        data: {
          "dataName": this.textdatainForm.dataname,
          "fileType": this.fileType,
          "projectId": this.proid,
          "importColumns": "["+Array.from({length: this.cols.length}, (x, i) => i).join(",")+"]"
        }
      }).then(res => {
        console.log("导入数据的结果返回： "+res)
      }, error => {
        console.log("错误；", error.message)
      })
      this.getMenuList()
      // this.$router.push('/maindata')
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
      this.$refs.textdatainFormRef.validate((valid) => {
        if(!valid) return
        this.$refs.upload.submit()
      })
    },
    handleSuccess(res, file, fileList){
      console.log("预览数据的结果返回： " + res.data.data)
      if(res.code !== 0) return
      let datas = res.data.data
      let cols = res.data.columns
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
    },
    handleError(res, file, fileList){
      // 有错
    },
    uploadChange(file, fileList) {
      this.headFile = file
      this.headFileList = fileList
      let fileName = file.name
      let pos = fileName.lastIndexOf('.')
      let lastName = fileName.substring(pos+1, fileName.length)
      this.fileType = lastName
      if(fileList.length==1) {
          let {upload, ...data} = this.textdatainFormRules;
          this.textdatainFormRules = data;
      }
      this.$refs.textdatainFormRef.clearValidate('upload');
    },
    remove(file, fileList) {
      if(fileList.length==0){
        this.textdatainFormRules.upload = [{ required: true, message: '请上传文件', trigger: 'change' }]
      }
      this.fileType = ""
    }
  },
  computed: {
    myData(){
      return {
        "DataName": this.textdatainForm.dataname,
        "FileType": this.fileType,
        "ProjectId": this.proid
      }
    },
    myHeader(){
      return {
        "Authorization": this.$store.getters.getToken
      }
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
    position: absolute;
    left: 55%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: right;
    box-shadow:0 0 9px 3px #336699;
    height: 80%;
    .look_button{
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      background-color: #99CCFF;
      color: #336699;
    }
    .in_box {
      margin: 15px;
      display: flex;
      justify-content: flex-end;
      .el-input {
        width: 80%;
      }
      .el-checkbox {
        position: absolute;
        right: 50%;
        transform: translate(-50%);
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