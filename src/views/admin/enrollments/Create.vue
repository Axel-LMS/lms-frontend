<template>
        <div class="w-9/12 rounded mt-4 mx-auto py-4 bg-gray-800 text-gray-200/80">
     <h1 class="text-3xl text-sky-400 text-center mb-3">Enrollment Create Page</h1>
      <form @submit.prevent="CreateFunction" class="w-full justify-evenly flex flex-wrap">
          <div class="w-5/12">
            <label class="block text-lg">Course</label>
                <select class="w-full p-2 rounded focus:outline-none bg-gray-800 border-gray-400/30 border-2" v-model="InputData.course_id">
            <option v-for="course in courses" :key="course.id" :value="course.id">
              {{ course.description }}
            </option>
          </select>
          <p class="text-rose-500 " v-if="failed.course_id">{{ failed.course_id[0] }}</p>
          </div>
          <div class="w-5/12">
            <label class="block text-lg">Cycle</label>
                <select class="w-full p-2 rounded focus:outline-none bg-gray-800 border-gray-400/30 border-2" v-model="InputData.cycle_id">
            <option v-for="cycle in cycles" :key="cycle.id" :value="cycle.id">
              {{ cycle.description }}
            </option>
          </select>
          <p class="text-rose-500 " v-if="failed.cycle_id">{{ failed.cycle_id[0] }}</p>
          </div>
          <div class="w-5/12">
            <label class="block text-lg">Student</label>
                <select class="w-full p-2 rounded focus:outline-none bg-gray-800 border-gray-400/30 border-2" v-model="InputData.student_id">
            <option v-for="student in students" :key="student.id" :value="student.id">
              {{ student.name }}
            </option>
          </select>
          <p class="text-rose-500 " v-if="failed.student_id">{{ failed.student_id[0] }}</p>
          </div>
            <div class="mb-3 w-5/12">
                <label class="block text-lg">Enrollment Date</label>
                <input type="date" v-model="InputData.enrollmentDate"  class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full">
                <p class="text-rose-500 " v-if="failed.enrollmentDate">{{ failed.enrollmentDate[0] }}</p>
            </div>
            <div class="flex w-1/3 items-center  mb-4">
            <input id="default-radio-1" type="radio" @click="InputData.cancelled=true" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-50 dark:text-gray-300">Cancell Reason</label>
        </div>
        <div class="flex w-1/3 items-center  mb-4">
            <input  id="default-radio-2" type="radio"  @click="InputData.cancelled=false" name="default-radio" class="w-4 h-4 ml-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-50 dark:text-gray-300"> No have Cancell Reason</label>
        </div>
            <div class="w-full mx-12 mb-6" v-if="InputData.cancelled == true">
                <label class="block text-lg">Cancellation Reason</label>
                <input placeholder="Enter your cancellation reason" type="text" v-model="InputData.cancellationReason" class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full ">
            </div>
                <button class="text-gray-900 hover:bg-gray-300 font-semibold bg-gray-50 rounded-sm w-11/12 py-2 mx-10 mb-2">Create</button>
                <router-link :to="{name : 'Enrollments'}" class="text-center font-semibold text-gray-100 bg-sky-400 hover:bg-sky-900 w-11/12 mx-10 rounded-sm py-2 mb-2">Back</router-link>
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
            students : [],
            failed : {},
            InputData : {
                course_id : '',
                cycle_id : '',
                student_id : '',
                enrollmentDate : '',
                cancelled : '',
                cancellationReason : ''
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
        ApiService.get('admin/students')
        .then((response) => {
            self.students = response.data.data
        })
    },
    methods : {
        CreateFunction() {
            let self = this
            ApiService.post("admin/enrollments",this.InputData)
            .then((response) => {
                if(response.data.condition){
                    self.$router.push("/admin/enrollments");
                }else {
                    alert("something went wrong!");
                    console.log(response.data);
                }
            }).catch((error) => {
               self.failed= error.response.data.errors;
            })
        }
    }
}
</script>