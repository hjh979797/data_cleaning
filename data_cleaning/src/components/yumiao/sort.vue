<template>
    <div>
        <div v-for="sel in mylist" :key="sel.id">
            <el-select v-model="value_tablename" placeholder="请选择">
                <el-option
                v-for="item in tablenames"
                :key="item.val"
                :label="item.val"
                :value="item.val">
                </el-option>
            </el-select>
            <el-select v-model="value_sortrule" placeholder="请选择">
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
            mylist:[{id:1}],
            value_tablenames:[],
            value_sortrules:[],
        }
    },
    mounted(){
        this.tablenames=this.str.split(",").map(function(item){
        return{val: item};
      });
    //   for(var j=0;j<this.tablenames.length;j++)
    //   {
    //       console.log(this.tablenames[j].val)
    //   }
      this.sortrules=this.rules.split(",").map(function(item){
        return{val: item};
      });
    },
    methods:{
        getsort:function(){
            console.log(this.value_tablenames);
            console.log(this.value_sortrules);
            this.$http({
                url:'/table/tbl-10000/logs',
                method:"get",
                params:{
                    tableName: "tbl-10000",
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
        add:function(){
          var index=this.mylist.length;
          this.mylist.push({id:index+1});  
        }
    }
}
</script>