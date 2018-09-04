<template>
    <footer>
        <el-breadcrumb separator="" class="bread">
            <el-breadcrumb-item class="item":to="{ path: '/index' }">
                <span>首页</span>
            </el-breadcrumb-item>
            <el-breadcrumb-item class="item":to="{ path: '/nearBy' }">
                <span>附近</span>
            </el-breadcrumb-item>
            <el-breadcrumb-item class="item":to="{ path: '/message' }">
                <span>消息</span>
            </el-breadcrumb-item>
            <el-breadcrumb-item class="item":to="{ path: '/myself' }">
                <span> 账号</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </footer>
</template>

<script>
    export default {
        name: "nav-bar",

        data(){
            return{
                activeIndex:"index",
                city:"",
                map:""
            }
        },
         mounted(){

         },
         methods:{


         }


    }
</script>

<style lang="scss" scoped>
    .bread{
        height:50px;
        line-height:50px;
        background: #409eff;
        color: #ffffff;
    }
    .item{
        width:25%;
        span{
            color:#ffffff;
        }
    }

</style>
