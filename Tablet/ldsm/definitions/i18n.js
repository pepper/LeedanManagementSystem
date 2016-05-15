import I18n from "react-native-i18n-complete";

I18n.fallbacks = true;
I18n.translations = {
	en: {
		cancel: "Cancel",
		submit: "Submit",
		confirm: "Confirm",
		content_not_set_yet: "Not set the content yet.",

		system_preparing: "Preparing system please wait...",

		username_already_token: "Company username already token",
		username_or_password_wrong: "Username or password wrong",
		logout: "Logout",

		database_init_fail: "Database initialize fail",

		company_register_start: "Registing company...",
		company_register_success: "Company register success",
		company_register_fail: "Company register fail",

		company_login_start: "Loging company...",
		company_login_success: "Company login success",
		company_login_fail: "Company login fail",

		company_login_status_no_record: "You are not login before",
		company_login_status_read_fail: "Login status read fail",
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

		logout_panel_msssage: "Are you sure you want to logout system?",

		company_create_employee: "Create employee",
		company_create_employee_start: "Start create create employee",
		company_create_employee_success: "Create employee success",
		company_create_employee_fail: "Fail to create employee",
		company_create_employee_panel_input_name: "Please input name",
		company_create_employee_panel_input_id_number: "Please input ID number", 
		company_create_employee_panel_input_passcode: "Please input passcode",
		company_create_employee_panel_reinput_passcode: "Please input passcode again",
		company_create_employee_panel_no_permission: "No permission",
		company_create_employee_panel_pemission_manage_employee: "Manage employee",
		company_create_employee_panel_pemission_manage_leave: "Sign off leave",
		company_create_employee_panel_pemission_manage_working_record: "Working record",
		company_create_employee_panel_pemission_manage_accounting: "Accounting",

		employee_not_found: "Employee not found",
		employee_login_success: "Employee login success",
		employee_passcode_or_id_number_already_token: "Employee passcode or id number already token",

		load_success: "Resource load success",
		load_fail: "Fail to load resource",
		load_stock_start: "Start to load stock",
	},
	zh: {
		cancel: "取消",
		submit: "送出",
		confirm: "確認",
		content_not_set_yet: "尚未設定內容",

		system_preparing: "系統準備中，請稍候...",

		username_already_token: "帳號已經被使用",
		username_or_password_wrong: "帳號或密碼錯誤",
		logout: "登出",

		database_init_fail: "資料庫初始化錯誤",

		company_register_start: "開始進行公司註冊",
		company_register_success: "公司帳號註冊完成",
		company_register_fail: "公司帳號註冊失敗",

		company_login_start: "開始登入公司帳號",
		company_login_success: "公司帳號登入成功",
		company_login_fail: "公司帳號登入失敗",

		company_login_status_no_record: "查詢不到您的登入記錄，請重新登入",
		company_login_status_read_fail: "登入記錄讀取失敗",
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

		logout_panel_msssage: "確定要登出系統嗎？",

		company_create_employee: "新增員工",
		company_create_employee_start: "開始建立員工",
		company_create_employee_success: "成功建立員工資料",
		company_create_employee_fail: "建立員工資料失敗",
		company_create_employee_panel_input_name: "請輸入姓名",
		company_create_employee_panel_input_id_number: "請輸入員工編號", 
		company_create_employee_panel_input_passcode: "請輸入登入密碼",
		company_create_employee_panel_reinput_passcode: "再次輸入登入密碼",
		company_create_employee_panel_no_permission: "無此權限",
		company_create_employee_panel_pemission_manage_employee: "管理公司員工名單e",
		company_create_employee_panel_pemission_manage_leave: "簽核請假單",
		company_create_employee_panel_pemission_manage_working_record: "管理員工工作記錄",
		company_create_employee_panel_pemission_manage_accounting: "管理公司薪資帳務",

		employee_not_found: "找不到此員工紀錄",
		employee_login_success: "員工登入成功",
		employee_passcode_or_id_number_already_token: "登入密碼或員工編號已經有人使用",

		load_success: "資料下載成功",
		load_fail: "資料下載失敗",
		load_stock_start: "開始下載產品資料",
	}
};

module.exports = I18n;