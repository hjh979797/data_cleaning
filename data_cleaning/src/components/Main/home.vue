<template>
  <div class="home-container">
    <div class="top"></div>
    <div class="top-2"></div>
    <div class="main">
      <el-container class="main-container">
        <!-- 头部区域 -->
        <el-header>
          <div>
            <img src="../../assets/clean_logo.png" alt=""/>
            <span> 数据清洗平台 </span>
          </div>
          <el-button
            type="text"
            size="medium"
            v-model="this.$store.getters.getMail"
            icon="iconfont icon-user"
            class="info"
            style="color: #fff"
          >{{ ' ' + this.$store.getters.getMail }}</el-button>
        </el-header>
        <!-- 页面主体 -->
        <el-container>
          <!-- 侧边栏 -->
          <el-aside width="300px">
            <!-- 侧边栏按钮 -->
            <div class="btns">
              <el-button size="medium" @click="create_pro" ><i class="el-icon-circle-plus el-icon--left"></i>创建项目</el-button>
              <el-button size="medium" @click="create_data"><i class="el-icon-upload el-icon--left"></i>导入数据</el-button>
            </div>
            <!-- 侧边栏菜单区 -->
            <!-- 最后开起路由模式,根据index跳 -->
            <el-menu
              background-color="#336699"
              text-color="#fff"
              active-text-color="#000"
              unique-opened
              router
            >
              <div class="cate" v-for="item in this.$store.getters.getProList" :key="item.projectId">
                <Categoryitem :item="item"/>
              </div>
            </el-menu>
          </el-aside>
          <!-- 内容 -->
          <el-main>
            <!-- 路由占位符 -->
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import Categoryitem from '../yumiao/categoryitem.vue'
export default {
  components: {
    Categoryitem
  },
  data() {
    return{
      //左侧菜单数据
      prolist: "",
      // 是开关按下
      isbutton: false,
      visible: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  components:{
    Categoryitem
  },
  // 生命周期函数，加载菜单栏信息
  created() {
    this.getMenuList()
  },
  methods: {
    create_pro() {
      // this.$router.push('/create_pro')
      var len = this.prolist.length;
      console.log(len)
      this.prolist.push(
        {id:len+1, proName:"项目"+len, children:[
          ]}
      )

    },
    create_data() {
      this.$router.push('/datain')
    },
    // 获取该用户的项目和数据信息
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
  .top-2 {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #fff;
    opacity: 0.9;
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
  background-color: #336699;
  // opacity: 0.9;
  color: #fff;
  font-size: 25px;
  img {
    height: 50%;
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
  background-color: #336699;
  // opacity: 0.9;
  .el-menu {
    border-right: none;
  }
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
