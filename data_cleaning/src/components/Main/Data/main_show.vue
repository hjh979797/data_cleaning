<template>
  <el-container class="box-container">
      <el-header height="5%">
        <el-dropdown  trigger="click">
          <el-button class="el-dropdown-link" type="info" round size="mini">
            更多操作
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>行列转换</el-dropdown-item>
            <el-dropdown-item>增加列</el-dropdown-item>
            <el-dropdown-item>拆分列</el-dropdown-item>
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
      <el-main>
        <!-- 数据显示 -->
        <el-table
          :data="tableData"
          stripe
          border
          height="100%"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </el-main>

      <!-- 页码部分 -->
      <el-footer height="5%">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return{
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 当前每页显示多少数据
        pagesize: 2
      },
      total: 0,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    handleSizeChange(newSize) {
      console.log(`每页 ${newsize} 条`)
      this.queryInfo.pagesize = newSize
    },
    handleCurrentChange(newPage) {
      console.log(`当前页: ${newPage}`)
      this.queryInfo.pagenum = newPage
    }
  }
}
</script>

<style lang="less" scoped>
.box-container {
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
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
    width: 100%;
    padding: 15px;
  }
}
</style>