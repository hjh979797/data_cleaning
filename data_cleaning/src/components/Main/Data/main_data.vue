<template>
  <div class="home-container">
      <div class="top"></div>
      <div class="main">
        <el-container class="main-container">

          <!-- 头部区域 -->
          <el-header class="home-header">
            <div>
              <img src="../../../assets/clean_logo.png" alt=""/>
              <span> 数据清洗平台 </span>
            </div>
            <el-button
              type="text"
              size="medium"
              v-model="this.$store.getters.getMail"
              icon="iconfont icon-user"
              class="info"
              >{{ ' ' + this.$store.getters.getMail }}</el-button>
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
    console.log(this.$route.params.dataid)
  },
  data() {
    return{
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
.home-main {
  background-color: #fff;
  opacity: 0.9;
  display: flex;
  height: 100%;
  padding: 0;
}
</style>