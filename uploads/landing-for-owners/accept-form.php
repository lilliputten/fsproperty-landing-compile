<?php
/**
 * @descr Mail sending script
 * @changed 2024.10.16, 20:16
 */

// Write logs to a local file
ini_set('log_errors', 1);
ini_set('error_log', 'php_errors.log');

// Send plain text response
// header('Content-Type: text/plain');

// Import required modules...
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/Exception.php';

// Import config...
include('mail-config.php');

$pageUrl = !empty(@$_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
$pageId = getPageIdFromUrl($pageUrl);

$specialFields = array(
  '_ip' => getClientIpAddress(),
  '_date' => date('Y.m.d G:i'),
  '_pageUrl' => $pageUrl,
  '_pageId' => $pageId,
);

$rawInput = file_get_contents('php://input');
$isJson = substr(@$rawInput, 0, 1) === '{'; // Does it start with json's '{' (php-5 way)?
$postData = $isJson ? objectToArray(json_decode($rawInput)) : $_POST;

// Show data in `php_errors.log` file
// error_log('Data received: ' . print_r($rawInput, true));

$isDebug = !empty(@$postData['debug']);

// Fetch variables...
$toEmail = $isDebug ? $toEmailDebug : $toEmailProduction;

// error_log('toEmail: ' . print_r($toEmail, true));

/* // DEBUG
 * print('Debug: ' . $isDebug . "\n");
 * print('toEmail: ' . $toEmail . "\n");
 * print('pageUrl: ' . $pageUrl . "\n");
 */

function getPageIdFromUrl($pageUrl) {
  $id = $pageUrl;
  $id = preg_replace('/\.html$/', '', $id);
  $id = preg_replace('/^http.*:\/\/[^\/]*\//', '', $id);
  $id = preg_replace('/\/$/', '', $id);
  return $id;
}

function objectToArray($d)
{
  if (is_object($d)) {
    // Gets the properties of the given object
    // with get_object_vars function
    $d = get_object_vars($d);
  }
  if (is_array($d)) {
    /*
    * Return array converted to object
    * Using __FUNCTION__ (Magic constant)
    * for recursive call
    */
    return array_map(__FUNCTION__, $d);
  } else {
    // Return array
    return $d;
  }
}

function getClientIpAddress() {
  global $_SERVER;
  if (!empty(@$_SERVER['HTTP_CLIENT_IP'])) {
    return $_SERVER['HTTP_CLIENT_IP'];
  } elseif (!empty(@$_SERVER['HTTP_X_FORWARDED_FOR'])) {
    return $_SERVER['HTTP_X_FORWARDED_FOR'];
  } elseif (!empty(@$_SERVER['REMOTE_ADDR'])) {
    return $_SERVER['REMOTE_ADDR'];
  }
  return '';
}

function getStyles() {
  return "<style>
  .label { opacity: 0.3; display: inline-block; margin-right: .2em; font-weight: bold; }
  .item { margin: 1em 0; }
  .multiline .value { margin-top: 0.5em; }
  .special { opacity: 0.4; }
</style>";
}

function getFieldsListHtml() {
  global $formFields, $specialFields, $multilineFields, $postData;

  $fields = "";

  // Put all the required fileds into the message text...
  foreach ($formFields as $id => $name) {
    $isSpecial = !empty($specialFields[$id]);
    $value = $isSpecial ? $specialFields[$id] : @$postData[$id];
    if (!empty($value)) {
      $quotedValue = htmlspecialchars(trim($value));
      // Remove 'dos' newslines, remove extra new lines...
      $quotedValue = preg_replace("/\x0d/s", "", $quotedValue);
      $quotedValue = preg_replace("/\n\n\n+/s", "\n\n", $quotedValue);
      $isMultiline = in_array($id, $multilineFields, true) && strpos($quotedValue, "\n") !== false;
      $className = 'item';
      if ($isSpecial) {
        $className .= ' special';
      }
      if ($isMultiline) {
        // Remove ods newslines, remove extra new lines, double newlines with '<br>' tags...
        $quotedValue = preg_replace("/\n/s", "<br/>\n", $quotedValue);
        $fields .= "<div class='$className multiline'>"
          . "<div class='label'>$name:</div>\n\n"
          . "<div class='value'>$quotedValue</div>"
          . "</div>\n\n";
      } else {
        $fields .= "<div class='$className'>"
          . "<span class='label'>$name:</span> "
          . "<span class='value'>$quotedValue</span>"
          . "</div>\n\n";
      }
    }
  }

  return $fields;
}

function getMailHtmlBody() {
  $html = "<html><head>" . getStyles() . "</head><body>\n\n";

  $fields = getFieldsListHtml();

  if (!empty($fields)) {
    $html .= "<h2>Данные заявки:</h2>\n\n";
    $html .= $fields . "\n";
  } else {
    $html .= "<h3>Данные отсутствуют!</h3>\n";
  }

  $html .= "</html></body>\n";

  return $html;
}

function getPlainTextFromHtml($html) {
  $text = $html;
  $text = preg_replace("/<style>.*<\/style>\s*/s", '', $text);
  $text = preg_replace('/<[^<>]*>/', '', $text);
  $text = htmlspecialchars_decode($text); // Isn't it dangerous?
  return trim($text);
}

function sendMail() {
  global $toEmail, $fromEmail, $fromName, $mailSubject;

  // Create mail sender...
  $mail = new PHPMailer();

  // Configure mail sender...
  $mail->IsHTML(true);
  $mail->CharSet = 'UTF-8';
  $mail->Encoding = 'base64';

  // Mail from...
  $mail->setFrom($fromEmail, $fromName);

  // Mail to...
  $mail->addAddress($toEmail);

  // Set subject...
  $mail->Subject = $mailSubject;

  // Set mail html message...
  $htmlBody = getMailHtmlBody();
  $mail->msgHTML($htmlBody);
  // DEBUG
  print("HTML:\n" . $htmlBody . "\n");

  // Set plain text message...
  $textBody = getPlainTextFromHtml($htmlBody);
  $mail->AltBody = $textBody;
  /* // DEBUG
   * print("PLAIN TEXT:\n" . $textBody . "\n");
   */

  $responseData = array(
    'ok' => true, // True -- if the operation was successful
    // 'error' => NULL, // A brief text explaining the error (if any; it will be shown to the user). If successful, do not send anything (either NULL or an empty string).
    '_data_debug' => $postData, // DEBUG: Only for debug purposes
  );

  // Send message...
  if ($mail->send()) {
    http_response_code(200);
    // echo "OK: The mail was successfuly sent\n";
  } else {
    http_response_code(500);
    $errMsg = "Error: " . $mail->ErrorInfo . "\n";
    error_log($errMsg);
    $responseData['ok'] = false;
    $responseData['error'] = $errMsg;
    // echo $errMsg;
  }

  // Return json response...
  header('Content-Type: application/json; charset=utf-8');
  print(json_encode($responseData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}

sendMail();
