// React ve react-router-dom modüllerini alıyoruz
import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Routes, Route, Navigate } from "react-router-dom";

// Resim URL'lerini tanımlıyoruz
const ONE = "https://images.pexels.com/photos/2249528/pexels-photo-2249528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const TWO = "https://images.pexels.com/photos/1061141/pexels-photo-1061141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const THREE = "https://images.pexels.com/photos/2249530/pexels-photo-2249530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const FOUR = "https://images.pexels.com/photos/1061139/pexels-photo-1061139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const FIVE = "https://images.pexels.com/photos/1010973/pexels-photo-1010973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const SIX = "https://images.pexels.com/photos/4772874/pexels-photo-4772874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

// Ana uygulama bileşeni, React Router'ı kullanarak sayfa rotalarını belirler.
function App() {
  return (
    // BrowserRouter kullanarak uygulama için yönlendirme yapısını oluşturuyoruz
    <BrowserRouter>
      {/* Routes bileşeni ile sayfa rotalarını belirtiyoruz */}
      <Routes>
        {/* Ana sayfa rotası */}
        <Route path="/" element={<Home />} />
        {/* Korunan sayfa rotası */}
        <Route path="/protectedPage" element={<ProtectedPage />} />
        {/* Tanımsız rotalar için ana sayfaya geri yönlendirme */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

//  Ana sayfa bileşeni, kullanıcının uygulamaya ilk giriş yaptığında göreceği sayfadır. Burada "Korumalı Sayfaya Git" butonu bulunur.
const Home = () => {
  return (
    // Ana sayfa içeriği
    <div className="flex flex-col justify-center items-center h-screen">
      {/* Başlık */}
      <h1 className="text-3xl font-bold mb-4">Ana Sayfa</h1>
      {/* Korumalı sayfaya git butonu */}
      <Link to="/protectedPage">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Korumalı Sayfaya Git</button>
      </Link>
    </div>
  );
};

// Korumalı sayfa bileşeni, kullanıcının "protectedPage" rotasına gitmesi durumunda göreceği sayfadır. Burada, CAPTCHA testi sonucuna bağlı olarak korumalı içerik görüntülenir.
const ProtectedPage = () => {
  // CAPTCHA sonucunu tutan state
  const [captchaResult, setCaptchaResult] = useState(false);

  // CAPTCHA sonucu doğru değilse CAPTCHA bileşenini göster
  if (!captchaResult) {
    return <Captcha setCaptchaResult={setCaptchaResult} />;
  }

  // CAPTCHA sonucu doğru ise korunan sayfa içeriğini göster
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Korumalı Sayfa</h1>
      <div className="bg-green-200 p-4 rounded-lg shadow-md">
        <p className="text-lg text-green-800 font-semibold">Gizli Hazineye Ulaştınız!</p>
        <p className="text-gray-700 mt-2">Gizli mesaj: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    </div>
  );
};

// CAPTCHA bileşeni, kullanıcının rastgele bir rakamı resimler arasından seçmesini isteyen testi sunar. Kullanıcı doğru rakamı seçerse, korumalı içerik görüntülenir.
const Captcha = ({ setCaptchaResult }) => {
  // Modal durumu ve doğru cevap state'leri
  const [modalOpen, setModalOpen] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // İlk render'da doğru cevabı belirleyen useEffect
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 6) + 1;
    setCorrectAnswer(randomIndex);
  }, [modalOpen]);

  // CAPTCHA butonuna tıklandığında
  const handleButtonClick = () => {
    setModalOpen(true);
  };

  // Resimlere tıklandığında
  const handleImageClick = (index) => {
    setSelectedAnswer(index);
    // Seçilen cevap doğru ise CAPTCHA sonucunu doğru yap
    if (index === correctAnswer) {
      setCaptchaResult(true);
    } else {
      // Seçilen cevap yanlış ise CAPTCHA sonucunu yanlış yap ve kullanıcıyı uyar
      alert("Davetsiz Misafir!");
      setCaptchaResult(false);
    }
    setModalOpen(false);
  };

  // CAPTCHA bileşenini render et
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      
    
        <>
          {/* Başlık */}
          <h3 className="text-xl font-bold mb-4">Hangi resimde {correctAnswer} rakamı var?</h3>
          {/* Resimler */}
          <div className="grid grid-cols-3 mt-3 gap-4">
            {[ONE, TWO, THREE, FOUR, FIVE, SIX].map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Resim ${index + 1}`}
                className={`max-w-xs max-h-32 rounded-lg cursor-pointer transition duration-300 transform hover:scale-105 ${selectedAnswer === index + 1 && (selectedAnswer === correctAnswer ? 'border-4 border-green-500' : 'border-4 border-red-500')}`}
                onClick={() => handleImageClick(index + 1)}
              />
            ))}
          </div>
          {/* Sonuç */}
          {selectedAnswer !== null && (
            <p className={`text-lg mt-4 ${selectedAnswer === correctAnswer ? 'text-green-500' : 'text-red-500'}`}>
              {selectedAnswer === correctAnswer ? "Doğru cevap! Korumalı sayfaya yönlendiriliyorsunuz..." : "Yanlış cevap! Lütfen tekrar deneyin."}
            </p>
          )}
        </>
   
    </div>
  );
};

// Uygulamayı dışa aktar
export default App;
