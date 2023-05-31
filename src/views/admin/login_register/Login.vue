<template>
    <div class="bg-gray-900 font-serif h-screen fixed w-screen">
        <div class="w-1/3 mt-20 bg-gray-800 text-gray-200/90 px-7 pb-5 pt-10 mx-auto" style="box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;">
            <h1 class="text-4xl mb-5 text-center font-serif">Login Form</h1>
            <form @submit.prevent="Login">
                <div class="w-full">
                    <label>Email</label>
                    <input class="w-full focus:outline-none border-gray-400/30 border-b-2 bg-gray-800 p-2 mb-4" v-model="InputData.email" placeholder="Enter your Email" type="text">
                    <p class="text-rose-500" v-if="failed.email">{{ failed.email[0] }}</p>
                </div>
                <div class="w-full">
                    <label>Password</label>
                    <input class="w-full focus:outline-none border-gray-400/30 border-b-2 bg-gray-800 p-2 mb-4" v-model="InputData.password" placeholder="Enter your Password" autocomplete="username" type="password">
                    <p class="text-rose-500" v-if="failed.password">{{ failed.password[0] }}</p>
                </div>
                <router-link :to="{name : 'Register'}" class="text-sky-400 mr-16">Go to Register Page</router-link>
                <button class="text-gray-900 justify-end py-1.5 mt-3 rounded-full w-40 bg-gray-50 mb-2">Login</button>
            </form>
        </div>
    </div>
</template>

<script>
import ApiService from '../../../ApiService'
import JWTService from '../../../JWTService'
    export default {
        data() {
            return {
                InputData : {
                    email : '',
                    password : ''
                },
                failed : {}
            }
        },
        mounted() {
            if(JWTService.getToken()){
                this.$router.push("/");
            }
        },
        methods: {
            Login() {
                ApiService.post('admin/login',this.InputData)
                .then((response) => {
                    if(response) {
                        JWTService.saveToken(response.data.data.token);
                        if(JWTService.getToken()){
                            this.$router.push("/admin")
                        }
                }
                }).catch((error) => {
                    this.failed = error.response.data.errors();
                    console.log(this.failed);
                })
            }
        },
    }
</script>