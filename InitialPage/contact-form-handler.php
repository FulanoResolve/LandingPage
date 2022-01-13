<?php

$name = $_POST['name'];
$visitor_email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$email_from = 'info@fulanoresolve.com.br';

$email_subject = 'Novo envio';

$email_body =  "Nome do usuário: $name.\n".
                "Email do usuário: $visitor_email.\n".
                 "Assunto: $subject.\n".
                  "Mensagem do usuário: $message.\n";

$to = 'contato@fulanoresolve.com.br';

$headers = "From: $email_from \r\n";

$headers .= "Reply-To: $visitor_email \r\n";

mail($to,$email_subject,$email_body,$headers);

header("Location: contact.html")

?>