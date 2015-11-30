import I18n from "react-native-i18n-complete";

I18n.fallbacks = true;
I18n.translations = {
	en: {
		cancel: "Cancel",
		submit: "Submit",

		company_register_start: "Registing company...",
		company_register_success: "Company register success",
		company_register_fail: "Company register fail",

		company_login_start: "Loging company...",
		company_login_success: "Company login success",
		company_login_fail: "Company login fail",

		company_login_status_save_success: "Login status save success",
		company_login_status_save_fail: "Login status save fail",

		company_logout_finish: "Logout success",
		company_logout_fail: "Logout fail",
		
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

		company_register_start: "開始進行公司註冊",
		company_register_success: "公司帳號註冊完成",
		company_register_fail: "公司帳號註冊失敗",

		company_login_start: "開始登入公司帳號",
		company_login_success: "公司帳號登入成功",
		company_login_fail: "公司帳號登入失敗",

		company_login_status_save_success: "登入記錄儲存成功，下次可不用再次登入",
		company_login_status_save_fail: "登入記錄儲存失敗",

		company_logout_finish: "登出成功",
		company_logout_fail: "登出失敗",

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