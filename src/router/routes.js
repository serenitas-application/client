export const RoutePaths = {
  login: {
    name: "login",
    path: "/login",
  },
  registration: {
    name: "registration",
    path: "/registration",
  },
  main: {
    name: "home",
    path: "/",
    auth: true,
  },
  account: {
    name: "account",
    path: "/account",
    auth: true,
  },
  pages: {
    name: "pages",
    path: "/pages",
    auth: true,
    children: {
      list: { name: "pages-list", path: "", auth: true },
      create: { name: "pages-create", path: "create", auth: true },
    },
  },
  diary: {
    name: "diary",
    path: "/diary",
    auth: true,
  },
  schedule: {
    name: "schedule",
    path: "/schedule",
    auth: true,
  },
  notes: {
    name: "notes",
    path: "/notes",
    auth: true,
  },
  settings: {
    name: "settings",
    path: "/settings",
    auth: true,
  },
  notFound: {
    name: "notFound",
    path: "/404",
  },
};

export const routes = [
  {
    path: RoutePaths.login.path,
    name: RoutePaths.login.name,
    component: () => import("../modules/auth/login/LoginPage.vue"),
    meta: { layout: "default" },
  },
  {
    path: RoutePaths.registration.path,
    name: RoutePaths.registration.name,
    component: () => import("../modules/auth/registration/RegistrationPage.vue"),
    meta: { layout: "default" },
  },
  {
    path: RoutePaths.main.path,
    name: RoutePaths.main.name,
    component: () => import("../modules/home/HomePage.vue"),
    meta: { layout: "application", requiresAuth: RoutePaths.main.auth },
  },
  {
    path: RoutePaths.schedule.path,
    name: RoutePaths.schedule.name,
    component: () => import("../modules/schedule/SchedulePage.vue"),
    meta: { layout: "application", requiresAuth: RoutePaths.schedule.auth },
  },
  {
    path: RoutePaths.diary.path,
    name: RoutePaths.diary.name,
    component: () => import("../modules/diary/DiaryPage.vue"),
    meta: { layout: "application", requiresAuth: RoutePaths.diary.auth },
  },
  {
    path: RoutePaths.pages.path,
    name: RoutePaths.pages.name,
    component: () => import("../modules/pages/PagesLayout.vue"),
    meta: { layout: "application", requiresAuth: RoutePaths.pages.auth },
    children: [
      {
        path: RoutePaths.pages.children.list.path,
        name: RoutePaths.pages.children.list.name,
        component: () => import("../modules/pages/list/PagesListPage.vue"),
        meta: { requiresAuth: RoutePaths.pages.children.list.auth },
      },
      {
        path: RoutePaths.pages.children.create.path,
        name: RoutePaths.pages.children.create.name,
        component: () => import("../modules/pages/create/PagesCreatePage.vue"),
        meta: { requiresAuth: RoutePaths.pages.children.create.auth },
      },
    ],
  },
  {
    path: RoutePaths.account.path,
    name: RoutePaths.account.name,
    component: () => import("../modules/account/AccountPage.vue"),
    meta: { layout: "application", requiresAuth: RoutePaths.account.auth },
  },
  {
    path: RoutePaths.settings.path,
    name: RoutePaths.settings.name,
    component: () => import("../modules/settings/SettingsPage.vue"),
    meta: { layout: "application", requiresAuth: RoutePaths.settings.auth },
  },
  {
    path: RoutePaths.notFound.path,
    name: RoutePaths.notFound.name,
    component: () => import("../modules/not-found/404.vue"),
    meta: { layout: "default" },
  },

  // LAST ROUTE
  { path: "/:pathMatch(.*)*", redirect: RoutePaths.notFound.path },
];
