<template>
  <div class="login">
    <el-form  ref="loginForm" label-width="50px" class="login-form">
      <el-form-item>
        <span class="form-title">慧停车</span>
      </el-form-item>
      <el-form-item  prop="name">
        <el-input placeholder="请输入账号"  v-model="userName" type="text"></el-input>
      </el-form-item>
      <el-form-item  prop="password">
        <el-input placeholder="请输入密码" v-model="password"type="password"></el-input>
      </el-form-item>
      <el-form-item  prop="password">
        <el-input placeholder="姓名" v-model="name"></el-input>
      </el-form-item>
      <el-form-item  prop="password">
        <el-input placeholder="手机号码" v-model="phone"></el-input>
      </el-form-item>

      <el-button type="primary" size="medium" @click="submitForm('loginForm')">注册</el-button>
      <p class="button-login" @click="gotoLogin">已注册，去登录>></p>
    </el-form>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                    "userName":"",
                    "password":"",
                    "phone":"",
                    "name":"",
                    "code":""

            };
        },
        mounted: function() {
        },
        methods: {
            //找回密码
            userFind:function(){
                this.$router.push('/user-passwordFind');
            },
            //注册
            submitForm(formName) {
                var  h = this.$createElement;
                if(!/(?!^\d+$)[0-9a-zA-Z]{1,10}/.test(this.userName)){

                    this.$notify({
                        title: '',
                        message: h('i', { style: 'color: teal'}, '用户名格式错误'),
                        type: 'warning',
                        position: 'right-bottom',
                        offset: 300,
                        duration:1000
                    });
                    return 0;

                }

                if(!/[0-9a-zA-Z]{8,16}/.test(this.password)){
                    var  h = this.$createElement;
                    this.$notify({
                        title: '',
                        message: h('i', { style: 'color: teal'}, '密码格式错误，应为英文字母加数字8-16位'),
                        type: 'warning',
                        position: 'right-bottom',
                        offset: 300,
                        duration:1000
                    });
                    return 0;

                }
                if(!/^[\u4e00-\u9fa5]+$/gi.test(this.name)){
                    this.$notify({
                        title: '',
                        message: h('i', { style: 'color: teal'}, '姓名格式错误，且姓名只能为汉字'),
                        type: 'warning',
                        position: 'right-bottom',
                        offset: 300,
                        duration:1000
                    });
                    return 0;

                }
                var $this=this;
                if(!(this.userName&&this.password)){
                    this.$notify({
                        title: '',
                        message: h('i', { style: 'color: teal'}, '必选项输入为空'),
                        type: 'warning',
                        position: 'right-bottom',
                        offset: 300,
                        duration:1000
                    });
                    return 0;
                }

                    this.$axios.post('/register', {
                        "userName":this.userName,
                        "password":this.password,
                        "userType":"0",
                        "phone":this.phone,
                        "name":this.name,
                        "code":""
                    }).then(function (response) {
                        console.log(response)
                        if(response.data.success){
                            $this.$router.push("login");
                        }else {
                        	 $this.$notify({
                       		 title: '',
                        	message: h('i', { style: 'color: teal'}, response.data.errorMsg),
                        	type: 'warning',
                        	position: 'right-bottom',
                        	offset: 300,
                        	duration:1000
                   		 });
                        }
                    }).catch(function (response) {
                    });


            },
            gotoLogin:function(){
                this.$router.push('/login');
            },
        },
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
    padding:30px 40px 20px 20px;
    text-align: center;
    color: #409EFF;
    .form-title{
      font-size:16px;
    }
    .button-login{
      font-size:12px;
      text-align: right;
      cursor:pointer;
    }
  }

</style>
