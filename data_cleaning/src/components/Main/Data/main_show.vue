<template>
  <el-container class="box-container">
      <el-header height="5%">
        <el-dropdown  trigger="click" @command="moreopera">
          <el-button class="el-dropdown-link" type="info" round size="mini">
            更多操作
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item>行列转换</el-dropdown-item>
            <el-dropdown-item>增加列</el-dropdown-item>
            <el-dropdown-item command="splitcolumns" >拆分列</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown  trigger="click">
          <el-button class="el-dropdown-link" type="info" round size="mini">
            日志
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>行列转换</el-dropdown-item>
            <el-dropdown-item>...</el-dropdown-item>
            <el-dropdown-item>...</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main v-show="main_show">
        <!-- 数据显示 -->
        <el-table
          :data="this.$store.getters.getDataList"
          stripe
          border
          height="100%"
          style="width: 100%">
          
          <el-table-column 
            v-for="(item, index) in this.$store.getters.getDataCol" 
            :key="index"
            :prop="item.cloumnName"
            :label="item.cloumnName">
          </el-table-column>
        </el-table>
      </el-main>
      <splitcolumns v-show="split_show"></splitcolumns>

      <!-- 页码部分 -->
      <el-footer height="5%">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.$store.getters.dataListSize">
        </el-pagination>
      </el-footer>
  </el-container>
</template>

<script>
import splitcolumns from '../../yumiao/splitcolumns.vue'
export default {
  data() {
    return{
      tableInfo: {
        tableName: ''
      },
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 当前每页显示多少数据
        pagesize: 10
      },
      main_show:true,
      split_show:false,
    }
  },
  components:{
    splitcolumns
  },
  computed: {
    myData(){
      return this.$store.getters.getDataList
    }
  },
  // 生命周期函数，创建时候加载数据
  created () {
    this.tableInfo.tableName = "tbl_" + this.$route.params.dataid
    this.getDataList()
  },
  methods: {
    async getDataList() {
      // 根据当前页数以及每页显示数据来获取该页数据
      const {data: res} =  await this.$http({
        url:"/table/"+this.tableInfo.tableName,
        headers: {
          Authorization: this.$store.getters.getToken
        },
        methods: "get"
      })
      if(res.code !== 0) return this.$message.error(" 获取数据失败 ")
      this.$store.dispatch("updateDataList", res.data)
    },
    // 监听 pageSize 改变的事件
    handleSizeChange(newSize) {
      console.log(`每页 ${newsize} 条`)
      this.queryInfo.pagesize = newSize
      // this.getDataList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(`当前页: ${newPage}`)
      this.queryInfo.pagenum = newPage
      // this.getDataList()
    },
    moreopera(command){
      if(command=="splitcolumns")
      {
        console.log(command);
        this.main_show=false;
        this.split_show=true;
        // this.$router.push('/Splitcolumns')
      }
      
    }
  }
}
</script>

<style lang="less" scoped>
.box-container {
  background-color: #fff;
  position: relative;
  top: 2%;
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