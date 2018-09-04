<template>
    <div class="order">
        <div class="ordered">
            <el-form  class="ordered-info" v-show="!isComment">
                <el-form-item v-show="!isStart" label="车位号">
                    <el-input style="width:200px" v-model="pNum" readonly placeholder="请输入车位号"></el-input>
                </el-form-item>
                <el-form-item v-show="isStart" >
                   <div class="clock">
                       {{time}}
                   </div>
                </el-form-item>
                <el-form-item v-show="isStart" label="优惠券：" >
                    <el-select v-model="select" placeholder="请选择"v-show="isStart">
                        <el-option
                                v-show="item.status==0"
                                v-for="(item,index) in options"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item v-show="isStart">
                        <el-button type="primary" @click="pay()">立即支付</el-button>
                </el-form-item>
                <el-form-item v-show="!isStart">
                    <el-button type="primary" @click="postCancel()">取消预定</el-button>
                    <el-button type="primary" @click="postPark()">立即解锁车位</el-button>
                </el-form-item>
            </el-form>
            <el-form  class="order-info"v-show="isComment"  >
                <el-form-item >
                    <el-input style="width:200px" v-model="detail" placeholder="请给个评价吧"></el-input>
                    <el-rate v-model="rate" show-text>
                    </el-rate>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="comment()">评价</el-button>
                </el-form-item>
            </el-form>
        </div>
        <footer-bar class="footer"></footer-bar>
    </div>
</template>

<script>
    import footerBar from '../common/footerBar'
    export default {
        name: "order",
        components: {
            footerBar
        },
        data(){
            return{
                select:'',
                options:[],
                isComment:false,
                time:"00:00",
                isShow:true,
                timer:null,
                isPay:false,
                n:0,
                isStart:false,
                pNum:"",
                pId:"",
                rate:0,
                detail:"",
                enterTime:"",
                parkId:""
            }
        },
        mounted(){
            this.postStatus();
            this.postGet();
        },
        methods:{
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
            thenceThen:function(timespan){
                timespan=this.enterTime;
                var date1=new Date(timespan);
                var totalSecs=(new Date()-date1)/1000;
                var days=Math.floor(totalSecs/3600/24);
                var hours=Math.floor((totalSecs-days*24*3600)/3600);
                var mins=Math.floor((totalSecs-days*24*3600-hours*3600)/60);
                var secs=Math.floor((totalSecs-days*24*3600-hours*3600-mins*60));
                this.time=+days+"天"+hours+"小时"+mins+"分钟"+secs+"秒";
            },
            async postStatus(){
                let response=await this.resoleStatus();
                let $this=this;
                if(response.data.success){
                    if(response.data.data.status==1){
                        this.isStart=true;
                        this.enterTime=response.data.data.enterTime;
                        setInterval(() => {
                            this.thenceThen()
                        },500);
                    }
                    if(response.data.data.status==2){
                        this.postOrder();
                    }
                    if(response.data.data.status==3){
                        this.$router.push("/nearBy");
                    }
                }
            },
            resolePark:function(){
                let $this=this;
                return new Promise(function (resolve , reject) {
                    var res = $this.$axios.post('/parkPlace',{
                        "userId":localStorage.getItem("userId")
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
                    this.open();
                }else{
                    var  h = this.$createElement;
                    this.$notify({
                        title: '',
                        message: h('i', { style: 'color: teal'}, '解锁失败，请检查是否绑定车辆'),
                        type: 'warning',
                        position: 'right-bottom',
                        duration:1000
                    });
                }
            },
            resoleCharge:function(){
                let $this=this;
                return new Promise(function (resolve , reject) {
                    var res = $this.$axios.post('/addCharge',{
                        "userId":localStorage.getItem("userId"),
                        "couponId":$this.select
                    });
                    if (res){
                        resolve(res);
                    }else {
                        reject(new Error())
                    }
                });
            },
            async postCharge(){
                let response=await this.resoleCharge();
                if(response.data.success){
                    var  h = this.$createElement;
                    this.$notify({
                        title: '',
                        message: h('i', { style: 'color: teal'}, '支付成功'),
                        type: 'warning',
                        position: 'right-bottom',
                        duration:1000
                    });
                    this.isComment=true;
                    this.parkId=response.data.data.parkId
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
            resoleOrder:function(){
                let $this=this;
                return new Promise(function (resolve , reject) {
                    var res = $this.$axios.post('/myReservation',{
                        "userId":localStorage.getItem("userId")
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
                    this.pNum=response.data.data.pNum;
                    this.pId=response.data.data.pId;
                }

            },
            resoleCancel:function(){
                let $this=this;
                return new Promise(function (resolve , reject) {
                    var res = $this.$axios.post('/cancelReserve',{
                        "pId":$this.pId
                    });
                    if (res){
                        resolve(res);
                    }else {
                        reject(new Error())
                    }
                });
            },
            async postCancel(){
                let response=await this.resoleCancel();
                if(response.data.success){
                    var  h = this.$createElement;
                    this.$notify({
                        title: '',
                        message: h('i', { style: 'color: teal'}, '预定取消'),
                        type: 'warning',
                        position: 'right-bottom',
                        duration:1000
                    });
                    this.$router.push("/index");
                }

            },
            resoleComment:function(){
                let $this=this;
                return new Promise(function (resolve , reject) {
                    var res = $this.$axios.post('/addCommentary',{
                        "userId":localStorage.getItem("userId"),
                        "parkId":$this.parkId,
                        "cDetail":$this.detail,
                        "score":$this.rate,
                        });
                    if (res){
                        resolve(res);
                    }else {
                        reject(new Error())
                    }
                });
            },
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
                this.options=response.data.data
            },
            async postComment(){
                let response=await this.resoleComment();
                if(response.data.success){
                    var  h = this.$createElement;
                    this.$notify({
                        title: '',
                        message: h('i', { style: 'color: teal'}, response.data.data),
                        type: 'warning',
                        position: 'right-bottom',
                        duration:1000
                    });

                    this.$router.push("/index");
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
            open:function(){
                this.isStart=true;
                let $this=this;
                this.enterTime=new Date();
                setInterval(() => {
                    this.thenceThen()
                },500);
            },

            pay:function(){
                clearInterval(this.timer);
                this.n=0;
                //this.isStart=false;
                this.isPay=false;
                this.postCharge();
            },
            comment:function(){
                this.postComment()
            }



        }
    }
</script>

<style scoped>
    .footer{
        width:100%;
        position: fixed;
        bottom:0px;
    }
    .ordered-info{
       padding:20px;
    }
    .order{
        width:100%;
        height:100%;
        background-image: url("../../images/bg-car.png");
        background-size: cover;
    }
    .clock{
        width:150px;
        height:150px;
        line-height:150px;
        border:1px solid gainsboro;
        border-radius: 50%;
        display:inline-block;
        margin-bottom:10px;
    }

</style>