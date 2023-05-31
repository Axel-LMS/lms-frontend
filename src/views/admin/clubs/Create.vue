<template>
    <div class="w-3/4 rounded mt-4 mx-auto py-4 bg-gray-800 text-gray-200/80">
   <h1 class="text-3xl text-sky-400 text-center mb-2">TeacherPerCourse Create Page</h1>
    <form @submit.prevent="CreateFunction" class="w-full justify-evenly flex flex-wrap">
        <div class="w-5/12">
            <label class="block text-lg">Teacher</label>
                <select class="w-full p-2 rounded focus:outline-none bg-gray-800 border-gray-400/30 border-2" v-model="InputData.teacher_id">
            <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
              {{ teacher.name }}
            </option>
          </select>
          <p class="text-rose-500 " v-if="failed.teacher_id">{{ failed.teacher_id[0] }}</p>
          </div>
          <div class="w-5/12 mb-4">
            <label class="block text-lg">Coursepercycle</label>
                <select class="w-full p-2 rounded focus:outline-none bg-gray-800 border-gray-400/30 border-2" v-model="InputData.coursepercycle_id">
            <option v-for="coursepercycle in coursepercycles" :key="coursepercycle.id" :value="coursepercycle.id">
              [Course - {{ coursepercycle.course }}]
              [Cycle - {{ coursepercycle.cycle }}]
            </option>
          </select>
          <p class="text-rose-500 " v-if="failed.coursepercycle_id">{{ failed.coursepercycle_id[0] }}</p>
          </div>
          <div class="mb-3 w-5/12">
                <label class="block text-lg">Class Title</label>
                <input type="text" v-model="InputData.classTitle" placeholder="Enter your classTitle" class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full">
                <p class="text-rose-500 " v-if="failed.classTitle">{{ failed.classTitle[0] }}</p>
            </div>
            <div class="mb-3 w-5/12">
              <label class="block text-lg">Class No</label>
              <input type="number" v-model="InputData.classNo" placeholder="Enter your classNo" class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full">
              <p class="text-rose-500 " v-if="failed.classNo">{{ failed.classNo[0] }}</p>
          </div>
            <div class="mb-3 w-5/12">
                <label class="block text-lg">Start Time</label>
                <input type="time" v-model="InputData.startTime" placeholder="Enter your startTime" class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full">
                <p class="text-rose-500 " v-if="failed.startTime">{{ failed.startTime[0] }}</p>
            </div>
            <div class="mb-3 w-5/12">
                <label class="block text-lg">End Time</label>
                <input type="time" v-model="InputData.endTime" placeholder="Enter your endTime" class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full">
                <p class="text-rose-500 " v-if="failed.endTime">{{ failed.endTime[0] }}</p>
            </div>
            <div class="mb-3 w-full mx-12">
                <label class="block text-lg">Class Date</label>
                <input  type="date" v-model="InputData.classDate" placeholder="Enter your classDate" class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full">
                <p class="text-rose-500 " v-if="failed.classDate">{{ failed.classDate[0] }}</p>
            </div>
              <button class="text-gray-900 hover:bg-gray-300 font-semibold bg-gray-50 rounded-sm w-11/12 py-2 mb-2">Create</button>
              <router-link :to="{name : 'Clubs'}" class="text-center font-semibold text-gray-100 bg-sky-400 hover:bg-sky-900 w-11/12 rounded-sm py-2 mb-2">Back</router-link>
        </form>
      </div>
</template>

<script>
import ApiService from '../../../ApiService'

export default {
  data() {
      return {
          teachers :[],
          coursepercycles : [],
          InputData : {
            teacher_id : '',
            coursepercycle_id : '',
            classDate : '',
            classTitle : '',
            startTime : '',
            endTime : '',
            classNo : ''
          },
          failed : {},
      }
  },
  mounted(){
    ApiService.get("/admin/coursepercycles")
    .then((response) => {
        this.coursepercycles = response.data.data
    }).catch((error) => console.log(error));
    ApiService.get("/admin/teachers")
    .then((response) => {
        this.teachers = response.data.data
    }).catch((error) => console.log(error));
  },
  methods : {
      CreateFunction() {
          ApiService.post("admin/clubs", this.InputData)
          .then((response) => {
              if(response.data.condition) 
              {
                  this.$router.push("/admin/clubs");
              }else {
                  console.log(response.data);
                  alert("Something went wrong!");
              }
          }).catch((error) => {
              this.failed = error.response.data.errors
          })
      },
  }
}
</script>