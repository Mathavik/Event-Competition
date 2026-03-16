import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Your main content goes here */}
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold">Welcome to Grand Competition</h1>
          {/* Add your competition sections here */}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;