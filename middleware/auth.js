export default function({ store, redirect, route }) {
  const userIsLoggedIn = !!store.getters["Auth/user"];
  if (!userIsLoggedIn) {
    return redirect("/");
  }
}
