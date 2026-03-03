<?php
// SMTP and application configuration
// IMPORTANT: Update these values for your server and protect this file via .htaccess

return [
    'smtp_host'        => 'mail.your-server.de',
    'smtp_port'        => 587,
    'smtp_user'        => 'myplanb@bedeutsam.at',
    'smtp_pass'        => '',  // <-- Passwort hier eintragen
    'smtp_from'        => 'myplanb@bedeutsam.at',
    'recipient_emails' => 'christoph.donner@posteo.at',
    'calendly_url'     => 'https://calendly.com/myplanb',
];
