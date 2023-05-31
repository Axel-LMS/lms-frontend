<template>
    <div class="w-11/12 mx-auto">
    <vue-good-table
      :columns="columns"
      :rows="testscores"
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
          :to="{ name: 'TestscoreCreate' }"
          class="p-2 px-3 mr-2 text-white border-2 border-gray-400/10 rounded"
        >
          create
        </router-link>
      </template>
      <template #table-row="props">
        <span class="flex justify-evenly " v-if="props.column.field == 'DE'">
            <router-link :to="{name : 'TestscoreEdit' , params : {id : props.row.id}}"><i class="fas fa-edit fa-lg mt-3 py-1"></i></router-link>
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
    export default {
        components: {
            VueGoodTable
        },

        data() {
            return {
                testscores: [],
            columns : [
          {field: 'id',label: 'Id'},
          {
            label : 'Course',
            field : 'course_id'
          },
          {
            label : 'Cycle',
            field : 'cycle_id'
          },
          {
            label : 'TestNo',
            field : 'testNo'
          },
          {
            label : 'Student',
            field : 'student'
          },
          {
            label : 'Score',
            field : 'score'
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
                ApiService.delete("admin/testscores/"+param)
                .then(() =>{
                    window.location.assign("/admin/testscores");
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        },
        mounted() {
            let self = this
            ApiService.get("admin/testscores")
                .then((response) => {
                    self.testscores = response.data.data
                })
        },
    }
</script>