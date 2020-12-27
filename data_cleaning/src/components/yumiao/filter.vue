<template>
  <div>
    <el-radio v-model="radio" label="1">
      选定值
      <br>
      <div>
        <div>
          <div>
            <el-radio v-model="choose_radio" label="1" name="choose">保留</el-radio>
            <el-radio v-model="choose_radio" label="2" name="choose">清除</el-radio>
          </div>
          <el-select v-model="value1" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </el-radio>
    <el-radio v-model="radio" label="2">通配符匹配
      <div>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <el-radio-group v-model="radio_group">
          <el-radio :label="1">开头为</el-radio>
          <el-radio :label="2">包含</el-radio>
          <!-- <el-radio :label="3">精确匹配</el-radio> -->
        </el-radio-group>
      </div>
    </el-radio>
    <el-radio v-model="radio" label="3">NULL值
      <div>
        <el-radio-group v-model="radio_null">
          <el-radio :label="0">保留null值</el-radio>
          <el-radio :label="1">删除null值</el-radio>
        </el-radio-group>
      </div>
    </el-radio>
    <el-button @click="getFilter">确定</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tablename:"tbl_10000",
      columnname:"name",
      radio: '1',
      choose_radio:'1',
      radio_group:'3',
      radio_null:'0',
      options: [{
        value: 'zhangsan',
        label: 'zhangsan'
      }, {
        value: 'lisi',
        label: 'lisi'
      }],
      value1:[],
      input:''
    }
  },
  
  methods:{
    getFilter:function(){
      var logid=0;
      var typetemp;
      var str="";
      if(this.radio=='1')
      {
        if(this.choose_radio=='1')
        {
          typetemp="selected";
        }
        else if(this.choose_radio=='2')
        {
          typetemp='unSelected';
        }
        for(var i=0;i<this.value1.length;i++)
        {
          str+=this.value1[i];
        }
      }
      else if(this.radio=='2')
      {
        str=this.input;
        if(this.radio_group=='1')
        {
          typetemp='startWith';
        }
        else if(this.radio_group=='2')
        {
          typetemp='containsWith';
        }
      }
      else if(this.radio=='3')
      {
        if(this.radio_null=='0')
        {
          typetemp='empty';
        }
        else if(this.radio_null=='1')
        {
          typetemp='notEmpty';
        }
      }
      console.log(str);
      this.$http({
          url:'/table/tbl_10000/logs',
          method:"get",
          params:{
              tableName: "tbl_10000",
          },
          headers:{
              Authorization: this.$store.getters.getToken
          }
      }).then(res=>{
          console.log(res);
          if(res.data.data.length!=0)
            logid=res.data.data[0].logId;
          this.$http({
          url:'/table/tbl_10000/filter',
          method:"get",
          params:{
              tableName: this.tablename,
              columnName: this.columnname,
              type:typetemp,
              values:str,
              logId: logid,
          },
          headers:{
              Authorization: this.$store.getters.getToken
          }
        }).then(res=>{
          console.log("filter")
            console.log(res.data.data);
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
