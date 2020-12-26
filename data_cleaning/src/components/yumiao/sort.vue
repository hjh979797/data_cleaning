<template>
    <div>
        <div v-for="sel in mylist" :key="sel.id">
            <el-select v-model="sel.value" placeholder="请选择">
                <el-option
                v-for="item in tablenames"
                :key="item.val"
                :label="item.val"
                :value="item.val">
                </el-option>
            </el-select>
            <el-select v-model="sel.rule" placeholder="请选择">
                <el-option
                v-for="item in sortrules"
                :key="item.val"
                :label="item.val"
                :value="item.val">
                </el-option>
            </el-select>
        </div>
        <button @click="add">添加</button>
        <button @click="getsort">提交</button>
    </div>
</template>
<script>
export default{
    data(){
        return{
            tablenames:[],
            value_tablename:"",
            sortrules:[],
            value_sortrule:"",
            str:"name,age",
            rules:"升序,降序",
            mylist:[{id:1,value:"", rule:""}],
            value_tablenames:[],
            value_sortrules:[],
        }
    },
    mounted(){
        this.tablenames=this.str.split(",").map(function(item){
        return{val: item};
      });
      this.sortrules=this.rules.split(",").map(function(item){
        return{val: item};
      });
    },
    methods:{
        getsort:function(){
        //     console.log(this.value_tablenames);
        //     console.log(this.value_sortrules);
        //     this.$http({
        //         url:'/table/tbl-10000/logs',
        //         method:"get",
        //         params:{
        //             tableName: "tbl-10000",
        //         },
        //         headers:{
        //             Authorization: this.$store.getters.getToken
        //         }
        //     }).then(res=>{
        //         console.log(res);
        //     },error=>{
        //         console.log("错误：",error.message)
        //     })
            
            var rules = "";
            var flag=0;
             for(var i = 0; i < this.mylist.length;i++)
             {
                if(flag==1)
                {
                    rules+=",";
                }
                flag=1;
                var tablenametemp=this.mylist[i].value;
                var ruletemp=this.mylist[i].rule;
                if(tablenametemp=="")
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
                    ruletemp="desc";    
                }
                rules+=tablenametemp+","+ruletemp;
             }
             this.$http({
                url:'/table/tbl-10000/sort',
                method:"get",
                params:{
                    tableName: "tbl-10000",
                    rules: rules,
                    logId:1000,
                },
                headers:{
                    Authorization: this.$store.getters.getToken
                }
            }).then(res=>{
                console.log(res);
            },error=>{
                console.log("错误：",error.message)
            })
        },
        fill:function(){
        //发送get请求
            this.$http.get('/table/tableName/fill',this.form).then(function(res){
                console.log(res);
            },function(){
                console.log('请求失败处理');
            });
        },
        add:function(){
          var index=this.mylist.length;
          var val = "";
          var rul = "";
          this.mylist.push({id:index+1,value:val,rule:rul});  
        }
    }
}
</script>