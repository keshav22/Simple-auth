import './globals.css'
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="p-4">
        {children}
      </body>
    </html>
  );
}
