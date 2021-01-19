<template>
    <el-dropdown trigger="click">
          <el-button class="el-dropdown-link" type="info" round size="mini" @click="showloglist">
            日志
          </el-button>
          <el-dropdown-menu  slot="dropdown">
            <el-dropdown-item v-for="(log,index) in loglist" :key="index">
              <div style="width:280px;height:50px;padding-top:10px" >
                  <el-button type="text" style="width:160px;border" @click="loadlog(index)">{{log.title}}</el-button>
                  <el-button type="primary" size="mini" icon="el-icon-delete" class="deletebutton" @click="deletelog(index)" style="height:35px;float:right"></el-button>
            </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
</template> 
<script>
export default {
    data(){
        return{
            loglist:[],
            tablename:"",
        }
    },
   created (){
        this.tablename="tbl_"+this.$route.params.dataid;
    },
    methods:{
        showloglist(){
            this.$http({
                url:'/mylog/logs',
                method:"get",
                params:{
                    tableName: this.tablename,
                },
                headers:{
                    Authorization: this.$store.getters.getToken
                }
            }).then(res=>{
                this.loglist=res.data.data;
                if(res.data.data.length===0){
                  this.$message({
                    message: '当前没有日志信息',
                    type: 'warning'
                  });
                }
            },error=>{
                console.log("错误：",error.message)
            })
        },
        deletelog:function(myindex){
            var deletelogid = this.loglist[myindex].logId;
            this.$http({
                url:'/mylog/logs',
                method:"delete",
                data:{
                    tableName: this.tablename,
                    logId:deletelogid,
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
                alert("删除成功");
            },error=>{
                console.log("错误：",error.message);
                alert("错误：",error.message);
            });
            if(myindex==0)
            {
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
            }
        },
        loadlog:function(myindex){
            var logid=0;
            if(this.loglist.length!=0)
            {
                logid = this.loglist[myindex].logId;
            }
            if(logid==0)
            {
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
            }
            else
            {
                this.$http({
                url:'/table/'+this.tablename+'/history',
                method:"get",
                params:{
                    tableName: this.tablename,
                    logId:logid,
                     pageSize: this.$store.getters.getPageSize,
                pageK: this.$store.getters.getPageK,
                },
                headers:{
                    Authorization: this.$store.getters.getToken
                }
                }).then(res=>{
                    alert("跳转成功");
                     this.$store.dispatch("updateDataList", res.data.data)
                this.$store.dispatch("setLogId",res.data.data.logId)
                },error=>{
                    console.log("错误：",error.message);
                    alert("错误：",error.message);
                });
            }
        }
    }
}
</script>