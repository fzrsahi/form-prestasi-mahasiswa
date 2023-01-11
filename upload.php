<?php

function uploadFile($file, $target_dir = 'uploads/')
{
  // upload file
  $target_file = $target_dir . basename($file["name"]);
  $fileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
  $target_file = $target_dir . uniqid(rand()) . '.' . $fileType;

  // Check if file is an actual image or fake image
  if (!filesize($file["tmp_name"]))
    return json_encode([
      "status" => "error",
      "message" => "File yang diupload bukan gambar."
    ]);


  // Allow certain file formats
  if (
    $fileType !== "jpg" &&
    $fileType !== "png" &&
    $fileType !== "jpeg" &&
    $fileType !== "pdf"
  )
    return json_encode([
      "status" => "error",
      "message" => "Maaf, hanya file JPG, JPEG, PNG & PDF yang diperbolehkan."
    ]);


  if (!move_uploaded_file($file["tmp_name"], $target_file))
    return json_encode([
      "status" => "error",
      "message" => "Maaf, terdapat error saat mengupload file."
    ]);


  return json_encode([
    "status" => "success",
    "message" => "Berhasil mengunggah file",
    "filename" => basename($target_file),
    "filepath" => $target_file
  ]);
}

// menggunakan fungsi uploadFile untuk upload sertifikat ke $targetDir
$file = $_FILES['sertifikat'];
$targetDir = 'uploads/';
// fungsi ini mengembalikan json
$response = uploadFile($file, $targetDir);

// cetak string json sebagai response
echo $response;
