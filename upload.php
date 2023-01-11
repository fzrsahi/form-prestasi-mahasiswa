<?php

function uploadFile($file, $target_dir = 'uploads/')
{
  $response = [
    "status" => "success",
    "message" => "Berhasil mengunggah file",
    "filename" => "",
    "filepath" => ""
  ];

  // upload file
  $target_file = $target_dir . basename($file["name"]);
  $fileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
  $target_file = $target_dir . uniqid(rand()) . '.' . $fileType;

  // Check if file is an actual image or fake image
  if (!filesize($file["tmp_name"])) {
    $response['status'] = 'error';
    $response['message'] = 'File yang diupload bukan gambar.';
    return json_encode($response);
  }

  // Allow certain file formats
  if (
    $fileType !== "jpg" &&
    $fileType !== "png" &&
    $fileType !== "jpeg" &&
    $fileType !== "pdf"
  ) {
    $response['status'] = 'error';
    $response['message'] = 'Maaf, hanya file JPG, JPEG, PNG & PDF yang diperbolehkan.';
    return json_encode($response);
  }

  if (!move_uploaded_file($file["tmp_name"], $target_file)) {
    $response['status'] = 'error';
    $response['message'] = 'Maaf, terdapat error saat mengupload file.';
    return json_encode($response);
  }

  $response['status'] = 'success';
  $response['message'] = 'Berhasil mengunggah file.';
  $response["filename"] = basename($target_file);
  $response["filepath"] = $target_file;
  return json_encode($response);
}

// menggunakan fungsi uploadFile untuk upload sertifikat ke $targetDir
$file = $_FILES['sertifikat'];
$targetDir = 'uploads/';
// fungsi ini mengembalikan json
$response = uploadFile($file, $targetDir);

// LOG
$data = json_decode($response, true);
$date = date('[H:i:s] l, M jS Y');
$name = $_POST['name'] ?? 'Anonym';
$filepath = $data['filepath'];
$filename = $data['filename'];
$status = $data['status'];
$message = $data['message'];
$str = "
$date
name    : $name
file    : $filepath
status  : $status
message : $message
===============================";
file_put_contents('upload/logs.txt', $str, FILE_APPEND);


// cetak string json sebagai response
// echo $response;

// redirect ke minatbakat.php
$_SESSION['filename'] = $filename;
header('Location: minatbakat.php');
