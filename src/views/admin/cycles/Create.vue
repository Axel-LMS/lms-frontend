<template>
    <div class="w-9/12 rounded mt-4 mx-auto py-4 bg-gray-800 text-gray-200/80">
     <h1 class="text-3xl text-sky-400 text-center mb-2">Cycle Create Page</h1>
      <form @submit.prevent="CreateFunction" class="w-full justify-evenly flex flex-wrap">
        <div class="mb-2 w-full mx-12">
                <label class="block text-lg">Description</label>
                <input type="text" v-model="InputData.description" placeholder="Enter your description" class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full">
                <p class="text-rose-500 " v-if="failed.description">{{ failed.description[0] }}</p>
            </div>
            <div class="mb-3 w-5/12">
                <label class="block text-lg">Start Date</label>
                <input type="date" v-model="InputData.startDate" placeholder="Enter your startDate" class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full">
                <p class="text-rose-500 " v-if="failed.startDate">{{ failed.startDate[0] }}</p>
            </div>
            <div class="mb-3 w-5/12">
                <label class="block text-lg">End Date</label>
                <input type="date" v-model="InputData.endDate" placeholder="Enter your endDate" class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full">
                <p class="text-rose-500 " v-if="failed.endDate">{{ failed.endDate[0] }}</p>
            </div>
            <div class="mb-3 w-5/12">
                <label class="block text-lg">Vacation Start Date</label>
                <input type="date" v-model="InputData.vacationStartDate"  class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full">
                <p class="text-rose-500 " v-if="failed.vacationStartDate">{{ failed.vacationStartDate[0] }}</p>
            </div>
            <div class="w-5/12 mb-5">
                <label class="block text-lg">Vacation End Date</label>
                <input type="date" v-model="InputData.vacationEndDate" class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full ">
                <p class="text-rose-500 " v-if="failed.vacationEndDate">{{ failed.vacationEndDate[0] }}</p>
            </div>
                <button class="text-gray-900 hover:bg-gray-300 font-semibold bg-gray-50 rounded-sm w-11/12 py-2 mx-10 mb-2">Create</button>
                <router-link :to="{name : 'Cycles'}" class="text-center font-semibold text-gray-100 bg-sky-400 hover:bg-sky-900 w-11/12 mx-10 rounded-sm py-2 mb-2">Back</router-link>
          </form>
        </div>
</template>


<script>
import ApiService from '../../../ApiService'
    export default {
        data() {
            return {
                failed : {
                    description : '',
                    endDate : '',
                    startDate : '',
                    vacationStartDate : '',
                    vacationEndDate : '',
                },
                InputData : {
                    description : '',
                    endDate : '',
                    startDate : '',
                    vacationStartDate : '',
                    vacationEndDate : '',
                },
            }
        },
        methods : {
            CreateFunction() {
                let self = this
                ApiService.post("admin/cycles",this.InputData)
                .then((response) => {
                    if(response.data.condition){
                        self.$router.push("/admin/cycles");
                    }else {
                        alert("something went wrong!");
                    }
                }).catch((error) => {
                   self.failed= error.response.data.errors
                })
            }
        }
    }
</script>