
Vue.component('tabs',{
    template:'\
            <div class="tabs">\
                <div class="tabs-bar">\
                    <!--tab title, v-for-->\
                    <div \
                        :class="tabCls(item)" \
                        v-for="(item, index) in navList" \
                        @click="handleChange(index)"> \
                        {{item.label}} \
                    </div> \
                </div>\
                <div class="tabs-content">\
                    <!--tab content, slot is pane-->\
                    <slot></slot>\
                </div>\
            </div>',
    props:{
        //value is for v-model
        value:{
            type:[String, Number]
        }
    },
    data:function(){
        return {
            //value cannot be changed, so get a copy 
            currentVal:this.value,
            navList:[]
        }
    },
    methods:{
        tabCls:function(item){
            return [
                'tabs-tab',
                {
                    'tabs-tab-active':item.name===this.currentVal
                }
            ]
        },
        getTabs(){
            return this.$children.filter(function(item){
                return item.$options.name="pane";
            });
        },
        updateNav(){
            this.navList=[];
            //'this' reference, in the callback of function, 'this' not refer to Vue instance
            var _this = this;
            this.getTabs().forEach(function(pane, index){
                _this.navList.push({
                    label:pane.label,
                    name:pane.name||index
                });

                if(!pane.name){
                    pane.name=index;
                }
                if(index===0){
                    if(!_this.currentVal){
                        _this.currentVal=pane.name||index;
                    }
                }
            });

            this.updateStatus();
        },
        updateStatus(){
            var tabs = this.getTabs();
            var _this = this;
            tabs.forEach(function(tab){
                return tab.show=(tab.name===_this.currentVal);
            })
        },
        handleChange:function(index){
            var nav = this.navList[index];
            var name = nav.name;
            this.currentVal = name;
            this.$emit('input', name);
            this.$emit('on-click', name);
        }
    },
    watch:{
        value:function(val){
            this.currentVal=val;
        },
        currentVal:function(){
            this.updateStatus();
        }
    }
});