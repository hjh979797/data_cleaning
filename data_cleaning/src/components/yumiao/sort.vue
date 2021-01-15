<template>
    <div>
        <div v-for="(sel, index) in mylist" :key="sel.id" style="height:50px">
            <el-select v-model="sel.value" placeholder="请选择" size="small" style="width:150px">
                <el-option
                v-for="item in columnnames"
                :key="item.val"
                :label="item.val"
                :value="item.val">
                </el-option>
            </el-select>
            <el-select v-model="sel.rule" placeholder="请选择" size="small" style="width:150px">
                <el-option
                v-for="item in sortrules"
                :key="item.val"
                :label="item.val"
                :value="item.val">
                </el-option>
            </el-select>
            <el-button type="danger" icon="el-icon-delete" circle @click="remove(index)" size="small"></el-button>
        </div>
        <div>
            <el-button type="primary" @click="add" style="margin-left:20%">添加</el-button>
            <el-button type="success" @click="getsort">提交</el-button>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            columnnames:[],
            str:"",
            value_coulunmname:"",
            sortrules:[],
            value_sortrule:"",
            rules:"升序,降序",
            mylist:[{id:1,value:"", rule:""}],
            value_columnnames:[],
            value_sortrules:[],
            tablename:"",
        }
    },
    mounted(){
        var tempcol=this.$store.getters.getDataCol;
        var flag=0;
        for(var i=0;i<tempcol.length;i++)
        {
            if(flag==1)
            {
                this.str+=",";
            }
            flag=1;
            this.str+=tempcol[i].title;
        }
        this.columnnames=this.str.split(",").map(function(item){
            return{val: item};
        });
        console.log(this.columnnames)
  
      this.sortrules=this.rules.split(",").map(function(item){
        return{val: item};
      });
      this.tablename = "tbl_"+this.$route.params.dataid;
    },
    methods: {
      getsort(){
        var logid=0;
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
            var rules = "";
            var flag=0;
            for(var i = 0; i < this.mylist.length;i++)
            {
                if(flag==1)
                {
                    rules+=",";
                }
                flag=1;
                var columnnametemp=this.mylist[i].value;
                var ruletemp=this.mylist[i].rule;
                if(columnnametemp=="")
                { 
                    alert("请选择排序字段");
                    return 0;
                    
                }
                if(ruletemp=="")
                {
                    alert("请选择排序规则");
                    return 0;
                }
                else if(ruletemp=="升序")
                {
                    ruletemp="asc";    
                }
                else if(ruletemp=="降序")
                {
                    ruletemp="desc";    
                }
                rules+=columnnametemp+","+ruletemp;
            }
            this.$http({
                url:'/table/'+this.tablename+'/sort',
                method:"get",
                params:{
                    tableName: this.tablename,
                    rules: rules,
                    logId:logid,
                },
                headers:{
                    Authorization: this.$store.getters.getToken
                }
            }).then(res=>{
                console.log("排序结果： " + res);
                console.log(res)
                this.$store.dispatch("updateDataList", res.data.data)
            },error=>{
                console.log("错误：",error.message)
            });
        },error=>{
            console.log("错误：",error.message)
        });
      },
      add(){
        var index=this.mylist.length;
        var val = "";
        var rul = "";
        this.mylist.push({id:index+1,value:val,rule:rul});  
      },
      remove(myindex){
        this.mylist = this.mylist.filter(
        (currentValue, index) => index != myindex);
      },
    }
}
</script>
<style scoped>

</style>