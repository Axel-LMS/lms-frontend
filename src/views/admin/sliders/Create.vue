<template>
        <div class="w-1/2 rounded mt-4 mx-auto py-4 bg-gray-800 text-gray-200/80">
     <h1 class="text-3xl text-sky-400 text-center mb-3">Course Create Page</h1>
      <form @submit.prevent="CreateFunction" class="w-full justify-evenly flex flex-wrap">
            <div class="mb-3 w-5/6">
                <label class="block text-lg">image_id</label>
                <input type="file" @change="fileUpload" placeholder="Enter your image_id" class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full">
                <p class="text-rose-500 " v-if="failed.image_id">{{ failed.image_id[0] }}</p>
            </div>
            <div class="mb-3 w-5/6">
                <label class="block text-lg">order_by</label>
                <input type="text" v-model="InputData.order_by" placeholder="Enter your order_by" class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full">
                <p class="text-rose-500 " v-if="failed.order_by">{{ failed.order_by[0] }}</p>
            </div>
            <div class="flex w-full justify-center items-center mb-3">
            <input id="default-radio-1" type="radio" @click="InputData.status=true" name="default-radio" class="scale-150 text-sky-500 bg-gray-50">
            <label for="default-radio-1" class="ml-2 mr-5 text-gray-50">True</label>
            <input  id="default-radio-2" type="radio"  @click="InputData.status=false" name="default-radio" class="scale-150 ml-3 text-sky-500 bg-gray-50">
            <label for="default-radio-2" class="ml-2 text-gray-50 dark:text-gray-300"> False</label>
        </div>
        <p class="text-rose-500" v-if="failed.status">{{ failed.status[0] }}</p>
                <button class="text-gray-900 hover:bg-gray-300 font-semibold bg-gray-50 rounded-sm w-11/12 py-2 mx-10 mb-2">Create</button>
                <router-link :to="{name : 'Sliders'}" class="text-center font-semibold text-gray-100 bg-sky-400 hover:bg-sky-900 w-11/12 mx-10 rounded-sm py-2 mb-2">Back</router-link>
          </form>
        </div>
</template>

<script>
import ApiService from '../../../ApiService'
    export default {
        data() {
            return {
                InputData : {
                    image_id :'',
                    order_by :'',
                    status : '',
                },
                failed : {}
            }
        },
        methods : {
            fileUpload(e){
                let file = e.target.files[0];
                let form = new FormData();
                form.set('file',file);
                ApiService.post('admin/files',form)
                .then((response) => {
                this.InputData.image_id = response.data.data.id;
                }).catch((error) => {
                    alert("something went wrong");
                    console.log(error);
                })
            },
            CreateFunction() {
                ApiService.post("admin/sliders",this.InputData)
                .then(() => {
                    this.$router.push("/admin/sliders");
                }).catch((error) => {
                    this.failed = error.response.data.errors;
                })
            }
        }
    }
</script>
<style>
    input::file-selector-button {
        background: #1F2937;
        color: aliceblue;
    }
</style>