'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [lang, setLang] = useState('');
  const [showLangModal, setShowLangModal] = useState(true);

  // رسالة ترحيبية بعد اختيار اللغة
  useEffect(() => {
    if (lang) {
      const welcomeMessage = lang === 'ar'
        ? 'مرحبًا! كيف يمكنني مساعدتك اليوم؟'
        : 'Hello! How can I assist you today?';
      setMessages([{ sender: 'bot', text: welcomeMessage }]);
    }
  }, [lang]);

  // إرسال الرسائل
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const res = await axios.post('/api/chat', {
        question: input,
        lang,
      });

      const botMessage = { sender: 'bot', text: res.data.answer || '...' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'حدث خطأ أثناء الاتصال بالخادم.' }]);
    }
  };

  // مكون اختيار اللغة
  const LanguageModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-lg p-6 text-center space-y-4">
        <h2 className="text-xl font-semibold">Please choose a language</h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setLang('ar');
              setShowLangModal(false);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            العربية
          </button>
          <button
            onClick={() => {
              setLang('en');
              setShowLangModal(false);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            English
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded-xl shadow-md relative">
      {showLangModal && <LanguageModal />}

      <div className="h-[400px] overflow-y-auto border rounded-lg p-4 bg-gray-50 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-green-100' : 'bg-gray-200'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={lang === 'ar' ? 'اكتب رسالتك هنا...' : 'Type your message here...'}
          className="flex-grow p-2 border rounded-lg"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          {lang === 'ar' ? 'إرسال' : 'Send'}
        </button>
      </div>
    </div>
  );
}
