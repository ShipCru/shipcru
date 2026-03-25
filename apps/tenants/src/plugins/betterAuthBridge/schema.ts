import { boolean, jsonb, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

const timestamps = {
  createdAt: timestamp('createdAt', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
}

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  permissions: jsonb('permissions').$type<string[] | null>(),
  ...timestamps,
})

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expiresAt', { withTimezone: true, mode: 'date' }).notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  ...timestamps,
})

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt', { withTimezone: true, mode: 'date' }),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt', { withTimezone: true, mode: 'date' }),
  scope: text('scope'),
  idToken: text('idToken'),
  password: text('password'),
  ...timestamps,
})

export const verifications = pgTable('verifications', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt', { withTimezone: true, mode: 'date' }).notNull(),
  ...timestamps,
})

export const schema = { users, sessions, accounts, verifications }
