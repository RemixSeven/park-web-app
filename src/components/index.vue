<template>
    <div class="index">
        <nav-bar></nav-bar>
        <div class="content">
            <div class="block">
                <el-carousel height="150px">
                    <el-carousel-item  :class="bg[index]"v-for="(item,index) in 4" :key="index">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <el-row :gutter="20">
                <el-col :span="6" v-for="(item,index) in cards" :index="index">
                    <div class="grid-content bg-purple">
                        <i class="icon" :class="item.icon" @click="goTo(item.route)"></i>
                        <p>{{item.name}}</p>
                    </div>
                </el-col>
            </el-row>
            <div class="tips">
                <div class="tips-title">
                    <span>小贴士</span>
                    <i class="el-icon-document"></i>
                </div>
                <ul >
                    <li class="tips-content"@click="goTo('/mycar')">
                        <i class="icon icon-band"></i>
                        <p >绑定车辆</p>
                    </li>
                    <li class="tips-content" @click="goTo('/record')">
                        <i class="icon icon-needpay"></i>
                        <p >停车记录</p>
                    </li>
                </ul>
            </div>


        </div>
        <footer-bar class="footer"></footer-bar>
    </div>
</template>
<script>
    import navBar from './common/navBar'
    import footerBar from './common/footerBar'

    export default {
        name: "index",
        components: {
            navBar,
            footerBar
        },
        data() {
            return {
                cards:[
                    {
                        name:"我要停车",
                        route:'/order',
                        icon:'icon-park',

                    },
                    {
                        name:"充值",
                        route:'/recharge',
                        icon:'icon-recharge'
                    },{
                        name:"我的账单",
                        route:'/check',
                        icon:'icon-pay'
                    },{
                        name:"卡包券",
                        route:'/cards',
                        icon:'icon-card'
                    }],
                bg:[
                    'bg_tab',
                    'bg_tab1',
                    'bg_tab2',
                    'bg_tab3',

                ]
            }
        },
        mounted() {
        },
        methods: {
            goTo:function(route){
                this.$router.push(route);
            }
        }
    }
</script>

<style lang="scss"scoped>
    .index{
        padding-bottom: 60px;
        overflow: auto;
    }
    .footer{
        position:fixed;
        bottom:0px;
        width:100%;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
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
    .icon-park{
        background-image: url("../images/icon-park.png");
    }
    .icon-recharge{
        background-image: url("../images/icon-rechange.png");
    }
    .icon-pay{
        background-image: url("../images/icon-pay.png");
    }
    .icon-card{
        background-image: url("../images/icon-card.png");
    }
    .icon-band{
        background-image: url("../images/icon-band.png");
        margin-top:40px;
    }
    .icon-needpay{
        background-image: url("../images/icon-needpay.png");
        margin-top:40px;
    }
    .tips{
        margin-top:50px;
        ul{
            padding:10px 0;
        }
    }
    .tips-title{
        text-align: left;
        margin-bottom: 20px;
    }
    .tips-content{
        border-radius: 10px;
        background-image: url("../images/bg-tips.jpg");
        height:200px;
        background-size: cover;
        width:35%;
        float:left;
        margin-left:10%;
        p{
            color: #ffffff;
        }
    }
    .bg_tab{
        background-image: url("../images/bg_tab.jpg");
        background-size: cover;
    }
    .bg_tab1{
        background-image: url("../images/bg_tab1.jpg");
        background-size: cover;
    }
    .bg_tab2{
        background-image: url("../images/bg_tab2.jpg");
        background-size: cover;
    }
    .bg_tab3{
        background-image: url("../images/bg_tab3.jpg");
        background-size: cover;
    }
</style>
