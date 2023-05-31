<template>
 <div class="w-full">
    <vue-good-table
      :columns="columns"
      :rows="courses"
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
          :to="{ name: 'CourseCreate' }"
          class="p-2 px-3 mr-2 text-white border-2 border-gray-400/10 rounded"
        >
          create
        </router-link>
      </template>
      <template #table-row="props">
        <router-link :to="{name : 'CourseShow' , params : {id : props.row.id}}">
          <span class="flex justify-evenly" v-if="props.column.field == 'id'">
            <p>{{ props.row.id }}</p>
            </span>
            <span v-if="props.column.field == 'image'">
          <img class="w-[80%]" :src="image_path(props.row.image.file)">
        </span>
        <span class="flex justify-evenly" v-if="props.column.field == 'name'">
            <p>{{ props.row.name }}</p>
            </span>
            <span class="flex justify-evenly" v-if="props.column.field == 'category'">
            <p>{{ props.row.category }}</p>
            </span>
            <span class="flex justify-evenly" v-if="props.column.field == 'description'">
              <p v-html="props.row.description" class="line-clamp-2"></p>
            </span>
            <span class="flex justify-evenly" v-if="props.column.field == 'startDate'">
              <p>{{ props.row.startDate }}</p>
            </span>
            <span class="flex justify-evenly" v-if="props.column.field == 'endDate'">
              <p>{{ props.row.endDate }}</p>
            </span>
        </router-link>
        <span class="flex justify-evenly" v-if="props.column.field == 'DE'">
            <router-link :to="{name : 'CourseEdit' , params : {id : props.row.id}}"><i class="fas fa-edit fa-lg mt-3 p-1"></i></router-link>
            <button @click="deleteFun(props.row.id)" class="px-2 border-2 border-gray-400/10 py-1 m-1 rounded">
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
    export default {
        components: {VueGoodTable},
        mixins : [filepath],
        data() {
            return {
                courses : [],
                columns : [
                    {field: 'id',label: 'Id'},
                    {label: 'Image', field: 'image'},
                    { field: 'name', label: 'Name'},
                    { field: 'category', label: 'Category'},
                    { field: 'description', label: 'Description'},
                    { field: 'startDate', label: 'StartDate'},
                    { field: 'endDate', label: 'EndDate'},
                    {
                     label: '',
                     field: 'DE',
                    },
                ], 
            }
        },
        mounted() {
            let self = this
            ApiService.get('admin/courses')
            .then((response) => {
                self.courses = response.data.data;
            })
        },
        methods: {
            deleteFun(param) {
                ApiService.delete("admin/courses/"+param)
                .then(() =>{
                    window.location.assign("/admin/courses");
                })
                .catch((error) => {
                    console.log(error);
                })            
            }
        }
    }
</script>