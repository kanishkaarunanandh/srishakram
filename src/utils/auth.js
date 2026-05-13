import { jwtDecode } from "jwt-decode";
import router from "@/router";

let logoutTimer; // IMPORTANT

export function startAutoLogout(token) {
  try {
    const decoded = jwtDecode(token);
    const expiryTime = decoded.exp * 1000 - Date.now();

    if (logoutTimer) clearTimeout(logoutTimer);

    if (expiryTime <= 0) {
      logout();
      return;
    }

    logoutTimer = setTimeout(() => {
      logout();
    }, expiryTime);

  } catch (e) {
    logout();
  }
}

export function logout() {
  localStorage.clear();
  router.replace("/admin/auth/login"); // replace avoids navigation loop
}
