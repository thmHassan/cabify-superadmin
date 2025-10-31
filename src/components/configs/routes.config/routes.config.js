import authRoute from "./authRoute";
import clientRoute from "./clientRoute";
import dispatcherRoute from "./dispatcherRoute";
import userRoute from "./userRoute";

export const publicRoutes = [...authRoute];

export const protectedRoutes = {
  admin: [...userRoute],
  superadmin: [...userRoute], // Add superadmin role to use user routes
  client: [...clientRoute],
  dispatcher: [...dispatcherRoute],
};
