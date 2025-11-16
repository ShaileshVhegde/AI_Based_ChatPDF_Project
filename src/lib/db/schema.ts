import { integer, pgEnum, pgTable,serial,text,timestamp,varchar } from "drizzle-orm/pg-core";
export const userSystemEnum = pgEnum('user_system_enum',['system','user'])

export const chats = pgTable('chats',{
    id: serial('id').primaryKey(),
    pdfname:text('pdf_name').notNull(),
    pdfurl:text('pdf_url').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    userID: varchar('user_id',{length:255}).notNull(),
    fillKey:text('fill_key').notNull(),

});
export const messages = pgTable('messages',{
    id: serial('id').primaryKey(),
    chatId: integer('chat_id').references(()=>chats.id).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    role: userSystemEnum('role') .notNull(),
});