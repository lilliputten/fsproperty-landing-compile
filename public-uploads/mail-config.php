<?php
/**
 * @descr Mail configuration
 * @changed 2024.10.21, 11:17
 */

// $gcaptchaSecretKey = '...'; // See in `mail-config-override.php`

/** Return error if sent from another address */
$checkPageUrl = 'https://fsproperty.ru/';

$fromName = 'FS-Property';
$fromEmail = 'fsp@fsproperty.ru';

$toEmailDebug = 'dmia@yandex.ru';
$toEmailProduction = [
  'fsp@fsproperty.ru',
  'master@masterstar.ru',
  $toEmailDebug,
];

$mailSubject = 'Заявка с сайта';

$formFields = array(
  'name' => 'Имя',
  'email' => 'E-mail',
  'phone' => 'Телефон',
  'comment' => 'Комментарий',
  'text' => 'Текст',
  '_pageId' => 'Страница',
  '_pageUrl' => 'Адрес страницы на сайте',
  '_ip' => 'IP адрес',
  '_date' => 'Дата',
);

$requiredFields = array(
  'name',
  'email',
  'phone',
);
$multilineFields = ['comment'];
