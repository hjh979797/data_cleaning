<template>
    <el-dropdown trigger="click">
          <el-button class="el-dropdown-link" type="info" round size="mini" @click="showloglist">
            日志
          </el-button>
          <el-dropdown-menu  slot="dropdown">
            <el-dropdown-item v-for="(log,index) in loglist" :key="index">
              <div style="width:220px;height:50px;">
                  <label>{{log.title}}</label>
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
        this.getloglist();
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
                console.log("日志结果列表: " + this.loglist);
            },error=>{
                console.log("错误：",error.message)
            })
        },
        deletelog:function(myindex){
            var deletelogid = this.loglist[myindex].logId;
            console.log("删除id： " + deletelogid);
            this.$http({
                url:'/table/tbl_10000/logs/{deletelogid}',
                method:"delete",
                params:{
                    tableName: "tbl_10000",
                    logId:deletelogid,
                },
                headers:{
                    Authorization: this.$store.getters.getToken
                }
            }).then(res=>{
                console.log("删除结果");
                // this.$store.dispatch("updateDataList", res.data.data);
            },error=>{
                console.log("错误：",error.message)
            })
            this.loglist = this.loglist.filter((currentValue, index) => index != myindex);
        }
    }
}
</script>