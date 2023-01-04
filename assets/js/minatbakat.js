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

entry.794704773=NAMA
entry.1541333536=NIM
entry.1077676743=PRODI
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

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const urlParams = new URLSearchParams();
  for (const input of form.elements) {
    if (input.name && input.value) {
      if (input.checked || input.type !== "checkbox")
        urlParams.append(input.name, input.value);
    }
  }

  let url = formAction + "?" + urlParams.toString();

  form.classList.add("pe-none");
  submitBtn.classList.add("d-none");
  loaderBtn.classList.remove("d-none");
  fetch(url, {
    mode: "no-cors",
  })
    .then(() => {
      localStorage.setItem("success", "Berhasil menyimpan data");
      location.reload(true);
    })
    .catch(() => {
      localStorage.setItem("error", "Gagal menyimpan data");
      location.reload(true);
    });
});

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
