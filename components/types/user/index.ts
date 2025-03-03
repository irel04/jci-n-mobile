import { Session } from "@supabase/supabase-js";


export type TUserSession = Session & {
	user_id: string
}