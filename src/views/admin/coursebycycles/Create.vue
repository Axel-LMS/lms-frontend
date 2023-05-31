<template>
        <div class="w-1/2 rounded mt-4 mx-auto py-4 bg-gray-800 text-gray-200/80">
     <h1 class="text-3xl text-sky-400 text-center mb-3">CourseByCycle Create Page</h1>
      <form @submit.prevent="CreateFunction" class="w-full justify-evenly flex flex-wrap">
          <div class="w-5/6 mb-3">
            <label class="block text-lg">Course</label>
                <select class="w-full p-2 rounded focus:outline-none bg-gray-800 border-gray-400/30 border-2" v-model="InputData.course_id">
            <option v-for="course in courses" :key="course.id" :value="course.id">
              {{ course.description }}
            </option>
          </select>
          <p class="text-rose-500 " v-if="failed.course_id">{{ failed.course_id[0] }}</p>
          </div>
          <div class="w-5/6 mb-4">
            <label class="block text-lg">Cycle</label>
                <select class="w-full p-2 rounded focus:outline-none bg-gray-800 border-gray-400/30 border-2" v-model="InputData.cycle_id">
            <option v-for="cycle in cycles" :key="cycle.id" :value="cycle.id">
              {{ cycle.description }}
            </option>
          </select>
          <p class="text-rose-500 " v-if="failed.cycle_id">{{ failed.cycle_id[0] }}</p>
          </div>
                <button class="text-gray-900 hover:bg-gray-300 font-semibold bg-gray-50 rounded-sm w-11/12 py-2 mx-10 mb-2">Create</button>
                <router-link :to="{name : 'Coursebycycles'}" class="text-center font-semibold text-gray-100 bg-sky-400 hover:bg-sky-900 w-11/12 mx-10 rounded-sm py-2 mb-2">Back</router-link>
          </form>
        </div>
</template>

<script>
import ApiService from '../../../ApiService'
export default {
    data() {
        return {
            courses : [],
            cycles : [],
            failed : {
                course_id : '',
                cycle_id : '',
            },
            InputData : {
                course_id : '',
                cycle_id : '',
            },
        }
    },
    mounted () {
        let self = this
        ApiService.get('admin/courses')
        .then((response) => {
            self.courses = response.data.data
        })
        ApiService.get('admin/cycles')
        .then((response) => {
            self.cycles = response.data.data
        })
    },
    methods : {
        CreateFunction() {
            let self = this
            ApiService.post("admin/coursebycycles",this.InputData)
            .then((response) => {
                if(response.data.condition){
                    self.$router.push("/admin/coursebycycles");
                }else {
                    alert("something went wrong!");
                }
            }).catch((error) => {
               self.failed= error.response.data.errors;
            })
        }
    }
}
</script>