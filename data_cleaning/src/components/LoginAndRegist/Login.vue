// 结构样式和行为
<template>
  <div class="login_container">
    <div class="top"></div>
    <div class="login_box">
      <!-- 左边图 -->
      <div class="login_left">
        <div class="left_back"></div>
        <label class="left_text">数据清洗平台</label>
        <img src="../../assets/login_2.png" alt="" class="left_pic" />
      </div>
      <!-- 右边 -->
      <div class="login_right">
        <div class="right_welcome">
          <label>欢迎登录</label>
          <div class="line"></div>
        </div>
        <!-- 登录表单区域 -->
        <el-form
          :model="loginForm"
          :rules="loginFormRules"
          label-width="0px"
          class="login_form"
          ref="loginFormRef"
        >
          <div class="in">
            <!-- 用户名 -->
            <el-form-item style="margin: 10px" prop="mail">
              <el-input
                prefix-icon="iconfont icon-user"
                v-model="loginForm.mail"
                placeholder="请输入邮箱"
                size="mini"
              ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item style="margin: 10px" prop="password">
              <el-input
                prefix-icon="iconfont icon-3702mima"
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                size="mini"
              ></el-input>
            </el-form-item>
          </div>
          <!-- 按钮区域 -->
          <el-button type="primary" class="login" @click="login"
            >登 录</el-button
          >
        </el-form>
        <div class="zhuce">
          <label>没有账号?</label>
          <!-- <label style="margin-left: 20px" >注册</label> -->
          <router-link to="/regist">注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      // 正则
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        mail: '848564778@qq.com', //数据绑定
        password: '123456'
      },
      loginFormRules: {
        // 验证邮箱合法性-------------------------------------------
        mail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur'}
        ],
        // 验证密码合法性
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6-15个字符之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const {data: res} = await this.$http.post('/login', this.loginForm);
        console.log(res.code) // 代号
        console.log(res.data) // token
        console.log(res.msg)  // 错误原因
        if(res.code !== 0) return this.$message.error("登录失败!" + res.msg)
        this.$message.success('登录成功')
        // window.sessionStorage.setItem("token", res.data);
        this.$store.dispatch("updatetoken", res.data)
        this.$store.dispatch("updateuserinfo", {
          mail: this.loginForm.mail,
          password: this.loginForm.password
        })
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background: url('../../assets/login_back_1.jpg') no-repeat;
  background-size: 100% 100%;
  height: 100%;
  .top {
    height: 100%;
    width: 100%;
    background-color: #2b3f6b;
    filter: Alpha(Opacity=60);
    opacity: 0.6;
  }
}
.login_box {
  width: 600px;
  height: 330px;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    widows: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.login_left {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40%;
  height: 100%;
  .left_back {
    width: 100%;
    height: 100%;
    background-color: #3366cc;
    opacity: 0.9; // 透明度
  }
  .left_text {
    color: #fff; //字体颜色
    font-size: 18px;
    position: absolute;
    bottom: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .left_pic {
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translate(-50%);
    width: 80%;
    height: 40%;
  }
}
.login_right {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 60%;
  height: 100%;
  background-color: #fff;
  .right_welcome {
    position: absolute;
    left: 50%;
    top: 15%;
    transform: translate(-50%);
    font-size: 15px;
    font-family: 'Hiragino Sans GB';
    font-weight: bold;
  }
  .line {
    border: 0px;
    height: 1px;
    margin-top: 5px;
    background: #a8bee5;
    background-image: linear-gradient(to right, #ccc, #a8bee5, #ccc);
  }
}
.login_form {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  width: 80%;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login {
  width: 100%;
  background-color: #3366cc;
  margin-top: 15px;
}
.zhuce {
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translate(-50%);
  font-size: 8px;
}
</style>
