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
    name: "main",
    path: "/",
    auth: true,
  },
  account: {
    name: "account",
    path: "/account",
    auth: true,
  },
  diary: {
    name: "diary",
    path: "/daily-diary",
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
    component: () => import("../modules/diary/DiaryPage.vue"),
    meta: { layout: "application", requiresAuth: RoutePaths.main.auth },
  },
  {
    path: RoutePaths.account.path,
    name: RoutePaths.account.name,
    component: () => import("../modules/account/AccountPage.vue"),
    meta: { layout: "application", requiresAuth: RoutePaths.account.auth },
  },
  {
    path: RoutePaths.diary.path,
    name: RoutePaths.diary.name,
    component: () => import("../modules/diary/DiaryPage.vue"),
    meta: { layout: "application", requiresAuth: RoutePaths.diary.auth },
  },
  {
    path: RoutePaths.notes.path,
    name: RoutePaths.notes.name,
    component: () => import("../modules/notes/NotesPage.vue"),
    meta: { layout: "application", requiresAuth: RoutePaths.notes.auth },
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

  //LAST ROUTE
  { path: "/:pathMatch(.*)*", redirect: RoutePaths.notFound.path },
];
