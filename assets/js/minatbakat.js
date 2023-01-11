/*
https://docs.google.com/forms/d/e/1FAIpQLSdCIGg8ivWHMF1iGEfFLm93f9kdDab74ABqDJawNQljkBUJ9g/formResponse

entry.794704773=NAMA
entry.1541333536=NIM
entry.1077676743=PROGRAMSTUDI
entry.482518216=SEMESTER
entry.1699025632=PENGALAMANORGANISASI
entry.641476423=PRESTASIAKADEMIK
entry.1224466415=URAIANPRESTASIAKADEMIK
entry.1033499497=PRESTASINONAKADEMIK
entry.1391655594=URAIANPRESTASINONAKADEMIK
entry.1631384840=Karya+Tulis+Ilmiah
entry.1631384840=Debat+Ilmiah
entry.1631384840=Orasi+Bahasa+Asing
entry.1631384840=Penelitian
entry.1631384840=Pengabdian+Kepada+Masyarakat
entry.1631384840=Lainnya
entry.358306769=URAIANMINATAKADEMIK
entry.513091603=Olahraga
entry.513091603=Kesenian
entry.513091603=Jurnalistik
entry.513091603=Keagamaan
entry.513091603=Kewirausahaan
entry.513091603=Korganisasian
entry.513091603=Lainnya
entry.265211466=URAIANMINATNONAKADEMIK
entry.1219538418=Karya+Tulis+Ilmiah
entry.1219538418=Debat+Ilmiah
entry.1219538418=Orasi+Bahasa+Asing
entry.1219538418=Penelitian
entry.1219538418=Pengabdian+Kepada+Masyarakat
entry.1219538418=Lainnya
entry.548246493=URAIANBAKATAKADEMIK
entry.407005584=Olahraga
entry.407005584=Kesenian
entry.407005584=Jurnalistik
entry.407005584=Keagamaan
entry.407005584=Kewirausahaan
entry.407005584=Keorganisasian
entry.407005584=Lainnya
entry.1672378515=URAIANBAKATNONAKADEMIK
entry.995987695=SERTIFIKAT
*/

const storageDataDiri = new Storage_("data-diri");
const storagePrestasi = new Storage_("prestasi");

const element = {
  // Data Diri
  nama: document.getElementById("nama"),
  nim: document.getElementById("nim"),
  prodi: document.getElementById("prodi"),
  semester: document.getElementById("semester"),
  pengalaman_organisasi: document.getElementById("pengalaman_organisasi"),

  // Prestasi
  prestasi_akademik: document.getElementById("prestasi_akademik"),
  uraian_prestasi_akademik: document.getElementById("uraian_prestasi_akademik"),
  prestasi_nonakademik: document.getElementById("prestasi_nonakademik"),
  uraian_prestasi_nonakademik: document.getElementById(
    "uraian_prestasi_nonakademik"
  ),
};

const checks = [
  {
    boxes: document.querySelectorAll("#checkSatu input[type=checkbox]"),
    message: document.getElementById("message"),
  },
  {
    boxes: document.querySelectorAll("#checkDua input[type=checkbox]"),
    message: document.getElementById("messageDua"),
  },
  {
    boxes: document.querySelectorAll("#checkTiga input[type=checkbox]"),
    message: document.getElementById("messageTiga"),
  },
  {
    boxes: document.querySelectorAll("#checkEmpat input[type=checkbox]"),
    message: document.getElementById("messageEmpat"),
  },
];

const dataDiri = storageDataDiri.getFirst();
const prestasi = storagePrestasi.getFirst();
fillForm();

const backBtn = document.getElementById("back-btn");
const submitBtn = document.getElementById("submit-btn");
const loaderBtn = document.getElementById("loader-btn");
const form = document.getElementById("form");
const formAction = form.action;

backBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // arahkan ke halaman sebelumnya
  location.href = "prestasi.html";
});

// untuk setiap checkbox group
for (const check of checks) {
  // untuk setiap checkbox
  for (const checkbox of check.boxes) {
    // lakukan validasi ketika ada event on change
    checkbox.addEventListener("change", function () {
      validateCheckboxes(check.boxes, check.message);
    });
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // batalkan submit jika ada checkbox yang tidak valid
  if (checks.some(({ boxes }) => !isValid(boxes))) return;

  const urlParams = new URLSearchParams();
  for (const input of form.elements)
    if (input.name && input.value)
      if (input.checked || input.type !== "checkbox")
        urlParams.append(input.name, input.value);

  let url = formAction + "?" + urlParams.toString();

  form.classList.add("pe-none");
  submitBtn.classList.add("d-none");
  loaderBtn.classList.remove("d-none");

  const formData = new FormData();
  const sertifikatAkademik = getFile(prestasi.akademik.sertifikat);
  // const sertifikatNonAkademik = getFile(prestasi.nonakademik.sertifikat);
  formData.append("name", dataDiri.nama);
  formData.append(`sertifikat`, sertifikatAkademik);
  // upload file
  fetch("upload.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      // send data to google
      console.log("fetching data to: " + url);
      fetch(url, {
        mode: "no-cors",
      })
        .then(() => {
          sessionStorage.setItem("success", "Berhasil menyimpan data");
          storageDataDiri.empty();
          storagePrestasi.empty();
          location.href = "index.html";
        })
        .catch(() => {
          sessionStorage.setItem("error", "Gagal menyimpan data");
          location.reload(true);
        });
    });
});

function validateCheckboxes(checkboxes, messageElement) {
  if (isValid(checkboxes)) {
    // Menghapus atribut disabled pada tombol submit jika ada setidaknya satu checkbox yang terpilih
    submitBtn.removeAttribute("disabled");
    messageElement.innerHTML = "";
  } else {
    // Menambahkan atribut disabled pada tombol submit-btn jika tidak ada checkbox yang terpilih
    submitBtn.setAttribute("disabled", true);
    messageElement.innerHTML =
      "Silakan pilih setidaknya satu checkbox Pada Minat Bidang Akademik";
  }
}

function isValid(checkboxes) {
  return [...checkboxes].some((checkbox) => checkbox.checked);
}

function fillForm() {
  if (dataDiri) {
    // Data Diri
    element.nama.value = dataDiri.nama;
    element.nim.value = dataDiri.nim;
    element.prodi.value = dataDiri.prodi;
    element.semester.value = dataDiri.semester;
    element.pengalaman_organisasi.value = dataDiri.pengalaman_organisasi;
  }

  if (prestasi) {
    // Prestasi
    const { akademik, nonakademik } = prestasi;
    const { olimpiade, kti, debat } = akademik;
    element.prestasi_akademik.value += olimpiade.peringkat
      ? `${olimpiade.peringkat} Olimpiade Sains${
          olimpiade.tingkat ? " " + olimpiade.tingkat : ""
        }, `
      : "";

    element.prestasi_akademik.value += kti.peringkat
      ? `${kti.peringkat} Karya Tulis Ilmiah${
          kti.tingkat ? " " + kti.tingkat : ""
        }, `
      : "";

    element.prestasi_akademik.value += debat.peringkat
      ? `${debat.peringkat} Debat/sejenis${
          debat.tingkat ? " " + debat.tingkat : ""
        }, `
      : "";

    element.prestasi_akademik.value += akademik.lainnya.peringkat
      ? `${akademik.lainnya.peringkat} Lomba Lainnya${
          akademik.lainnya.tingkat ? " " + akademik.lainnya.tingkat : ""
        }`
      : "";

    element.uraian_prestasi_akademik.value = akademik.uraian;

    const {
      olahraga,
      kesenian,
      jurnalistik,
      keagamaan,
      kewirausahaan,
      keorganisasian,
    } = nonakademik;
    element.prestasi_nonakademik.value += olahraga.peringkat
      ? `${olahraga.peringkat} Olahraga${
          olahraga.tingkat ? " " + olahraga.tingkat : ""
        }, `
      : "";
    element.prestasi_nonakademik.value += kesenian.peringkat
      ? `${kesenian.peringkat} Kesenian${
          kesenian.tingkat ? " " + kesenian.tingkat : ""
        }, `
      : "";
    element.prestasi_nonakademik.value += jurnalistik.peringkat
      ? `${jurnalistik.peringkat} Jurnalistik${
          jurnalistik.tingkat ? " " + jurnalistik.tingkat : ""
        }, `
      : "";
    element.prestasi_nonakademik.value += keagamaan.peringkat
      ? `${keagamaan.peringkat} Keagamaan${
          keagamaan.tingkat ? " " + keagamaan.tingkat : ""
        }, `
      : "";
    element.prestasi_nonakademik.value += kewirausahaan.peringkat
      ? `${kewirausahaan.peringkat} Kewirausahaan${
          kewirausahaan.tingkat ? " " + kewirausahaan.tingkat : ""
        }, `
      : "";
    element.prestasi_nonakademik.value += keorganisasian.peringkat
      ? `${keorganisasian.peringkat} Keorganisasian${
          keorganisasian.tingkat ? " " + keorganisasian.tingkat : ""
        }, `
      : "";

    element.prestasi_nonakademik.value += nonakademik.lainnya.peringkat
      ? `${nonakademik.lainnya.peringkat} Lomba Lainnya${
          nonakademik.lainnya.tingkat ? " " + nonakademik.lainnya.tingkat : ""
        }`
      : "";
    element.uraian_prestasi_nonakademik.value = nonakademik.uraian;
  }
}
