// Bundle size budget: gzip size of <dir>/assets/*.js|css, exits 1 when over the limit.
// Raise a limit only in a PR that says what grew and why.
import { appendFileSync, readdirSync, readFileSync } from 'node:fs'
import { gzipSync } from 'node:zlib'

// totalJs: everything the browser downloads. chunk: any single file, so one fat
// dependency can't hide inside a total that still fits.
const BUDGET_KB = { totalJs: 260, chunk: 65 }

const dir = `${process.argv[2] ?? 'dist'}/assets`
const files = readdirSync(dir)
  .filter((f) => /\.(js|css)$/.test(f))
  .map((f) => ({ f, kb: gzipSync(readFileSync(`${dir}/${f}`)).length / 1024 }))
  .sort((a, b) => b.kb - a.kb)

const totalJs = files.filter((x) => x.f.endsWith('.js')).reduce((sum, x) => sum + x.kb, 0)
const errors = [
  totalJs > BUDGET_KB.totalJs && `total JS ${totalJs.toFixed(1)} KB > ${BUDGET_KB.totalJs} KB`,
  ...files.filter((x) => x.kb > BUDGET_KB.chunk).map((x) => `${x.f} ${x.kb.toFixed(1)} KB > ${BUDGET_KB.chunk} KB`),
].filter(Boolean)

const report = [
  '| file | gzip |',
  '| --- | ---: |',
  ...files.map((x) => `| ${x.f} | ${x.kb.toFixed(2)} KB |`),
  `| **total JS** | **${totalJs.toFixed(2)} KB** (budget ${BUDGET_KB.totalJs} KB) |`,
  '',
  errors.length ? `❌ ${errors.join('; ')}` : `✅ within budget (chunk ≤ ${BUDGET_KB.chunk} KB)`,
].join('\n')

console.log(report)
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `## Bundle size\n\n${report}\n`)
process.exit(errors.length ? 1 : 0)
