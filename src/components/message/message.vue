<template>
    <div class="message">
        <div  class="no-data"v-show="list.length==0"></div>
        <ul>
            <li v-for="(item,index) in list" :index="index">
                <i class="icon icon-message"></i>
                <div class="detail">
                    <p>
                        <span>{{item.msgContent.title}}</span>
                    </p>
                    <p><span>{{item.msgContent.message}}</span></p>
                    <p>{{item.msgContent.createDate}}</p>
                </div>
            </li>
        </ul>
        <footer-bar class="footer"></footer-bar>
    </div>
</template>

<script>
    import footerBar from '../common/footerBar'
    export default {
        name: "comment",
        components:{
            footerBar
        },
        data(){
            return{
                list:[]
            }
        },
        mounted(){
            this.postChange();
        },
        methods:{
            resoleChange:function(){
                let $this=this;
                return new Promise(function (resolve , reject) {
                    var res = $this.$axios.post('/sysmsgs',{
                        "userId":localStorage.getItem("userId"),
                        "pageNum":"1",
                        "pageSize":"10"
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
                   this.list=response.data
            }
        }
    }
</script>

<style lang="scss" scoped>
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
    li{ width:100%;
        text-align: left;
        margin-left:20px;
        border-bottom: 1px solid gainsboro;
    }
    .detail{
        display:inline-block;
        position:relative;

    }
    .icon-message{
        background-image: url("../../images/icon-message.png");
    }
    .footer{
        width:100%;
        position: fixed;
        bottom:0px;
    }
    .message{
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