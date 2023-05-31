<template>
    <div class="w-10/12 relative rounded mt-4 mx-auto py-4 bg-gray-800 text-gray-200/80">
                           <!-- image box -->
            <div v-if="showImageBox" data-aos="fade-down" class="absolute z-50 w-full bg-gray-600 pb-8 border-2 border-gray-400/30 rounded top-0">
                <span @click="showImageBox = false"  class="block p-2 z-0 text-right cursor-pointer"><i class="fa-solid fa-x"></i></span>
                <img @click="selectImage(image.id , image.file)" v-for="image in images" class="inline h-28 p-1.5 cursor-pointer" :key="image.id"  :src="image_path(image.file)">
            </div>
    <h1 class="text-3xl text-sky-400 text-center mb-3">Course Create Page</h1>     
    <form @submit.prevent="CreateFunction()" class="w-full justify-evenly flex flex-wrap">
        <div class="mb-3 w-[30%]">
                <label class="block text-lg">Name</label>
                <input type="text" placeholder="Enter your name" v-model="InputData.name"  class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full">
                <p class="text-rose-500 " v-if="failed.name">{{ failed.name[0] }}</p>
            </div>
        <div class="mb-3 w-[30%]">
                <label class="block text-lg">Start Date</label>
                <input type="date" v-model="InputData.startDate"  class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full">
                <p class="text-rose-500 " v-if="failed.startDate">{{ failed.startDate[0] }}</p>
            </div>
            <div class="w-[30%]">
                <label class="block text-lg">End Date</label>
                <input type="date" v-model="InputData.endDate" class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full ">
                <p class="text-rose-500 " v-if="failed.endDate">{{ failed.endDate[0] }}</p>
            </div>
          <div class="mb-8 w-[60%]">
            <label class="block text-lg mb-2">Image</label>
            <span @click="showImageBox = true" class="py-2 px-[38%] bg-[#1F2937] border-2 border-gray-400/30 rounded cursor-pointer">Choose an image</span>
            <img data-aos="fade-down" v-if="previewImage" :src="previewImage" class="ml-6 rounded h-28 mt-6" alt="">
         </div>
         <div class="w-[30%]">
            <label class="block text-lg">Category</label>
            <select class="w-full p-2 rounded focus:outline-none bg-gray-800 border-gray-400/30 border-2" v-model="InputData.category_id">
                <option value="" disabled selected>Choose The category</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
          <p class="text-rose-500 " v-if="failed.category_id">{{ failed.category_id[0] }}</p>
          </div>
          <div class="w-[90%] quill-container">
              <label class="block text-lg">Description</label>
              <quill-editor theme="snow" v-model:content="InputData.description" content-type="html"></quill-editor>
              <p class="text-rose-500 " v-if="failed.description">{{ failed.description[0] }}</p>
         </div>
            <button class="text-gray-900 mt-28 hover:bg-gray-300 font-semibold bg-gray-50 rounded-sm w-11/12 py-2 mx-10 mb-2">Create</button>
            <router-link :to="{name : 'Courses'}" class="text-center font-semibold text-gray-100 bg-sky-400 hover:bg-sky-900 w-11/12 mx-10 rounded-sm py-2 mb-2">Back</router-link>
          </form>
    </div>
</template>

<script>
import ApiService from '../../../ApiService'
import { QuillEditor } from '@vueup/vue-quill'
import filepath from '../../../mixin/filepatch'
import AOS from 'aos'
    export default {
        components: {QuillEditor},
        mixins : [filepath],
        data() {
            return {
                showImageBox : false,
               previewImage : '',
               images : [],
                categories : [],
                failed : {},
                InputData :{
                    name : '',
                    category_id : '',
                    description : '',
                    endDate : '',
                    startDate : '',
                    image_id : ''
                },
            }
        },
        mounted () {
            AOS.init({
                duration: 700,
            })
            ApiService.get('admin/files')
            .then((response) => {
                if(response.data.condition) {
                    this.images = response.data.data
                }else {
                    alert('something went wrong!');
                }
            })
            ApiService.get('admin/categories')
            .then((response) => {
                this.categories = response.data.data
            })
        },
        methods : {
            selectImage(id , url){
                this.InputData.image_id = id;
               if (this.InputData.image_id) {
                    this.showImageBox = false;
                    this.previewImage = this.image_path(url);
               }
          },
            CreateFunction() {
                ApiService.post("admin/courses",this.InputData)
                .then((response) => {
                    if(response.data.condition){
                        this.$router.push("/admin/courses");
                    }else {
                        console.log(response.data);
                        alert("something went wrong!");
                    }
                }).catch((error) => {
                   this.failed= error.response.data.errors
                })
            },
        }
        }
</script>

<style>
    #quill {
        border: none;
    }
    </style>