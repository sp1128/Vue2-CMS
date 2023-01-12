<template>
  <div class="login-container">
    <el-card class="box-card">
      <h4 class="login-text">系统登录</h4>
      <el-form :inline="true" :rules="rules" :model="form" ref="form">
        <el-form-item label="账号" prop="username">
          <el-input
            placeholder="请输入账号"
            v-model="form.username"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="form.password"
            show-password
            clearable
            @keydown.enter.native="submit"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button type="info" @click="reset">重置</el-button>
        <el-button type="success" @click="submit">登录</el-button>
      </div>
    </el-card>
  </div>
</template>
  
  <script>
import Cookies from 'js-cookie';
import { getMenu } from '@/api';
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入账号" }],
        password: [{ required: true, message: "请输入密码" }],
      },
    };
  },
  props: ["id"],
  methods: {
    submit() {
      //token信息
      // const token = Mock.Random.guid()
      //token信息存入cookie用于不同页面间的通信
      // Cookies.set('token',{token:token,username:this.login.username})
      //跳转到首页
      this.$refs.form.validate((valid) => {
        if(valid){
          getMenu(this.form).then(({ data }) => {
            if(data.code === 20000){
              Cookies.set('token',data.data.token)
              Cookies.set('name',data.data.name)
              this.$store.commit('setMenu',data.data.menu)
              this.$router.push(`/main`)
            }else{
              this.error()
              this.reset()
            }
          })
        }
      })
    },
    error() {
      this.$notify.error({
        title: "错误",
        message: "登录失败,账号或密码错误",
        duration: 2000,
      });
    },
    reset() {
      this.form.username = "";
      this.form.password = "";
    },
    backLogin() {
      this.reset();
      this.$notify.info({
        title: "消息",
        message: "退出登录成功",
      });
    },
  },
  activated() {
    if (this.id === "1") {
      this.backLogin();
    }
  },
};
</script>
  
  <style lang="less">
  .login-container{
    width: 100%;
    height: 100%;
    background: url(@/assets/images/login-bgc.jpg);
    background-size: cover;
  }
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  display: flex;
  justify-content: center;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(10%, -50%);
  .el-card__body {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
.btn {
  display: flex;
  justify-content: center;
}
.login-text {
  text-align: center;
}
</style>