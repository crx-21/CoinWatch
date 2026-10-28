/* ================================================================
   MLJobWatch — Client-side form handling
   ================================================================ */

/* ------------------------------------------------------------------ */
/*  Form helpers                                                      */
/* ------------------------------------------------------------------ */
function clearErrors(form) {
  form.querySelectorAll(".error-msg").forEach((el) => {
    el.textContent = "";
    el.classList.remove("visible");
  });
  form.querySelectorAll("input.error").forEach((input) => {
    input.classList.remove("error");
  });
}

function showError(inputId, message, form) {
  const errorEl = document.getElementById(inputId);
  const input = document.getElementById(inputId.replace("-error", ""));
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add("visible");
  }
  if (input) {
    input.classList.add("error");
  }
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/* ------------------------------------------------------------------ */
/*  Login form handler                                                */
/* ------------------------------------------------------------------ */
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors(loginForm);

  const emailInput = document.getElementById("login-email");
  const passwordInput = document.getElementById("login-password");
  const btn = document.getElementById("login-btn");

  let hasError = false;

  if (!emailInput.value.trim()) {
    showError("login-email-error", "Email is required", loginForm);
    hasError = true;
  } else if (!isValidEmail(emailInput.value.trim())) {
    showError("login-email-error", "Please enter a valid email", loginForm);
    hasError = true;
  }

  if (!passwordInput.value) {
    showError("login-password-error", "Password is required", loginForm);
    hasError = true;
  }

  if (hasError) return;

  // Hardcoded login - accept any credentials
  setLoginLoading(btn, true);
  setTimeout(() => {
    setLoginLoading(btn, false);
    
    // Store auth state
    const user = {
      email: emailInput.value.trim(),
      name: emailInput.value.trim().split('@')[0],
      loggedInAt: new Date().toISOString()
    };
    localStorage.setItem('mljobwatch_user', JSON.stringify(user));
    sessionStorage.setItem('mljobwatch_auth', 'true');
    
    // Redirect to jobs page
    window.location.href = 'jobs.html';
  }, 1000);
});

function setLoginLoading(btn, loading) {
  btn.disabled = loading;
  btn.textContent = loading ? "Signing in..." : "Sign in";
}

/* ------------------------------------------------------------------ */
/*  Register form handler                                             */
/* ------------------------------------------------------------------ */
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors(registerForm);

  const fullnameInput = document.getElementById("reg-fullname");
  const emailInput = document.getElementById("reg-email");
  const passwordInput = document.getElementById("reg-password");
  const confirmInput = document.getElementById("reg-confirm-password");
  const btn = document.getElementById("register-btn");

  let hasError = false;

  if (!fullnameInput.value.trim()) {
    showError("reg-fullname-error", "Full name is required", registerForm);
    hasError = true;
  } else if (fullnameInput.value.trim().length < 2) {
    showError("reg-fullname-error", "Name must be at least 2 characters", registerForm);
    hasError = true;
  }

  if (!emailInput.value.trim()) {
    showError("reg-email-error", "Email is required", registerForm);
    hasError = true;
  } else if (!isValidEmail(emailInput.value.trim())) {
    showError("reg-email-error", "Please enter a valid email", registerForm);
    hasError = true;
  }

  if (!passwordInput.value) {
    showError("reg-password-error", "Password is required", registerForm);
    hasError = true;
  } else if (passwordInput.value.length < 6) {
    showError("reg-password-error", "Password must be at least 6 characters", registerForm);
    hasError = true;
  }

  if (!confirmInput.value) {
    showError("reg-confirm-password-error", "Please confirm your password", registerForm);
    hasError = true;
  } else if (passwordInput.value !== confirmInput.value) {
    showError("reg-confirm-password-error", "Passwords do not match", registerForm);
    hasError = true;
  }

  if (hasError) return;

  // Simulate account creation and auto-login
  setRegisterLoading(btn, true);
  setTimeout(() => {
    setRegisterLoading(btn, false);
    
    // Store auth state (auto-login after registration)
    const user = {
      email: emailInput.value.trim(),
      name: fullnameInput.value.trim(),
      loggedInAt: new Date().toISOString()
    };
    localStorage.setItem('mljobwatch_user', JSON.stringify(user));
    sessionStorage.setItem('mljobwatch_auth', 'true');
    
    // Redirect to jobs page
    window.location.href = 'jobs.html';
  }, 1000);
});

function setRegisterLoading(btn, loading) {
  btn.disabled = loading;
  btn.textContent = loading ? "Creating account..." : "Create account";
}

/* ------------------------------------------------------------------ */
/*  Clear inline errors on input                                      */
/* ------------------------------------------------------------------ */
[loginForm, registerForm].forEach((form) => {
  form.addEventListener("input", (e) => {
    if (e.target.tagName === "INPUT") {
      e.target.classList.remove("error");
      const errorId = `${e.target.id}-error`;
      const errorEl = document.getElementById(errorId);
      if (errorEl) {
        errorEl.textContent = "";
        errorEl.classList.remove("visible");
      }
    }
  });
});