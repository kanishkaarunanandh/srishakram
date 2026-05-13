const BACKEND_ORIGIN = "https://srishakram-backend-v2.onrender.com";

export function resolveMediaUrl(value) {
  if (!value) return "";

  const path = String(value)
    .trim()
    .replace("issimg .s3", "issimg.s3")
    .replace("issimg%20.s3", "issimg.s3");

  if (/^(https?:|blob:|data:)/i.test(path)) {
    return encodeURI(path);
  }

  const cleanPath = path.replace(/^\/+/, "");
  const mediaPath = cleanPath.includes("/")
    ? cleanPath
    : `demo-media/${cleanPath}`;

  return encodeURI(`${BACKEND_ORIGIN}/${mediaPath}`);
}
