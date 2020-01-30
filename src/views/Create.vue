<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-10">
        <div class="card mb-5">
             <form @submit="checkForm">
            <div class="card-header">
                <div class="row">
                    <div class="col-sm-6">
                         Create Order
                    </div>
                </div>
            </div>
            <div class="card-body">
                    <div class="form-group">
                        <label for="">Code</label>
                        <input v-model="data.Code" type="text" class="form-control" v-bind:class="{ 'is-invalid' : error.error }">
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ error.msg }}</strong>
                        </span>
                    </div>
                    <div class="form-group">
                        <label for="">Customer</label>
                        <v-select v-model="data.Customer" :options="customer.items" :reduce="customer => customer.Code" label="Name"  placeholder="Select Customer"></v-select>
                    </div>
                    <div class="form-group">
                        <label for="">Note</label>
                        <textarea name="" v-model="data.Note" class="form-control" id="" cols="10"></textarea>
                    </div>
               
            </div>
            <div class="card-header">
                <div class="row">
                    <div class="col-sm-6">
                         Details Order
                    </div>
                    <div class="col-sm-6">
                        <b-button @click="addOrder()" variant="success" class="btn-sm float-right">Add order</b-button>
                    </div>
                </div>
            </div>
            <div class="card-body p-0">
                
                    <table class="table">
                        <thead class="text-center">
                            <tr>
                                <th>#</th>
                                <th width="200px">Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr v-for="(det, index) in data.Details" :key="index">
                                <td>{{ index + 1 }}</td>
                                <td>
                                    <b-form-select v-model="data.Details[index].Item" :options="item.items" value-field="Code" text-field="Name" @change="itemChange($event, index)" class="mb-3">
                                        <template v-slot:first>
                                            <b-form-select-option :value="null" disabled>-- Select item --</b-form-select-option>
                                        </template>
                                    </b-form-select>
                                </td>
                                <td><input v-model="det.Quantity" @keyup="qtyChange($event, index)" @change="qtyChange($event, index)" type="number" class="form-control"></td>
                                <td><input v-model="det.Price" type="text" class="form-control" disabled></td>
                                <td><input v-model="det.Total" type="text" class="form-control" disabled></td>
                                <td><button type="button" @click="deleteOrder(index)" class="btn btn-danger btn-sm">Delete</button></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th class="" colspan="4">Sub total</th>
                                <th><input v-model="totalorder" type="text" class="form-control" disabled></th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                    <div class="form-group p-3">
                        <input type="submit" value="Save" class="btn btn-primary">
                    </div>
            </div>
            </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "create",
    data() {
        return {
            error : {
                error : false,
                msg : ''
            },
            data : {
                Code : '',
                Date : new Date(),
                Customer : '',
                Note : '',
                Total : 0,
                Details : []
            },
            detail : {
                Item : null,
                Quantity : 1,
                Price : 0,
                Total : 0
            }
        }
    },
    computed: {
        customer () {
            return this.$store.state.customer.all;
        },
        item () {
            return this.$store.state.item.all;
        },
        totalorder() {
            let total = 0;
            this.data.Details.map(x => {
                total = total + x.Total
            })

            return total;
        }
    },
    created () {
        this.getCustomer();
        this.getItem();
        this.data.Details.push(this.detail);
        this.detail = {
            Item : null,
            Quantity : 1,
            Price : 0,
            Total : 0
        }
    },
    methods: {
        getCustomer(){
           this.$store.dispatch('customer/getAll');
        },

        getItem(){
           this.$store.dispatch('item/getAll');
        },

        create(data){
            this.$store.dispatch('order/createOrder', data);
        },

        itemChange(e, value){
            let item = []
            this.item.items.map(x => {
                item[x.Code] = x.price;
            })

            this.data.Details[value].Price = item[e]
            this.data.Details[value].Total = item[e] * this.data.Details[value].Quantity
        },

        qtyChange(e, value){
            this.data.Details[value].Total = e.target.value * this.data.Details[value].Price;
        },

        addOrder(){
            this.data.Details.push(this.detail)
            this.detail = {
                Item : null,
                Quantity : 1,
                Price : 0,
                Total : 0
            }
        },

        deleteOrder(index){
            this.data.Details.splice(index, 1)
        },

        checkForm:function(e){
            this.data.Total = this.totalorder;
            this.error.error = false;
            if(this.data.Code == ''){
                this.error.error = true;
                this.error.msg ='Code required'
            }else{
                this.create(this.data)
            }
            
            e.preventDefault();
        }
    },
};
</script>