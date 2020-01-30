<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-10">
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col-sm-6">
                         List Order
                    </div>
                    <div class="col-sm-6">
                        <b-button variant="primary" class="float-right" to="create">Add</b-button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <table class="table">
                <thead class="thead-dark text-center">
                    <tr>
                    <th>#</th>
                    <th>Code</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Note</th>
                    <th>Total</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(data, index) in order.items" :key="data.id">
                        <td class="text-center">{{ index + 1 }}</td>
                        <td>{{ data.Code }}</td>
                        <td>{{ data.Date }}</td>
                        <td>{{ data.Customer }}</td>
                        <td>{{ data.Note }}</td>
                        <td>{{ data.Total }}</td>
                        <td class="text-center">
                            <button @click="deleteOrder(data.Code)" class="btn btn-sm btn-danger"><i class="fa fa-trash"></i>Delete</button>
                            <router-link :to="{name: 'update', params: { orderId : data.Code }}">
                                <button class="btn btn-success btn-sm ml-1">Detail</button>
                            </router-link>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import OrderSevice from '../_services/order.service';

export default {
    name: "order",
    data() {
        return {
            boxTwo: '',
        }
    },
    computed: {
        order () {
            return this.$store.state.order.all;
        }
    },
    created () {
        this.getOrder();
    },
    methods: {
        getOrder(){
           this.$store.dispatch('order/getAll');
        },

        deleteOrder(id){
            this.boxTwo = ''
            this.$bvModal.msgBoxConfirm('Please confirm that you want to delete everything.', {
                title: 'Please Confirm',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'danger',
                okTitle: 'YES',
                cancelTitle: 'NO',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
            })
            .then((value) => {
                if(value == true){
                    OrderSevice.delete(id)
                        .then(() => {
                            this.$swal({
                                icon : 'success',
                                title: 'Deleted',
                                text : 'Your file has been deleted.',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            this.getOrder();
                        })
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
};
</script>