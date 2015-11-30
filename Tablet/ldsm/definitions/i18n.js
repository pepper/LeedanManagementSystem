import I18n from "react-native-i18n-complete";

I18n.fallbacks = true;
I18n.translations = {
	en: {
		login_enter_title: "Please enter your company title.",
		login_enter_username: "Please enter your company username.",
	},
	zh: {
		login_enter_title: "請輸入您的公司名稱",
		login_enter_username: "請輸入您的登入帳號",
	}
}

export default I18n;