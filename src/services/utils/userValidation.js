export const usernameValidation = (username) => {
  if (!username) return "Username is required"
  if (username.length < 4) return "Username must be at least 4 characters"
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return "Only letters, numbers and _ allowed"
  return null
}

export const passwordValidation = (password, confirmPassword) => {
  if (!password && !confirmPassword) return "Password is required"

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,20}$/
  if (password !== confirmPassword) return "Passwords do not match"
  if (!passwordRegex.test(password)) return "Password must be at least 8 characters, including uppercase, lowercase and a number"
  return null
}