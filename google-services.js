const googleServices={
	project_info:{
		project_number: process.env.EXPO_PROJECT_NUMBER,
		project_id: process.env.EXPO_PROJECT_ID,
		storage_bucket: process.env.EXPO_STORAGE_BUCKET
	},
	client: [
		{
			client_info: {
				mobilesdk_app_id: process.env.EXPO_MOBILESDK_APP_ID,
				android_client_info: {
					package_name: "com.kianirel.dev.thesismobile"
				}
			},
			oauth_client: [],
			api_key: [
				{
					current_key: process.env.EXPO_GOOGLE_SERVICE
				}
			],
			services: {
				appinvite_service: {
					other_platform_oauth_client: []
				}
			}
		}
	],
	configuration_version: "1"
}