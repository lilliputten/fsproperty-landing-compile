<?php

/** @module Dummy submit hook for client form
 *  @since 2024.10.13, 19:15
 *  @changed 2024.10.13, 19:15
 */

header('Content-Type: application/json; charset=utf-8');

$data = array(
  'ok' => true,
);

print(json_encode($data));
