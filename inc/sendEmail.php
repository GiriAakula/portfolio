 //PHP Script
<?php
require 'PHPMailer/PHPMailerAutoload.php';


// Fetching data that is entered by the user
$contactName = $_POST['contactName'];
$contactEmail = $_POST['contactEmail'];
$contactMessage = $_POST['contactMessage'];
$contactSubject = $_POST['contactSubject'];

// Configuring SMTP server settings
$mail = new PHPMailer;
$mail->isSMTP();
$mail->Host = 'cpanel.freehosting.com';
$mail->Port = 465;
$mail->SMTPSecure = 'ssl';
$mail->SMTPAuth = true;
$mail->Username = "me@giriaakula.com";
$mail->Password = "9701732638";

// Email Sending Details
$mail->addAddress($contactEmail);
$mail->Subject = $contactSubject;
$mail->msgHTML($contactMessage);

// Success or Failure
if(!$mail->send()) 
{
    echo "Mailer Error: " . $mail->ErrorInfo;
} 
else 
{
    echo "Message has been sent successfully";
}
?>
