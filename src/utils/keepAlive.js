const BACKEND_URL = "https://srishakram-backend-v2.onrender.com";
const PING_INTERVAL_MS = 300000;

let keepAliveInterval = null;

function pingBackend() {
  fetch(BACKEND_URL, {
    method: "GET",
    mode: "no-cors",
    cache: "no-store",
    keepalive: true,
  }).catch(() => {});
}

export function startBackendKeepAlive() {
  if (typeof window === "undefined" || keepAliveInterval) return;

  pingBackend();
  keepAliveInterval = window.setInterval(pingBackend, PING_INTERVAL_MS);

  window.addEventListener(
    "beforeunload",
    () => {
      stopBackendKeepAlive();
    },
    { once: true }
  );
}

export function stopBackendKeepAlive() {
  if (!keepAliveInterval || typeof window === "undefined") return;

  window.clearInterval(keepAliveInterval);
  keepAliveInterval = null;
}
