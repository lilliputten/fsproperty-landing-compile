<?php

/** @module Dummy submit hook for client form
 *  @since 2024.10.13, 19:15
 *  @changed 2024.10.16, 14:02
 */

$rawInput = file_get_contents('php://input');
$isJson = str_starts_with($rawInput, '{');
$postData = $isJson ? objectToArray(json_decode($rawInput)) : $_POST;

// Show data in `php_errors.log` file
error_log('Data received: ' . print_r($_POST, true) . ' -- '. print_r($rawInput, true));

// Construct default response data object
// NOTE: Only `ok` (boolean, a sucess flag) and `error` (string, an error explanation) are expeced, but both of them are optional
$responseData = array(
  'ok' => true, // True -- if the operation was successful
  // 'error' => NULL, // A brief text explaining the error (if any; it will be shown to the user). If successful, do not send anything (either NULL or an empty string).
  '_data_debug' => $postData, // DEBUG: Only for debug purposes
);

// Mock an error...
if ($postData['name'] == 'test') {
  $responseData['ok'] = false;
  $responseData['error'] = 'Текст возникшей ошибки';
}

// DEBUG: Emulate response delay
sleep(1);

// Return json response...
header('Content-Type: application/json; charset=utf-8');
print(json_encode($responseData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

// Helpers...

function objectToArray($obj)
{
  if (is_object($obj)) {
    // Gets the properties of the given object with get_object_vars function
    $obj = get_object_vars($obj);
  }
  if (is_array($obj)) {
    // Return array converted to object Using __FUNCTION__ (Magic constant) for recursive call
    return array_map(__FUNCTION__, $obj);
  } else {
    // Return array
    return $obj;
  }
}
