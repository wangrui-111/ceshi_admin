import i18n from '@/i18n/index.js'
export const passwordValidate = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error(i18n.global.t('msg.login.passwordRule'))) // no $t
    } else {
      callback()
    }
  }
}
export const usernameValidate = () => {
  return (rule, value, callback) => {
    if (value.length <= 0) {
      callback(new Error(i18n.global.t('msg.login.usernameRule'))) // no $t
    } else {
      callback()
    }
  }
}
