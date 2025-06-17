import { relations } from 'drizzle-orm'
import {
	boolean,
	integer,
	pgTable,
	primaryKey,
	serial,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core'

// Your existing schema tables
export const space = pgTable('space', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
})

export const status = pgTable('status', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
	color: varchar('color', { length: 7 }).notNull().default('#64748b'),
	createdAt: timestamp('created_at').defaultNow(),
})

export const tag = pgTable('tag', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
	color: varchar('color', { length: 7 }).default('#64748b'),
	createdAt: timestamp('created_at').defaultNow(),
})

export const task = pgTable('task', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description'),
	dueDate: timestamp('due_date'),
	spaceId: integer('space_id')
		.notNull()
		.references(() => space.id, { onDelete: 'cascade' }),
	statusId: integer('status_id')
		.notNull()
		.references(() => status.id)
		.default(1),
	priority: text('priority').notNull().default('normal'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow(),
})

export const subTask = pgTable('sub_task', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	completed: boolean('completed').notNull().default(false),
	taskId: integer('task_id')
		.notNull()
		.references(() => task.id, { onDelete: 'cascade' }),
	createdAt: timestamp('created_at').defaultNow(),
})

export const taskTag = pgTable(
	'task_tag',
	{
		taskId: integer('task_id')
			.notNull()
			.references(() => task.id, { onDelete: 'cascade' }),
		tagId: integer('tag_id')
			.notNull()
			.references(() => tag.id, { onDelete: 'cascade' }),
	},
	(table) => ({
		pk: primaryKey(table.taskId, table.tagId),
	})
)

// Define relations for better query experience
export const taskRelations = relations(task, ({ one, many }) => ({
	space: one(space, { fields: [task.spaceId], references: [space.id] }),
	status: one(status, { fields: [task.statusId], references: [status.id] }),
	subTasks: many(subTask),
	taskTags: many(taskTag),
}))

export const subTaskRelations = relations(subTask, ({ one }) => ({
	task: one(task, { fields: [subTask.taskId], references: [task.id] }),
}))
