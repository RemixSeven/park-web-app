<template>
    <div class="check">
        <div  class="no-data"v-show="list.length==0"></div>
        <header>
            <i class="icon icon-nopay"></i>
            <p>停车记录</p>
        </header>
        <ul>
            <li v-for="(item,index) in list" :index="index">
                <div class="detail">
                    <p>
                        <span class="value">{{item.parkName}}</span>
                    </p>
                    <p>消费：{{item.money}}元</p>
                    <p>开始停车：{{item.enterTime}}</p>
                    <p>结束停车：{{item.outTime}}</p>
                </div>
            </li>
        </ul>
        <footer-bar class="footer"></footer-bar>
    </div>
</template>

<script>
    import footerBar from '../common/footerBar'
    export default {
        name: "check",
        components:{
            footerBar
        },
        data(){
            return{
                list:[
                    {  date:"2018-06-10 12:12:12",
                        detail:"杭电消费",
                       value:16,
                        icon:"icon-post"
                    },{
                        date:"2018-06-10 12:12:12",
                        detail:"充值",
                        value:18,
                        icon:"icon-get"
                    }
                ]

            }
        },
        mounted(){
            this.postGet();
        },
        methods:{
            resoleGet:function(){
                let $this=this;
                return new Promise(function (resolve , reject) {
                    var res = $this.$axios.post('queryCharge',{
                        "userId":localStorage.getItem("userId")
                    });
                    if (res){
                        resolve(res);
                    }else {
                        reject(new Error())
                    }
                });
            },
            async postGet(req){
                let response=await this.resoleGet();
                let res=response.data;
                if(res.success){
                    this.list=res.data;
                }
            },
        }
    }
</script>

<style lang="scss"scoped>
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
    .check{
        padding-bottom: 50px;
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
    .icon-get{
        background-image: url("../../images/icon-get.png");
    }
    .icon-post{
        background-image: url("../../images/icon-post.png");
    }
    .icon-nopay{
        background-image: url("../../images/record.png");
        width:140px;
        height:100px;
        margin-top:20px;
        background-size: cover;
    }
    ul{
        width:100%;

    }
    li{ width:100%;
        text-align: left;
        margin-left:20px;
        border-bottom: 1px solid gainsboro;
    }
    .footer{
        width:100%;
        position: fixed;
        bottom:0px;
    }
    .check{
        width:100%;
        height:100%;
        overflow-y: auto;
    }
    .no-data{
        width:100%;
        height:100%;
        background-image: url("../../images/data_nofound.png");
        background-size: cover;
    }


</style>