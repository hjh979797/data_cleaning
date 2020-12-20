<template>
  <div class="home-container">
      <div class="top"></div>
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
              v-model="username"
              icon="iconfont icon-user"
              class="info"
              >{{ ' ' + username }}</el-button>
          </el-header>
          <!-- 页面主体 -->
          <el-container>
            <!-- 侧边栏 -->
            <el-aside width="250px">
              <!-- 侧边栏按钮 -->
              <div class="btns">
                <el-button type="primary" size="small" @click="create_pro"><i class="el-icon-circle-plus el-icon--left"></i>创建项目</el-button>
                <el-button type="primary" size="small" @click="create_data"><i class="el-icon-upload el-icon--left"></i>导入数据</el-button>
              </div>
              <!-- 侧边栏菜单区 -->
              <!-- 最后开起路由模式,根据index跳 -->
              <el-menu
                background-color="#fff"
                text-color="#000"
                active-text-color="#2b3f6b"
                unique-opened
                router
              >
                <!-- 一级菜单 -->
                <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
                  <template slot="title">
                    <i class="el-icon-more"></i>
                    <span>{{ item.proName }}</span>
                  </template>
                  <!-- 二级菜单 -->
                  <el-menu-item-group>
                    <!-- <el-menu-item index="/datain" v-for="subItem in item.children" :key="subItem.id"> -->
                    <el-menu-item :index="subItem.id+''" v-for="subItem in item.children" :key="subItem.id">
                      <template slot="title">
                      <i class="el-icon-more"></i>
                      <span>{{ subItem.dataName }}</span>
                    </template>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
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
export default {
  data() {
    return{
      //左侧菜单数据
      menulist: [
        {id:"1", proName:"项目一", children:[
          {id:"1", dataName:"数据一"},
          {id:"2", dataName:"数据二"}
        ]},
        {id:"2", proName:"项目二", children:[
          {id:"1", dataName:"数据一"},
          {id:"2", dataName:"数据二"},
          {id:"3", dataName:"数据三"}
        ]},
        {id:"3", proName:"项目三", children:[
          {id:"1", dataName:"数据一"}
        ]}
      ],
      // 用户名
      username: 'admin'
    }
  },
  // 生命周期函数，加载菜单栏信息
  created() {
    // this.getMenuList()
  },
  // 获取该用户的项目和数据信息
  async getMenuList() {
    const {data:res}  = await this.$http.get('menus')
    if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
    this.menulist = res.data
  },
  methods: {
    create_pro() {
        this.$router.push('/home')
    },
    create_data() {
        this.$router.push('/datain')
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
// .home_container {
//   background: url('../../assets/login_back_1.jpg') no-repeat;
//   background-size: 100% 100%;
//   height: 100%;
//   .top {
//     height: 100%;
//     width: 100%;
//     background-color: #2b3f6b;
//     filter: Alpha(Opacity=60);
//     opacity: 0.6;
//   }
// }
// .left-view {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 20%;
//   height: 100%;
//   .btns {
//     width: 100%;
//     margin: 10px;
//     display: flex;
//     justify-content: flex-start;
//   }
//   .left-menu {
//     width: 100%;
//   }
// }
// .right-view {
//   position: absolute;
//   top: 0;
//   left: 30%;
//   width: 100%;
//   height: 100%;
// }
</style>
