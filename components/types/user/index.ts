import { Session } from "@supabase/supabase-js";
import React, { SetStateAction } from "react";


export type TUserSession = Session & {
	user_id: string
}


export type TUserCredentials = {
	email: string;
	password: string;
}

export type TUserPersonalInfo = {
	first_name: string;
	last_name: string;
	birthdate: string;
	email_address: string;
	phone_number: string;
	auth_id: string;
	RFID?: string;
	lat?: number;
	lng?: number;
	address?: string;
	created_at?: string;
}

export type TRegistrationContext = {
	// personalInformationState: {
	// 	personalInfo: TUserPersonalInfo;
	// 	setPersonalInfo: React.Dispatch<SetStateAction<TUserPersonalInfo>>
	// };
	// userCredentialState: {
	// 	userCredentials: TUserCredentials;
	// 	setUserCredentials: React.Dispatch<SetStateAction<TUserCredentials>>
	// };
	setCurrentPage: React.Dispatch<SetStateAction<number>>
}