export function getAssetUrl(path) {
  // In dev, Vite serves from project root; in production the built files will be under /dist
  return path.startsWith('/') ? path : `/${path.replace(/^\/+/, '')}`
}
