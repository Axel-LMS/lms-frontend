<template>
    <div class="w-9/12 rounded mt-4 mx-auto py-4 bg-gray-800 text-gray-200/80">
     <h1 class="text-3xl text-sky-400 text-center mb-3">Attendance Create Page</h1>
      <form @submit.prevent="CreateFunction" class="w-full justify-evenly flex flex-wrap">
          <div class="w-5/12 mb-3">
            <label class="block text-lg">Club</label>
                <select class="w-full p-2 rounded focus:outline-none bg-gray-800 border-gray-400/30 border-2" v-model="InputData.club_id">
            <option v-for="club in clubs" :key="club.id" :value="club.id">
              [Course - {{ club.course_id }}]
              [Cycle - {{ club.cycle_id }}]
              [ClassNo - {{ club.classNo }}]
            </option>
          </select>
          <p class="text-rose-500 " v-if="failed.club_id">{{ failed.club_id[0] }}</p>
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
            <div class="w-5/12">
                <label class="block text-lg">Time Arrive </label>
                <input type="time" v-model="InputData.timeArrive" class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full ">
                <p class="text-rose-500 " v-if="failed.timeArrive">{{ failed.timeArrive[0] }}</p>
            </div>
            <div class="w-5/12 mb-4">
                <label class="block text-lg">Time Leave </label>
                <input type="time" v-model="InputData.timeLeave" class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full ">
                <p class="text-rose-500 " v-if="failed.timeLeave">{{ failed.timeLeave[0] }}</p>
            </div>
                <button class="text-gray-900 hover:bg-gray-300 font-semibold bg-gray-50 rounded-sm w-11/12 py-2 mx-10 mb-2">Create</button>
                <router-link :to="{name : 'Attendances'}" class="text-center font-semibold text-gray-100 bg-sky-400 hover:bg-sky-900 w-11/12 mx-10 rounded-sm py-2 mb-2">Back</router-link>
          </form>
        </div>
</template>

<script>
import ApiService from '../../../ApiService'
    export default {
        data() {
            return {
                clubs : [],
                students : [],
                failed : {},
                InputData : {
                    club_id : '',
                    student_id : '',
                    classNo : '',
                    timeArrive : '',
                    timeLeave : '',
                },
            }
        },
        mounted () {
            let self = this
            ApiService.get('admin/clubs')
            .then((response) => {
                self.clubs = response.data.data
            })
            ApiService.get('admin/students')
            .then((response) => {
                self.students = response.data.data
            })
        },
        methods : {
            CreateFunction() {
                let self = this
                ApiService.post("admin/attendances",this.InputData)
                .then((response) => {
                    if(response.data.condition){
                        self.$router.push("/admin/attendances");
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