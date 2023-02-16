

/**
 * 去重：将数组转为Set进行去重，再展开返回
 * @param {*} arr 
 */
const uniqueArr = (arr) => [...new Set(arr)];