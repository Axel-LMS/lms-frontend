<template>
  <div class="w-11/12 mx-auto">
    <vue-good-table
      :columns="columns"
      :rows="cycles"
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
          :to="{ name: 'CycleCreate' }"
          class="p-2 px-3 mr-2 text-white border-2 border-gray-400/10 rounded"
        >
          create
        </router-link>
      </template>
      <template #table-row="props">
        <span class="flex justify-evenly" v-if="props.column.field == 'DE'">
            <router-link :to="{name : 'CycleEdit' , params : {id : props.row.id}}"><i class="fas fa-edit fa-lg mt-3 p-1"></i></router-link>
            <button @click="deleteFun(props.row.id)" class="px-2.5 py-1 m-1 border-2 border-gray-400/10 rounded">
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
    export default {
        components: {VueGoodTable},
        data() {
            return {
                cycles : [],
                columns : [
                    {field: 'id',label: 'Id'},
                    { field: 'description', label: 'Dscription'},
                    { field: 'created_at', label: 'Created'},
                    { field: 'updated_at', label: 'Updated'},
                    { field: 'startDate', label: 'StartDate'},
                    { field: 'endDate', label: 'EndDate'},
                    { field: 'vacationEndDate', label: 'VacationEndDate'},
                    { field: 'vacationStartDate', label: 'VacationStartDate'},
                    { field: 'DE', label: '' },
                ],
            }
        },
        mounted() {
            let self = this
            ApiService.get('admin/cycles')
            .then((response) => {
                self.cycles = response.data.data;
            })
        },
        methods: {
            deleteFun(param) {
              ApiService.delete("admin/cycles/"+param)
              .then(() =>{
                    window.location.assign("/admin/cycles");
                })
                .catch((error) => {
                    console.log(error);
                })   
            }
        }
    }
</script>