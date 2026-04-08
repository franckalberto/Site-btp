import React, { useState } from 'react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [surface, setSurface] = useState('');
  const [estimation, setEstimation] = useState<{ min: number; max: number } | null>(null);
  const [modalContent, setModalContent] = useState<{ title: string; content: React.ReactNode } | null>(null);

  const calculatePrice = () => {
    const s = parseFloat(surface);
    if (!s || s <= 0) {
      alert('Veuillez entrer une surface valide.');
      return;
    }

    let min, max;
    if (s <= 50) {
      min = s * 45000;
      max = s * 60000;
    } else if (s <= 100) {
      min = s * 40000;
      max = s * 50000;
    } else {
      min = s * 35000;
      max = s * 45000;
    }
    setEstimation({ min, max });
  };

  const sendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const message = formData.get('message') as string;
    
    if (!name || !message) {
      alert('Veuillez remplir au moins votre nom et la description du projet.');
      return;
    }

    const text = encodeURIComponent(`Bonjour Professionnelle Construction, je m'appelle ${name}. Voici mon projet : ${message}`);
    window.open(`https://wa.me/261342727864?text=${text}`, '_blank');
  };

  const articles = {
    article1: {
      title: "Les types de peinture adaptés au climat de Toamasina",
      content: (
        <>
          <p className="mb-4">Toamasina est caractérisée par un climat tropical humide et des embruns salins. Choisir la bonne peinture est crucial pour la pérennité de vos façades et de vos intérieurs.</p>
          <p className="mb-4"><strong>La peinture acrylique :</strong> C'est souvent le meilleur choix pour les murs extérieurs à Madagascar. Sa composition à base d'eau lui permet de "respirer", laissant s'échapper l'humidité contenue dans les murs sans provoquer de décollement ou de cloques.</p>
          <p className="mb-4"><strong>La peinture glycéro :</strong> Plus résistante aux chocs et très lessivable, elle est idéale pour les boiseries et les zones à fort passage. Cependant, elle demande une préparation de support irréprochable car elle est imperméable à la vapeur d'eau.</p>
          <p className="mb-4"><strong>Conseil d'expert :</strong> À Toamasina, nous recommandons systématiquement l'application d'un fixateur de fond avant la peinture pour bloquer la porosité du support et garantir une adhérence parfaite malgré l'air marin.</p>
        </>
      )
    },
    article2: {
      title: "Faux-plafonds Placoplatre : Avantages et normes de pose",
      content: (
        <>
          <p className="mb-4">Le Placoplatre a révolutionné l'aménagement intérieur à Madagascar. Il permet de transformer radicalement l'aspect d'une pièce en quelques jours seulement.</p>
          <p className="mb-4"><strong>Isolation thermique :</strong> C'est l'avantage numéro 1. Sous nos toits en tôle, la chaleur peut devenir étouffante. Le faux-plafond crée un matelas d'air qui, couplé à de la laine de verre, réduit considérablement la température intérieure.</p>
          <p className="mb-4"><strong>Esthétique :</strong> Intégration de spots LED, création de gorges lumineuses ou de niveaux différents... les possibilités sont infinies pour un rendu moderne et luxueux.</p>
          <p className="mb-4"><strong>Spécificité Toamasina :</strong> L'utilisation de plaques hydrofuges (Placo Marine, reconnaissables à leur couleur verte) est fortement conseillée. Elles résistent à l'humidité ambiante élevée et évitent les déformations dans le temps.</p>
        </>
      )
    },
    article3: {
      title: "Construire à Madagascar : L'importance des normes de structure",
      content: (
        <>
          <p className="mb-4">La solidité d'un bâtiment repose sur son squelette en béton armé. À Madagascar, où les aléas climatiques (cyclones) sont fréquents, on ne peut pas transiger sur la structure.</p>
          <p className="mb-4"><strong>Le dosage du béton :</strong> Un bon béton de structure doit être dosé à 350kg/m³ de ciment. Un sous-dosage fragilise l'ensemble et réduit la durée de vie de l'ouvrage.</p>
          <p className="mb-4"><strong>Le ferraillage :</strong> La qualité de l'acier et son façonnage sont déterminants. Les cadres doivent être serrés au niveau des nœuds (jonctions poteaux-poutres) pour résister aux efforts de torsion.</p>
          <p className="mb-4"><strong>Protection contre la corrosion :</strong> À Toamasina, l'air salin attaque les aciers. Nous veillons à respecter un "enrobage" suffisant (au moins 3cm de béton autour du fer) pour empêcher la rouille de faire éclater le béton à long terme.</p>
        </>
      )
    }
  };

  const formatter = new Intl.NumberFormat('fr-FR');

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-gray-800 scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-[#1a365d] tracking-tight">
                Professionnelle<span className="text-[#2d4a53]"> Construction</span>
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#services" className="relative text-sm font-medium text-gray-600 hover:text-[#1a365d] transition after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-[#1a365d] hover:after:w-full after:transition-all">Services</a>
              <a href="#difference" className="relative text-sm font-medium text-gray-600 hover:text-[#1a365d] transition after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-[#1a365d] hover:after:w-full after:transition-all">Notre Différence</a>
              <a href="#estimateur" className="relative text-sm font-medium text-gray-600 hover:text-[#1a365d] transition after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-[#1a365d] hover:after:w-full after:transition-all">Estimateur</a>
              <a href="#blog" className="relative text-sm font-medium text-gray-600 hover:text-[#1a365d] transition after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-[#1a365d] hover:after:w-full after:transition-all">Blog</a>
              <a href="#contact" className="bg-[#1a365d] text-white px-6 py-2.5 rounded-[8px] text-sm font-semibold hover:bg-opacity-90 transition shadow-sm">Contactez-nous</a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-[#1a365d] focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-4 shadow-lg">
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="block text-base font-medium text-gray-600 hover:text-[#1a365d]">Services</a>
            <a href="#difference" onClick={() => setIsMenuOpen(false)} className="block text-base font-medium text-gray-600 hover:text-[#1a365d]">Notre Différence</a>
            <a href="#estimateur" onClick={() => setIsMenuOpen(false)} className="block text-base font-medium text-gray-600 hover:text-[#1a365d]">Estimateur</a>
            <a href="#blog" onClick={() => setIsMenuOpen(false)} className="block text-base font-medium text-gray-600 hover:text-[#1a365d]">Blog</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block bg-[#1a365d] text-white px-6 py-3 rounded-[8px] text-center font-semibold">Contactez-nous</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1503387762-592dee58292b?auto=format&fit=crop&q=80&w=1920" alt="Background" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-[#1a365d] leading-tight mb-6">
              Votre Vision, Notre Expertise – <br />
              <span className="text-[#2d4a53]">Professionnelle Construction</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
              Peinture haut de gamme, Enduits de lissage & Gros Œuvre à Toamasina. <br className="hidden md:block" />
              Qualité, Rapidité, Transparence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#estimateur" className="inline-flex justify-center items-center px-8 py-4 bg-[#1a365d] text-white font-bold rounded-[8px] hover:shadow-xl transition-all transform hover:-translate-y-1">
                Obtenir une estimation rapide
              </a>
              <a href="#contact" className="inline-flex justify-center items-center px-8 py-4 bg-white text-[#1a365d] border-2 border-[#1a365d] font-bold rounded-[8px] hover:bg-gray-50 transition-all">
                Décrire mon projet
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-[#1a365d]/5 -skew-x-12 transform translate-x-1/2 hidden lg:block"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-4">Nos Services</h2>
            <div className="w-20 h-1 bg-[#2d4a53] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border border-gray-100 hover:border-[#2d4a53]/30 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 bg-[#1a365d]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1a365d] group-hover:text-white transition-colors">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-[#1a365d] mb-3">Peinture & Finitions</h3>
              <p className="text-gray-600 leading-relaxed">Travail soigné pour intérieur et extérieur. Nous utilisons des produits adaptés au climat de Toamasina pour une durabilité maximale.</p>
            </div>

            <div className="p-8 rounded-2xl border border-gray-100 hover:border-[#2d4a53]/30 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 bg-[#1a365d]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1a365d] group-hover:text-white transition-colors">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-[#1a365d] mb-3">Enduits Avant Peinture</h3>
              <p className="text-gray-600 leading-relaxed">Enduit Val, Bessier, Plaste, etc. Une préparation parfaite des supports pour un rendu lisse et professionnel.</p>
            </div>

            <div className="p-8 rounded-2xl border border-gray-100 hover:border-[#2d4a53]/30 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 bg-[#1a365d]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1a365d] group-hover:text-white transition-colors">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-[#1a365d] mb-3">Faux-Plafonds Placoplatre</h3>
              <p className="text-gray-600 leading-relaxed">Conception et mise en œuvre de plafonds suspendus modernes. Isolation thermique et esthétique contemporaine.</p>
            </div>

            <div className="p-8 rounded-2xl border border-gray-100 hover:border-[#2d4a53]/30 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 bg-[#1a365d]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1a365d] group-hover:text-white transition-colors">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-[#1a365d] mb-3">Gros Œuvre Béton Armé</h3>
              <p className="text-gray-600 leading-relaxed">Construction de bâtiments civils de A à Z. Respect strict des normes de structure BA pour une sécurité totale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Différence */}
      <section id="difference" className="py-24 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-4">Notre Différence</h2>
            <p className="text-gray-600 italic">"Être professionnel, c'est notre éthique."</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Qualité", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", desc: "Priorité absolue sur les finitions et le choix des matériaux." },
              { title: "Rapidité", icon: "M13 10V3L4 14h7v7l9-11h-7z", desc: "Délais maîtrisés grâce à une organisation rigoureuse." },
              { title: "Accessibilité", icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z", desc: "Communication fluide et rapports réguliers sur le chantier." },
              { title: "Flexibilité", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", desc: "Solutions sur mesure pour particuliers et professionnels." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-[8px] shadow-sm text-center">
                <div className="text-[#2d4a53] flex justify-center mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path></svg>
                </div>
                <h4 className="font-bold text-[#1a365d] mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estimateur */}
      <section id="estimateur" className="py-24 bg-[#1a365d] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Estimez le coût de votre projet en 1 clic</h2>
          <p className="mb-12 text-blue-100">Entrez la surface totale de votre projet pour obtenir une fourchette indicative.</p>
          
          <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-md border border-white/20">
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <div className="relative w-full max-w-xs">
                <input 
                  type="number" 
                  value={surface}
                  onChange={(e) => setSurface(e.target.value)}
                  placeholder="Surface (m²)" 
                  className="w-full px-6 py-4 bg-white text-[#1a365d] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#2d4a53] text-lg font-semibold"
                />
                <span className="absolute right-4 top-4 text-gray-400">m²</span>
              </div>
              <button onClick={calculatePrice} className="w-full md:w-auto px-10 py-4 bg-[#2d4a53] text-white font-bold rounded-[8px] hover:bg-opacity-90 transition-all shadow-lg">
                Calculer
              </button>
            </div>
            
            {estimation && (
              <div className="mt-10 animate-fade-in">
                <p className="text-blue-200 text-sm uppercase tracking-widest mb-2">Estimation indicative</p>
                <div className="text-3xl md:text-5xl font-bold text-white mb-6">
                  {formatter.format(estimation.min)} Ar - {formatter.format(estimation.max)} Ar
                </div>
                <a href="#contact" className="inline-block text-[#2d4a53] bg-white px-6 py-2 rounded-full text-sm font-bold hover:bg-blue-50 transition">
                  Affiner cette estimation gratuitement
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-4">Conseils d'Experts</h2>
            <p className="text-gray-600">Tout ce qu'il faut savoir pour construire à Madagascar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 'article1', title: "Peinture & Climat à Toamasina", img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800", desc: "Toamasina est caractérisée par un climat tropical humide et des embruns salins. Choisir la bonne peinture est crucial..." },
              { id: 'article2', title: "Avantages du Placoplatre", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800", desc: "Le Placoplatre révolutionne l'aménagement intérieur à Madagascar. Au-delà de l'aspect esthétique, il offre une isolation..." },
              { id: 'article3', title: "Normes Béton Armé à Mada", img: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800", desc: "La solidité d'un bâtiment repose sur son squelette. Respecter les dosages de ciment et la qualité du ferraillage..." }
            ].map((art) => (
              <article key={art.id} className="bg-[#f8f9fa] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
                <img src={art.img} alt={art.title} className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
                <div className="p-6">
                  <h3 className="font-bold text-lg text-[#1a365d] mb-3">{art.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{art.desc}</p>
                  <button onClick={() => setModalContent(articles[art.id as keyof typeof articles])} className="text-[#2d4a53] font-bold text-sm hover:underline">Lire la suite</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-6">Parlons de votre projet</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Basés à Toamasina, nous sommes un collectif de professionnels avec plus de 10 ans d'expérience. 
                Moi, <strong>Eddy Franck</strong>, je suis votre interlocuteur privilégié. 
                Professionnelle Construction est une éthique : transparence, dévouement et résultats.
              </p>
              
              <div className="space-y-6">
                <a href="tel:+261322727864" className="flex items-center gap-4 text-[#1a365d] hover:text-[#2d4a53] transition">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <span className="font-semibold">+261 32 27 278 64</span>
                </a>
                <a href="mailto:Franckprofessional@gmail.com" className="flex items-center gap-4 text-[#1a365d] hover:text-[#2d4a53] transition">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <span className="font-semibold">Franckprofessional@gmail.com</span>
                </a>
                <a href="https://wa.me/261342727864" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-[#1a365d] hover:text-[#2d4a53] transition">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <span className="font-semibold">Discuter sur WhatsApp</span>
                </a>
              </div>

              <div className="mt-12 p-6 bg-[#2d4a53]/10 rounded-2xl border border-[#2d4a53]/20">
                <p className="text-[#2d4a53] font-bold">
                  <span className="mr-2">🎁</span>
                  Offre spéciale : Devis et conception de dessins OFFERTS si le contrat nous est confié.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl">
              <form onSubmit={sendWhatsApp} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nom complet *</label>
                    <input type="text" name="name" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-[8px] focus:outline-none focus:border-[#2d4a53]" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Téléphone *</label>
                    <input type="tel" name="phone" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-[8px] focus:outline-none focus:border-[#2d4a53]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                  <input type="email" name="email" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-[8px] focus:outline-none focus:border-[#2d4a53]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description du projet *</label>
                  <textarea name="message" rows={5} required placeholder="Décrivez votre projet en quelques lignes..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-[8px] focus:outline-none focus:border-[#2d4a53]"></textarea>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button type="submit" className="flex-1 bg-[#1a365d] text-white font-bold py-4 rounded-[8px] hover:bg-opacity-90 transition shadow-lg">
                    Envoyer via WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a365d] text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <span className="text-2xl font-bold tracking-tight">Professionnelle<span className="text-[#2d4a53]"> Construction</span></span>
          </div>
          <p className="text-blue-200 text-sm">
            &copy; 2025 Professionnelle Construction - Toamasina. Tous droits réservés.
          </p>
        </div>
      </footer>

      {/* Modal */}
      {modalContent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setModalContent(null)}>
          <div className="bg-white max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setModalContent(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div className="p-8 md:p-12 overflow-y-auto max-h-[80vh]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a365d] mb-6">{modalContent.title}</h2>
              <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed">
                {modalContent.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
