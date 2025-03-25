<?php
require 'vendor/autoload.php'; // Include Composer's autoloader

$client = new MongoDB\Client("mongodb://localhost:27017");
$collection = $client->moneytracking->users;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $user = $collection->findOne(['email' => $email]);

    if ($user && password_verify($password, $user['password'])) {
        echo "<script>alert('Login successful. Redirecting to home page...'); window.location.href='index.html';</script>";
    } else {
        echo "<script>alert('Invalid credentials.'); window.location.href='login.html';</script>";
    }
}
?>


