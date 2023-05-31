<template>
    <div class="text-gray-200 mt-5 rounded bg-[#2C394F] mx-auto w-[75%]">
        <img v-if="course.image" style="height:300px; width:100%" class=" rounded-t mx-auto" :src="image_path(course.image.file)" alt="">
        <div class="p-4 text-justify">
            <h1 class="text-2xl text-[#d0d3d9]">{{ course.name }}</h1>
            <p class="text-gray-100/80 font-thin" v-html="course.description"></p>
            <router-link to="/admin/courses" class="relative inline-flex items-center px-10 py-1 overflow-hidden text-lg font-medium text-sky-600 border-2 border-sky-600 rounded-sm hover:text-white group hover:bg-gray-50"> <span class="absolute left-0 block w-full h-0 transition-all bg-sky-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span> <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg> </span> <span class="relative">Back</span> </router-link>        
        </div>
    </div>
</template>

<script>
import ApiService from '../../../../ApiService'
import filepath from '../../../../mixin/filepatch'
    export default {
        mixins: [filepath],
        data() {
            return {
                id : this.$route.params.id,
                course : {}
            }
        },
        mounted() {
            ApiService.get('admin/courses/'+this.id).then((response) => {
                if(response.data.condition) {
                    this.course = response.data.data
                }else {
                    alert('something went wrong!');
                }
            }).catch((error) => {
                console.log(error.response);
            })
        }
    }
</script>
