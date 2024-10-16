<?php
/**
 * @descr Mail configuration
 * @changed 2024.10.16, 20:21
 */

$fromName = 'FS-Property';
$fromEmail = 'fsp@fsproperty.ru';

$toEmailDebug = 'dmia@yandex.ru';
$toEmailProduction = [
  // 'fsp@fsproperty.ru',
  // 'master@masterstar.ru',
  $toEmailDebug,
];

$mailSubject = 'Заявка с сайта';

$formFields = array(
  'name' => 'Имя',
  'email' => 'E-mail',
  'phone' => 'Телефон',
  'comment' => 'Комментарий',
  '_pageId' => 'Страница',
  '_pageUrl' => 'Адрес страницы на сайте',
  '_ip' => 'IP адрес',
  '_date' => 'Дата',
);

$multilineFields = ['comment'];
