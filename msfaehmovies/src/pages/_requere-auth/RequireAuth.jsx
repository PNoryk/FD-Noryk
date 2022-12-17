import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { Spinner } from "@/components/spinner/Spinner.jsx";
import { addMessage } from "@/store/features/messagesSlice.js";
import { getUserState } from "@/store/features/userSlice.js";

export const RequireAuth = () => {
  let dispatch = useDispatch();
  let [user, isUserLoading] = useSelector(getUserState)
  if (isUserLoading) {
    return <Spinner />;
  }
  if (!user) {
    dispatch(
      addMessage({
        type: "error",
        text: "No user fount. Please Sign Up or Sign In",
      })
    );
  }
  return user ? <Outlet /> : <Navigate to={"/"} />;
};
