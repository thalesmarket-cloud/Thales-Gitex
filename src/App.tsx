/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Database, 
  Users, 
  BarChart3, 
  Lightbulb, 
  CheckCircle2, 
  ChevronRight,
  Loader2,
  Mail,
  Globe,
  Cloud,
  MessageSquare,
  Cpu,
  UserCheck,
  AlertTriangle,
  Zap,
  Target,
  TrendingUp,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
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
    if (isSubmitting) return;

    setIsSubmitting(true);
    
    // REMPLACEZ CETTE URL PAR VOTRE LIEN /exec DE GOOGLE SHEETS
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw-gmNXPUM2nf2MjHeowmx7uCBkZ5cqI0SnY0A-VYx3_eQ3_K4FzlBbJzWDJRwplvSg/exec";

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Important pour Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Avec mode: 'no-cors', on ne peut pas vérifier response.ok
      // On assume que ça a fonctionné si aucune erreur n'est levée
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Une erreur est survenue lors de l\'inscription. Veuillez vérifier votre connexion.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const scrollToForm = () => {
    document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen tech-gradient selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="https://res.cloudinary.com/dmutnjgp8/image/upload/v1772030743/logo_thal%C3%A8s_1_tkhzkc.png" 
              alt="Thalès Informatique" 
              className="h-16 w-auto"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#discover" className="hover:text-blue-600 transition-colors">Découvrir</a>
            <a href="#event" className="hover:text-blue-600 transition-colors">Infos Événement</a>
            <button 
              onClick={scrollToForm}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full transition-all shadow-lg shadow-blue-600/20"
            >
              S'inscrire
            </button>
          </div>
          <button className="md:hidden text-slate-600">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/30 blur-[120px] rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                <Calendar size={14} /> Exposition Technologique 2026
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 text-slate-900">
                Rencontrez Thalès Informatique <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">lors du GITEX Africa Morocco</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
                Découvrez comment nos solutions ERP et notre expertise en transformation digitale accélèrent votre croissance et votre efficacité opérationnelle.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={scrollToForm}
                  className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-xl shadow-blue-600/25"
                >
                  Inscrivez-vous pour nous rendre visite
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-4 px-6 py-4 rounded-xl bg-slate-100 border border-slate-200">
                  <div className="text-sm">
                    <div className="text-slate-500 font-medium">Dates de l'événement</div>
                    <div className="font-bold text-slate-900">7 – 9 Avril 2026 à Marrakech</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-6 py-4 rounded-xl bg-slate-100 border border-slate-200">
                  <div className="text-sm">
                    <div className="text-slate-500 font-medium">Stand</div>
                    <div className="font-bold text-slate-900">Hall 4 • Stand 4B -30</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Placeholder for the user-provided design */}
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-2xl relative group">
                <img 
                  src="https://res.cloudinary.com/dmutnjgp8/image/upload/v1774610062/int%C3%A9grateur_sage_17_uogemf.png" 
                  alt="Intégrateur Sage - Thalès Informatique" 
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-500/20 blur-3xl rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="discover" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 p-12 md:p-16 text-center">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 blur-[120px] rounded-full" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600 blur-[120px] rounded-full" />
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h4 className="text-3xl md:text-4xl font-bold mb-6 text-white">Et si on en parlait ensemble ?</h4>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                Nos experts seront présents au GITEX Africa Morocco 2026 pour analyser vos enjeux spécifiques et vous proposer des solutions concrètes.
              </p>
              <button 
                onClick={scrollToForm}
                className="group bg-white hover:bg-blue-50 text-slate-900 px-10 py-5 rounded-2xl font-bold transition-all flex items-center gap-3 mx-auto shadow-xl"
              >
                Planifiez votre rendez-vous expert
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Event Info */}
      <section id="event" className="py-24 bg-blue-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-card p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-3xl -mr-32 -mt-32 rounded-full" />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-slate-900">Rejoignez-nous à l'exposition</h3>
                <p className="text-slate-600 mb-8">
                  Notre équipe d'experts sera disponible pour discuter de vos défis commerciaux spécifiques et vous présenter nos dernières innovations en technologie ERP.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <Calendar className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">7 – 9 Avril 2026 à Marrakech</div>
                      <div className="text-sm text-slate-500">Enregistrez les dates dans votre calendrier</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                      <MapPin className="text-indigo-600" size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Hall 4 • Stand 4B -30</div>
                      <div className="text-sm text-slate-500">Marrakech, Maroc</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">3 Jours</div>
                  <div className="text-slate-500 text-sm uppercase tracking-widest">D'Innovation</div>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-slate-900">1500+</div>
                    <div className="text-xs text-slate-500">Exposants & Startups</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">55k+</div>
                    <div className="text-xs text-slate-500">Visiteurs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="registration-form" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Souhaitez vous nous rencontrer ?</h2>
            <p className="text-slate-500 text-lg">Réservez votre place et planifiez une rencontre avec nos experts.</p>
          </div>

          <div className="form-container p-8 md:p-12">
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
                      <label className="text-sm font-medium text-slate-700">Nom Complet</label>
                      <input 
                        required
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Ahmed El Mansouri"
                        className="form-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Nom de l'Entreprise</label>
                      <input 
                        required
                        type="text" 
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Ex: Tech Solutions Maroc"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Fonction / Poste</label>
                      <input 
                        required
                        type="text" 
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        placeholder="Directeur IT / Gérant"
                        className="form-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Adresse E-mail</label>
                      <input 
                        required
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="a.elmansouri@entreprise.ma"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-slate-700">Numéro de Téléphone</label>
                      <input 
                        required
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+212 6 00 00 00 00"
                        className="form-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Jour</label>
                      <select 
                        name="preferredDay"
                        value={formData.preferredDay}
                        onChange={handleInputChange}
                        className="form-input appearance-none cursor-pointer"
                      >
                        <option value="7 Avril">7 Avril</option>
                        <option value="8 Avril">8 Avril</option>
                        <option value="9 Avril">9 Avril</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Heure</label>
                      <select 
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="form-input appearance-none cursor-pointer"
                      >
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Message (Optionnel)</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Parlez-nous de votre projet..."
                      rows={4}
                      className="form-input resize-none"
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
                      className="mt-1 w-4 h-4 rounded border-slate-300 bg-slate-50 text-blue-600 focus:ring-blue-500/50"
                    />
                    <label htmlFor="agreed" className="text-sm text-slate-500 leading-relaxed">
                      J'accepte d'être contacté par Thalès Informatique concernant ma visite.
                    </label>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full text-white font-bold py-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 text-lg ${
                      isSubmitting 
                        ? 'bg-blue-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
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
                  <h3 className="text-2xl font-bold mb-4 text-slate-900">Inscription Réussie !</h3>
                  <p className="text-slate-600 mb-8 max-w-md mx-auto">
                    Merci pour votre inscription, {formData.fullName.split(' ')[0]} ! Notre équipe vous contactera prochainement à {formData.email} pour confirmer votre visite le {formData.preferredDay} à {formData.preferredTime}.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-blue-600 hover:text-blue-500 font-semibold text-sm underline underline-offset-4"
                  >
                    Soumettre une autre inscription
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <img 
                src="https://res.cloudinary.com/dmutnjgp8/image/upload/v1772030743/logo_thal%C3%A8s_1_tkhzkc.png" 
                alt="Thalès Informatique" 
                className="h-12 w-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex items-center gap-8 text-sm text-slate-500">
              <a href="https://www.thales.ma" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <Globe size={16} /> www.thales.ma
              </a>
              <a href="mailto:contact@thales.ma" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <Mail size={16} /> contact@thales.ma
              </a>
            </div>
            
            <div className="text-xs text-slate-400">
              © 2026 Thalès Informatique. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
