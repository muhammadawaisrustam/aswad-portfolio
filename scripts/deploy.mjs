// `npm run deploy` — builds the site and publishes dist/ to the gh-pages branch,
// which GitHub Pages serves at https://muhammadawaisrustam.github.io/aswad-portfolio/
import { execSync } from 'node:child_process'
import { rmSync, writeFileSync } from 'node:fs'

const run = (cmd, cwd) => execSync(cmd, { stdio: 'inherit', cwd })
const out = (cmd) => execSync(cmd).toString().trim()

const remote = out('git remote get-url origin')
const commit = out('git rev-parse --short HEAD')

run('npm run build')
writeFileSync('dist/.nojekyll', '') // serve files as-is, no Jekyll processing

rmSync('dist/.git', { recursive: true, force: true })
try {
  run('git init -q -b gh-pages', 'dist')
  run('git add -A', 'dist')
  run(`git commit -q -m "Deploy ${commit}"`, 'dist')
  run(`git push -q -f ${remote} gh-pages`, 'dist')
  console.log('\nDeployed. Live in ~1 minute: https://muhammadawaisrustam.github.io/aswad-portfolio/')
} finally {
  rmSync('dist/.git', { recursive: true, force: true })
}
