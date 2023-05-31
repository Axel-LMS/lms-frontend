<template>
    <div class=" overflow-x-hidden">
        <Navbar/>
        <div class="flex justify-evenly flex-wrap h-screen">
            <div class="relative" data-aos="fade-down" v-for="category in categories" :key="category.id">
                <router-link class="w-full h-full peer top-[90px]" to="/">
        <img style="height: 200px; width: 320px;" class="w-[90%] rounded hover:blur-[5px] duration-300 object-fill" v-if="category.image" :src="image_path(category.image.file)">
       </router-link>
       <p class="absolute text-3xl text-gray-800 hidden peer-hover:block hover:block top-[80px] left-[90px]">{{ category.name }}</p>
    </div>
        </div>
</div>
</template>

<script>
import ApiService from '../../ApiService'
import Navbar from '../../components/Navbar.vue'
import filepath from '../../mixin/filepatch'
import AOS from 'aos'
    export default {
        mixins: [filepath],
        components: {Navbar},
        data() {
            return {
                categories : []
            }
        },
        mounted() {
            AOS.init({
                duration: 1500,
                once: true
            })
            ApiService.get('get-categories')
            .then((response) => {
                if(response.data.condition) {
                    this.categories = response.data.data
                    console.log(this.categories);
                }
            })
        }
    }
</script>