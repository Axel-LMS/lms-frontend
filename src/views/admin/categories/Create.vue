<template>
        <div class="w-1/2 relative rounded mx-auto py-4 bg-gray-800 text-gray-200/80">
                       <!-- image box -->
                <div v-if="showImageBox" data-aos="fade-down" class="absolute w-full bg-gray-600 pb-8 border-2 border-gray-400/30 rounded top-0">
                <span @click="showImageBox = false"  class="block p-2 z-0 text-right cursor-pointer"><i class="fa-solid fa-x"></i></span>
                <img @click="selectImage(image.id , image.file)" v-for="image in images" class="inline h-28 p-1.5 cursor-pointer" :key="image.id"  :src="image_path(image.file)">
            </div>
   <h1 class="text-3xl text-sky-400 text-center mb-2">Category Create Page</h1>
    <form @submit.prevent="createfunction"  class="w-full justify-evenly flex flex-wrap">
        <div class="w-5/6">
            <label class="block text-lg">Name</label>
              <input type="text" v-model="InputData.name" placeholder="Enter your Name" class="p-2 focus:outline-none border-gray-400/30 border-2 bg-gray-800 rounded w-full">
              <p class="text-rose-500 " v-if="failed.name">{{ failed.name[0] }}</p>
          </div>
         <div class="mb-8">
            <label class="block text-lg mb-2">Image</label>
            <span @click="showImageBox = true" class="py-2 px-44 bg-[#1F2937] border-2 border-gray-400/30 rounded cursor-pointer">Choose an image</span>
            <img data-aos="fade-down" v-if="previewImage" :src="previewImage" class="ml-6 rounded h-28 mt-6" alt="">
         </div>
         <div class="w-5/6 mb-20 quill-container">
              <label class="block text-lg">Description</label>
              <quill-editor :show-image-box="showImageBox" :id="showImageBox ? 'quill' : null" theme="snow" v-model:content="InputData.description" content-type="html"></quill-editor>
              <p class="text-rose-500 " v-if="failed.description">{{ failed.description[0] }}</p>
         </div>
       <button class="text-gray-900 hover:bg-gray-300 font-semibold bg-gray-50 rounded-sm w-11/12 py-2 mx-10 mb-2">Create</button>
              <router-link :to="{name : 'Categories'}" class="text-center font-bold text-gray-800 bg-sky-400 hover:bg-sky-900 w-11/12 mx-10 rounded-sm py-2 mb-2">Back</router-link>
    </form>
  </div>
</template>

<script>
import ApiService from '../../../ApiService'
import { QuillEditor } from '@vueup/vue-quill'
import filepath from '../../../mixin/filepatch'
import AOS from 'aos'
    export default {
        mixins:[filepath],
        data() {
            return {
                images : [],
                showImageBox : false,
               previewImage : '',
                InputData : {
                    name : '',
                    description : '',
                    image_id : '',
                },
                failed : {}
            }
        },
        components:{
        QuillEditor
     },
        mounted() {
            AOS.init({
                duration: 700,
            })
            ApiService.get("admin/files").then((response) => {
                this.images = response.data.data;
            }).catch(() => {
                alert("Something went worng images");
            })
        },
        methods: {
            selectImage(id , url){
                this.InputData.image_id = id;
               if (this.InputData.image_id) {
                    this.showImageBox = false;
                    this.previewImage = this.image_path(url);
               }
          },
            createfunction() {
                ApiService.post("admin/categories", this.InputData)
                .then((response => {
                    if(response.data.condition) {
                        this.$router.push("/admin/categories");
                    }else {
                        console.log(response.data);
                    }
                })).catch((error) => {
                    this.failed = error.response.data.errors;
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