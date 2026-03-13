/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    jobTitle: '',
    email: '',
    phone: '',
    preferredDay: '7 Avril',
    message: '',
    agreed: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  return (
    <div className="min-h-screen tech-gradient selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/30 blur-[120px] rounded-full" />
        </div>
        
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
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-500/20 blur-3xl rounded-full" />
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
                      <label className="text-sm font-medium text-slate-300">Jour de Visite Souhaité</label>
                      <select 
                        name="preferredDay"
                        value={formData.preferredDay}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      >
                        <option value="7 Avril">7 Avril 2026</option>
                        <option value="8 Avril">8 Avril 2026</option>
                        <option value="9 Avril">9 Avril 2026</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
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

                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2"
                  >
                    Confirmer l'Inscription
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
                    Merci pour votre inscription ! Notre équipe vous contactera prochainement à l'adresse {formData.email} pour confirmer votre visite.
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
