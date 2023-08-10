export enum USER_FORM_KEY {
  fullName = "fullname",
  email = "email",
  birthday = "birthday",
  address = "address"
}

export const INITIAL_USER_FORM = {
  [USER_FORM_KEY.fullName]: "",
  [USER_FORM_KEY.email]: "",
  [USER_FORM_KEY.birthday]: "",
  [USER_FORM_KEY.address]: ""
};
