<template>
  <!-- <div class="menuone" v:bind:item> -->
  <div class="menuone">
    <!-- <el-dropdown @command="handleCommand" trigger="click"> -->
    <el-dropdown @command="handleCommand" trigger="click">
      <span class="el-dropdown-link">
          <el-button type="text" icon="el-icon-more"></el-button>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="rename">重命名</el-dropdown-item>
        <el-dropdown-item command="del">删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 一级菜单 -->
    <el-submenu :index="item.projectId + ''">
      <template slot="title">
        <div v-show="visible_input">
          <el-input id="input_rename" v-model="input_name"  ref="mark" @change="loseblur" v-focus></el-input>
        </div>
        <div v-show="visible_span">
          <span>{{ item.projectName }}</span>
        </div>
      </template>
      <!-- 二级菜单 -->
      <el-menu-item-group>
        <div v-for="subitem in item.dataList" :key="subitem.dataId">
          <second-categoryitem :subitem="subitem"/>
        </div>
      </el-menu-item-group>
    </el-submenu>
  </div>
</template>
<script>
import SecondCategoryitem from './secondCategoryitem.vue'

export default {
  props: {
    item: {}
  },
  data(){
    return {
      visible_span:true,
      visible_input:false,
      input_name: ''
    }
  },
  components:{
    SecondCategoryitem
  },
  created() {
    if(typeof(this.item)==="object"){
      console.log(this.item.iscreate)
      if(this.item.projectId!==-1){
        this.visible_span=true
        this.visible_input=false
      }else{
        this.visible_span=false
        this.visible_input=true
        document.getElementById("input_rename").focus();
        setTimeout(() => {
          this.$refs.mark.$el.querySelector('input').focus();
        }, 3);
      }
    }
  },
  methods:{
    handleCommand:function(command){
      if(command=='rename'){
        console.log(command)
        this.visible_span=false;
        this.visible_input=true;
        document.getElementById("input_rename").focus();
        document.getElementById("input_rename").focus();
        setTimeout(() => {
          this.$refs.mark.$el.querySelector('input').focus();
        }, 3);
      }else if(command=='del'){
          this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.$http({
              url: "/project/deleteProject",
              method: "post",
              params: {
                "projectId": this.item.projectId
              },
              headers: {
                Authorization: this.$store.getters.getToken
              },
            }).then(res => {
              console.log("删除的结果返回： ")
              console.log(res)
            }, error => {
              console.log("错误；", error.message)
            })
            this.$store.dispatch("delPro", this.item.projectId)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      }
    },
    loseblur:function(){
      console.log("sdkfas")
      this.visible_input=false;
      this.visible_span=true;
      console.log(this.item.projectName)
      if(typeof(this.item)==="object"){
        if(this.item.projectId!==-1){
          // 重命名
          let projectInfoDto = {
            projectId: this.item.projectId,
            projectName: this.input_name
          }
          // 先改store
          this.$store.dispatch("renamePro", projectInfoDto)
          this.$http({
            url: "/project/renameProject",
            method: "post",
            data: {
              projectId: this.item.projectId,
              projectName: this.input_name
            },
            headers: {
              Authorization: this.$store.getters.getToken
            },
          }).then(res => {
            console.log("重命名的结果返回： ")
            console.log(res)
          }, error => {
            console.log("错误；", error.message)
          })
        }else{
          // 创建
          this.$http({
            url: "/project/project",
            method: "post",
            params: {
              "ProjectName": this.input_name
            },
            headers: {
              Authorization: this.$store.getters.getToken
            },
          }).then(res => {
            console.log("创建项目的结果返回： ")
            if(res.data.code==500301){
              this.$store.dispatch("delPro", -1)
              return this.$message.error("失败："+res.data.msg)
            }
            console.log(res.data.data)
            let newPro = res.data.data
            newPro.dataList = []
            this.$store.dispatch("delPro", -1)
            this.$store.dispatch("createPro", newPro)
            console.log("新项目： " + newPro)
          }, error => {
            console.log("错误；", error.message)
          })
        }
      }
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      },
      update: function (el) {
        el.focus()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  width: 100%;
  height: 100%;
  background: url('../../assets/login_back_1.jpg') no-repeat;
  background-size: 100% 100%;
  height: 100%;
  .top {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #2b3f6b;
    filter: Alpha(Opacity=60);
    opacity: 0.6;
  }
  .main {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .main-container{
      width: 100%;
      height: 100%;

    }
  }
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  opacity: 0.9;
  color: rgb(90, 39, 170);
  font-size: 25px;
  img {
    height: 70%;
  }
  > div {
    display: flex;
    align-items: center;
    height: 100%;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #fff;
  opacity: 0.9;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #fff;
  opacity: 0.9;
}
.btns {
  width: 100%;
  margin: 10px;
  display: flex;
  justify-content: flex-start;
}
.menuone {
  display: flex;
  flex-flow: row;
  .el-dropdown {
    width: 10%;
    height: 20px;
    margin: 10px;
    margin-right: 0px;
  }
  .el-submenu {
    width: 90%;
  }
}
.menutwo{
  display: flex;
  flex-flow: row;
  .el-dropdown {
    width: 10%;
    height: 20px;
    margin: 5px;
    margin-right: 0px;
  }
  .el-menu-item {
    width: 90%;
  }
}
</style>
