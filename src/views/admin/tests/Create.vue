<template>
    <div class="w-9/12 rounded mt-4 mx-auto py-4 bg-gray-800 text-gray-200/80">
     <h1 class="text-3xl text-sky-400 text-center mb-3">Test Create Page</h1>
      <form @submit.prevent="CreateFunction" class="w-full justify-evenly flex flex-wrap">
          <div class="w-5/12 mb-3">
            <label class="block text-lg">Coursepercycle</label>
                <select class="w-full p-2 rounded focus:outline-none bg-gray-800 border-gray-400/30 border-2" v-model="InputData.coursepercycle_id">
            <option v-for="coursepercycle in coursepercycles" :key="coursepercycle.id" :value="coursepercycle.id">
              [Course - {{ coursepercycle.course }}]
              [Cycle - {{ coursepercycle.cycle }}]
            </option>
          </select>
          <p class="text-rose-500 " v-if="failed.coursepercycle_id">{{ failed.coursepercycle_id[0] }}</p>
          </div>
          <div class="w-5/12">
                <label class="block text-lg">Test No </label>
                <input type="number" v-model="InputData.testNo" class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full ">
                <p class="text-rose-500 " v-if="failed.testNo">{{ failed.testNo[0] }}</p>
            </div>
            <div class="w-5/12">
                <label class="block text-lg">Test Date </label>
                <input type="date" v-model="InputData.testDate" class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full ">
                <p class="text-rose-500 " v-if="failed.testDate">{{ failed.testDate[0] }}</p>
            </div>
            <div class="w-5/12 mb-2">
                <label class="block text-lg">Test Time </label>
                <input type="time" v-model="InputData.testTime" class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full ">
                <p class="text-rose-500 " v-if="failed.testTime">{{ failed.testTime[0] }}</p>
            </div>
            <div class="w-full mx-12 mb-4">
                <label class="block text-lg">Agenda </label>
                <input type="text" placeholder="Ender Your Agenda" v-model="InputData.agenda" class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full ">
                <p class="text-rose-500 " v-if="failed.agenda">{{ failed.agenda[0] }}</p>
            </div>
                <button class="text-gray-900 hover:bg-gray-300 font-semibold bg-gray-50 rounded-sm w-11/12 py-2 mx-10 mb-2">Create</button>
                <router-link :to="{name : 'Tests'}" class="text-center font-semibold text-gray-100 bg-sky-400 hover:bg-sky-900 w-11/12 mx-10 rounded-sm py-2 mb-2">Back</router-link>
          </form>
        </div>
</template>

<script>
import ApiService from '../../../ApiService'
    export default {
        data() {
            return {
                coursepercycles : [],
                failed : {},
                InputData : {
                    coursepercycle_id : '',
                    testNo : '',
                    testDate : '',
                    testTime : '',
                    agenda : '',
                },
            }
        },
        mounted () {
            let self = this
            ApiService.get('admin/coursepercycles')
            .then((response) => {
                self.coursepercycles = response.data.data
            })
        },
        methods : {
            CreateFunction() {
                let self = this
                ApiService.post("admin/tests",this.InputData)
                .then((response) => {
                    if(response.data.condition){
                        self.$router.push("/admin/tests");
                    }else {
                        alert("something went wrong!");
                    }
                }).catch((error) => {
                   self.failed= error.response.data.errors
                   console.log(error.response.data.errors);
                })
            }
        }
    }
</script>