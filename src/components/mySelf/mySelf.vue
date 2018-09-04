<template>
    <div class="myself">
        <ul class="info">
            <li v-for="item in info">
                <span class="info-label">{{item.label}}</span>
                <span>{{item.value}}</span>
                <i v-if="item.value==''" class="el-icon-edit info-button" @click="dialogVisible = true"></i>
            </li>
        </ul>
        <ul class="use-info">
            <li v-for="item in useInfo">
                <i  class="icon" :class="item.icon"></i>
                <span>{{item.value}}</span>
                <i class="el-icon-arrow-right info-button" @click="goTo(item.route)"></i>
            </li>
        </ul>
        <el-dialog title="更改信息" :visible.sync="dialogVisible">
            <el-form :model="form"class="login-form">
                <el-form-item  prop="name">
                    <el-input placeholder="姓名" v-model="form.name" type="text"></el-input>
                </el-form-item>
                <el-form-item  prop="password">
                    <el-input placeholder="手机号码" v-model="form.phone"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="change()">确 定</el-button>
            </div>
        </el-dialog>
        <footer-bar class="footer"></footer-bar>
    </div>
</template>

<script>
    import footerBar from '../common/footerBar'
    export default {
        name: "mySelf",
        components: {
            footerBar
        },
        data() {
            return {
                form:{
                    name:"",
                    phone:""
                },
                dialogVisible:false,
                info:[
                    {
                        label:"账号信息",
                        value:'',

                    },{
                        label:"用户名",
                        value:'小蛋黄',

                    },{
                        label:"手机号",
                        value:'15958031927'
                    }],
                useInfo:[
                    {
                        value:"我的车辆",
                        icon:"icon-car",
                        route:"/mycar"
                    },
                    {
                        value:"我的账单",
                        icon:"icon-mypay",
                        route:"/check"
                    },
                    {
                        value:"我的评论",
                        icon:"icon-comment",
                        route:"/comment"
                    },{
                        value:"修改密码",
                        icon:"icon-password",
                        route:"/password"
                    },{
                        value:"退出登录",
                        icon:"icon-password",
                        route:"/login"
                    }
                 ]
            }
        },
        mounted() {
            this.form.name = this.info[1].value=localStorage.getItem("name");
            this.form.phone = this.info[2].value=localStorage.getItem("phone");

        },
        methods: {
            goTo:function(route){
                this.$router.push(route);
            },
            resoleMoney:function(){
                let $this=this;
                return new Promise(function (resolve , reject) {
                    var res = $this.$axios.post('/modifyUserInfo',{
                        "userName":localStorage.getItem("userName"),
                        "phone":$this.form.phone,
                        "name":$this.form.name
                    });
                    if (res){
                        resolve(res);
                    }else {
                        reject(new Error())
                    }
                });
            },
            async postMoney(){
                let response=await this.resoleMoney();

                if(response.data.success){
                  this.dialogVisible = false;
                  this.$router.push("/login")
                }else{
                    let  h = this.$createElement;
                    this.$notify({
                        title: '',
                        message: h('i', { style: 'color: teal'}, response.data.errorMsg),
                        type: 'warning',
                        position: 'right-bottom',
                        duration:1000
                    });
                }

            },
            change:function(){
                this.postMoney()
            },
        }
    }
</script>

<style lang="scss"scoped>
    .myself{
        width:100%;
        height:100%;
        background-color:gainsboro;
        padding-bottom:50px;
    }
    .info{
        background-color: #ffffff;
        li{
            text-align: left;
            .info-label{
                display: inline-block;
                text-indent: 10px;
                width:100px;
                color:#8c939d;
            }
            .info-button{
                float:right;
                margin-right:20px;
                margin-top:11px;
            }
            height:50px;
            line-height:50px;
            border-bottom: 1px solid gainsboro;
        }
    }
    .use-info{
        margin-top:20px;
        background-color: #ffffff;
        width:90%;
        margin-left: 5%;
        border-radius: 10px;
        li{
            text-align: left;
            border-bottom: 1px solid gainsboro;
            padding: 10px;
            span{
                position:relative;
                top:-25px;
            }
            .info-button{
                float:right;
                margin-right:20px;
                margin-top:15px;
            }
        }

    }
    .icon {
        display: inline-block;
        width:50px;
        height:50px;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        background-size: cover;
        margin-bottom:5px;
    }
    .icon-car{
        background-image: url("../../images/icon-car.png");
    }
    .icon-mypay{
        background-image: url("../../images/icon-mypay.png");
    }
    .icon-comment{
        background-image: url("../../images/icon-coment.png");
    }
    .icon-password{
        background-image: url("../../images/icon-password.png");
    }
    .footer{
        width:100%;
        position: fixed;
        bottom:0px;
    }

</style>