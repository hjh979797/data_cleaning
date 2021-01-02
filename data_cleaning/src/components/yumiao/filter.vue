<template>
  <div>
    <div class="box">
      <el-radio v-model="radio" label="1">
        选定值
        <el-card>
          <div>
            <div>
              <div>
                <el-radio v-model="choose_radio" label="1" name="choose">保留</el-radio>
                <el-radio v-model="choose_radio" label="2" name="choose">清除</el-radio>
              </div>
              <label>选择字段</label>
              <el-select v-model="value1" multiple placeholder="请选择" style="width:160px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </el-card>
      </el-radio>
    </div>
    <div class="box">
      <el-radio v-model="radio" label="2">通配符匹配
        <el-card>
          <div>
            <label>输入字段:</label>
            <el-input v-model="input" style="width:160px" placeholder="请输入内容"></el-input>
          </div>
          <div>
            <el-radio-group v-model="radio_group">
              <el-radio :label="1">开头为</el-radio>
              <el-radio :label="2">包含</el-radio>
              <!-- <el-radio :label="3">精确匹配</el-radio> -->
            </el-radio-group>
          </div>
        </el-card>
      </el-radio>
    </div>
    <div class="box">
      <el-radio v-model="radio" label="3">NULL值
        <el-card>
          <div>
            <el-radio-group v-model="radio_null">
              <el-radio :label="0">保留null值</el-radio>
              <el-radio :label="1">删除null值</el-radio>
            </el-radio-group>
          </div>
        </el-card>
      </el-radio>
    </div>
    <el-button type="success" style="margin-left:35%" @click="getFilter">确定</el-button>
  </div>
  
</template>

<script>
export default {
  data () {
    return {
      tablename:"",
      columnname:"",
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
        var flag=0;
        for(var i=0;i<this.value1.length;i++)
        {
          if(flag==1)
          {
            str+=",";
          }
          flag=1; 
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
      console.log(this.columnname)
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
            logid=res.data.data[res.data.data.length-1].logId;
          console.log(logid)
          this.$http({
          url:'/table/'+this.tablename+'/filter',
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
          alert("筛选完成");
        },error=>{
            console.log("错误：",error.message)
            alert("错误：",error.message)
        });
      },error=>{
          console.log("错误：",error.message)
          alert("错误：",error.message)
      });
    }
  }
}
</script>
<style scoped>
div{
  /* border:solid; */
  margin:5px;
}
.box{
  border:solid rgb(109, 109, 218) 1px;
  padding: 3px;
}
</style>