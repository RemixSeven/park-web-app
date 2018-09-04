<template>
    <div class="comment">
        <div  class="no-data"v-show="list.length==0"></div>
        <header v-show="!list.length==0">
            <i class="icon icon-mycomment"></i>
            <p>我的评论</p>
            <el-button  size="small" v-show="isShow"@click="nextPage()">{{page}}</el-button>
        </header>
        <ul class="list">
            <li v-for="(item,index) in list" :index="index">
                <i class="icon icon-comment"></i>
                <div class="detail">
                    <p>
                        <span>停车场名称：{{item.parkName}}</span>
                    </p>
                    <p>
                        <span>评价：{{item.cDetail}}</span>
                    </p>
                    <p>
                        <span>评分：{{item.score}}</span>
                    </p>
                    <p>时间：{{item.commentaryTime}}</p>
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
                list:[],
                sum:'',
                pageNum:1,
                isShow:false,
                page:"下一页"

            }
        },
        mounted(){
            this.postChange();
        },
        methods:{
            nextPage:function(){
                if(Math.floor(this.sum/10+1)>this.pageNum&&this.pageNum<10){
                    this.pageNum=this.pageNum+1;
                }else{

                    this.pageNum=1;
                }
                this.postChange();

            },
            resoleChange:function(){
                let $this=this;
                return new Promise(function (resolve , reject) {
                    var res = $this.$axios.post('/commentaryByUser',{
                        "userId":localStorage.getItem("userId"),
                        "pageNum":$this.pageNum,
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

                if(response.data.success){
                    this.list=response.data.data.commentaryDtos;
                    this.sum=response.data.data.sum;
                    if((this.sum/10+1)>this.pageNum&&this.sum>10){
                       this.isShow=true;
                    }
                }else{
                var  h = this.$createElement;
                 this.$notify({
                        title: '',
                        message: h('i', { style: 'color: teal'}, response.data.errorMsg),
                        type: 'warning',
                        position: 'right-bottom',
                        duration:1000
                    });
                }
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
     }
    .icon-comment{
        background-image: url("../../images/icon-comment.png");
    }
    .icon-mycomment{
        background-image: url("../../images/icon-mycomment.png");
        margin-top:20px;
    }
    .footer{
        width:100%;
        position: fixed;
        bottom:0px;
    }
    .comment{
        width:100%;
        height:100%;
        overflow-y: auto;
    }
    .no-data {
        width: 100%;
        height: 100%;
        background-image: url("../../images/data_nofound.png");
        background-size: cover;
    }
    header{
        background: #409eff;
        height:200px;
        margin-bottom: 20px;
        p{
            margin-top:30px;
            font-size:20px;
            color:#ffffff;
            margin-bottom: 20px;
        }
    }

</style>