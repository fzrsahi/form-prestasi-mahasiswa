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

function getFile(base64) {
  // const base64 = sessionStorage.getItem(id);

  const base64_arr = base64.split(",");
  const img_format = base64_arr[0].split(";")[1];
  const img_content = base64_arr[1];

  return new File([img_content], "SERTIFIKAT", { type: img_format });
}
