<template>
    <div class="w-1/3 mx-auto bg-green-500">
        <img class="h-[50%] mx-auto mt-10" v-if="category.image" :src="image_path(category.image.file)" alt="">
        <h1 class="text-2xl">{{ category.name }}</h1>
    </div>
</template>

<script>
import ApiService from '../../../../ApiService'
import filepath from '../../../../mixin/filepatch'
    export default {
        mixins : [filepath],
        data() {
            return {
                id : this.$route.params.id,
                category : {}
            }
        },
        mounted() {
            ApiService.get('admin/categories/'+this.id)
            .then((response) => {
                if(response.data.condition) {
                    this.category = response.data.data;
                }else {
                    alert("something went wrong!");
                }
            }).catch((error) => {
                console.log(error.response);
            })
        }
    }
</script>