<template>
  <div>
      <div>
        <el-select v-model="value" placeholder="请选择字段名">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
      </div>
      <div>
          <label for="splitsign">分隔符</label>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div>
          <div>
              <label>新增字段名</label>
              <el-input v-model="name" placeholder="请输入内容"></el-input>
          </div>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
        value: '',
        input:'',
        input_name:[]
      }
    }
  }
</script>