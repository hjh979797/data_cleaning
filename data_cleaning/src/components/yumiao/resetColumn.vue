<template>
    <div>
        <div>
            <label>字段名</label>
            <el-input v-model="input" placeholder="请输入新字段名"></el-input>
        </div>
        <div>
            <label>数据类型</label>
            <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.value"
                :value="item.value">
                </el-option>
            </el-select>
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
            value:""
        }
    }
}
</script>