import authRoute from "./authRoute";
import clientRoute from "./clientRoute";
import dispatcherRoute from "./dispatcherRoute";
import userRoute from "./userRoute";

export const publicRoutes = [...authRoute];

export const protectedRoutes = {
  admin: [...userRoute],
  client: [...clientRoute],
  dispatcher: [...dispatcherRoute],
};
