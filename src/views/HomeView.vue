<template>
  <div>
    <Navbar/>
    <div class="flex flex-wrap bg-gray-900">
      <div class="w-1/2" style="height:560px">
        <Slider class="h-full" />
      </div>
      <div class="w-1/2 text-gray-300">
        <div class="px-20 pt-10 border-b h-1/2 bg-gray-50 text-gray-800">
          <h1 class="text-3xl font-mono">International Programmes</h1>
          <p class="w-3/4 mb-4 text-xl">
            The study programmes of the Enrollcampus University are open to
            people from all nationalities.
          </p>
          <router-link
            to="/"
            class="p-5 py-3 duration-500 hover:bg-gray-50 hover:text-sky-500 border-2 border-sky-400 text-sm text-gray-200 bg-sky-500"
            >LEARN MORE</router-link
          >
        </div>
        <div class="px-20 pt-10 h-1/2">
          <h1 class="text-3xl font-mono">Academic Programmers</h1>
          <p class="w-3/4 mb-4 text-xl">
            The study programmes of the Enrollcampus University are open to
            people from all nationalities.
          </p>
          <router-link
            to="/"
            class="p-5 py-3 duration-500 hover:bg-sky-500 border-2 border-sky-400 text-sm text-sky-500 hover:text-gray-50"
            >LEARN MORE</router-link
          >
        </div>
      </div>
    </div>
    <!-- Slider -->
  </div>
</template>

<script>
import Slider from "../components/Slider.vue";
import anime from "animejs"
import Navbar from "../components/Navbar.vue";
export default {
  methods: {
    themeresolve() {},
  },
  components: { Slider,Navbar },
  data() {
    return {
      navItems: [
        {
          name: "Home",
          route: "#home",
        },
        {
          name: "Blogs",
          route: "#blogs",
        },
        {
          name: "Services",
          route: "#services",
        },
        {
          name: "About Us",
          route: "#about",
        },
        {
          name: "Contact Us",
          route: "#contact",
        },
      ],
    };
  },
  mounted() {
  anime({
    targets: '#logo',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: true
  });
  }
};
</script>
