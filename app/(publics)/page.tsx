"use client";
import Hero2 from "@/components/Hero-2";
import { LumaSpin } from "@/components/ui/luma-spin";
import {
  ContainerAnimated,
  ContainerStagger,
  GalleryGrid,
  GalleryGridCell,
} from "@/components/blocks/cta-section-with-gallery"
import { Features } from "@/components/blocks/features-4";

import AboutSection3 from "@/components/ui/about-section";
import { HeroDemo1 } from "@/components/ui/galery";

import { useEffect, useState } from "react";
import { Building2, CheckCircle2, Mail, MessageSquare, Phone, Send, User, X } from "lucide-react";

const IMAGES = [
  "/img/gdcouverture-4.png",
  "/img/gdcouverture-5.png",
  "/img/gdcouverture-6.png",
  "/img/gdcouverture-8.png",

]

export default function Home() {

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        })
        setTimeout(() => {
          setIsQuoteModalOpen(false)
          setSubmitStatus('idle')
        }, 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 3000)
    }
  }


  return (

    <div>

      <Hero2 />
      <AboutSection3 />
      {/*  */}
      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-20 px-8 py-12 md:grid-cols-2">
          <ContainerStagger>
            <ContainerAnimated className="mb-4 block text-xs font-medium text-[#f39c12] md:text-sm">
              Notre Mission
            </ContainerAnimated>
            <ContainerAnimated className="sm:text-4xl md:text-5xl text-2xl !leading-[110%] font-semibold text-[#f39c12] mb-8">
              Protéger, valoriser et prolonger la vie de vos bâtiments
            </ContainerAnimated>
            <ContainerAnimated className="sm:text-base text-xs leading-relaxed text-justify text-gray-600 mb-8">
              Notre engagement repose sur trois piliers fondamentaux qui guident chacune de nos interventions : la sécurité de vos installations et de nos équipes, la qualité irréprochable de nos prestations, et la maîtrise totale des coûts pour vous garantir le meilleur rapport investissement-durabilité.
            </ContainerAnimated>


            {/* <ContainerAnimated>
              <button className="px-8 py-3 rounded-full bg-[#f39c12] text-white font-normal text-xs transition-all duration-200 hover:bg-[#d68910] cursor-pointer">
                Découvrir nos services
              </button>
            </ContainerAnimated> */}
          </ContainerStagger>

          <GalleryGrid>
            {IMAGES.map((imageUrl, index) => (
              <GalleryGridCell index={index} key={index}>
                <img
                  className="size-full object-cover object-center"
                  width="100%"
                  height="100%"
                  src={imageUrl}
                  alt=""
                />
              </GalleryGridCell>
            ))}
          </GalleryGrid>
        </div>
      </section>

      {/* Positioning Section */}
      <section className="bg-[#f9f9f9]">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-20 px-8 py-12 md:grid-cols-2">
          <GalleryGrid>
            {IMAGES.map((imageUrl, index) => (
              <GalleryGridCell index={index} key={index}>
                <img
                  className="size-full object-cover object-center"
                  width="100%"
                  height="100%"
                  src={imageUrl}
                  alt=""
                />
              </GalleryGridCell>
            ))}
          </GalleryGrid>

          <ContainerStagger>
            <ContainerAnimated className="mb-4 block text-xs font-medium text-[#f39c12] md:text-sm">
              Notre Positionnement
            </ContainerAnimated>
            <ContainerAnimated className="sm:text-4xl md:text-5xl text-2xl !leading-[110%] font-semibold text-[#f39c12] mb-8">
              Votre partenaire technique de confiance en Côte d'Ivoire
            </ContainerAnimated>
            <ContainerAnimated className="sm:text-base text-xs leading-relaxed text-justify text-gray-600 mb-6">
              GD Couverture Côte d'Ivoire se positionne comme un acteur de référence auprès des entreprises, institutions et particuliers moyen et haut standing qui recherchent l'excellence et la fiabilité.
            </ContainerAnimated>

            {/* Two columns for services */}
            <ContainerAnimated className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-[#f39c12] font-semibold mb-3 text-sm">Nos clients</h3>
                <ul className="space-y-2 text-gray-600 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-[#f39c12] ">•</span>
                    <span>Entreprises & institutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#f39c12] ">•</span>
                    <span>Particuliers moyen et haut standing</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-[#f39c12] font-semibold mb-3 text-sm">Nos interventions</h3>
                <ul className="space-y-2 text-gray-600 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-[#f39c12] ">•</span>
                    <span>Travaux ponctuels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#f39c12]">•</span>
                    <span>Contrats de maintenance récurrents</span>
                  </li>
                </ul>
              </div>
            </ContainerAnimated>

            <ContainerAnimated className="bg-white border-l-4 border-[#f39c12] p-4 mb-8">
              <p className="text-gray-700 text-xs italic">
                Avec une approche orientée <strong className="text-[#f39c12]">prévention</strong>, <strong className="text-[#f39c12]">durabilité</strong> et <strong className="text-[#f39c12]">performance</strong>.
              </p>
            </ContainerAnimated>

            <ContainerAnimated>
              <button className="px-8 py-3 rounded-full bg-[#f39c12] text-white font-normal text-xs transition-all duration-200 hover:bg-[#d68910] cursor-pointer" onClick={() => setIsQuoteModalOpen(true)}>
                Obtenir mon devis gratuit
              </button>
            </ContainerAnimated>
          </ContainerStagger>
        </div>
      </section>


      {/*  */}
      <Features />


      {/*  */}
      <div className="w-full relative">

        <HeroDemo1 />
      </div>
      {/*  */}



      {/* Quote Request Modal */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0  p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold   text-[#f39c12]">Demande de devis</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Remplissez le formulaire, nous vous recontacterons rapidement
                  </p>
                </div>
                <button
                  onClick={() => setIsQuoteModalOpen(false)}
                  className="w-10 h-10  hover:scale-110 cursor-pointer rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom complet *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[#f39c12] focus:outline-none transition-colors"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[#f39c12] focus:outline-none transition-colors"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[#f39c12] focus:outline-none transition-colors"
                      placeholder="+225 XX XX XX XX XX"
                    />
                  </div>
                </div>
              </div>

              {/* Company & Service */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Entreprise
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[#f39c12] focus:outline-none transition-colors"
                      placeholder="Nom de l'entreprise"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Service souhaité *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#f39c12] focus:outline-none transition-colors appearance-none bg-white"
                  >
                    <option value="">Sélectionnez un service</option>
                    <option value="couverture">Couverture</option>
                    <option value="etancheite">Étanchéité</option>
                    <option value="plomberie">Plomberie</option>
                    <option value="ravalement">Ravalement de façades</option>
                    <option value="peinture">Peinture intérieure</option>
                    <option value="renovation">Rénovation & maintenance</option>
                    <option value="hauteur">Travaux en hauteur</option>
                    <option value="maintenance">Contrat de maintenance</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Décrivez votre projet *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#f39c12] focus:outline-none transition-colors resize-none"
                    placeholder="Décrivez votre projet, vos besoins spécifiques..."
                  />
                </div>
              </div>

              {/* Info Box */}
              <div className=" rounded-xl p-4">
                <p className="text-sm text-gray-700">
                  <strong className="text-[#f39c12]">Votre demande sera envoyée à :</strong> contact@gdcouverture.ci
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Nous nous engageons à vous répondre sous 24 heures ouvrées
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className="w-full py-4 px-8 bg-[#f39c12] text-white font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Envoi en cours...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Devis envoyé avec succès !
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Envoyer la demande de devis
                  </>
                )}
              </button>

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3">
                  <X className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <p className="text-red-800 font-medium text-sm">
                    Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
