import CookieParser from "cookieparser";
import JWTDecode from "jwt-decode";

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

export const actions = {

  async nuxtClientInit({ commit, dispatch }) {

    console.log("nuxtClientInit....");
    if (process.server && process.static) return;
    // if (!process.client) return;

    const token = getCookie("access_token");
    if (!token) return;

    const decoded = JWTDecode(token);

    const user = {
      uid: decoded.user_id,
      email: decoded.email,
      // password: decoded.password,
      displayName: decoded.name
    };

    dispatch("Auth/setUser", user);
    dispatch("note/fetchNotes")
    dispatch("note/fetchTodayNotes")

  }

  // async nuxtClientInit({ commit, dispatch }, { req }) {
  //   console.log('nuxtClientInit....');
  //   // console.log('req',req);
  //   // if (process.server && process.static) return;
  //   if (!req.headers.cookie) return;
  //   const parsed = CookieParser.parse(req.headers.cookie);
  //   const access_token = parsed.access_token;
  //   if (!access_token) return;
  //   const decoded = JWTDecode(access_token);
  //   if (!decoded) return;
  //   console.log('decoded',decoded);
  //   const user = {
  //     uid: decoded.user_id,
  //     email: decoded.email,
  //     // password: decoded.password,
  //     displayName: decoded.name
  //   };
  //   dispatch("Auth/setUser", user);
  //   // login
  //   // await dispatch("Auth/loginWithEmailAndPassword", {
  //   //   email: user.email,
  //   //   password: user.password
  //   // });
  // }
};
