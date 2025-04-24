import "./globals.css";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import 'leaflet/dist/leaflet.css';

export const metadata = {
  title: "Dashboard",
  description: "Coastal Flood Monitoring",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
