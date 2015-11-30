import I18n from "react-native-i18n-complete";

I18n.fallbacks = true;
I18n.translations = {
	en: {
		cancel: "Cancel",
		submit: "Submit",
		
		login_register: "Register",
		login_login: "Login",
		login_enter_title: "Please enter your company title.",
		login_enter_username: "Please enter your company username.",
		login_enter_password: "Please enter your password.",
		login_enter_password_again: "Please enter your password again.",
		login_username_format_wong: "Please input your company username and password.",
		login_register_format_wong: "All the field are required, and password and check password must same.",


	},
	zh: {
		cancel: "取消",
		submit: "送出",

		login_register: "註冊新公司帳戶",
		login_login: "登入公司帳戶",
		login_enter_title: "請輸入您的公司名稱",
		login_enter_username: "請輸入您的登入帳號",
		login_enter_password: "請輸入您的密碼",
		login_enter_password_again: "請再次輸入您的密碼",
		login_username_format_wong: "請輸入正確的公司帳號及密碼",
		login_register_format_wong: "註冊資訊所有項目均為必填項目，並且請注意您輸入的密碼及確認密碼必須一致",
	}
}

export default I18n;