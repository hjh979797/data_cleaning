<template>
  <div class="menuone" v:bind:item>
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
          <el-input id="input_rename" v-model="item.projectName"  ref="mark" @blur="loseblur" v-focus></el-input>
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
  props: [
    'item'
  ],
  data(){
    return {
      visible_span:true,
      visible_input:false,
    }
  },
  components:{
    SecondCategoryitem
  },
  created() {
    // var temp = this.$store.getters.getDataMap
    // var object = eval(temp)
    console.log(this.$store.getters.getDataMap)
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
      }
    },
    loseblur:function(){
      console.log("sdkfas")
      this.visible_input=false;
      this.visible_span=true;
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
