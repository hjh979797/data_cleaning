<template>
  <div class="menutwo">
    <el-dropdown @command="handleCommand" trigger="click">
            <span class="el-dropdown-link">
            <el-button type="text" icon="el-icon-more"></el-button>
            </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="rename">重命名</el-dropdown-item>
        <el-dropdown-item command="del">删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- index指向去处 -->
    <el-menu-item 
      index = '/mainshoworopra'
      :route="{ path: `/mainshoworopra/${subitem.dataId}`}">
      <!-- 根据dataId进入展示数据 -->
      <template slot="title">
        <div v-show="visible_input">
          <el-input id="input_rename" v-model="subitem.dataName"  ref="mark" @change="loseblur" v-focus></el-input>
        </div>
        <div v-show="visible_span">
          <span>{{subitem.dataName }}</span>
        </div>
      </template>
    </el-menu-item>
  </div>
</template>
<script>
export default {
  props:[
    'subitem'
  ],
  data(){
    return {
      visible_span:true,
      visible_input:false,
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
      }
      // else if(command=='del'){
      //     this.$http({
      //       url: "/project/deleteProject",
      //       method: "post",
      //       params: {
      //         "projectId": this.item.projectId
      //       },
      //       headers: {
      //         Authorization: this.$store.getters.getToken
      //       },
      //     }).then(res => {
      //       console.log("删除的结果返回： ")
      //       console.log(res)
      //     }, error => {
      //       console.log("错误；", error.message)
      //     })
      //     this.$store.dispatch("delPro", this.item.projectId)
      // }
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
