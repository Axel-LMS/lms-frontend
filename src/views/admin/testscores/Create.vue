<template>
    <div class="w-9/12 rounded mt-4 mx-auto py-4 bg-gray-800 text-gray-200/80">
     <h1 class="text-3xl text-sky-400 text-center mb-3">Test Create Page</h1>
      <form @submit.prevent="CreateFunction" class="w-full justify-evenly flex flex-wrap">
          <div class="w-5/12 mb-3">
            <label class="block text-lg">Test</label>
                <select class="w-full p-2 rounded focus:outline-none bg-gray-800 border-gray-400/30 border-2" v-model="InputData.test_id">
            <option v-for="test in tests" :key="test.id" :value="test.id">
              [Course - {{ test.course_id }}]
              [Cycle - {{ test.cycle_id }}]
            </option>
          </select>
          <p class="text-rose-500 " v-if="failed.test_id">{{ failed.test_id[0] }}</p>
          </div>
          <div class="w-5/12 mb-3">
            <label class="block text-lg">Student</label>
                <select class="w-full p-2 rounded focus:outline-none bg-gray-800 border-gray-400/30 border-2" v-model="InputData.student_id">
            <option v-for="student in students" :key="student.id" :value="student.id">
                {{ student.name }}
            </option>
          </select>
          <p class="text-rose-500 " v-if="failed.student_id">{{ failed.student_id[0] }}</p>
          </div>
          <div class="w-full mx-12 mb-3">
                <label class="block text-lg">Score</label>
                <input type="number" v-model="InputData.score" class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full ">
                <p class="text-rose-500 " v-if="failed.score">{{ failed.score[0] }}</p>
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
                tests : [],
                students : [],
                failed : {},
                InputData : {
                    test_id : '',
                    student_id : '',
                    score : '',
                },
            }
        },
        mounted () {
            let self = this
            ApiService.get('admin/tests')
            .then((response) => {
                self.tests = response.data.data
            })
            ApiService.get('admin/students')
            .then((response) => {
                self.students = response.data.data
            })
        },
        methods : {
            CreateFunction() {
                let self = this
                ApiService.post("admin/testscores",this.InputData)
                .then((response) => {
                    if(response.data.condition){
                        self.$router.push("/admin/testscores");
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