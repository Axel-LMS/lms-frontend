import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/admin/Dashboard.vue'
import HomeView from '../views/HomeView.vue'

import Categories from '../views/admin/categories/Index.vue'
import CategoryCreate from '../views/admin/categories/Create.vue'
import CategoryEdit from '../views/admin/categories/edit/_Id.vue'
import CategoryShow from '../views/admin/categories/show/_Id.vue'

import Courses from '../views/admin/courses/Index.vue'
import CourseCreate from '../views/admin/courses/Create.vue'
import CourseEdit from '../views/admin/courses/edit/_Id.vue'
import CourseShow from '../views/admin/courses/show/_Id.vue'

import Cycles from '../views/admin/cycles/Index.vue'
import CycleCreate from '../views/admin/cycles/Create.vue'
import CycleEdit from '../views/admin/cycles/_id.vue'

import CourseByCycle from '../views/admin/coursebycycles/Index.vue'
import CourseByCycleCreate from '../views/admin/coursebycycles/Create.vue'
import CourseByCycleEdit from '../views/admin/coursebycycles/_id.vue'

import Enrollments from '../views/admin/enrollments/Index.vue'
import EnrollmentEdit from '../views/admin/enrollments/_Id.vue'
import EnrollmentCreate from '../views/admin/enrollments/Create.vue'

import Students from '../views/admin/students/Index.vue'
import StudentCreate from '../views/admin/students/Create.vue'
import StudentEdit from '../views/admin/students/_Id.vue'

import Attendances from '../views/admin/attendances/Index.vue'
import AttendanceCreate from '../views/admin/attendances/Create.vue'
import AttendanceEdit from '../views/admin/attendances/_Id.vue'

import Clubs from '../views/admin/clubs/Index.vue'
import ClubCreate from '../views/admin/clubs/Create.vue'
import ClubEdit from '../views/admin/clubs/_Id.vue'

import Coursepercycles from '../views/admin/coursepercycles/Index.vue'
import CoursepercycleCreate from '../views/admin/coursepercycles/Create.vue'
import CoursepercycleEdit from '../views/admin/coursepercycles/_Id.vue'

import Teacherpercourses from '../views/admin/teacherpercourses/Index.vue'
import TeacherpercourseCreate from '../views/admin/teacherpercourses/Create.vue'
import TeacherpercourseEdit from '../views/admin/teacherpercourses/_Id.vue'

import Teachers from '../views/admin/teachers/Index.vue'
import TeacherCreate from '../views/admin/teachers/Create.vue'
import TeacherEdit from '../views/admin/teachers/_Id.vue'

import Tests from '../views/admin/tests/Index.vue'
import TestCreate from '../views/admin/tests/Create.vue'
import TestEdit from '../views/admin/tests/_Id.vue'

import Testscores from '../views/admin/testscores/Index.vue'
import TestscoreCreate from '../views/admin/testscores/Create.vue'
import TestscoreEdit from '../views/admin/testscores/_Id.vue'

import Sliders from '../views/admin/sliders/Index.vue'
import SliderCreate from '../views/admin/sliders/Create.vue'
import SliderEdit from '../views/admin/sliders/_Id.vue'

import Register from '../views/admin/login_register/Register.vue'
import Login from '../views/admin/login_register/Login.vue'

import ClientRegister from '../views/client/login_register/Register.vue'
import ClientLogin from '../views/client/login_register/Login.vue'

import JWTService from '../JWTService'
import { useAuthStore } from '../../store/Auth'

//Client 
import Client from '../../src/views/client/Index.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '/',
      component: HomeView
    },
    {
      path: '/client',
      name: 'Client',
      component: Client
    },
    {
      path: '/client/register',
      name: 'ClientRegister',
      component : ClientRegister
    },
    {
      path: '/client/login',
      name: 'ClientLogin',
      component : ClientLogin
    },
    {
      path: '/admin/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/admin/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      meta : {
        middleware : "auth"
      },
      children: [
        {
          path:'categories',
          name: 'Categories',
          component: Categories
        },
        {
          path:'categories/:id',
          name: 'CategoryEdit',
          component: CategoryEdit
        },
        {
          path:'category/:id',
          name: 'CategoryShow',
          component: CategoryShow
        },
        {
          path:'categories/create',
          name: 'CategoryCreate',
          component: CategoryCreate
        },
        {
          path:'courses',
          name: 'Courses',
          component: Courses
        },
        {
          path: 'courses/create',
          name: 'CourseCreate',
          component: CourseCreate
        },
        {
          path:'courses/:id',
          name: 'CourseEdit',
          component: CourseEdit
        },
        {
          path:'course/:id',
          name: 'CourseShow',
          component: CourseShow
        },
        {
          path:'cycles',
          name: 'Cycles',
          component: Cycles
        },
        {
          path: 'cycles/create',
          name: 'CycleCreate',
          component: CycleCreate
        },
        {
          path:'cycles/:id',
          name: 'CycleEdit',
          component: CycleEdit
        },
        {
          path:'coursebycycles',
          name: 'Coursebycycles',
          component: CourseByCycle
        },
        {
          path:'coursebycycles/create',
          name: 'CourseByCycleCreate',
          component: CourseByCycleCreate
        },
        {
          path:'coursebycycles/:id',
          name: 'CourseByCycleEdit',
          component: CourseByCycleEdit
        },
        {
          path: 'students',
          name: 'Students',
          component : Students
        },
        {
          path: 'students/create',
          name: 'StudentCreate',
          component : StudentCreate
        },
        {
          path: 'students/:id',
          name: 'StudentEdit',
          component : StudentEdit
        },
        {
          path: 'enrollments',
          name: 'Enrollments',
          component : Enrollments
        },
        {
          path: 'enrollments/create',
          name: 'EnrollmentCreate',
          component : EnrollmentCreate
        },
        {
          path: 'enrollments/:id',
          name: 'EnrollmentEdit',
          component : EnrollmentEdit
        },
               {
          path: 'attendances',
          name: 'Attendances',
          component : Attendances
        },
        {
          path: 'attendances/create',
          name: 'AttendanceCreate',
          component : AttendanceCreate
        },
        {
          path: 'attendance/:id',
          name: 'AttendanceEdit',
          component : AttendanceEdit
        },
        {
          path: 'clubs',
          name: 'Clubs',
          component : Clubs
        },
        {
          path: 'clubs/create',
          name: 'ClubCreate',
          component : ClubCreate
        },
        {
          path: 'clubs/:id',
          name: 'ClubEdit',
          component : ClubEdit
        },
        {
          path: 'coursepercycles',
          name: 'Coursepercycles',
          component : Coursepercycles
        },
        {
          path: 'coursepercycles/create',
          name: 'CoursepercycleCreate',
          component : CoursepercycleCreate
        },
        {
          path: 'coursepercycles/:id',
          name: 'CoursepercycleEdit',
          component : CoursepercycleEdit
        },
        {
          path: 'teacherpercourses',
          name: 'Teacherpercourses',
          component : Teacherpercourses
        },
        {
          path: 'teacherpercourses/create',
          name: 'TeacherpercourseCreate',
          component : TeacherpercourseCreate
        },
        {
          path: 'teacherpercourses/:id',
          name: 'TeacherpercourseEdit',
          component : TeacherpercourseEdit
        },
        {
          path: 'teachers',
          name: 'Teachers',
          component : Teachers
        },
        {
          path: 'teachers/create',
          name: 'TeacherCreate',
          component : TeacherCreate
        },
        {
          path: 'teachers/:id',
          name: 'TeacherEdit',
          component : TeacherEdit
        },
        {
          path: 'tests',
          name: 'Tests',
          component : Tests
        },
        {
          path: 'tests/create',
          name: 'TestCreate',
          component : TestCreate
        },
        {
          path: 'tests/:id',
          name: 'TestEdit',
          component : TestEdit
        },
        {
          path: 'testscores',
          name: 'Testscores',
          component : Testscores
        },
        {
          path: 'testscores/create',
          name: 'TestscoreCreate',
          component : TestscoreCreate
        },
        {
          path: 'testscores/:id',
          name: 'TestscoreEdit',
          component : TestscoreEdit
        },
        {
          path: 'sliders',
          name: 'Sliders',
          component : Sliders
        },
        {
          path: 'sliders/create',
          name: 'SliderCreate',
          component : SliderCreate
        },
        {
          path: 'sliders/:id',
          name: 'SliderEdit',
          component : SliderEdit
        }
      ]
    },
  ]
})

router.beforeEach((to,from,next) => {
  if(to.meta.middleware == 'auth') {
    const authStore = useAuthStore();
    async function verifyAuth() {
      try {
        await authStore.verifyAuth();
        const roles = authStore.user.roles[0].id;
        return roles;
      } catch (error) {
        console.error("Error verifying authentication:", error);
      }
    }
    verifyAuth().then((response) => {
      let role_id = response
      let token = JWTService.getToken();
      if(token && role_id == 1) {
        next();
      } else {
        window.location.assign("/")
      }
    });
  } else {
    next();
  }
})

export default router
