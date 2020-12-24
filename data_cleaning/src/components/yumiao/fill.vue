<template>
  <div>
    <div class="header">
      <div>
        <label>空行数</label>
        <label class="shownum">{{bankcounter}}</label>
      </div>
      <br/>
      <div>
        <label>总行数</label><label class="shownum">{{totalcounter}}</label>
        <el-switch class="right"
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
      </div>
    </div>
    <div class="header">
      <div class="box">
        <el-radio v-model="radio" label="1">固定值填充</el-radio>
        <el-input class="rightinput" v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="box">
        <el-radio v-model="radio" label="2" width="50px">非固定值填充</el-radio>
        <el-select class="rightinput" v-model="value1" placeholder="请选择">
          <el-option 
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="box">
        <el-radio v-model="radio" label="3">选择插值法</el-radio>
        <el-select class="rightinput" v-model="value2" placeholder="请选择">
          <el-option 
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
  <div>
    <el-button @click="fill">提交</el-button>
  </div>
  </div>
</template>

<script>
import filter from './filter.vue'
export default {
  components: { filter },
  data(){
    return{
      form: {
        columnName: 12,
        type: "123",
        logId:  "12"
      },
      bankcounter: 0,
      totalcounter:0,
      value: true,
      input:"",
      options: [{
          value: '选项1',
          label: '平均值填充'
        }, {
          value: '选项2',
          label: '最小值填充'
        }, {
          value: '选项3',
          label: '最大值填充'
        }, {
          value: '选项4',
          label: '众数填充'
        }, {
          value: '选项5',
          label: '插补法'
        },{
          value: '选项6',
          label: '随机填充法'
        }],
        options2: [{
          value: '选项1',
          label: '拉格朗日插值法'
        }, {
          value: '选项2',
          label: '线性插值'
        }],
        value1: '',
        value2: '',
        radio:'1'
    }
  },
  methods:{
    fill:function(){
        //发送get请求
        this.$http.get('/table/tableName/fill',this.form).then(function(res){
            console.log(res);
        },function(){
            console.log('请求失败处理');
        });
    }
  }
}
</script>
<style lang="less" scoped>
.header{
  border: 1px solid;
  display: flex;
  flex-flow: column;
  // justify-content: flex-end;
  align-items: right;
}
.shownum{
  padding-left: 4px;
}
.right{
  margin-left: 100px;
}
.rightinput{
  margin-right: 0px;
  width: 150px;
  
}
.box {
  border: solid;
  display: flex;
  justify-content: space-between;
}
</style>