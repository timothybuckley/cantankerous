// app/layout.js

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>Your Image Gallery</title>
      </head>
      <body>{children}</body>
    </html>
  );
}

