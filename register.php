<?php
error_reporting(E_ALL);
ini_set('display_errors',1);


require 'vendor/autoload.php'; // Include Composer's autoloader

use MongoDB\Client;

try {
    // Connect to MongoDB
    $client = new Client("mongodb://localhost:27017");
    $db = $client->moneytracking;
    $collection = $db->users;

    echo "MongoDB Connection successful"; // Debugging statement
} catch (Exception $e) {
    die("Connection failed: " . $e->getMessage());
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $password = $_POST['password']; // Password needs hashing
    $dob = filter_input(INPUT_POST, 'dob', FILTER_SANITIZE_STRING);

    if (empty($username) || empty($email) || empty($password) || empty($dob)) {
        echo "<script>alert('All fields are required!'); window.location.href='register.html';</script>";
        exit();
    }

    // Check if user already exists
    $user = $collection->findOne(['email' => $email]);
    if ($user) {
        echo "<script>alert('User already exists.'); window.location.href='register.html';</script>";
        exit();
    }

    // Hash the password before storing
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert user into the database
    $result = $collection->insertOne([
        'username' => $username,
        'email' => $email,
        'password' => $hashedPassword,
        'dob' => $dob
    ]);

    if ($result->getInsertedCount() === 1) {
        echo "<script>alert('Registration successful. Redirecting to home page...'); window.location.href='index.html';</script>";
    } else {
        echo "<script>alert('Registration failed. Please try again.'); window.location.href='register.html';</script>";
    }
}
?>
