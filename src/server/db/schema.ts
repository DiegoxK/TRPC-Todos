import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
  uuid,
  pgEnum,
  uniqueIndex,
  foreignKey,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

export const UserRole = pgEnum("userRole", ["ADMIN", "USER"]);
export const Status = pgEnum("status", ["TODO", "IN_PROGRESS", "DONE"]);
export const Priority = pgEnum("priority", ["LOW", "MEDIUM", "HIGH"]);

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `trpc-todo_${name}`);

export const projects = createTable(
  "project",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    // TODO: Limit the number of characters a project name could have
    name: varchar("name", { length: 256 }).notNull(),
    nameSlug: varchar("nameSlug", { length: 256 }).notNull(),

    description: text("description"),
    createdById: varchar("createdById", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    nameIndex: index("name_idx").on(table.name),
  }),
);

export const projectsRelations = relations(projects, ({ many }) => {
  return {
    todos: many(todos),
  };
});

export const todos = createTable(
  "todos",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    parentTodoId: uuid("parentTodoId"),
    projectId: uuid("projectId")
      .notNull()
      .references(() => projects.id),

    // TODO: Limit the number of characters a task name could have
    task: varchar("task", { length: 256 }).notNull(),
    taskSlug: varchar("taskSlug", { length: 256 }).notNull(),

    description: text("description"),
    createdById: varchar("createdById", { length: 255 })
      .notNull()
      .references(() => users.id),
    priority: Priority("priority").default("MEDIUM").notNull(),
    status: Status("status").default("TODO").notNull(),
    due: timestamp("due", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      taskIndex: index("task_idx").on(table.taskSlug),
      parentReference: foreignKey({
        columns: [table.parentTodoId],
        foreignColumns: [table.id],
        name: "parentTodoId_fk",
      }),
    };
  },
);

export const todosRelations = relations(todos, ({ one }) => ({
  project: one(projects, {
    fields: [todos.projectId],
    references: [projects.id],
  }),
  created_by: one(users, {
    fields: [todos.createdById],
    references: [users.id],
  }),
  parentTodo: one(todos, {
    fields: [todos.parentTodoId],
    references: [todos.id],
  }),
}));

export const users = createTable(
  "user",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => sql`gen_random_uuid()`),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    emailVerified: timestamp("emailVerified", {
      mode: "date",
      withTimezone: true,
    }).default(sql`CURRENT_TIMESTAMP`),
    image: varchar("image", { length: 255 }),
    userRole: UserRole("userRole").default("USER").notNull(),
  },
  (table) => {
    return {
      emailIndex: uniqueIndex("email_idx").on(table.email),
    };
  },
);

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
