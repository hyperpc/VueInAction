
var mydata = {
    username:'',
    message:'',
    list:[]
}
var app = new Vue({
    el:'#app',
    data: mydata,
    methods:{
        handleSend:function(){
            if(this.username===''){
                window.alert('请输入昵称');
                return;
            }
            if(this.message===''){
                window.alert('请输入留言内容');
                return;
            }
            this.list.push({
                name:this.username,
                message:this.message
            });
            this.message='';
        },
        handleReply:function(index){
            var name = this.list[index].name;
            this.message="回复@"+name+": ";
            this.$refs.message.focus();
        }
    }
});