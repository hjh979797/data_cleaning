<template>
  <div>
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
    <el-button type="success" @click="fill" style="margin:35%">提交</el-button>
  </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      tablename:"",
      columnname:"",
      value: true,
      input:"",
      options: [{
          value: 'average',
          label: '平均值填充'
        }, {
          value: 'median',
          label: '中位数填充'
        }, {
          value: 'min',
          label: '最小值填充'
        },{
          value: 'max',
          label: '最大值填充'
        }, {
          value: 'mode',
          label: '众数填充'
        }, 
        // {
        //   value: '选项5',
        //   label: '插补法'
        // },{
        //   value: '选项6',
        //   label: '随机填充法'
        // }
        ],
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
   created() {
        this.tablename="tbl_"+this.$route.params.dataid;
        this.columnname=this.$store.getters.getCurrentCol;
    },
  computed:{
      mycolumnname(){
          return this.$store.getters.getCurrentCol;
      },
  },
  watch:{
      mycolumnname(newName, oldName){
          this.columnname=newName;
      }
  },
  methods:{
    fill:function(){
      var logid=0;
      var value="";
      var type="";
      switch(this.radio){
        case "1":
          type="given"
          value=this.input;
          break;
        case "2":
          type=this.value1;
          value=this.value1;
          break;
        case "3":
          type=this.value2;
          value=this.value2;
          break;
      }
      this.$http({
          url:'/table/'+this.tablename+'/logs',
          method:"get",
          params:{
              tableName: this.tablename,
          },
          headers:{
              Authorization: this.$store.getters.getToken
          }
      }).then(res=>{
          if(res.data.data.length!=0)
          {
              logid=res.data.data[res.data.data.length-1].logId;
          }
          this.$http({
            url:'/table/'+this.tablename+'/fill',
            method:"get",
            params:{
                tableName: this.tablename,
                columnName: this.columnname,
                value: value,
                type: type,
                logId:logid,
            },
            headers:{
                Authorization: this.$store.getters.getToken
            }
        }).then(res=>{
            console.log(res);
            this.$store.dispatch("updateDataList", res.data.data)
        },error=>{
            console.log("错误：",error.message)
        });
      },error=>{
          console.log("错误：",error.message)
      });
    }
  }
}
</script>
<style lang="less" scoped>
.header{
  // border: 1px solid;
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
  margin-right: 10px;
  width: 150px;
  
}
label{
  margin: 15px;
}
.box {
  // border: solid;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}
</style>