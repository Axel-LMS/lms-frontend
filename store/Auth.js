import { defineStore } from 'pinia';
import JWTService from '../src/JWTService';
import ApiService from '../src/ApiService';
export const useAuthStore = defineStore("auth", {
    state: () => ({
        user : null
    }),
    actions : {
       async verifyAuth() {
            if (JWTService.getToken()) {
                try {
                  const res = await ApiService.get("user");
                  const userData = res.data.data;
                  this.user = userData;
                } catch (error) {
                  console.error("Error verifying authentication:", error);
                }
            }
        }
    },
})