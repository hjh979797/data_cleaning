<template>
  <div>
    <el-radio v-model="radio" label="1">
      选定值
      <br>
      <div>
        <div>
          <div>
            <el-radio v-model="choose_radio" label="1" name="choose">保留</el-radio>
            <el-radio v-model="choose_radio" label="2" name="choose">清除</el-radio>
          </div>
          <el-select v-model="value1" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </el-radio>
    <el-radio v-model="radio" label="2">通配符匹配
      <div>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <el-radio-group v-model="radio_group">
          <el-radio :label="3">开头为</el-radio>
          <el-radio :label="6">包含</el-radio>
          <el-radio :label="9">精确匹配</el-radio>
        </el-radio-group>
      </div>
    </el-radio>
    <el-radio v-model="radio" label="3">NULL值
      <div>
        <el-radio-group v-model="radio_null">
          <el-radio :label="0">保留null值</el-radio>
          <el-radio :label="1">删除null值</el-radio>
        </el-radio-group>
      </div>
    </el-radio>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio: '1',
      choose_radio:'1',
      radio_group:'3',
      radio_null:'0',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value1:[],
      input:''
    }
  }
}
</script>
