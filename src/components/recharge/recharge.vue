<template>
    <div class="recharge">
        <header>
            <i class="icon icon-money"></i>
            <p>余额:{{money}}元</p>
            <el-button  type="warning"@click="isShow=true">充值</el-button>
        </header>
        <el-form  class="add-info" v-show="isShow==true" >
            <el-form-item>
                <el-input style="width:200px" v-model="balance" placeholder="金额"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="isShow=false;">取消</el-button>
                <el-button type="primary" @click="recharge">确认充值</el-button>
            </el-form-item>

        </el-form>

        <footer-bar class="footer"></footer-bar>
    </div>
</template>

<script>
    import footerBar from '../common/footerBar'
    export default {
        name: "recharge",
        components:{
            footerBar
        },
        data(){
           return {
               isShow:"false",
               balance:"",
               money:""
           }
        },
        mounted(){
            this.postMoney();
        },
        methods:{
            resoleMoney:function(){
                let $this=this;
                return new Promise(function (resolve , reject) {
                    var res = $this.$axios.post('queryWallet',{
                        "userId":localStorage.getItem("userId"),
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


                    this.money=response.data.data.balance;

                }
            },
            resoleGet:function(){
                let $this=this;
                return new Promise(function (resolve , reject) {
                    var res = $this.$axios.post('recharge',{
                        "walletId":localStorage.getItem("walletId"),
                        "userId":localStorage.getItem("userId"),
                        "balance":$this.balance
                    });
                    if (res){
                        resolve(res);
                    }else {
                        let  h = this.$createElement;
                    this.$notify({
                        title: '',
                        message: h('i', { style: 'color: teal'}, response.data.errorMsg),
                        type: 'warning',
                        position: 'right-bottom',
                        offset: 300,
                        duration:1000
                    });
                    }
                });
            },
            async postGet(){
                let response=await this.resoleGet();

                if(response.data.success){
                    var  h = this.$createElement;
                    this.$notify({
                        title: '',
                        message: h('i', { style: 'color: teal'}, response.data.data),
                        type: 'warning',
                        position: 'right-bottom',
                        offset: 300,
                        duration:1000
                    });
                    this.postMoney();
                    return 0;
                }
                 else{
                    let  h = this.$createElement;
                    this.$notify({
                        title: '',
                        message: h('i', { style: 'color: teal'}, response.data.errorMsg),
                        type: 'warning',
                        position: 'right-bottom',
                        offset: 300,
                        duration:1000
                    });
                }
            },
            recharge:function(){
                this.isShow=false;
                this.postGet();
            }
        }
    }
</script>

<style lang="scss"scoped>

.footer{
    position:fixed;
    width:100%;
    bottom:0px;
}
header{
    background: #409eff;
    height:300px;
    margin-bottom: 20px;
    p{
        margin-top:30px;
        font-size:20px;
        color:#ffffff;
        margin-bottom: 20px;
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
.icon-money{
    margin-top:10px;
    background-image: url("../../images/icon-money.png");
}
</style>