<template>
    <div class="cards">
        <div  class="no-data"v-show="list.length==0"></div>
        <ul>
            <li v-for="(item,index) in list" :index="index">
                <div class="detail">
                    <i class="icon" :class="icon[item.status]"></i>
                    <p>
                        <span>{{item.name}}</span>
                    </p>
                    <p>有效期至:{{item.effectTime}}</p>
                </div>
            </li>
        </ul>
      <footer-bar class="footer"></footer-bar>
    </div>
</template>

<script>
    import footerBar from '../common/footerBar'
    export default {
        name: "chards",
        components: {
            footerBar
        },
        data(){
            return{
                list:[
                    {  date:"2018-06-10 12:12:12",
                        detail:"杭电停车真好",
                        value:16,
                        icon:"icon-nouse"
                    },{
                        date:"2018-06-10 12:12:12",
                        detail:"啦啦啦啦",
                        value:18,
                        icon:"icon-used"
                    },{
                        date:"2018-06-10 12:12:12",
                        detail:"啦啦啦啦",
                        value:18,
                        icon:"icon-canot"
                    }
                ],
                icon:[
                    "icon-nouse",
                    "icon-used",
                    "icon-canot"


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
                    var res = $this.$axios.post('queryCoupon',{
                        "userId":localStorage.getItem("userId")
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
               this.list=response.data.data
            },
        }
    }
</script>

<style scoped>
    .footer{
        width:100%;
        position:fixed;
        bottom:0px;
    }

    li{
        width:80%;
        height:100px;
        margin-top:30px;
        margin-left:10%;
        border-radius:10px;
        border:1px solid gainsboro;
        line-height:50px;
        position:relative;
        background-color: gainsboro;

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
        position:absolute;
        margin-left:50%;
        left:-25px;
        margin-top:25px;
    }
    .icon-used{
        background-image: url("../../images/icon-used.png");
    }
    .icon-canot{
        background-image: url("../../images/icon-canot.png");
    }
    .icon-nouse{
        background-image: url("../../images/icon-nouse.png");
    }
    .cards{
        width:100%;
        height:100%;
    }
    .no-data{
        width:100%;
        height:100%;
        background-image: url("../../images/data_nofound.png");
        background-size: cover;
    }
</style>