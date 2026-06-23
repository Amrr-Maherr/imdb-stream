import type { UserCredential } from "firebase/auth";

export default function storeUserData(response: UserCredential) {
  localStorage.setItem("user_data", JSON.stringify(response));
}
