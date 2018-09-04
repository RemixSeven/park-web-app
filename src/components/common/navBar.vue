<template>
    <nav>
        <el-breadcrumb separator="" class="bread">
            <el-breadcrumb-item class="bread-item">
                <i class="el-icon-location-outline"></i>
                <span>{{city}}</span>
            </el-breadcrumb-item>
            <el-breadcrumb-item class="bread-item">
                <span>慧停车</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div id="allmap"></div>
    </nav>
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
             var map = new BMap.Map("allmap");
             var point = new BMap.Point(188.331398,39.897445);
             map.centerAndZoom(point,12);
             var myCity = new BMap.LocalCity();
             myCity.get(this.getCity);
         },
         methods:{
             getCity:function(result){
                this.city = result.name;
             }

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
    .bread-item{
        width:33%;

        span{
            color: #ffffff;
        }


    }
</style>
