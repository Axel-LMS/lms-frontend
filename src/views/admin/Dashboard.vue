<template>
    <div class="w-screen h-full flex overflow-x-hidden">
      <div class="bg-gray-800 w-1/6 h-screen sticky top-0">
        <div class="w-full bg-gray-900">
          <router-link to="/" class="ml-16">
          <span class="text-sky-400 text-5xl">A</span
          ><span class="text-gray-300 text-xl font-mono">xel</span
          ><span class="text-sky-400 text-4xl">7</span>
        </router-link>        </div>
        <div class=" w-full text-gray-300">
         <div class="mt-2">
          <button  class="peer hover:bg-gray-900 w-full text-lg py-2">Dashboard<svg class="w-4 h-4 ml-2 inline" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
            <div class="hidden peer-hover:block hover:block w-[200px]" v-for="group, g_index in nav_groups" :key="g_index">
            <p v-for="menu, index in group.nav_menus" :key="index" class="p-2 ml-5 hover:text-sky-900">
            <router-link :to="{ name: menu.route }">
              <i :class="menu.icon" class="mr-2"></i>
              {{ menu.title }}
            </router-link>
          </p>
          </div>
         </div>
         <div>
          <button  class="peer hover:bg-gray-900 w-full text-lg py-2">Women<svg class="w-4 h-4 ml-2 inline" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
            <div class="hidden peer-hover:block hover:block w-[200px]" v-for="group, g_index in nav_groups" :key="g_index">
            <p v-for="menu, index in group.navItems" :key="index"  class="p-2 ml-5 hover:text-sky-900">
            <router-link :to="{ name: menu.route }">
              <i :class="menu.icon" class="mr-2"></i>
              {{ menu.title }}
            </router-link>
          </p>
          </div>
         </div>
         <div>
          <button  class="peer hover:bg-gray-900 w-full text-lg py-2">Tests<svg class="w-4 h-4 ml-2 inline" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
            <div class="hidden peer-hover:block hover:block w-[200px]" v-for="group, g_index in nav_groups" :key="g_index">
            <p v-for="menu, index in group.navTests" :key="index"  class="p-2 ml-5 hover:text-sky-900">
            <router-link :to="{ name: menu.route }">
              <i :class="menu.icon" class="mr-2"></i>
              {{ menu.title }}
            </router-link>
          </p>
          </div>
         </div>
        </div>
      </div>
      <div class="w-5/6 h-screen bg-gray-600">
      <div class="mt-2 h-[7%] flex justify-center border-b pb-2 border-blue-400">
        <input type="search" id="search" class="focus:outline-none w-1/3 border border-gray-300 rounded-lg" placeholder="Search" required>
      </div>
      <div class="h-[90%]">
        <RouterView/>
      </div>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                DropdownDBopen : false ,
                DropdownCTopen : false ,
                DropdownTSopen : false ,
                nav_groups : [
                    {
                        nav_menus: 
                        [
                            {
                              title: "Dashboard",
                              route: "Dashboard",
                              icon: "fa-solid fa-gauge"
                            },
                            {
                              title: "Categories",
                              route: "Categories",
                              icon: "fa-solid fa-tag"
                            },
                            {
                              title: "Courses",
                              route: "Courses",
                              icon: "fa-solid fa-layer-group"
                            },
                            {
                              title: "Cycles",
                              route: "Cycles",
                              icon: "fa-solid fa-arrows-spin"
                            },
                            {
                              title: "Course By Cycles",
                              route: "Coursebycycles",
                              icon: "fa-solid fa-calendar-days"
                            },
                            {
                              title: "Course Per Cycles",
                              route: "Coursepercycles",
                              icon: "fa-solid fa-table"
                            },
                            {
                              title: "Enrollments",
                              route: "Enrollments",
                              icon: "fa-solid fa-user-tie"
                            },
                            {
                              title: "Sliders",
                              route: "Sliders",
                              icon: "fa-solid fa-user-tie"
                            },
                        ]
                        },
                        {
                      navItems :
                      [
                        {
                              title: "Clubs",
                              route: "Clubs",
                              icon: "fa-solid fa-school"
                        },
                        {
                              title: "Teachers",
                              route: "Teachers",
                              icon: "fa-solid fa-user-tie"
                        },
                        {
                              title: "Teacher Per Courses",
                              route: "Teacherpercourses",
                              icon: "fa-solid fa-city"
                        },
                        {
                              title: "Students",
                              route: "Students",
                              icon: "fa-solid fa-user-tie"
                        },
                        {
                              title: "Attendances",
                              route: "Attendances",
                              icon: "fa-solid fa-business-time"
                        },
                        ]
                      },
                      {
                        navTests :
                        [
                          {
                              title: "Tests",
                              route: "Tests",
                              icon: "fa-solid fa-sim-card"
                            },
                            {
                              title: "Test Scores",
                              route: "Testscores",
                              icon: "fa-solid fa-chart-simple"
                            },
                        ]
                      }
                ]
            }
        },
    }
</script>
<style>
</style>