<template>
      <div class="w-9/12 rounded mt-4 mx-auto py-4 bg-gray-800 text-gray-200/80">
     <h1 class="text-3xl text-sky-400 text-center mb-2">Student Create Page</h1>
      <form @submit.prevent="CreateFunction" class="w-full justify-evenly flex flex-wrap">
        <div class="mb-2 w-5/12">
                <label class="block text-lg">Name</label>
                <input type="text" v-model="InputData.name" placeholder="Enter your name" class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full">
                <p class="text-rose-500 " v-if="failed.name">{{ failed.name[0] }}</p>
            </div>
            <div class="mb-3 w-5/12">
                <label class="block text-lg">Email</label>
                <input type="text" v-model="InputData.email" placeholder="Enter your email" class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full">
                <p class="text-rose-500 " v-if="failed.email">{{ failed.email[0] }}</p>
            </div>
            <div class="mb-3 w-5/12">
                <label class="block text-lg">Phone Number</label>
                <input type="number" v-model="InputData.phone" placeholder="Enter your phone" class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full">
                <p class="text-rose-500 " v-if="failed.phone">{{ failed.phone[0] }}</p>
            </div>
            <div class="w-5/12 mb-5">
                <label class="block text-lg">Birthday</label>
                <input type="date" v-model="InputData.birthday" class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full ">
                <p class="text-rose-500 " v-if="failed.birthday">{{ failed.birthday[0] }}</p>
            </div>
                <button class="text-gray-900 hover:bg-gray-300 font-semibold bg-gray-50 rounded-sm w-11/12 py-2 mx-10 mb-2">Create</button>
                <router-link :to="{name : 'Students'}" class="text-center font-semibold text-gray-100 bg-sky-400 hover:bg-sky-900 w-11/12 mx-10 rounded-sm py-2 mb-2">Back</router-link>
          </form>
        </div>
</template>

<script>
import ApiService from '../../../ApiService'

export default {
    data() {
        return {
            InputData : {
                name : '',
                email : '',
                phone : '',
                birthday : '',
            },
            failed : {},
        }
    },
    methods : {
        CreateFunction() {
            ApiService.post("admin/students", this.InputData)
            .then((response) => {
                if(response.data.condition) 
                {
                    this.$router.push("/admin/students");
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