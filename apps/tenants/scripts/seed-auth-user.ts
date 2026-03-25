import { hashPassword } from 'better-auth/crypto'
import pg from 'pg'

async function main() {
  const pool = new pg.Pool({
    connectionString: 'postgres://postgres:Passw0rd@localhost:5432/auth_dev',
  })

  // Delete existing test user if present
  await pool.query(`DELETE FROM accounts WHERE "userId" IN (SELECT id::text FROM users WHERE email = $1)`, ['test@example.com'])
  await pool.query(`DELETE FROM sessions WHERE "userId" IN (SELECT id::text FROM users WHERE email = $1)`, ['test@example.com'])
  await pool.query(`DELETE FROM users WHERE email = $1`, ['test@example.com'])

  const hash = await hashPassword('TestPass123')
  console.log('Hash format:', hash.substring(0, 40) + '...')

  const result = await pool.query(
    `INSERT INTO users (name, email, "emailVerified", permissions)
     VALUES ($1, $2, true, $3)
     RETURNING id, name, email`,
    ['Test User', 'test@example.com', JSON.stringify(['users.*'])],
  )
  const user = result.rows[0]
  console.log('User created:', user)

  await pool.query(
    `INSERT INTO accounts (id, "userId", "accountId", "providerId", password)
     VALUES ($1, $2, $3, 'credential', $4)`,
    [crypto.randomUUID(), user.id, user.id, hash],
  )
  console.log('Account with password created')

  await pool.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
