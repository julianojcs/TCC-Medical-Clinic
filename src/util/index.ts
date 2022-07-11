export const transformPhone = (value: string): string => {
  return value.replace(/\D/g, '');
};

export const transformPhones = (value: string[] = []): string[] => {
  if (value.length === 0) return [];
  return value.map((value) => transformPhone(value), '');
};

export const transformName = (value: string): string => {
  return value
    ?.split(' ')
    .map((s) => {
      return s.length > 2
        ? s[0].toUpperCase() + s.slice(1).toLowerCase()
        : s.toLowerCase();
    })
    .join(' ');
};

export const transformEmail = (value: string): string => {
  return value?.toLowerCase();
};
