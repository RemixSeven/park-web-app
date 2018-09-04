<template>
    <div class="nearBy">
        <div id="nearBy"></div>
        <header>
        <el-card class="box-card park-pot">
            <el-form class="ordered-info" >
                <el-form-item>
                    <el-input v-model="parkName" placeholder="请输入您想预约的停车场"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select style="width: 100%;" v-model="select" placeholder="请选择" v-if="isSelectShow">
                        <el-option
                                v-for="(item,index) in options"
                                :key="index"
                                :label="item.parkName"
                                :value="item.parkId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" style="width: 200px;" @click="postContent()">立即搜索</el-button>
                </el-form-item>
                <el-form-item>
 
                    <div class="parkspace" v-if="isShow">
                            <el-button type="primary" style="width: 200px; margin-bottom: 20px;" v-if="select!=''" @click="detailDialogVisible=true">详细</el-button>
                           <el-aside class="aside-right" style="width: auto; text-align: right;">
                                <div style="display: inline-block">
                                    车位状态:
                                </div>
                                <div style="display: inline-block">
                                    <div class="icon" :class="icon[0]"></div>空车位
                                </div>
                                <div style="display: inline-block">
                                    <div class="icon" :class="icon[1]"></div>已预约
                                </div>
                                <div style="display: inline-block">
                                    <div class="icon" :class="icon[2]"></div>已停车
                                </div>
                            </el-aside>
                        <el-container>
                            <el-main>
                                <el-row :gutter="20">
                                    <el-col :span="6" v-for="(item,index) in parkspace" :index="index">
                                        <div class="grid-content">
                                                <i class="icon":class="icon[item.status-1]" @click="order(item.pId)">
                                                    {{item.pNum}}
                                                </i>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-main>
                        </el-container>
                        <a style="color: #409EFF;" @click="hide">隐藏</a>
                    </div>
                </el-form-item>
            </el-form>
            </el-card>
        </header>
         /*<el-dialog title="提示" :visible.sync="orderDialogVisible">
            <span>确认预定</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmOrder()">确 定</el-button>
            </span>
        </el-dialog>*/
        <el-dialog title="提示" :visible.sync="orderDialogVisible">
            <span>请选择</span>
            <br/>
            <el-button type="primary" @click="confirmPark()" style="">停车</el-button>
                <el-button type="primary" @click="confirmOrder()" style="margin:0;">预约</el-button>
        </el-dialog>
        <el-dialog title="详细" :visible.sync="detailDialogVisible">
            <p>停车场名称：{{selectIndex.parkName}}</p>
            <p>开放时间：{{selectIndex.openTime}}</p>
            <p>歇业时间：{{selectIndex.closeTime}}</p>
            <p>地址：{{selectIndex.parkAddress}}</p>
            <p>车主平均评分：{{selectIndex.avgScore}}分</p>
             <p>剩余位：{{selectIndex.placeSurplus}}</p>
             <p>总车位：{{selectIndex.placeTotal}}</p>
             <p>1小时：{{optionmoney.oneHour}}元</p>
             <p>3小时：{{optionmoney.threeHour}}元</p>
             <p>5小时：{{optionmoney.fiveHour}}元</p>
             <p>封顶：{{optionmoney.capping}}元</p>
           <p>距离：{{selectIndex.distance}}米</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="detailDialogVisible=false">确 定</el-button>
            </span>
        </el-dialog>
    <footer-bar class="footer"></footer-bar>
    </div>
</template>

<script>
    import footerBar from '../common/footerBar'

    export default {
        name: "nearBy",
        components: {
            footerBar
        },
        data() {
            return {
                selectmoney:"",
                optionmoney:{},
                isSearch:false,
                isSelectShow:false,
                isShow:false,
                map:"杭州",
                orderDialogVisible:false,
                detailDialogVisible:false,
                parkspace:[],
                icon:[
                    "icon-seat",
                    "icon-order",
                    "icon-checked",
                    "icon-checked"

                ],
                select:"",
                options:[],
                parkName:"",
                pId:"",
                selectIndex:"",
                lng:'',
                lat:''
            }
        },

        mounted(){
            this.postStatus();
            this.search();
        },
        methods:{
            hide: function () {
                this.isShow = false
                this.isSelectShow = false
                //this.select = ''
            },
            order:function(pId){
                this.pId=pId;
                this.orderDialogVisible = true;
            },
            resoleQuery:function(){
                let $this=this;
                return new Promise(function (resolve , reject) {
                    var res = $this.$axios.post('/queryPark',{
                        "longitude":$this.lng,
                        "latitude":$this.lat
                    });
                    if (res){
                        resolve(res);
                    }else {
                        reject(new Error())
                    }
                });
            },
            async postQuery(){
                let response=await this.resoleQuery();
                this.isSelectShow=true;
                this.options=response.data.data;
              
            },
            resoleContent: function () {
                let $this = this;
                return new Promise(function (resolve, reject) {
                    var res = $this.$axios.post('/queryParkNearby', {
                        "content":$this.parkName
                    });
                    if (res) {
                        resolve(res);
                    } else {
                        reject(new Error())
                    }
                });
            },
            async postContent() {
                let response = await this.resoleContent();
                if(response.data.data.length > 0){
                    this.isSelectShow=true;
                    this.options=response.data.data;
                }
                else{
                    var  h = this.$createElement;
                    this.$notify({
                        title: '',
                        message: h('i', { style: 'color: teal'}, '暂无此停车场'),
                        type: 'warning',
                        position: 'right-bottom',
                        duration:1000
                    });
                    return 0;
                }
            },
            resolePlace:function(){
                let $this=this;
                return new Promise(function (resolve , reject) {
                    var res = $this.$axios.post('/queryPlace',{
                        "parkId":$this.select,
                    });
                    if (res){
                        resolve(res);
                    }else {
                        reject(new Error())
                    }
                });
            },
            async postPlace(){
                let response=await this.resolePlace();

                this.parkspace=response.data.data;
            },
            resoleChargeStrategy:function(){
                let $this=this;
                return new Promise(function (resolve , reject) {
                    var res = $this.$axios.post('/queryChargeStrategy',{
                        "parkId":$this.select,
                    });
                    if (res){
                        resolve(res);
                    }else {
                        reject(new Error())
                    }
                });
            },
            async postChargeStrategy(){
                let response=await this.resoleChargeStrategy();
                this.optionmoney=response.data.data;
                //console.log(this.optionmoney)

            },
            resoleOrder:function(){
                let $this=this;
                return new Promise(function (resolve , reject) {
                    var res = $this.$axios.post('/reservePlace',{
                        "userId":localStorage.getItem("userId"),
                        "pId":$this.pId
                    });
                    if (res){
                        resolve(res);
                    }else {
                        reject(new Error())
                    }
                });
            },
            async postOrder(){
                let response=await this.resoleOrder();
                if(response.data.success){
                    this.$router.push("/order")
                }else {
                    var  h = this.$createElement;
                    this.$notify({
                        title: '',
                        message: h('i', { style: 'color: teal'}, response.data.errorMsg),
                        type: 'warning',
                        position: 'right-bottom',
                        duration:1000
                    });
                }
            },
            confirmOrder:function(){
                this.orderDialogVisible = false;
                this.postOrder();
            },
            resolePark:function(){
                let $this=this;
                return new Promise(function (resolve , reject) {
                    var res = $this.$axios.post('/ordinaryPark',{
                        "userId":localStorage.getItem("userId"),
                        "pId":$this.pId
                    });
                    if (res){
                        resolve(res);
                    }else {
                        reject(new Error())
                    }
                });
            },
            async postPark(){
                let response=await this.resolePark();
                if(response.data.success){
                   this.$router.push("/order")
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
            },
            confirmPark:function(){
                this.orderDialogVisible = false;
                this.postPark();
            },
            resoleStatus:function(){
                let $this=this;
                return new Promise(function (resolve , reject) {
                    var res = $this.$axios.post('/parkStatus',{
                        "userId":localStorage.getItem("userId")
                    });
                    if (res){
                        resolve(res);
                    }else {
                        reject(new Error())
                    }
                });
            },
            async postStatus(){
                let response=await this.resoleStatus();
                if(response.data.success){
                    if(response.data.data.status!=3){
                        this.$router.push("/order");
                    }
                }
            },
            search:function(){
                this.isSearch=true;
                let $this=this;
                // 百度地图API功能
                var map = new BMap.Map("nearBy");

                // 创建地址解析器实例
                var myGeo = new BMap.Geocoder();
                // 将地址解析结果显示在地图上,并调整地图视野
                myGeo.getPoint("杭州电子科技大学", function(point) {
                    point.lng = 120.351044
                    point.lat = 30.320964
                    if (point) {
                        map.centerAndZoom(point, 16);
                        map.addOverlay(new BMap.Marker(point));
                    }else{
                       //alert("您选择地址没有解析到结果!");
                    }
                }, "杭州市");

                    $this.$axios.post('/queryPark',{
                        "longitude": 120.351044,
                        "latitude": 30.320964
                    })
                    .then((res) => {
                        let _options = res.data.data

                        var myIcon = new BMap.Icon("http://oklj5zu7w.bkt.clouddn.com/icon-park.png", new BMap.Size(20,20), {
                            imageSize: new BMap.Size(20,20)
                        });                  
                        var addMarker = (a, b, parkId) => {
                            var point = new BMap.Point(a, b);       
                            var marker = new BMap.Marker(point, { icon: myIcon });        // 创建标注    

                            marker.addEventListener("click", (e) => {    
                                let point = e.point
                                this.options = _options
                                this.select = parkId
                            });

                            map.addOverlay(marker);                     // 将标注添加到地图中
                        }

                        res.data.data.forEach((place) => {
                            let { latitude, longitude } = place
                            addMarker(longitude, latitude, place.parkId)
                        })
                    })
                

                //addMarker(120.341044, 30.320964)
                //addMarker(120.341044, 30.330964)

                

                map.enableScrollWheelZoom(true);
            },

        },
        watch:{
            select(val){
                this.isShow=true;
                this.options.forEach(item=>{
                    if(item.parkId==val){
                      this.selectIndex=item;
                    }
                });
                this.postPlace();
                this.postChargeStrategy();
            }

        }

    }
</script>

<style scoped>
    #app{
    padding:0;
    }
    .nearBy{
        width:100%;
        height:100%;
    }
    #nearBy{
        width:100%;
        height:100%;
        postion:fixed;
    }
    .footer{
        position:fixed;
        bottom:0px;
        width:100%;
    }
    header{
        position:absolute;
        top:0px;
        width: 100%;
        
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
        vertical-align: middle;
    }
    aside .icon {
        width:30px;
        height:30px;
    }
    .icon-seat{
        background-image: url("../../images/park_seat.png");
    }
    .icon-order{
        background-image: url("../../images/park-order.png");
    }
    .icon-checked{
        background-image: url("../../images/parck-checked.png");
    }
    .parkspace{
        background-color: #ffffff;
        border-radius: 10px;
        overflow-y: auto;
    }
    .park-detail{
        background-color: #ffffff;
    }
    


</style>
