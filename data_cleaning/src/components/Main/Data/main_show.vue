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
      <el-main v-show="main_show" style="padding:0px;overflow-y:hidden;overflow-x:hidden;">
        <!-- 数据显示 -->
        <vxe-grid
          border
          column-key
          round
          stripe
          height="auto"
          ref="dragtable"
          class="sortable-column-demo"
          highlight-current-column
          :columns="this.$store.getters.getDataCol"
          :data="myData"
          empty-text="没有更多数据了！"
          :loading="this.$store.getters.getLoading"
          :menu-config="tableMenu"
          @header-cell-click="setprob"
          @header-cell-menu="cellContextMenuEvent"
          @cell-menu="cellContextMenuEvent"
          @menu-click="contextMenuClickEvent"
          :sort-config="{orders: ['desc', 'asc', null]}"
          :checkbox-config="{highlight: true, range:true}"
          highlight-hover-row
          highlight-current-row>
        </vxe-grid>
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
          :total="datalen">
        </el-pagination>
      </el-footer>
  </el-container>
</template>

<script>
import Sortable from "sortablejs"
import splitcolumns from '../../yumiao/splitcolumns.vue'
import logitem from '../../yumiao/log.vue'
export default {
  data() {
    return{
      tableMenu: {
        header: {
          options: [
            [
              { code: 'sortData', name: '排序', prefixIcon: 'fa fa-copy', visible: true, disabled: false },
              { code: 'nullFull', name: '空值填充', visible: true, disabled: false },
              { code: 'outlier', name: '离群值检测', visible: true, disabled: false }
            ],
            [
              { code: 'updateAttr', name: '修改字段属性', prefixIcon: 'fa fa-print', visible: true, disabled: false },
              { code: 'filter', name: '筛选', prefixIcon: 'fa fa-download', visible: true, disabled: false },
              { code: 'replace', name: '替换', prefixIcon: 'fa fa-download', visible: true, disabled: false },
            ]
          ]
        },
        body: {
          options: [
            [
              { code: 'sortData', name: '排序', prefixIcon: 'fa fa-copy', visible: true, disabled: false },
              { code: 'nullFull', name: '空值填充', visible: true, disabled: false },
              { code: 'outlier', name: '离群值检测', visible: true, disabled: false }
            ],
            [
              { code: 'updateAttr', name: '修改字段属性', prefixIcon: 'fa fa-print', visible: true, disabled: false },
              { code: 'filter', name: '筛选', prefixIcon: 'fa fa-download', visible: true, disabled: false },
              { code: 'replace', name: '替换', prefixIcon: 'fa fa-download', visible: true, disabled: false },
            ]
          ]
        },
        visibleMethod: this.visibleMethod
      },
      headervisible: false,
      colsize: 0,
      tableInfo: {
        tableName: ''
      },
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: this.$store.getters.getPageK,
        // 当前每页显示多少数据
        pagesize: this.$store.getters.getPageSize
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
    datalen(){
      return this.$store.getters.dataListSize
    },
    myData(){
      return this.$store.getters.getDataList
    }
  },
  // 生命周期函数，创建时候加载数据
  created () {
    this.$store.dispatch("setLoad", true)
    this.$store.dispatch("updateDataList", null)
    this.tableInfo.tableName = "tbl_" + this.$route.params.dataid
    this.$store.dispatch("updataPageSize", 10)
    this.$store.dispatch("updataPage", 1)
    this.getDataList()
    this.$store.dispatch("updateOpraType", "null")
    this.setDragTable();
  },
  beforeDestroy () {
    if (this.dragtable) {
      this.dragtable.destroy()
    }
  },
  methods: {
    setprob(column) {
      console.log("显示列信息：")
      console.log(this.$refs.dragtable)
      this.$store.dispatch("setCurrentCol",column.column.title)
    },
    visibleMethod ({ type, options, column }) {
      // 示例：只有 name 列允许操作，清除按钮只能在 age 才显示
      // 显示之前处理按钮的操作权限
      // let isDisabled = !column || column.property !== 'name'
      // let isVisible = column && column.property === 'age'
      // options.forEach(list => {
      //   list.forEach(item => {
      //     if (['copy'].includes(item.code)) {
      //       item.disabled = isDisabled
      //     }
      //     if (['clear'].includes(item.code)) {
      //       item.visible = isVisible
      //     }
      //   })
      // })
      return true
    },
    cellContextMenuEvent ({ column }) {
      this.$store.dispatch("setCurrentCol",column.title)
      this.$refs.dragtable.setCurrentColumn(column)
    },
    contextMenuClickEvent ({ menu, row, column }) {
      let xGrid = this.$refs.dragtable
      switch (menu.code) {
        case 'sortData':
          this.$store.dispatch("updateOpraType", "sort")
          this.$store.dispatch("setCurrentCol",column.title)
          break
        case 'nullFull':
          this.$store.dispatch("updateOpraType", "nullFull")
          this.$store.dispatch("setCurrentCol",column.title)
          break
        case 'outlier':
          this.$store.dispatch("updateOpraType","outlier")
          this.$store.dispatch("setCurrentCol",column.title)
          break
        case 'updateAttr':
          this.$store.dispatch("updateOpraType","resetColumn")
          this.$store.dispatch("setCurrentCol",column.title)
          console.log(column.property)
          break
        case 'filter':
          this.$store.dispatch("updateOpraType","filter")
          this.$store.dispatch("setCurrentCol",column.title)
          break
        case 'replace':
          this.$store.dispatch("updateOpraType","replace")
          this.$store.dispatch("setCurrentCol",column.title)
          break
      }
    },
    setDragTable() {
      this.$nextTick (() => {
        const xTable = this.$refs.dragtable
        this.sortable2 = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row'), {
          handle: '.vxe-header--column:not(.col--fixed)',
          onEnd: ({ item, newIndex, oldIndex }) => {
            const { fullColumn, tableColumn } = xTable.getTableColumn()
            console.log("原来的列：")
            console.log(tableColumn)
            console.log(fullColumn)
            const targetThElem = item
            const wrapperElem = targetThElem.parentNode
            const newColumn = fullColumn[newIndex]
            if (newColumn.fixed) {
              // 错误的移动
              if (newIndex > oldIndex) {
                wrapperElem.insertBefore(targetThElem, wrapperElem.children[oldIndex])
              } else {
                wrapperElem.insertBefore(wrapperElem.children[oldIndex], targetThElem)
              }
              return this.$XModal.message({ message: '固定列不允许拖动！', status: 'error' })
            }
            // 转换真实索引
            const oldColumnIndex = xTable.getColumnIndex(tableColumn[oldIndex])
            const newColumnIndex = xTable.getColumnIndex(tableColumn[newIndex])
            // 移动到目标列
            const currRow = fullColumn.splice(oldColumnIndex, 1)[0]
            fullColumn.splice(newColumnIndex, 0, currRow)
            xTable.loadColumn(fullColumn)
          }
        })
      })
    },
    async getDataList() {
      await this.$http({
        url:"/table/"+this.tableInfo.tableName,
        headers: {
          Authorization: this.$store.getters.getToken
        },
        params: {
          tableName: this.tableInfo.tableName,
          pageSize: this.queryInfo.pagesize,
          pageK: this.queryInfo.pagenum
        },
        methods: "get"
      }).then(res => {
        if(res.data.code !== 0) return this.$message.error(" 获取数据失败 ")
        console.log("数据的结果返回： ")
        console.log(res.data.data)
        this.$store.dispatch("setDataLen", res.data.data.tableLength)
        this.$store.dispatch("updateDataList", res.data.data)
        this.$store.dispatch("setLogId",res.data.data.logId)
        this.$store.dispatch("setLoad", false)
      }, error => {
        console.log("错误；", error.message)
      })
    },
    // 监听 pageSize 改变的事件
    handleSizeChange(newSize) {
      console.log(`每页 ${newSize} 条`)
      this.$store.dispatch("updataPageSize", newSize)
      this.queryInfo.pagesize = newSize
      this.getDataList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(`当前页: ${newPage}`)
      this.$store.dispatch("updataPage", newPage)
      this.queryInfo.pagenum = newPage
      this.getDataList()
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
      this.currentCol = column.columnKey
      console.log("column:")
      console.log(column.columnKey)
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
      this.$store.dispatch("getColName", this.currentCol)
      this.$store.dispatch("updateOpraType","resetColumn")
    },
    filter(){
      this.$store.dispatch("updateOpraType","filter")
    },
    replace(){
      this.$store.dispatch("getColName", this.currentCol)
      this.$store.dispatch("updateOpraType","replace")
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