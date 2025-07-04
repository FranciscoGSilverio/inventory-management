export const formDataToObject = (formData: FormData): Record<string, any> => {
  const obj: Record<string, any> = {};
  for (const [key, value] of formData.entries()) {
    obj[key] = value;
  }
  return obj;
};
