<template>
    <div class="w-1/2 rounded mt-4 mx-auto py-4 bg-gray-800 text-gray-200/80">
 <h1 class="text-3xl text-sky-400 text-center mb-2">Teacher Edit Page</h1>
  <form @submit.prevent="EditFunction" class="w-full justify-evenly flex flex-wrap">
    <div class="mb-2 w-5/6">
            <label class="block text-lg">Name</label>
            <input type="text" v-model="InputData.name" placeholder="Enter your name" class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full">
            <p class="text-rose-500 " v-if="failed.name">{{ failed.name[0] }}</p>
        </div>
        <div class="mb-3 w-5/6">
            <label class="block text-lg">Email</label>
            <input type="text" v-model="InputData.email" placeholder="Enter your email" class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full">
            <p class="text-rose-500 " v-if="failed.email">{{ failed.email[0] }}</p>
        </div>
        <div class="mb-3 w-5/6">
            <label class="block text-lg">Phone Number</label>
            <input type="number" v-model="InputData.phone" placeholder="Enter your phone" class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full">
            <p class="text-rose-500 " v-if="failed.phone">{{ failed.phone[0] }}</p>
        </div>
            <button class="text-gray-900 hover:bg-gray-300 font-semibold bg-gray-50 rounded-sm w-11/12 py-2 mx-10 mb-2">Edit</button>
            <router-link :to="{name : 'Teachers'}" class="text-center font-semibold text-gray-100 bg-sky-400 hover:bg-sky-900 w-11/12 mx-10 rounded-sm py-2 mb-2">Back</router-link>
      </form>
    </div>
</template>

<script>
import ApiService from '../../../ApiService'
export default {
data() {
    return {
        id : this.$route.params.id,
        InputData : {
            name : '',
            email : '',
            phone : '',
            birthday : '',
        },
        failed : {},
    }
},
mounted() {
    ApiService.get("admin/teachers/"+this.id)
    .then((response) => {
        this.InputData = response.data.data
    })
},
methods : {
    EditFunction() {
        ApiService.patch("admin/teachers/"+this.id, this.InputData)
        .then((response) => {
            if(response.data.condition) 
            {
                this.$router.push("/admin/teachers");
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