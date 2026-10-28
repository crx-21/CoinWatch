const LOGIN_HASH = "#login";
const REGISTER_HASH = "#register";

const loginView = document.getElementById("login-view");
const registerView = document.getElementById("register-view");

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

const toRegisterLink = document.getElementById("to-register");
const toLoginLink = document.getElementById("to-login");

/* ------------------------------------------------------------------ */
/*  Router                                                            */
/* ------------------------------------------------------------------ */
function route() {
  // Check if already authenticated on login page
  const isAuthenticated = sessionStorage.getItem('mljobwatch_auth') === 'true';
  if (isAuthenticated && window.location.pathname.includes('login.html')) {
    window.location.href = 'jobs.html';
    return;
  }

  const hash = window.location.hash || LOGIN_HASH;

  if (hash === REGISTER_HASH) {
    showView(registerView);
  } else {
    showView(loginView);
    // Normalize hash so the address bar stays consistent
    if (hash !== LOGIN_HASH) {
      window.location.replace(LOGIN_HASH);
    }
  }
}

function showView(activeView) {
  [loginView, registerView].forEach((view) => {
    view.classList.toggle("active", view === activeView);
  });
}

// Initial route + listen for hash changes (back/forward friendly)
window.addEventListener("hashchange", route);
window.addEventListener("load", route);

/* ------------------------------------------------------------------ */
/*  Cross-view navigation links                                       */
/* ------------------------------------------------------------------ */
toRegisterLink.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.hash = REGISTER_HASH;
});

toLoginLink.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.hash = LOGIN_HASH;
});