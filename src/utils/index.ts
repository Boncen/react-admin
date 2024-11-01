
/**
 * 判断当前是否为开发环境
 * @returns boolean
 */
function isDevelopmentEnv() {
  return import.meta.env.MODE == "development";
}

export {
  isDevelopmentEnv,
};
