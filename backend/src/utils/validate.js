const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

const validateSignup = (payload) => {
  if (!payload?.fullName || !payload?.email || !payload?.password || !payload?.confirmPassword) {
    return { error: { details: [{ message: 'fullName, email, password, and confirmPassword are required' }] } };
  }

  if (typeof payload.fullName !== 'string' || payload.fullName.trim().length < 3) {
    return { error: { details: [{ message: 'fullName must be at least 3 characters' }] } };
  }

  if (!validateEmail(payload.email)) {
    return { error: { details: [{ message: 'email must be valid' }] } };
  }

  if (typeof payload.password !== 'string' || payload.password.length < 8) {
    return { error: { details: [{ message: 'password must be at least 8 characters' }] } };
  }

  if (payload.password !== payload.confirmPassword) {
    return { error: { details: [{ message: 'password and confirmPassword do not match' }] } };
  }

  const allowedRoles = ['student', 'freelancer'];
  const role = allowedRoles.includes(payload.role) ? payload.role : 'student';

  return {
    value: {
      fullName: String(payload.fullName).trim(),
      email: String(payload.email).toLowerCase(),
      password: payload.password,
      role,
    },
  };
};

const validateLogin = (payload) => {
  if (!payload?.email || !payload?.password) {
    return { error: { details: [{ message: 'email and password are required' }] } };
  }

  if (!validateEmail(payload.email)) {
    return { error: { details: [{ message: 'email must be valid' }] } };
  }

  return { value: { email: String(payload.email).toLowerCase(), password: payload.password } };
};

export { validateSignup, validateLogin };
