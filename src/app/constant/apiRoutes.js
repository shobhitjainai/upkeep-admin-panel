export const API_ROUTES = {
  signIn: "upkeep/app/auth/login",
  getMe: 'upkeep/app/auth/me',
  forgotpPassword: "app/forgot-password",
  verifyOtp: "app/verify-otp",
  signUp: "upkeep/app/auth/signup",
  updatePassword: "app/update-password",
  getAllForms: "app/get/all-forms",
  createForm: "app/create/form",
  deleteFormListItem: "app/delete",
  getFormById: "app/getform",
  getFormBySerialNo: "app/get/form",
  updateWholeForm: "app/update-form",
  submitFormData: "app/form-value/create",
  getUserProfile: "app/me",
  updateProfile: "app/update-profile",
  createGroup: "app/create-group",
  fetchGroups: "app/fetch-group",
  createEmployee: "app/create-employee",
  deleteEmployee: "app/delete-employee",
  updateEmployee: "app/update-employee",
  updateGroupName: "app/update-group",
  deleteGroup: "app/delete-group",
  createAppTemplate: "app/create-template",
  fetchAppTemplates: "app/get-all-template",
  deleteAppTemplate: "app/delete/template",
  createProject: "app/create-project",
  deleteProject: "app/delete-project",
  fetchProject: "app/fetch-project",
  updateProject: 'app/update-project',
  getProjectById: 'app/fetch-project-by'
};

export const initialAPIParams = {
  limit: 10,
  page: 1,
};

export const getAccessToken = () => {
  return window.localStorage.getItem("jwt_access_token");
};