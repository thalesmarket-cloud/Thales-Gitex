/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2
} from 'lucide-react';

const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Grid Background */}
      <div className="absolute inset-0 tech-grid opacity-30" />
      
      {/* Animated Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/20 blur-[120px] rounded-full" 
      />

      {/* Floating Tech Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.3 + 0.1
          }}
          animate={{ 
            y: [null, "-=100", "+=100"],
            x: [null, "+=50", "-=50"],
          }}
          transition={{ 
            duration: Math.random() * 20 + 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          style={{
            boxShadow: '0 0 10px rgba(96, 165, 250, 0.8)'
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    Date: '',
    fullName: '',
    companyName: '',
    jobTitle: '',
    email: '',
    phone: '',
    preferredDay: '7 Avril',
    preferredTime: '10:00',
    message: '',
    agreed: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwtJlN22092j2Dqr3DAhojv-_gcLZ8iibGrIEovmUeSzEL6pW03rnDdsRENFRPV-xjM/exec';

    try {
      // Use URLSearchParams for better compatibility with Google Apps Script
      const params = new URLSearchParams();
      
      // Add the current date and time (matching your "Date" column header)
      params.append('Date', new Date().toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));

      // Revert to original keys that were working for your script
      params.append('fullName', formData.fullName);
      params.append('companyName', formData.companyName);
      params.append('jobTitle', formData.jobTitle);
      params.append('email', formData.email);
      params.append('phone', formData.phone);
      params.append('preferredDay', formData.preferredDay);
      params.append('preferredTime', formData.preferredTime);
      params.append('message', formData.message);

      // Send the request to Google Apps Script
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: params.toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        mode: 'no-cors'
      });

      // Since we use no-cors, we can't read the response, 
      // but if it doesn't throw, we assume success for this specific use case.
      setIsSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  return (
    <div className="min-h-screen tech-gradient selection:bg-blue-500/30">
      <BackgroundEffects />
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 overflow-hidden flex flex-col items-center">
        <div className="max-w-4xl mx-auto px-6 relative z-10 w-full flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-3xl"
          >
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
              <img 
                src="https://res.cloudinary.com/dmutnjgp8/image/upload/v1773392697/int%C3%A9grateur_sage_8_rb6doi.png" 
                alt="Thalès Informatique - Intégrateur Sage Maroc" 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="registration-form" className="py-16 bg-slate-900/30">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Inscription des Visiteurs</h2>
            <p className="text-slate-400">Réservez votre place et planifiez une rencontre avec nos experts.</p>
          </div>

          <div className="glass-card p-8 md:p-12">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Nom Complet</label>
                      <input 
                        required
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Ahmed El Mansouri"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Nom de l'Entreprise</label>
                      <input 
                        required
                        type="text" 
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Ex: Tech Solutions Maroc"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Fonction / Poste</label>
                      <input 
                        required
                        type="text" 
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        placeholder="Directeur IT / Gérant"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Adresse E-mail</label>
                      <input 
                        required
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="a.elmansouri@entreprise.ma"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Numéro de Téléphone</label>
                      <input 
                        required
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+212 6 00 00 00 00"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Jour</label>
                        <select 
                          name="preferredDay"
                          value={formData.preferredDay}
                          onChange={handleInputChange}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        >
                          <option value="7 Avril">7 Avril</option>
                          <option value="8 Avril">8 Avril</option>
                          <option value="9 Avril">9 Avril</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Heure</label>
                        <select 
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        >
                          <option value="10:00">10:00</option>
                          <option value="11:00">11:00</option>
                          <option value="12:00">12:00</option>
                          <option value="13:00">13:00</option>
                          <option value="14:00">14:00</option>
                          <option value="15:00">15:00</option>
                          <option value="16:00">16:00</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Message (Optionnel)</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Parlez-nous de votre projet..."
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input 
                      required
                      type="checkbox" 
                      id="agreed"
                      name="agreed"
                      checked={formData.agreed}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500/50"
                    />
                    <label htmlFor="agreed" className="text-sm text-slate-400 leading-relaxed">
                      J'accepte d'être contacté par Thalès Informatique concernant ma visite.
                    </label>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Envoi en cours...
                      </>
                    ) : (
                      "Confirmer l'Inscription"
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-green-500" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Inscription Réussie !</h3>
                  <p className="text-slate-400 mb-8 max-w-md mx-auto">
                    Merci pour votre inscription ! Notre équipe vous contactera prochainement à l'adresse {formData.email} pour confirmer votre visite le {formData.preferredDay} à {formData.preferredTime}.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-blue-400 hover:text-blue-300 font-semibold text-sm underline underline-offset-4"
                  >
                    Soumettre une autre inscription
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
