/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
particlesJS.load("particles-js", "config/particles.json", () =>
  console.log("particles.json loaded")
);

const success = sessionStorage.getItem("success");
const error = sessionStorage.getItem("error");
if (success) {
  alert(success);
  sessionStorage.setItem("success", "");
}
if (error) {
  alert(error);
  sessionStorage.setItem("error", "");
}
