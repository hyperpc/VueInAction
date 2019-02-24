var currentValue = 0;
function isNumber(value){
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value+'');
}

Vue.component('input-number',{
    template:'\
            <div class="input-number">\
                <button \
                    @click="handleDown" \
                    :disable="currentValue<=min">-</button> \
                <input \
                    type="text" \
                    :value="currentValue" \
                    @change="handleChange"> \
                <button \
                    @click="handleUp" \
                    :disable="currentValue>=max">+</button> \
            </div>',
    props:{
        max:{
            type:Number,
            default:Infinity
        },
        min:{
            type:Number,
            default:-Infinity
        },
        value:{
            type:Number,
            default:0
        }
    },
    data:function(){
        //if(val>this.max){
        //    val = this.max;
        //}
        //if(val<this.min){
        //    val = this.min;
        //}

        //console.log("data-curr " + currentValue);
        //console.log("data-val " + this.value);
        
        return {currentValue:this.value}
    },
    watch:{
        currentValue:function(val){
            //console.log("data-curr " + val);
            this.$emit('input', val);
            this.$emit('on-change', val);
        },
        value:function(val){
            //console.log("data-val " + val);
            this.updateValue(val);
        }
    },
    methods:{
        handleDown:function(){
            //console.log("handleDown-curr " + this.currentValue);
            //console.log("handleDown-min " + this.min);
            //console.log("handleDown-val " + this.value);
            if(this.currentValue<=this.min) return;
            this.currentValue=this.currentValue-1;
        },
        handleUp:function(){
            //console.log("handleUp-curr " + this.currentValue);
            //console.log("handleUp-max " + this.max);
            //console.log("handleUp-val " + this.value);
            if(this.currentValue>=this.max) return;
            this.currentValue=this.currentValue+1;
        },
        updateValue:function(val){
            //console.log("updateValue-curr " + this.currentValue);
            //console.log("updateValue-val " + val);
            if(val>this.max){
                val = this.max;
            }
            if(val<this.min){
                val = this.min;
            }
            this.currentValue=val;
        },
        handleChange:function(event){
            var val = event.target.value.trim();
            //console.log("handleChange-curr " + this.currentValue);
            //console.log("handleChange-val " + val);
            var max = this.max;
            var min = this.min;
            if(isNumber(val)){
                val = Number(val);
                if(val>max){
                    val = max;
                }else if(val <min){
                    val = min;
                }
                this.currentValue=val;
            }
            
            event.target.value = this.currentValue;            
        }
    },
    mounted:function(){
        this.updateValue(this.value);
    }
});