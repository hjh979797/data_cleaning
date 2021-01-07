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
        // getloglist(){
        //     this.$http({
        //         url:'/table/'+this.tablename+'/logs',
        //         method:"get",
        //         params:{
        //             tableName: this.tablename,
        //         },
        //         headers:{
        //             Authorization: this.$store.getters.getToken
        //         }
        //     }).then(res=>{
        //         console.log("日志结果: " + res.data);
        //         this.loglist=res.data.data;
        //         console.log("日志结果列表: " + this.loglist);
        //     },error=>{
        //         console.log("错误：",error.message)
        //     })
        // },
        showloglist(){
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
                this.loglist=res.data.data;
            },error=>{
                console.log("错误：",error.message)
            })
        },
        deletelog:function(myindex){
            var deletelogid = this.loglist[myindex].logId;
            this.$http({
                url:'/table/'+this.tablename+'/deleteLog',
                method:"post",
                data:{
                    tableName: this.tablename,
                    logId:deletelogid,
                },
                headers:{
                    Authorization: this.$store.getters.getToken
                }
            }).then(res=>{
                alert("删除成功");
                this.$store.dispatch("updateDataList", res.data.data);
            },error=>{
                console.log("错误：",error.message);
                alert("错误：",error.message);
            });
            if(myindex==0)
            {
                this.$http({
                url:'/table/'+this.tablename,
                method:"get",
                params:{
                    tableName: this.tablename,
                },
                headers:{
                    Authorization: this.$store.getters.getToken
                }
                }).then(res=>{
                    this.$store.dispatch("updateDataList", res.data.data);
                },error=>{
                    console.log("错误：",error.message);
                    alert("错误：",error.message);
                });
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
                url:'/table/'+this.tablename,
                method:"get",
                params:{
                    tableName: this.tablename,
                },
                headers:{
                    Authorization: this.$store.getters.getToken
                }
                }).then(res=>{
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
                url:'/table/'+this.tablename+'/history',
                method:"get",
                params:{
                    tableName: this.tablename,
                    logId:logid,
                },
                headers:{
                    Authorization: this.$store.getters.getToken
                }
                }).then(res=>{
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