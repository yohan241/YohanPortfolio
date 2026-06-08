import { defineConfig } from "vite"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const workspaceRoot = path.resolve(__dirname, "..")
const assetsRoot = path.resolve(workspaceRoot, "assets")
const viewsRoot = path.resolve(workspaceRoot, "application", "views")

const contentTypes = {
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".mp3": "audio/mpeg",
  ".html": "text/html"
}

const windowViews = {
  getstarted: "getstartedwindow.php",
  about: "aboutmewindow.php",
  work: "workwindow.php",
  home: "homewindow.php",
  contacts: "contactswindow.php",
  games: "gameswindow.php"
}

function normalizeRequestPath(url) {
  return decodeURIComponent(url.split("?")[0])
}

function transformPhpView(source) {
  return source
    .replace(/<\?=\s*base_url\(\)\s*;\s*\?>/g, "/")
    .replace(/<\?php\s+echo\s+base_url\(\)\s*;\s*\?>/g, "/")
}

function getHomeHtml() {
  return transformPhpView(fs.readFileSync(path.join(viewsRoot, "pages", "home.php"), "utf8"))
}

function getWindowHtmlMap() {
  return Object.fromEntries(
    Object.entries(windowViews).map(([name, fileName]) => [
      name,
      transformPhpView(fs.readFileSync(path.join(viewsRoot, "windows", fileName), "utf8"))
    ])
  )
}

function sendHtml(res, filePath) {
  const html = transformPhpView(fs.readFileSync(filePath, "utf8"))
  res.setHeader("Content-Type", "text/html")
  res.end(html)
}

function copyDirectory(source, destination) {
  fs.mkdirSync(destination, { recursive: true })
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name)
    const destinationPath = path.join(destination, entry.name)
    if (entry.isDirectory()) {
      copyDirectory(sourcePath, destinationPath)
    } else {
      fs.copyFileSync(sourcePath, destinationPath)
    }
  }
}

function portfolioDevServer() {
  return {
    name: "portfolio-dev-server",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const requestPath = normalizeRequestPath(req.url || "/")

        if (requestPath === "/pages/home" || requestPath === "/pages/home.html") {
          sendHtml(res, path.join(viewsRoot, "pages", "home.php"))
          return
        }

        const windowMatch = requestPath.match(/^\/windows\/load_window\/([a-z]+)$/)
        if (windowMatch) {
          const viewFile = windowViews[windowMatch[1]]
          if (!viewFile) {
            res.statusCode = 404
            res.end("Window not found")
            return
          }

          sendHtml(res, path.join(viewsRoot, "windows", viewFile))
          return
        }

        if (requestPath.startsWith("/assets/")) {
          const relativePath = requestPath.replace(/^\/assets\//, "")
          const filePath = path.normalize(path.join(assetsRoot, relativePath))

          if (!filePath.startsWith(assetsRoot) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
            res.statusCode = 404
            res.end("Asset not found")
            return
          }

          res.setHeader("Content-Type", contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream")
          fs.createReadStream(filePath).pipe(res)
          return
        }

        next()
      })
    }
  }
}

function portfolioStaticBuild() {
  const homeModuleId = "virtual:portfolio-home"
  const windowsModuleId = "virtual:portfolio-windows"

  return {
    name: "portfolio-static-build",
    resolveId(id) {
      if (id === homeModuleId || id === windowsModuleId) return `\0${id}`
      return null
    },
    load(id) {
      if (id === `\0${homeModuleId}`) {
        return `export default ${JSON.stringify(getHomeHtml())}`
      }

      if (id === `\0${windowsModuleId}`) {
        return `export default ${JSON.stringify(getWindowHtmlMap())}`
      }

      return null
    },
    closeBundle() {
      const outputRoot = path.resolve(__dirname, "../public/dist")
      copyDirectory(assetsRoot, path.join(outputRoot, "assets"))
    }
  }
}

export default defineConfig({
  root: path.resolve(__dirname, "src"),
  base: "/",
  plugins: [portfolioStaticBuild(), portfolioDevServer()],
  server: {
    port: 5173
  },
  build: {
    outDir: path.resolve(__dirname, "../public/dist"),
    emptyOutDir: true
  }
})
