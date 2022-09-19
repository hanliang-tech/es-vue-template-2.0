import index from "@/views/index";
import error from "@/views/error";

export default {
  disableAutoBack: true,
  limit: 5,
  main: 'index',
  error: 'error',

  routes: [
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/error',
      name: 'error',
      component: error
    },
  ],
};
