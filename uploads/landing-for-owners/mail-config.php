<?php
/**
 * @descr Mail configuration
 * @changed 2024.10.16, 20:04
 */

$fromName = 'FS-Property';
$fromEmail = 'fsp@fsproperty.ru';

$toEmailDebug = 'dmia@yandex.ru';
$toEmailProduction = 'lilliputten@yandex.ru';
// $toEmailProduction = 'lilliputten@gmail.com';
// TODO: Add multiple 'to' or 'cc' fields
// fsp@fsproperty.ru
// master@masterstar.ru

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
