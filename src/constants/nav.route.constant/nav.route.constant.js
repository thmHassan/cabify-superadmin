import clientNavRoutes from "./client.nav.route.constant";
import dispatcherNavRoutes from "./dispatcher.nav.route.constant";
import userNavRoutes from "./user.nav.route.constant";

export const NAV_ELEMENTS = {
  admin: [...userNavRoutes],
  superadmin: [...userNavRoutes], // Add superadmin role to use user navigation
  client: [...clientNavRoutes],
  dispatcher: [...dispatcherNavRoutes],
};
