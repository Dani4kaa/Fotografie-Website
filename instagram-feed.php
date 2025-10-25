<?php
header('Content-Type: application/json');

$tokenFile = __DIR__ . '/token.json';
$tokenData = json_decode(file_get_contents($tokenFile), true);
$token = $tokenData['access_token'] ?? '';
$expiresAt = $tokenData['expires_at'] ?? 0;

// Token alle 30 Tage automatisch erneuern
if (time() > $expiresAt - 2*24*60*60) { // 2 Tage vor Ablauf erneuern
    $refreshUrl = "https://graph.instagram.com/access_token?grant_type=ig_refresh_token&access_token={$token}";
    $response = file_get_contents($refreshUrl);
    $data = json_decode($response, true);
    if (isset($data['access_token'])) {
        $token = $data['access_token'];
        $expiresAt = time() + $data['expires_in'];
        file_put_contents($tokenFile, json_encode([
            'access_token' => $token,
            'expires_at' => $expiresAt
        ]));
    }
}

// Instagram Feed abrufen
$feedUrl = "https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp&access_token={$token}";
$feedResponse = file_get_contents($feedUrl);
echo $feedResponse;
?>
