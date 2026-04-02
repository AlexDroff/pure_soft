// Utility file 'formatPhoneNumber'. Provides a reusable helper function for the application.
export function formatPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}
