<template>
  <div>
    <h3>
      <!-- {{this.$store.state.count}} -->
      {{ this.$store.getters.update }}
      <!-- 后面使用的都是缓存数据 -->
      {{ this.$store.getters.update }}
      {{ this.$store.getters.update }}
      {{ this.$store.getters.update }}
      {{ this.$store.getters.update }}
    </h3>
  </div>
</template>

<script>
export default {
  methods: {
    add() {
      // 最好不要直接修改数据,可以调用mutations中方法
      this.$store.commit("add")
    }
  }
}
</script>

<style lang="less" scoped>

</style>