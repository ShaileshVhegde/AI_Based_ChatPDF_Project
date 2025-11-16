import {neon,neonConfig} from '@neondatabase/serverless'
import{} from 'drizzle-orm/neon-http'
import { drizzle } from 'drizzle-orm/singlestore'
neonConfig.fetchConnectionCache = true

if(!process.env.DATABASE_URL){
    throw new Error("DATABASE_URL is not defined")
}
const sql = neon(process.env.DATABASE_URL)
export const db = drizzle(sql);
