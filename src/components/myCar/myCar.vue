<template>
    <div class="myCar">
        <div class="table-filter">
            <el-form  class="myself-info" >
                <el-form-item>
                    <el-button type="primary"  @click="isShow=true;">添加车辆</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table class="user-table":data="userDetail" stripe style="width: 100%" border>
            <el-table-column prop="carNumber" label="车牌" ></el-table-column>
            <el-table-column prop="carName" label="型号" ></el-table-column>
            <el-table-column prop="carColor" label="颜色"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                 <el-button  type="primary"size="small" @click="isPutShow=true;carId=scope.row.carId">修改</el-button>
                    <el-button  type="primary"size="small" @click="del(scope.row.carId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-form  class="add-info" v-show="isShow==true" >
            <el-form-item>
                <el-input style="width:200px" v-model="carNumber" placeholder="车牌"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input style="width:200px" v-model="carName" placeholder="型号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input style="width:200px" v-model="carColor" placeholder="颜色"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="isShow=false;">取消</el-button>
                <el-button type="primary" @click="postAdd">确认添加</el-button>
            </el-form-item>
        </el-form>
        <el-form  class="add-info" v-show="isPutShow==true" >
            <el-form-item>
                <el-input style="width:200px" v-model="carNumber" placeholder="车牌"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input style="width:200px" v-model="carName" placeholder="型号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input style="width:200px" v-model="carColor" placeholder="颜色"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="isPutShow=false;">取消</el-button>
                <el-button type="primary" @click="postPut">确认修改</el-button>
            </el-form-item>
        </el-form>
        <footer-bar class="footer"></footer-bar>
    </div>
</template>

<script>
    import footerBar from '../common/footerBar'
    export default {
        name: "myCar",
        components: {
            footerBar
        },
        data(){
            return{
                isShow:"false",
                isPutShow:"false",
                userDetail:[],
                carId:"",
                carNumber:"",
                carName:"",
                carColor:""
            }
        },
        mounted(){
            this.postGet();
        },
        methods:{
            resoleGet:function(){
                let $this=this;
                return new Promise(function (resolve , reject) {
                    var res = $this.$axios.post('queryCar',{
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

                let res=response.data.data;
                //let carObject = res[0]
                let { carNumber, carName, carColor } = res[0]
                //console.log(carObject)
                this.carNumber = carNumber
                this.carName = carName
                this.carColor = carColor
                this.userDetail=res;
            },
            resoleAdd:function(){
                let $this=this;
                return new Promise(function (resolve , reject) {
                    var res = $this.$axios.post('addCar',{
                        "carNumber":$this.carNumber,
                        "userId":localStorage.getItem("userId"),
                        "carName":$this.carName,
                        "carColor":$this.carColor
                    });
                    if (res){
                        resolve(res);
                    }else {
                        reject(new Error())
                    }
                });
            },
            async postAdd(){
                let response=await this.resoleAdd();
                let res=response.data;
                if(res.success){
                    this.postGet();
                    this.isShow=false;
                    this.carNumber="";
                    this.carName="";
                    this.carColor="";
                    this.$notify({
                        title: '',
                        message: h('i', { style: 'color: teal'}, '操作成功'),
                        type: 'success',
                        position: 'right-bottom',
                        offset: 300,
                        duration:1000
                    });
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
            } ,
            resolePut:function(){
                let $this=this;
                return new Promise(function (resolve , reject) {
                    var res = $this.$axios.post('editCar',{
                        "carId":$this.carId,
                        "carNumber":$this.carNumber,
                        "userId":localStorage.getItem("userId"),
                        "carName":$this.carName,
                        "carColor":$this.carColor
                    });
                    if (res){
                        resolve(res);
                    }else {
                        reject(new Error())
                    }
                });
            },
            async postPut(){
                let response=await this.resolePut();
                let res=response.data;
                if(res.success){
                    let  h = this.$createElement;
                    this.postGet();
                    this.isShow=false;
                    this.carNumber="";
                    this.carName="";
                    this.carColor="";
                    this.$notify({
                        title: '',
                        message: h('i', { style: 'color: teal'}, '操作成功'),
                        type: 'success',
                        position: 'right-bottom',
                        offset: 300,
                        duration:1000
                    });
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
            } ,
            resoleDel:function(req){
                let $this=this;
                return new Promise(function (resolve , reject) {
                    var res = $this.$axios.post('deleteCar',{
                        "carId":req
                    });
                    if (res){
                        resolve(res);
                    }else {
                        reject(new Error())
                    }
                });
            },
            async postDel(req){
                let response=await this.resoleDel(req);
                let res=response.data;
                if(res.success){
                    this.postGet();
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
            del:function(res){
                this.postDel(res)

            }
        }
    }
</script>

<style lang="scss" scoped>
    .table-filter{
        text-align: left;
        padding:10px;
    }
    .footer{
        width:100%;
        position:fixed;
        bottom:0px;
    }
    .add-info{
        width:80%;
        margin-top:10px;
        border:1px solid gainsboro;
        margin-left:10%;
        padding-top:10px;
        border-radius: 10px;
    }



</style>