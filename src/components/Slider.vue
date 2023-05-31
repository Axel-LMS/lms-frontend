<template>
 <swiper :modules="modules" effect="slide" :speed="500" :pagination="{ clickable: true }"   :autoplay="{
          delay: 3000,
     }" class="h-full">
          <swiper-slide v-for="slider in sliders" :key="slider.id">
               <img :src="image_path(slider.image.file)" alt="" class="object-cover h-full w-screen">
          </swiper-slide>
     </swiper>
</template>

<script>
import { Pagination,Autoplay } from 'swiper'
import { Swiper, SwiperSlide} from 'vue-awesome-swiper';
import filepath from '../mixin/filepatch';
import 'swiper/css'
import 'swiper/css/pagination';
import ApiService from '@/ApiService.js';
    export default {
     components: {
          Swiper,
          SwiperSlide
     },
     mixins : [filepath],
     data() 
     {
          return {
               sliders : [],
               modules: [Pagination,Autoplay],
          }
     },
     mounted() {
          ApiService.get('get-sliders')
          .then((response) => {
               this.sliders = response.data.data
          })
     }
    }
</script>