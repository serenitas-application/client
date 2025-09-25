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
  journals: {
    name: "journals",
    path: "/journals",
    auth: true,
    children: {
      list: { name: "journals-list", path: "", auth: true },
      create: { name: "journal-create", path: "create", auth: true },
    },
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
    meta: { layout: "application", title: "Home", requiresAuth: RoutePaths.main.auth },
  },
  {
    path: RoutePaths.journals.path,
    name: RoutePaths.journals.name,
    component: () => import("../modules/journals/JournalsLayout.vue"),
    meta: { layout: "application", title: "", requiresAuth: RoutePaths.journals.auth },
    children: [
      {
        path: RoutePaths.journals.children.list.path,
        name: RoutePaths.journals.children.list.name,
        component: () => import("../modules/journals/pages/JournalsPage.vue"),
        meta: { title: "Journals", requiresAuth: RoutePaths.journals.children.list.auth },
      },
      {
        path: RoutePaths.journals.children.create.path,
        name: RoutePaths.journals.children.create.name,
        component: () => import("../modules/journals/create/JournalCreatePage.vue"),
        meta: { title: "Create ournal", requiresAuth: RoutePaths.journals.children.create.auth },
      },
    ],
  },
  {
    path: RoutePaths.account.path,
    name: RoutePaths.account.name,
    component: () => import("../modules/account/AccountPage.vue"),
    meta: { layout: "application", title: "Account", requiresAuth: RoutePaths.account.auth },
  },
  {
    path: RoutePaths.settings.path,
    name: RoutePaths.settings.name,
    component: () => import("../modules/settings/SettingsPage.vue"),
    meta: { layout: "application", title: "Settings", requiresAuth: RoutePaths.settings.auth },
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
