<template>
    <div>
        <div>
            <label>当前列名</label>
            <!-- <input placeholder="columnname" :disabled="true" style="margin-left:10%"> -->
            <input :placeholder="this.$store.getters.getCurrentCol" :disabled="true" style="margin-left:10%">
        </div>
        <div>
            <label for="newcolumnname">新列名</label>
            <input id="newcolumnname" v-model="newcolumnname" :placeholder="this.$store.getters.getCurrentCol" style="margin-left:15%">
        </div>
        <div>
            <label>数据类型</label>
            <el-select v-model="value" placeholder="请选择" style="width:200px;margin-left:10%">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.value"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div>
            <label>数据长度</label>
             <el-input-number v-model="columnLength" :min="1" :max="100" style="width:200px;margin-left:10%"></el-input-number>
        </div>
        <div>
            <el-button type="success" @click="reset" style="margin-left:30%">确定</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            input:"",
            options: [{
            value: 'int',
            }, {
            value: 'double',
            }, {
            value: 'datatime',
            }, {
            value: 'varchar',
            }],
            value:"",
            tablename:"",
            columnname:"",
            newcolumnname:"",
            columnLength:"",
        }
    },
    created() {
        this.tablename="tbl_"+this.$route.params.dataid;
        this.columnname=this.$store.getters.getCurrentCol;
        this.newcolumnname=this.$store.getters.getCurrentCol;
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
        reset:function(){
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
                    logid=res.data.data[res.data.data.length-1].logId;
                this.$http({
                url:'/table/'+this.tablename+'/column',
                method:"get",
                params:{
                    tableName: this.tablename,
                    columnName: this.columnname,
                    newColumnName:this.newcolumnname,
                    columnType:this.value,
                    columnLength:this.columnLength,
                    logId: logid,
                },
                headers:{
                    Authorization: this.$store.getters.getToken
                }
                }).then(res=>{
                    console.log("resetColumnname")
                    console.log(res.data.data);
                    this.$store.dispatch("updateDataList", res.data.data)
                    alert("重命名完成");
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
    margin: 8px;
}
input{
    width:200px;
    height: 35px;
}
</style>