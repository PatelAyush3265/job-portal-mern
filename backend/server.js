import app from "./app.js";
// import cloudinary from "cloudinary";
// import { google } from 'googleapis';

// const key = {
//   "type": "service_account",
//   "project_id": "noble-function-458013-q7",
//   "private_key_id": "5968d8f9ca84df7f9c86357edf7c3e442c44be18",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCeEbcl8RnJADB4\nmlDIgU2qzNwJwMmx2hM2o8WYrZ0bme1973sXDZbgnTgtIr3laXq9nFVQxnBbgJTr\nzwZQca/yCklbdS6WbUDs7UNktHQ5HhqDkBgj0fZbtcuv6DV2x9KYTfyEGsQdzd6w\nUi5HmhM4iS5IMG6ewKxceHEnMIPjWgp5Wb2Fqpgio+c+KdIYxG2YAvXd15jdN+MU\nMoKDhITLgeg19Q32CBYepp1CBMTKjxgRW58Ty6Jwf+fbMEGLFLvCqEYqw5gpjT3y\nvtvUT8uy1rvEqRXUkiVsWZMb3AtVVzHjccM1Q0+1gJ3NJkNO4alyraq1urL53VaM\nju4pltQdAgMBAAECggEAOw8mbYw4VKP3+E+8CDZbtQnm2tQH6CYxUJR/Qyz3CvWH\nySp9xJ7EtTa44xBcgEdZX1f2foAuQdn4imSnGM5pbVdPklblqbm3bO63Y/ySgjbP\ntEFV66hK0nhJ2vc5ZqCBfHuC8j7n8LTXU+zYstMMBG8o9jr2UeVuYPx1Vq2nUX3g\nD48MkJJE7MVt1N7XqfVp0VjD6g2zWFX0jLS973e4ck37gFDUfqmd7KswLAnjqWob\nt/DzANm9qfcW2B5xgEqMagTZJWDEFBpNlGiS+181Id3Nt+B7mwqiU3+JcJPMlyW3\nvzlzEx6NxgzFvAAxSOnOFlXEQwmAmq3RwHiLZ49Xz1wKBgQDPnIGIblVkvglZdeTY\nAYNtZLsPZYr+Y/bmyrMHEPnnMxgzc6WyM4na3XEQqfo+TcoeIgYB0MxfC4vRtE8Y\nN7c3gZQOfuo1WwWdnw1fx1YF6Z43ALdNfgpsmsUtp5cGR6BYYC0xubZlR0HE+wpo\n+5mM7nclgboai2e1c+a5E3UTOwKBgQDC6TDB+lv1tFFCgqDrt7uqJp0z97MSRi3m\nzQlWQfpB6DLyOXw/csj0r/3dGn6mNt8XQoq9mwSsZkyqk12I9Tr00dfQQCk5WubP\nPt7+xagcTwYZiX7BJReosjIrYHybGGf+8lI+xOukXKT7SCzJWddSBw+QoIJiY5ez\ntpKj+pIQhwKBgQDIUad+f48vpFmbEzEa5uLsM4x2f7DMYqIB8EUrpUqrtVY9lvGi\n7y2tm4sT3B6T7TT/PC71o4T+lEJ1tfe3U1MaYJH+JqFPmCLkAmrCJrEvBUpeofc7\n80iVoARvV8xWB9iETVBuMVX3hPjF2sAhqdpv7EvUScbLBAWuREW0AD0vrwKBgGgR\nOiCI5/S/3+JO0Da7tRHVC4wmPI/42rFCvkhNe60Wp5FuUQl9BAxmspUcgKnBCzPc\nI0/lsHuDNFa14PU5P8RpEIp8nQm9nS8AghdP9t8ZAUNHiGccsCU6/z7Zj/k08urt\nAC/0+YiYzrRJ/VOeIkH677/vYXm7h+NGGdZuGvelAoGAYIWgC9VmNO9K7lY7CDW2\nAzPSHslDYgFvaE1fskeJRz2W6HxAqEnDrrks5zIuu3sblxCNLt/oxrt4K+Iuo+1P\nYjRMgb9hUJwwY+TyKZbUivcjGnrPiFWKl3U0EoL2YRQS64EljPYE+0uuJOcWd1mW\n+Tsul6RDTY5Ts+wBs3lO1Zs=\n-----END PRIVATE KEY-----",
//   "client_email": "aster-933@noble-function-458013-q7.iam.gserviceaccount.com",
//   "client_id": "107516052376967602031",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/aster-933%40noble-function-458013-q7.iam.gserviceaccount.com",
//   "universe_domain": "googleapis.com"
// };

// const jwtClient = new google.auth.JWT(
//   key.client_email,
//   null,
//   key.private_key,
//   ['https://www.googleapis.com/auth/drive'],
// );

// jwtClient.authorize(function (err, tokens) {
//   if (err) {
//     console.error("Error authorizing Google Drive service account:", err);
//     return;
//   }
//   console.log("Google Drive service account authorized successfully!");
// });

// export const drive = google.drive({
//   version: 'v3',
//   auth: jwtClient,
// });

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
