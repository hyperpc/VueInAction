
var mydata = {
    isShow:false
}
var app = new Vue({
    el:'#app',
    data: mydata,
    methods:{
        handleClose:function(){
            this.isShow=false;
        }
    }
});