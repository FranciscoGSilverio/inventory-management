export const objectToFormData = (obj: Record<string, any>): FormData => {
  const formData = new FormData();

  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) {
      formData.append(key, String(obj[key]));
    }
  }

  return formData;
};
