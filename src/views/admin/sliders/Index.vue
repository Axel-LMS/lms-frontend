<template>
    <div class="w-11/12 mx-auto">
    <vue-good-table
      :columns="columns"
      :rows="sliders"
      theme="nocturnal"
      styleClass="vgt-table"
      :search-options="{
        enabled: true,
      }"
      :pagination-options="{
        enabled: true,
        mode: 'records',
        perPage: 4,
        perPageDropdown: [3, 4, 5],
      }">
      <template #table-actions>
        <router-link
          :to="{ name: 'SliderCreate' }"
          class="p-2 px-3 mr-2 text-white border-2 border-gray-400/10 rounded"
        >
          create
        </router-link>
      </template>
      <template #table-row="props">

        <span v-if="props.column.field == 'image'">
          <img v-if="props.row.image" class="h-16 rounded" :src="image_path(props.row.image.file)" alt="">
        </span>
        <span class="flex justify-evenly" v-if="props.column.field == 'DE'">
            <router-link :to="{name : 'SliderEdit' , params : {id : props.row.id}}"><i class="fas fa-edit fa-lg mt-3 p-1"></i></router-link>
            <button @click="deleteFun(props.row.id)" class="px-2 py-1 m-1 border-2 border-gray-400/10 rounded">
            <i class="fa-solid fa-trash"></i>
          </button>
            </span>
        </template>
      </vue-good-table>
  </div>
</template>

<script>
import ApiService from '../../../ApiService'
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { VueGoodTable } from 'vue-good-table-next';
import filepath from '../../../mixin/filepatch';

    export default{
        components : {VueGoodTable},
        mixins : [filepath],
        data() {
            return {
                sliders : [],
                columns : [
                    {field : 'id', label: 'Id'},
                    {field: 'image', label: 'image'},
                    {field: 'order_by', label: 'Order_by'},
                    {field: 'status', label: 'Status'},
                    {field: 'DE',label: ''},
                ], 
            }
        },
        mounted() {
            ApiService.get("admin/sliders")
            .then((response) => {
                this.sliders = response.data.data
            })
        },
        methods: {
            deleteFun(param) {
              ApiService.delete("admin/sliders/"+param)
              .then(() =>{
                    window.location.assign("/admin/sliders");
                })
                .catch((error) => {
                    console.log(error);
                })   
            }
        }
    }
</script>