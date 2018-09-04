<template>
  <div class="login">
    <el-form :model="form" ref="loginForm"class="login-form">
      <el-form-item>
        <span class="form-title">惠停车</span>
      </el-form-item>
      <el-form-item  prop="name">
        <el-input placeholder="请输入账号" v-model="form.name" type="text"></el-input>
      </el-form-item>
      <el-form-item  prop="password">
        <el-input placeholder="请输入密码" v-model="form.password"type="password"></el-input>
      </el-form-item>
        <el-button type="primary" size="medium" @click="submitForm('loginForm')">登录</el-button>
        <p class="button-registor" @click="gotoRegistor">还没有账号，去注册体验>></p>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          password: '',
          category: 0,
        },
      };
    },
    mounted: function() {
    },
    methods: {
      //找回密码
      userFind:function(){
        this.$router.push('/user-passwordFind');
      },
      //登录
        resoleGet:function(){
            let $this=this;
            return new Promise(function (resolve , reject) {
                var res = $this.$axios.post('login',{
                    "username":$this.form.name,
                    "userType":"0",
                    "password":$this.form.password
                });
                if (res){
                    resolve(res);
                }else {
                    reject(new Error())
                }
            });
        },
        async postGet(){
            let response=await this.resoleGet();
            if(response.data.success){
                localStorage.clear();
                this.$store.commit('postUserId', response.data.data.userId);
                this.$store.commit('postWalletId', response.data.data.walletId);
                localStorage.setItem("userId",response.data.data.userId);
                localStorage.setItem("userName",response.data.data.userName);
                localStorage.setItem("phone",response.data.data.phone);
                localStorage.setItem("name",response.data.data.name);
                localStorage.setItem("walletId",response.data.data.walletId);
                this.$router.push('/index');
            }
            else{
                var  h = this.$createElement;
                this.$notify({
                    title: '',
                    message: h('i', { style: 'color: teal'}, response.data.errorMsg),
                    type: 'warning',
                    position: 'right-bottom',
                    duration:1000
                });
                return 0;
            }
        },
      submitForm(formName) {
        var $this=this;
        if(!(this.form.name&&this.form.password)){
          var  h = this.$createElement;
            this.$notify({
                title: '',
                message: h('i', { style: 'color: teal'}, '账户或密码为空'),
                type: 'warning',
                position: 'right-bottom',
                duration:1000
            });
            return 0;
        }


        this.$refs[formName].validate((valid) => {
            this.postGet();

        });
      },
      gotoRegistor:function(){
          this.$router.push('/registor');
      }
    }
  }
</script>
<style lang="scss" scoped>
 .login {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 80;
    -moz-opacity: 0.8;
   background: #324157;
   overflow: hidden;
   position:relative;
  }
  .login-form{
    width:100%;
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
    background: white;
    text-align: center;
    color: #409EFF;
  }
 .form-title{
   font-size:16px;
 }

 .button-registor{
    font-size:12px;
    text-align: right;
    cursor:pointer;

  }
</style>
