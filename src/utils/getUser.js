// import { getUser } from "../../utils/getUser";
// import Confetti from "react-confetti";

// const user = getUser();
export function getUser() {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    return null;
  }
}