import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { Spinner } from "@/components/spinner/Spinner.jsx";
import { auth } from "@/services/firebase.js";
import { addMessage } from "@/store/features/messagesSlice.js";

export const RequireAuth = () => {
  let dispatch = useDispatch();
  let [user, isLoading, error] = useAuthState(auth);
  console.log({ user, isLoading, error });
  if (isLoading) {
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
