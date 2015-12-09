<?php
$out = $modx->getAuthenticatedUser('web')->get('id');
print_r($out);
