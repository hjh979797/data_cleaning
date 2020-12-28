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
        <!-- 日志 -->
        <logitem></logitem>
      </el-header>
      <el-main v-show="main_show">
        <!-- 数据显示 -->
        <el-table
          :data="myData"
          border
          height="100%"
          style="width: 100%"
          @header-contextmenu="colClick">
          <el-table-column 
            v-for="(val, key, index) in this.$store.getters.getDataCol" 
            :key="index"
            :column-key="val.cloumnName"
            :prop="val.cloumnName"
            :label="val.cloumnName"
            :index="index"
            :class-name="val.flag? 'bacColorf4984e':''"
            ref="col">
            <template slot="header" slot-scope="scope">
              <div class="wrap" v-contextmenu:contextmenu>
                {{ val.cloumnName }} 
                <v-contextmenu ref="contextmenu">
                      <v-contextmenu-item @click="sortData"><i class="fa fa-search"></i>排序</v-contextmenu-item>
                      <v-contextmenu-item @click="nullFull"><i class="fa fa-search"></i>空值填充</v-contextmenu-item>
                      <v-contextmenu-item divider></v-contextmenu-item>
                      <v-contextmenu-item @click="outlier"><i class="fa fa-search"></i>离群值检测</v-contextmenu-item>
                      <v-contextmenu-item @click="updateAttr"><i class="fa fa-search"></i>修改字段属性</v-contextmenu-item>
                      <v-contextmenu-item @click="filter"><i class="fa fa-search"></i>筛选</v-contextmenu-item>
                      <div class="flag">
                          <span><i class="fa fa-star"></i></span>
                      </div>
                </v-contextmenu>
              </div>
            </template>
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
import logitem from '../../yumiao/log.vue'
export default {
  data() {
    return{
      headervisible: false,
      colsize: 0,
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
    splitcolumns,
    logitem,
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
    this.$store.dispatch("updataPageSize", this.queryInfo.pagesize)
    this.$store.dispatch("updataPage", this.queryInfo.pagenum)
      this.$store.dispatch("updateOpraType", "null")
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
      console.log(`每页 ${newSize} 条`)
      this.$store.dispatch("updataPageSize", newSize)
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(`当前页: ${newPage}`)
      this.$store.dispatch("updataPage", newPage)
    },
    moreopera(command){
      if(command=="splitcolumns")
      {
        console.log(command);
        this.main_show=false;
        this.split_show=true;
        // this.$router.push('/Splitcolumns')
      }
    },
    colClick(column,event) {
      //禁止鼠标右键菜单
      document.oncontextmenu = function(e) {
        return false;
      };
      this.headervisible = !this.headervisible
      this.$store.dispatch("updateColStatus", column.label)
      console.log("点击了"+ column.index + "列") 
    },
    sortData(){
      this.$store.dispatch("updateOpraType", "sort")
    },
    nullFull(){
      this.$store.dispatch("updateOpraType", "nullFull")
    },
    outlier(){
      this.$store.dispatch("updateOpraType","outlier")
    },
    updateAttr(){
      this.$store.dispatch("updateOpraType","attr")
    },
    filter(){
      this.$store.dispatch("updateOpraType","filter")
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
    .el-button {
      color: #000;
      position: relative;
      width: 100%;
    }
  }
}

.dialog {
  position: relative;
}
 
.close_button {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
}
.wrap {
  position: relative;
  width: 100%;
}
</style>