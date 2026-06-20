import { mkdir, readFile, writeFile } from "node:fs/promises"
import { createRequire } from "node:module"
import path from "node:path"

const require = createRequire(path.join(process.cwd(), "package.json"))
const YAML = require("yaml")

const siteTitle = process.env.QUARTZ_SITE_TITLE ?? "CKC Canon"
const baseUrl = process.env.QUARTZ_BASE_URL

if (!baseUrl) {
  throw new Error("QUARTZ_BASE_URL is required")
}

const configPath = path.join(process.cwd(), "quartz.config.yaml")
const config = YAML.parse(await readFile(configPath, "utf8"))

config.configuration ??= {}
config.configuration.pageTitle = siteTitle
config.configuration.pageTitleSuffix = ""
config.configuration.baseUrl = baseUrl
config.configuration.enableSPA = true
config.configuration.enablePopovers = true

await writeFile(configPath, YAML.stringify(config), "utf8")

const indexPath = path.join(process.cwd(), "content", "index.md")
await mkdir(path.dirname(indexPath), { recursive: true })
await writeFile(
  indexPath,
  `---
title: ${JSON.stringify(siteTitle)}
---

# ${siteTitle}

- [[timeline|Timeline]]
- [[entities|Entities]]
- [[quests|Active Quests]]
- [[resolved quests|Resolved Quests]]
- [[sessions/session_001|Sessions]]
`,
  "utf8",
)
