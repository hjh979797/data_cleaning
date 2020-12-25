<template>
  <div style="border: solid">
      <div style="border: solid">
        <el-select v-model="value" placeholder="请选择字段名">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
      </div>
      <div>
          <label for="splitsign">分隔符</label>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div>
          <div v-for="(item, index) in mylist" :key=index>
              <label>新增字段名</label>
              <el-input v-model="item.val" placeholder="请输入内容"></el-input>
          </div>
          <div>
            <label @click="add">添加字段名</label>
          </div>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        str:"aaa,bbb,ccc",
        mylist:[],
        options: [{
          value: 'HTML',
          label: 'HTML'
        }, {
          value: 'CSS',
          label: 'CSS'
        }, {
          value: 'JavaScript',
          label: 'JavaScript'
        }],
        value:[],
        input:""
      }
    },
    mounted() {
      this.mylist = this.str.split(",").map(function(item){
        return{val: item};
      });
    },
    methods:{
      add() {
        this.mylist.push({ val: "" });
       },
      remove(myindex) {
        this.mylist = this.mylist.filter(
          (currentValue, index) => index != myindex
        );
      }
    }
  }
</script>