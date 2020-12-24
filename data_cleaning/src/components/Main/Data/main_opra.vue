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
    <!-- <div>
      <filteritem></filteritem>
    </div> -->
    <div>
    <fillitem></fillitem>
    </div>
  </div>
</template>

<script>
import filteritem from '../../yumiao/filter.vue'
import fillitem from '../../yumiao/fill.vue'
export default {
  methods: {
    add:function(amount) {
      // 最好不要直接修改数据,可以调用mutations中方法
      // this.$store.commit("add")
      // 调用actions中的add
      this.$store.dispatch("add", amount)
    }
  },
  components:{
    filteritem,
    fillitem
  }
}
</script>

<style lang="less" scoped>

</style>