<template>
    <el-dropdown trigger="click">
          <el-button class="el-dropdown-link" type="info" round size="mini" @click="showloglist">
            日志
          </el-button>
          <el-dropdown-menu  slot="dropdown">
            <el-dropdown-item v-for="(log,index) in loglist" :key="index">
              <div style="width:220px;height:50px;padding-top:10px" @click="loadlog(index)">
                  <label @click="loadlog(index)">{{log.title}}</label>
                  <el-button type="primary" size="mini" icon="el-icon-delete" class="deletebutton" @click="deletelog(index)" style="height:35px;float:right"></el-button>
            </div>
            </el-dropdown-item>
            <!-- <el-dropdown-item>...</el-dropdown-item>
            <el-dropdown-item>...</el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>
</template> 
<script>
export default {
    data(){
        return{
            loglist:[],
        }
    },
   created (){
        // this.getloglist();
    },
    methods:{
        getloglist(){
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
                console.log("日志结果: " + res.data);
                this.loglist=res.data.data;
                console.log("日志结果列表: " + this.loglist);
            },error=>{
                console.log("错误：",error.message)
            })
        },
        showloglist(){
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
                console.log("日志结果: " + res.data);
                this.loglist=res.data.data;
            },error=>{
                console.log("错误：",error.message)
            })
        },
        deletelog:function(myindex){
            var deletelogid = this.loglist[myindex].logId;
            console.log("删除id： " + deletelogid);
            this.$http({
                url:'/table/tbl_10000/deleteLog',
                method:"post",
                data:{
                    tableName: "tbl_10000",
                    logId:deletelogid,
                },
                headers:{
                    Authorization: this.$store.getters.getToken
                }
            }).then(res=>{
                console.log("删除结果");
                alert("删除成功");
                this.$store.dispatch("updateDataList", res.data.data);
            },error=>{
                console.log("错误：",error.message);
                alert("错误：",error.message);
            });
            if(myindex==1)
            {
                this.$http({
                url:'/table/tbl_10000',
                method:"get",
                data:{
                    tableName: "tbl_10000",
                },
                headers:{
                    Authorization: this.$store.getters.getToken
                }
                }).then(res=>{
                    console.log("跳转日志");
                    alert("跳转成功");
                    this.$store.dispatch("updateDataList", res.data.data);
                },error=>{
                    console.log("错误：",error.message);
                    alert("错误：",error.message);
                });
            }
        },
        loadlog:function(myindex){
            var logid=0;
            alert("tianzhuan")
            if(this.loglist.length!=0)
            {
                logid = this.loglist[myindex].logId;
            }
            alert(logid);
            if(logid==0)
            {
                this.$http({
                url:'/table/tbl_10000',
                method:"get",
                data:{
                    tableName: "tbl_10000",
                },
                headers:{
                    Authorization: this.$store.getters.getToken
                }
                }).then(res=>{
                    console.log("跳转日志");
                    alert("跳转成功");
                    this.$store.dispatch("updateDataList", res.data.data);
                },error=>{
                    console.log("错误：",error.message);
                    alert("错误：",error.message);
                });
            }
            else
            {
                this.$http({
                url:'/table/tbl_10000/history',
                method:"get",
                data:{
                    tableName: "tbl_10000",
                    logId:logid,
                },
                headers:{
                    Authorization: this.$store.getters.getToken
                }
                }).then(res=>{
                    console.log("跳转日志");
                    alert("跳转成功");
                    this.$store.dispatch("updateDataList", res.data.data);
                },error=>{
                    console.log("错误：",error.message);
                    alert("错误：",error.message);
                });
            }
        }
    }
}
</script>