<template>
  <div class="top_view">
    <img src="../../assets/clean_logo.png" alt="" />
    <el-button
      type="text"
      size="medium"
      v-model="username"
      icon="iconfont icon-user"
      class="info"
      >{{ ' ' + username }}</el-button
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: 'admin'
    }
  }
}
</script>

<style lang="less" scoped>
.top_view {
  width: 100%;
  height: 15%;
  background-color: #fff;
  opacity: 0.9;
  img {
    position: absolute;
    left: 5%;
    top: 50%;
    transform: translate(0, -50%);
    height: 70%;
  }
  .info {
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
