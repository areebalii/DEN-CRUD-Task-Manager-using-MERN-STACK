// helper/getZodError.js
export const getZodError = (issues) => {
  const errorObj = {};
  issues.forEach(issue => {
    errorObj[issue.path[0]] = issue.message;
  });
  return errorObj;
};
