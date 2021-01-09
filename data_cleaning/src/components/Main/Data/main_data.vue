<template>
  <div class="home-container">
      <div class="top"></div>
      <div class="top-2"></div>
      <div class="main">
        <el-container class="main-container">

          <!-- 头部区域 -->
          <el-header class="home-header">
            <div class="title">
              <img src="../../../assets/clean_logo.png" alt=""/>
              <el-button type="text" @click="goBack"> 数据清洗平台 </el-button>
            </div>
            <div class="btns">
              <el-button
                type="text"
                size="medium"
                v-model="this.$store.getters.getMail"
                icon="iconfont icon-user"
                class="info"
                style="color: #fff"
                >{{ ' ' + this.$store.getters.getMail }}</el-button>
              <el-button type="danger" size="small" class="exit" @click="exit">退出</el-button>
            </div>
          </el-header>
          
          <el-main  class="home-main">
            <!-- 页面主体 -->
            <el-container>       
              <!-- 数据显示 -->
              <el-main style="padding: 0">
                <!-- 路由占位符 -->
                <router-view name="show"></router-view>   
              </el-main>
              <!-- 侧边操作 -->
              <el-aside width="400px" class="home-aside">
                <!-- 路由占位符 -->
                <router-view name="opra"></router-view>
              </el-aside>
            </el-container>
          </el-main>

        </el-container>
      </div>
  </div>
</template>

<script>
export default {
  created() {
    console.log("数据ID： " + this.$route.params.dataid)
  },
  methods: {
    exit(){
      // 退出
      console.log("退出")
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    goBack(){
      // 
      console.log("返回首页")
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  display: flex;
  width: 100%;
  height: 100%;
  background: url('../../../assets/login_back_1.jpg') no-repeat;
  background-size: 100% 100%;
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
    display: flex;
    width: 100%;
    height: 100%;
    .main-container{
      width: 100%;
      height: 100%;

    }
  }
}
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #336699;
  color: #fff;
  font-size: 25px;
  img {
    height: 50%;
  }
  .title {
    display: flex;
    align-items: center;
    height: 100%;
    .el-button {
      margin-left: 15px;
      color: #fff;
      font-size: 25px;
    }
  }
  .btns {
    display: flex;
    align-items: center;
    height: 100%;
  }
}
.home-main {
  display: flex;
  height: 100%;
  padding: 0;
}
</style>