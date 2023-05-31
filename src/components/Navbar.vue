<template>
    <div>
        <div class="font-serif z-40 w-screen text-gray-300 bg-gray-800">
      <div class="py-3 px-10 flex justify-between">
        <router-link to="/" class="ml-4">
          <span class="text-sky-400 text-5xl">A</span
          ><span class="text-gray-300 text-xl font-mono">xel</span
          ><span class="text-sky-400 text-4xl">7</span>
        </router-link>
        <ul class="flex mt-2 text-lg">
          <li
            class="m-2 mx-3 hover:text-sky-900"
            v-for="navItem in navItems"
            :key="navItem"
          >
            <a v-bind:href="navItem.route" class="hover:text-blue-500">{{
              navItem.name
            }}</a>
          </li>
        </ul>
        <ul class="flex mt-2 text-lg">
          <li class="m-2 mt-1 hover:scale-110">
            <router-link
              :to="{name : 'ClientLogin'}"
              class="p-4 py-2 border-2 border-gray-400/10 text-sm rounded hover:text-gray-200"
              >SING IN</router-link
            >
          </li>
          <li class="m-2 mt-1 hover:scale-110">
            <router-link
              to="/"
              class="p-4 py-2 bg-sky-500 border-2 border-gray-400/10 text-sm text-gray-50 rounded hover:text-gray-50"
              >GET START FREE</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>