export const metadata = {
    title: "Personal Finance Visualizer",
    description: "A simple finance tracking application",
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body className="bg-gray-100">
          {children}
        </body>
      </html>
    );
  }
  