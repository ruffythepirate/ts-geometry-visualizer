
export function camelToSnakeCase(text: String) : String {
  const reg = /([A-Z])/g;

  return text.replace(reg, text => `-${text.toLowerCase()}`);
}
