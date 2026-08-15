export function validateName(name) {
  if (name.length < 20 || name.length > 60) return 'Name must be 20-60 characters';
  return '';
}

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return 'Enter a valid email address';
  return '';
}

export function validateAddress(address) {
  if (address.length > 400) return 'Address must be under 400 characters';
  return '';
}

export function validatePassword(password) {
  if (password.length < 8 || password.length > 16) return 'Password must be 8-16 characters';
  if (!/[A-Z]/.test(password)) return 'Password must include an uppercase letter';
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password must include a special character';
  return '';
}