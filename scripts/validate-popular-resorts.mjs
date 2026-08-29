import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const dataPath = path.join(root, 'src', 'data', 'popularResorts.ts')
const resortsPath = path.join(root, 'src', 'content', 'resorts')
const source = fs.readFileSync(dataPath, 'utf8')
const resortIds = new Set(
  fs.readdirSync(resortsPath)
    .filter((file) => file.endsWith('.md'))
    .map((file) => fs.readFileSync(path.join(resortsPath, file), 'utf8'))
    .map((content) => content.match(/^id:\s*([^\r\n]+)/m)?.[1]?.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean),
)

const entries = [...source.matchAll(/\{\s*id:\s*'([^']+)'\s*,\s*data:\s*'([^']+)'/g)]
const errors = []
const seenIds = new Set()

if (entries.length < 5) {
  console.warn(`[popular-resorts] 目前只有 ${entries.length} 筆，功能將停用。`)
}

for (const [, id, value] of entries) {
  if (seenIds.has(id)) errors.push(`雪場 id 重複：${id}`)
  seenIds.add(id)

  if (!resortIds.has(id)) errors.push(`找不到對應的雪場內容：${id}`)

  if (!/^\d{1,3}(?:\.\d{1,2})?$/.test(value)) {
    errors.push(`data 必須是 0 到 100、最多兩位小數的字串：${id} = ${value}`)
    continue
  }

}

if (entries.length === 0) errors.push('popularResorts.resorts 不可為空')

if (errors.length > 0) {
  console.error(errors.map((error) => `[popular-resorts] ${error}`).join('\n'))
  process.exitCode = 1
} else {
  console.log(`[popular-resorts] 驗證通過：${entries.length} 筆。`)
}
