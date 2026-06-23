export default function storeUserData(response: any) {
  if (!response) return;

  localStorage.setItem("user_data", JSON.stringify(response));
}
