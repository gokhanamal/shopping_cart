Vue.component('VueCart',{
    props:{
        cart:{
            type:Array,
            required:true,
            default:()=>{return [] } 
        },
        title:{
            type:String,
            required:true,
        },
        type:{
            type:String,
            required:true
        }
         
     },
     computed:{
        cartTotal(){
             let total=00;
             this.cart.forEach(function(item){
             total+=parseFloat(item.price,10);
                });
             return total.toFixed(2);
            },
            isShopping(){
                return this.type=='shoppingCart'
            },
            isSavedCart(){
                return this.type=='savedLater'
            }
        },
      methods:{
            removeFromCart(index){ 
           return this.cart.splice(index,1);
            },
            changeCard(index){
               const item=  this.removeFromCart(index);
               this.$emit('itemchangedoncart',item[0],this.type)

            }
        },
    template:`
    <div class="cart-wrapper">
          <h2>{{title}}</h2>
           <p v-if="!cart.length">No item in cart</p>
           <div class="cart">
               <div class="item" v-for="(item, index) in cart">
                   <div class="image">
                       <a v-bind:href="item.url" target="_blank">
                       <img v-bind:src="item.image" width="150" height="150" v-bind:alt="item.name">
                       </a>
                   </div>
                   <div class="info">
                       <h4>{{item.name}}</h4>
                       <p class="seller">by {{item.seller}}</p>
                       <p class="instock" v-if="item.isAvaiable">In Stock</p>
                       <p class="nostock" v-if="!item.isAvaiable">No Stock</p>
                       <p class="shipping" v-if="item.isEligible">Eligible for FREE Shipping & Free Returns</p>
                       <p class="notshipping" v-if="!item.isEligible">This Country Is Not Avaiable for Shipping</p>
                       <a href="#" v-on:click="removeFromCart(index)">Delete</a> |
                       <a href="#" v-on:click="changeCard(index)" v-if="isShopping">Save for later</a>
                       <a href="#" v-on:click="changeCard(index)" v-if="isSavedCart ">Move to Cart</a>
                   </div>
                   <p class="price"><b>\${{item.price}}</b></p>
               </div>
               <div class="subtotal" v-if="cart.length<2 && cart.length>0">
                       Subtotal({{cart.length}} item):<span class="price">\${{cartTotal}}</span>
               </div>
               <div class="subtotal" v-if="cart.length>1" >
                       Subtotal({{cart.length}} items):<span class="price">\${{cartTotal}}</span>
               </div>
           </div>  
    </div> 
    `
})







window.addEventListener('load', function(){
   window.Vue =  new Vue({
        el:"#app",
        data:{
         isLoading:true,
         cart:[],
         saved:[]
        },
        methods:{
            handleItemChange(item,cartType){
                if(cartType==='shoppingCart'){
                    this.saved.push(item);

                }else{
                    this.cart.push(item)
                }
            }
        },
        created(){
    fetch("./data.json")
            .then((res) => {return res.json()})
            .then((res)=> {
                this.isLoading = false;
                this.cart=res.cart;
                this.saved=res.saved;
                
               
                
            })
            }
    })
})

