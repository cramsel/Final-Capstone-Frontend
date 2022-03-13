import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Logout from "../views/Logout.vue";
import ShowPost from "../views/ShowPost.vue";
import ShowUser from "../views/ShowUser.vue";
import NewPost from "../views/NewPost.vue";
import SoundInterface from "../views/SoundInterface.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  { path: "/login", name: "Login", component: Login },
  { path: "/signup", name: "SignUp", component: SignUp },
  { path: "/logout", name: "Logout", component: Logout },
  { path: "/posts/:id", name: "ShowPost", component: ShowPost },
  { path: "/users/:id", name: "ShowUser", component: ShowUser },
  { path: "/posts/new", name: "NewPost", component: NewPost },
  { path: "/builder", name: "SoundInterface", component: SoundInterface },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
