import { Bins } from "@/utils/schemas"

export type TNotifications = {
	notification_type: string,
	created_at: string,
	bins: Bins,
	is_read: boolean,
	id: string
}
