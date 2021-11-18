// 保存数据
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
export const getItem = (key) => {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch (err) {
    return value
  }
}
// 删除 单个
export const deleteItem = (key) => {
  window.localStorage.removeItem(key)
}
// 清空所有
export const clearItem = () => {
  window.localStorage.deleteItem()
}
