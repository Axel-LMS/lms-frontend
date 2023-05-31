<template>
    <div class="w-full mt-2">
    <vue-good-table
      :columns="columns"
      :rows="categories"
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
          :to="{ name: 'CategoryCreate' }"
          class="py-1.5 mt-2 px-3 mr-2 text-white border-2 border-gray-400/10 rounded"
        >
          create
        </router-link>
      </template>
      <template #table-row="props">
        <router-link :to="{name : 'CategoryShow' , params : {id : props.row.id}}">
          <span v-if="props.column.field == 'id'">
          <p>{{ props.row.id }}</p>
        </span>
        <span v-if="props.column.field == 'image'">
          <img class="w-28" :src="image_path(props.row.image.file)">
        </span>
        <span v-if="props.column.field == 'name'">
          <p>{{ props.row.name }}</p>
        </span>
        <span v-if="props.column.field == 'description'">
          <p v-html="props.row.description" class="line-clamp-2"></p>
        </span>
          </router-link>
          <span class="flex justify-evenly " v-if="props.column.field == 'DE'">
            <router-link :to="{name : 'CategoryEdit' , params : {id : props.row.id}}"><i class="fas fa-edit fa-lg mt-3 py-1"></i></router-link>
            <button @click="deleteFun(props.row.id)" class="border-2 border-gray-400/10 px-2 py-1 m-1 rounded">
            <i class="fa-solid fa-trash"></i>
          </button>
            </span>
        </template>
      </vue-good-table>
  </div>
</template>

<script>
import ApiService from '../../../ApiService';
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { VueGoodTable } from 'vue-good-table-next';
import filepath from '../../../mixin/filepatch';
    export default {
      mixins : [filepath],
        components: {
            VueGoodTable
        },

        data() {
            return {
                categories: [],
            columns : [
          {field: 'id',label: 'Id'},
          {field: 'image', label : 'Image'},
          {field: 'name',label: 'Name'},
          {
            label : 'Description',
            field : 'description'
          },
          {
            label : '',
            field : 'DE'
          },
        ],
            }
        },
        methods : {
            deleteFun(param) {
                ApiService.delete("admin/categories/"+param)
                .then(() =>{
                    window.location.assign("/admin/categories");
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        },
        mounted() {
            ApiService.get("admin/categories")
                .then((response) => {
                  if(response.data.condition) {
                    this.categories = response.data.data
                  }else {
                    alert('something went wrong!');
                  }
                })
        },
    }
</script>  