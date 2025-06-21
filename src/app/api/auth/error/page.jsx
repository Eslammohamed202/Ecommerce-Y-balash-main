"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthErrorPage() {
  const router = useRouter();

  useEffect(() => {
    // احتفظ برسالة الخطأ في حالة الحاجة لعرضها
    const error = new URLSearchParams(window.location.search).get('error');
    console.error("Authentication error:", error);
    
    // عد إلى صفحة تسجيل الدخول بعد 3 ثواني
    const timer = setTimeout(() => {
      router.push('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
        <p>You will be redirected to login page shortly...</p>
      </div>
    </div>
  );
}