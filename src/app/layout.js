import Link from 'next/link';
import './globals.css';
export const metadata = {
  title: 'Study Center Portal',
  description: 'Modernized Educational Institution Portal',
};
export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <head><link rel="icon" href="/favicon.ico" /></head>
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans">
        <header className="bg-blue-800 text-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <Link href="/" className="text-2xl font-black tracking-wider">📚 PORTAL</Link>
            <nav className="hidden md:flex space-x-6 text-sm font-semibold">
              <Link href="/" className="hover:text-blue-200 transition">होम</Link>
              <Link href="/about-us" className="hover:text-blue-200 transition">हमारे बारे में</Link>
              <Link href="/online-registration" className="hover:text-blue-200 transition">रजिस्ट्रेशन</Link>
              <Link href="/results" className="hover:text-blue-200 transition">परीक्षा परिणाम</Link>
            </nav>
          </div>
        </header>
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8">{children}</main>
        <footer className="bg-slate-900 text-slate-400 py-6 text-center text-xs border-t border-slate-800">
          <p>© {new Date().getFullYear()} Study Center Portal. सर्वाधिकार सुरक्षितं।</p>
        </footer>
      </body>
    </html>
  );
}
"@ | Out-File -Encoding utf8 src/app/layout.js

# 6. src/app/page.js फ़ाइल बनाएं
@"
import Link from 'next/link';
export default function Home() {
  return (
    <div className="space-y-12">
      <section className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-3xl p-8 md:p-16 text-white text-center shadow-2xl">
        <h1 className="text-3xl md:text-6xl font-black mb-4">डिजिटल स्टडी सेंटर पोर्टल</h1>
        <p className="text-base md:text-xl text-blue-100 max-w-2xl mx-auto mb-8 font-light">
          प्रवेश प्रक्रिया, छात्र सत्यापन और परीक्षा परिणाम के लिए आधिकारिक संस्थान पोर्टल।
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/online-registration" className="bg-white text-blue-800 font-bold px-8 py-3.5 rounded-xl shadow-lg hover:bg-slate-100 transition">नया प्रवेश फॉर्म भरें</Link>
          <Link href="/results" className="bg-blue-600 border border-blue-500 font-bold px-8 py-3.5 rounded-xl shadow-lg hover:bg-blue-500 transition">अपना रिजल्ट चेक करें</Link>
        </div>
      </section>
    </div>
  );
}
"@ | Out-File -Encoding utf8 src/app/page.js

# 7. src/app/online-registration/page.js फ़ाइल बनाएं
@"
'use client';
import { useState } from 'react';
export default function OnlineRegistration() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: '', address: '' });
  const [status, setStatus] = useState({ loading: false, msg: '', error: false });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, msg: '', error: false });
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus({ loading: false, msg: 'आपका रजिस्ट्रेशन सफलतापूर्वक सबमिट हो गया है!', error: false });
        setFormData({ name: '', email: '', phone: '', course: '', address: '' });
      } else { throw new Error('कुछ गलत हुआ'); }
    } catch (err) { setStatus({ loading: false, msg: err.message, error: true }); }
  };
  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-black text-slate-800 mb-6 text-center">ऑनलाइन प्रवेश पंजीकरण फॉर्म</h2>
      {status.msg && <div className={`p-4 mb-4 rounded-xl text-sm ${status.error ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>{status.msg}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="पूरा नाम" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
        <input type="email" placeholder="ईमेल एड्रेस" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
        <input type="tel" placeholder="मोबाइल नंबर" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
        <button type="submit" className="w-full bg-blue-700 text-white font-bold py-3 rounded-xl shadow">{status.loading ? 'सबमिट हो रहा है...' : 'पंजीकरण सबमिट करें'}</button>
      </form>
    </div>
  );
}
