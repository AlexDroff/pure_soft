export function sanitizePhone(value: string): string {
  if (!value) return value;
  const cleaned = value.trim().replace(/[^\d+]/g, "");
  if (cleaned.startsWith("+")) {
    return "+" + cleaned.slice(1).replace(/\D/g, "");
  }
  return cleaned.replace(/\D/g, "");
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}
