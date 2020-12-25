<template>
 <div class="home">
  <div class="container">
   <div class="addZujian">
    <div>
     <span>组件库</span>
     <span style="color:#bbb;margin-left:10px;font-size:14px;">点击使用</span>
    </div>
    <div class="zujianBtn" @click="zujian">添加组件1</div>
    <div class="zujianBtn" @click="zujian2">添加组件2</div>
   </div>
   <div class="zujianContent">
    <div>组件展示区</div>
    <!-- Vue提供了 component ,来展示对应名称的组件 -->
    <!-- component 是一个占位符, :is 属性,可以用来指定要展示的组件的名称 -->
    <component
     v-for="(item,index) in comName"
     :is="item.name"
     :key="index"
     @func="getContent(index)"
    ></component>
   </div>
  </div>
 </div>
</template>
<script>
// 引入子组件
import zujian1 from "./zujian1";
import zujian2 from "./zujian2";
export default {
 data() {
  return {
   comName: []
  };
 },
 components: {
  zujian1,
  zujian2
 },
 methods: {
  // 添加组件1
  zujian() {
   this.comName.push({
    name: "zujian1"
   });
  },
  // 添加组件2
  zujian2() {
   this.comName.push({
    name: "zujian2"
   });
  },
  // 删除组件
  getContent(index) {
   this.comName.splice(index, 1);
  }
 }
};
</script>