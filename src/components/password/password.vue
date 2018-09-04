<template>
    <div class="password">
        <el-form>
            <el-form-item  prop="password">
                <el-input placeholder="请输入旧密码"v-model="oldPassword" type="password"></el-input>
            </el-form-item>
            <el-form-item  prop="password">
                <el-input placeholder="请输入新密码"v-model="newPassword"type="password"></el-input>
            </el-form-item>
            <el-form-item  prop="password">
                <el-button type="primary" size="medium" @click="goTo()">确认修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "password",
        data(){
            return{
                userName:"",
                oldPassword:"",
                newPassword:""
            }
        },

        mounted(){
        },
        methods:{
            resoleChange:function(){
                let $this=this;
                return new Promise(function (resolve , reject) {
                    var res = $this.$axios.post('/modifyPassword',{

                        "userName":localStorage.getItem("userName"),
                        "password":$this.oldPassword,
                        "newPassword":$this.newPassword
                    });
                    if (res){
                        resolve(res);
                    }else {
                        reject(new Error())
                    }
                });
            },
            async postChange(){
                let response=await this.resoleChange();
                let res=response.data;
                if(res.success){
                    this.$router.push("/login");
                }
                else{
                    let  h = this.$createElement;
                    this.$notify({
                        title: '',
                        message: h('i', { style: 'color: teal'}, '账户或密码输入错误'),
                        type: 'warning',
                        position: 'right-bottom',
                        duration:1000
                    });
                }


            },
            goTo:function(){
                this.postChange();
            }
        }
    }
</script>

<style scoped>
    .password{
        padding:20px;
    }

</style>