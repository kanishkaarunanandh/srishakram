const BACKEND_URL = "http://localhost:8080";

export function resolveMediaUrl(path) {
  if (!path) return "";

  // Already a complete URL
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }

  // Backend relative path
  if (path.startsWith("/")) {
    return `${BACKEND_URL}${path}`;
  }

  return `${BACKEND_URL}/${path}`;
}