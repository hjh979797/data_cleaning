<template>
    <div>
        <div>
            <label for="oldvalue">将</label>
            <input id="oldvalue" v-model="oldvalue" placeholder="请输入需要替换的值" style="margin-left:20%">
        </div>
        <div>
            <label for="newvalue">替换为</label>
            <input id="newvalue" v-model="newvalue" placeholder="请输入替换值" style="margin-left:10%">
        </div>
        <div>
            <el-button type="success" @click="replace" style="margin-left:30%">确定</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            oldvalue:"",
            newvalue:"",
            tablename:"",
            columnname:"",
        }
    },
    created() {
        this.tablename="tbl_"+this.$route.params.dataid;
        this.columnname=this.$store.getters.getCurrentCol;
    },
    computed:{
        myNewcolumnname(){
            return this.$store.getters.getCurrentCol
        },
    },
    watch:{
        myNewcolumnname(newName, oldName){
            this.newcolumnname=newName;
        }
    },
    methods:{
        replace:function(){
        var logid=this.$store.getters.getLogId;
        this.$http({
        url:'/table/'+this.tablename+'/replace',
        method:"get",
        params:{
            tableName: this.tablename,
            columnName: this.columnname,
            oldValue:this.oldvalue,
            newValue:this.newvalue,
            logId: logid,
        },
        headers:{
            Authorization: this.$store.getters.getToken
        }
        }).then(res=>{
            this.$http({
                url:"/table/"+this.tablename,
                headers: {
                Authorization: this.$store.getters.getToken
                },
                params: {
                tableName: this.tablename,
                pageSize: this.$store.getters.getPageSize,
                pageK: this.$store.getters.getPageK,
                },
                methods: "get"
            }).then(res => {
                this.$store.dispatch("updateDataList", res.data.data)
                this.$store.dispatch("setLogId",res.data.data.logId)
            }, error => {
                console.log("错误；", error.message)
            })
        },error=>{
            console.log("错误：",error.message)
        });
        }
    }

}
</script>
<style scoped>
div{
    margin: 10px;
}
input{
    width:200px;
    height: 35px;
    
}
</style>