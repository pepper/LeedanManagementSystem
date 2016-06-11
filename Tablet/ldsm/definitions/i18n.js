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

		company_create_daybook: "Create day book",
		company_create_daybook_start: "Start create day book",
		company_create_daybook_success: "Create day book success",
		company_create_daybook_fail: "Fail to create day book",
		company_create_daybook_panel_input_title: "Please input title",

		employee_not_found: "Employee not found",
		employee_login_success: "Employee login success",
		employee_passcode_or_id_number_already_token: "Employee passcode or id number already token",

		stock_sku_number_already_token: "Stock SKU number must be unique",
		product_sku_number_already_token: "Product SKU number must be unique",

		day_book_type_title: "Category",
		day_book_total_amount_title: "Amount",
		day_book_add_new_type: "Add new type",
		day_book_change_day: "Change day range",
		day_book_add_new_record: "Add new record",
		day_book_title_already_token: "This title already token",
		day_book_amount_must_grade_then_zero: "Amount must grade then 0",
		day_book_add_new_type_input_type: "Please input type",
		day_book_need_select_day_book_first: "You need select one day book",
		day_book_add_new_type_success: "Create new day book type success",
		day_book_add_new_record_input_title: "Please input title",
		day_book_add_new_record_input_amount: "Please input amount",
		day_book_add_new_record_select_type: "Select a type",
		day_book_add_new_record_new_type: "Create a new type...",
		day_book_add_new_record_input_new_type: "Please input new type",
		day_book_add_new_record_amount_must_number: "Amount must be number and grade then 0",
		day_book_add_new_record_input_note: "Please input note",
		day_book_add_new_recoed_success: "Create new day book record success",
		day_book_confirm_remove_record: "Do you sure to remove this record?",
		day_book_remove_recoed_success: "Remove day book record success",
		
		load_success: "Resource load success",
		load_fail: "Fail to load resource",
		load_stock_start: "Start to load stock",
		load_supplier_start: "Start to load supplier",
		load_product_start: "Start to load product",
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
		company_create_employee_panel_pemission_manage_employee: "管理公司員工名單",
		company_create_employee_panel_pemission_manage_leave: "簽核請假單",
		company_create_employee_panel_pemission_manage_working_record: "管理員工工作記錄",
		company_create_employee_panel_pemission_manage_accounting: "管理公司薪資帳務",

		company_create_daybook: "新增帳目類別",
		company_create_daybook_start: "開始建立帳簿",
		company_create_daybook_success: "成功建立帳簿資料",
		company_create_daybook_fail: "建立帳簿資料失敗",
		company_create_daybook_panel_input_title: "請輸入帳簿標題",

		employee_not_found: "找不到此員工紀錄",
		employee_login_success: "員工登入成功",
		employee_passcode_or_id_number_already_token: "登入密碼或員工編號已經有人使用",

		stock_sku_number_already_token: "庫存料號必須要獨一無二",
		product_sku_number_already_token: "產品料號必須要獨一無二",

		day_book_type_title: "帳目分類",
		day_book_total_amount_title: "總金額",
		day_book_add_new_type: "新增帳目分類標籤",
		day_book_change_day: "更改日期區間",
		day_book_add_new_record: "新增紀錄",
		day_book_title_already_token: "此帳目名稱已經被使用，請更換一個",
		day_book_amount_must_grade_then_zero: "金額必須大於零",
		day_book_add_new_type_input_type: "請輸入分類",
		day_book_need_select_day_book_first: "請先選擇一本帳簿",
		day_book_add_new_type_success: "成功新增一個帳目分類",
		day_book_add_new_record_input_title: "請輸入帳目標題",
		day_book_add_new_record_input_amount: "請輸入金額",
		day_book_add_new_record_select_type: "請選擇一個分類",
		day_book_add_new_record_new_type: "新增一個分類...",
		day_book_add_new_record_input_new_type: "請輸入一個新的分類名稱",
		day_book_add_new_record_amount_must_number: "金額必須要是大於零的數字",
		day_book_add_new_record_input_note: "請輸入備註",
		day_book_add_new_recoed_success: "新增帳目成功",
		day_book_confirm_remove_record: "確定要刪除這筆帳目嗎？",
		day_book_remove_recoed_success: "帳目資料刪除成功",
		
		load_success: "資料下載成功",
		load_fail: "資料下載失敗",
		load_stock_start: "開始下載庫存資料",
		load_supplier_start: "開始下載供應商資料",
		load_product_start: "開始下載產品資料",
	}
};

module.exports = I18n;