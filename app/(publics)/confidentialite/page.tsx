"use client";
import { ContainerStagger, ContainerAnimated } from "@/components/blocks/cta-section-with-gallery";
import {
    Shield,
    Lock,
    Eye,
    Database,
    UserCheck,
    Cookie,
    Share2,
    AlertTriangle,
    Mail,
    CheckCircle2,
    FileText,
    Clock,
    Phone,
    MapPin
} from "lucide-react";

export default function ConfidentialitePage() {
    return (
        <div className="min-h-screen bg-white">

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#f39c12] to-[#d68910] py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }} />
                </div>

                <div className="relative max-w-7xl mx-auto px-8 text-center">
                    <ContainerStagger>
                        <ContainerAnimated>
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <Shield className="w-12 h-12 text-white" />
                            </div>
                        </ContainerAnimated>
                        <ContainerAnimated>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                                Politique de Confidentialité
                            </h1>
                        </ContainerAnimated>
                        <ContainerAnimated>
                            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                                Votre vie privée est importante pour nous. Découvrez comment nous protégeons vos données personnelles.
                            </p>
                        </ContainerAnimated>
                    </ContainerStagger>
                </div>
            </section>

            {/* Quick Summary */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl p-6 shadow-md">
                            <div className="w-12 h-12 bg-[#f39c12]/10 rounded-xl flex items-center justify-center mb-4">
                                <Lock className="w-6 h-6 text-[#f39c12]" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Données sécurisées</h3>
                            <p className="text-sm text-gray-600">
                                Vos informations sont protégées par des mesures de sécurité avancées
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-md">
                            <div className="w-12 h-12 bg-[#f39c12]/10 rounded-xl flex items-center justify-center mb-4">
                                <UserCheck className="w-6 h-6 text-[#f39c12]" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Vous gardez le contrôle</h3>
                            <p className="text-sm text-gray-600">
                                Accédez, modifiez ou supprimez vos données à tout moment
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-md">
                            <div className="w-12 h-12 bg-[#f39c12]/10 rounded-xl flex items-center justify-center mb-4">
                                <Eye className="w-6 h-6 text-[#f39c12]" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Transparence totale</h3>
                            <p className="text-sm text-gray-600">
                                Nous vous informons clairement de l'utilisation de vos données
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-8">

                    {/* Introduction */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Introduction
                        </h2>
                        <div className="bg-gray-50 rounded-2xl p-8 space-y-4 text-gray-700 leading-relaxed">
                            <p>
                                GD COUVERTURE CÔTE D'IVOIRE accorde une grande importance à la protection de vos données personnelles. La présente politique de confidentialité a pour but de vous informer sur la manière dont nous collectons, utilisons, partageons et protégeons vos informations personnelles.
                            </p>
                            <p>
                                En utilisant notre site web ou nos services, vous acceptez les pratiques décrites dans cette politique de confidentialité.
                            </p>
                            <p className="font-semibold text-gray-900">
                                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Responsable du traitement */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-[#f39c12]/10 rounded-xl flex items-center justify-center">
                                <FileText className="w-6 h-6 text-[#f39c12]" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Responsable du traitement des données
                            </h2>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-8">
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Le responsable du traitement de vos données personnelles est :
                            </p>
                            <div className="space-y-2 text-gray-700">
                                <p><strong className="text-gray-900">Société :</strong> GD COUVERTURE CÔTE D'IVOIRE</p>
                                <p><strong className="text-gray-900">Adresse :</strong> <a href="https://maps.google.com/?q=Abidjan,Cocody" target="_blank" rel="noopener noreferrer">Cocody Danga, Abidjan Côte d'Ivoire</a></p>
                                <p><strong className="text-gray-900">Email :</strong> <a href="mailto:contact@gdcouverture.ci" className="text-[#f39c12] hover:underline">contact@gdcouverture.ci</a></p>
                                <p><strong className="text-gray-900">Téléphone :</strong> <a href="tel:+2250713488488" className="text-[#f39c12] hover:underline">+225 07 13 48 84 88</a></p>
                            </div>
                        </div>
                    </div>

                    {/* Données collectées */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-[#f39c12]/10 rounded-xl flex items-center justify-center">
                                <Database className="w-6 h-6 text-[#f39c12]" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Données que nous collectons
                            </h2>
                        </div>

                        <div className="space-y-6">
                            {/* Données d'identification */}
                            <div className="bg-gray-50 rounded-2xl p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-[#f39c12]" />
                                    Données d'identification
                                </h3>
                                <p className="text-gray-700 mb-4">
                                    Lorsque vous nous contactez ou demandez un devis, nous collectons :
                                </p>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#f39c12] mt-1">•</span>
                                        <span>Nom et prénom</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#f39c12] mt-1">•</span>
                                        <span>Adresse email</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#f39c12] mt-1">•</span>
                                        <span>Numéro de téléphone</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#f39c12] mt-1">•</span>
                                        <span>Nom de l'entreprise (optionnel)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#f39c12] mt-1">•</span>
                                        <span>Adresse postale (si nécessaire pour le devis)</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Données de navigation */}
                            <div className="bg-gray-50 rounded-2xl p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-[#f39c12]" />
                                    Données de navigation
                                </h3>
                                <p className="text-gray-700 mb-4">
                                    Lors de votre visite sur notre site, nous collectons automatiquement :
                                </p>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#f39c12] mt-1">•</span>
                                        <span>Adresse IP</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#f39c12] mt-1">•</span>
                                        <span>Type de navigateur et version</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#f39c12] mt-1">•</span>
                                        <span>Système d'exploitation</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#f39c12] mt-1">•</span>
                                        <span>Pages visitées et durée de visite</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#f39c12] mt-1">•</span>
                                        <span>Données de géolocalisation approximative</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Utilisation des données */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-[#f39c12]/10 rounded-xl flex items-center justify-center">
                                <Eye className="w-6 h-6 text-[#f39c12]" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Comment nous utilisons vos données
                            </h2>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-8">
                            <p className="text-gray-700 mb-6">
                                Nous utilisons vos données personnelles pour les finalités suivantes :
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-[#f39c12]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-[#f39c12] font-bold text-sm">1</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Traitement de vos demandes</h4>
                                        <p className="text-gray-700 text-sm">Répondre à vos demandes de devis, questions ou demandes de contact</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-[#f39c12]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-[#f39c12] font-bold text-sm">2</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Gestion de la relation client</h4>
                                        <p className="text-gray-700 text-sm">Assurer le suivi de vos projets, gérer nos contrats et maintenir notre relation commerciale</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-[#f39c12]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-[#f39c12] font-bold text-sm">3</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Communication marketing</h4>
                                        <p className="text-gray-700 text-sm">Vous envoyer des informations sur nos services, offres et actualités (avec votre consentement)</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-[#f39c12]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-[#f39c12] font-bold text-sm">4</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Amélioration de nos services</h4>
                                        <p className="text-gray-700 text-sm">Analyser l'utilisation de notre site pour améliorer nos services et votre expérience utilisateur</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-[#f39c12]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-[#f39c12] font-bold text-sm">5</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Obligations légales</h4>
                                        <p className="text-gray-700 text-sm">Respecter nos obligations légales et réglementaires (comptabilité, fiscalité, etc.)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Base légale */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Base légale du traitement
                        </h2>

                        <div className="bg-gray-50 rounded-2xl p-8 space-y-4 text-gray-700 leading-relaxed">
                            <p>
                                Le traitement de vos données personnelles repose sur les bases légales suivantes :
                            </p>
                            <ul className="space-y-2 ml-6">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#f39c12] mt-1.5">•</span>
                                    <span><strong>Votre consentement</strong> : pour l'envoi de communications marketing</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#f39c12] mt-1.5">•</span>
                                    <span><strong>L'exécution d'un contrat</strong> : pour le traitement de vos demandes de devis et la gestion de nos prestations</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#f39c12] mt-1.5">•</span>
                                    <span><strong>Notre intérêt légitime</strong> : pour l'amélioration de nos services et la sécurité de notre site</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#f39c12] mt-1.5">•</span>
                                    <span><strong>Une obligation légale</strong> : pour respecter nos obligations comptables et fiscales</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Partage des données */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-[#f39c12]/10 rounded-xl flex items-center justify-center">
                                <Share2 className="w-6 h-6 text-[#f39c12]" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Partage de vos données
                            </h2>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-8 space-y-4 text-gray-700 leading-relaxed">
                            <p>
                                Vos données personnelles ne sont <strong className="text-gray-900">jamais vendues à des tiers</strong>. Nous pouvons partager vos informations uniquement dans les cas suivants :
                            </p>

                            <div className="space-y-3 mt-6">
                                <div className="bg-white rounded-xl p-4 border-l-4 border-[#f39c12]">
                                    <h4 className="font-semibold text-gray-900 mb-2">Prestataires de services</h4>
                                    <p className="text-sm">
                                        Nous faisons appel à des prestataires de confiance pour l'hébergement de notre site, l'envoi d'emails, etc. Ces prestataires sont contractuellement tenus de protéger vos données.
                                    </p>
                                </div>

                                <div className="bg-white rounded-xl p-4 border-l-4 border-[#f39c12]">
                                    <h4 className="font-semibold text-gray-900 mb-2">Obligations légales</h4>
                                    <p className="text-sm">
                                        Si la loi l'exige, nous pouvons communiquer vos données aux autorités compétentes.
                                    </p>
                                </div>

                                <div className="bg-white rounded-xl p-4 border-l-4 border-[#f39c12]">
                                    <h4 className="font-semibold text-gray-900 mb-2">Transferts d'entreprise</h4>
                                    <p className="text-sm">
                                        En cas de fusion, acquisition ou vente d'actifs, vos données pourraient être transférées, sous réserve de la même protection.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Conservation des données */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-[#f39c12]/10 rounded-xl flex items-center justify-center">
                                <Clock className="w-6 h-6 text-[#f39c12]" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Durée de conservation
                            </h2>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-8">
                            <p className="text-gray-700 mb-6">
                                Nous conservons vos données personnelles pendant les durées suivantes :
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-start gap-3 p-4 bg-white rounded-xl">
                                    <CheckCircle2 className="w-5 h-5 text-[#f39c12] flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Clients actifs</p>
                                        <p className="text-sm text-gray-600">Pendant la durée de la relation commerciale et 3 ans après la dernière interaction</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-white rounded-xl">
                                    <CheckCircle2 className="w-5 h-5 text-[#f39c12] flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Prospects (demandes de devis)</p>
                                        <p className="text-sm text-gray-600">3 ans à compter de la demande ou du dernier contact</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-white rounded-xl">
                                    <CheckCircle2 className="w-5 h-5 text-[#f39c12] flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Documents comptables et fiscaux</p>
                                        <p className="text-sm text-gray-600">10 ans conformément aux obligations légales</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-white rounded-xl">
                                    <CheckCircle2 className="w-5 h-5 text-[#f39c12] flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Données de navigation</p>
                                        <p className="text-sm text-gray-600">13 mois maximum</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cookies */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-[#f39c12]/10 rounded-xl flex items-center justify-center">
                                <Cookie className="w-6 h-6 text-[#f39c12]" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Cookies et technologies similaires
                            </h2>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-8 space-y-4 text-gray-700 leading-relaxed">
                            <p>
                                Notre site utilise des cookies pour améliorer votre expérience de navigation et analyser l'utilisation du site.
                            </p>

                            <div className="bg-white rounded-xl p-6 mt-6">
                                <h4 className="font-semibold text-gray-900 mb-4">Types de cookies utilisés :</h4>

                                <div className="space-y-4">
                                    <div>
                                        <p className="font-semibold text-gray-900 mb-1">Cookies techniques (nécessaires)</p>
                                        <p className="text-sm">Indispensables au fonctionnement du site. Ils ne peuvent pas être désactivés.</p>
                                    </div>

                                    <div>
                                        <p className="font-semibold text-gray-900 mb-1">Cookies analytiques</p>
                                        <p className="text-sm">Nous aident à comprendre comment les visiteurs utilisent notre site (Google Analytics).</p>
                                    </div>

                                    <div>
                                        <p className="font-semibold text-gray-900 mb-1">Cookies marketing (optionnels)</p>
                                        <p className="text-sm">Permettent d'afficher des publicités pertinentes (avec votre consentement).</p>
                                    </div>
                                </div>
                            </div>

                            <p className="pt-4">
                                Vous pouvez à tout moment modifier vos préférences en matière de cookies via les paramètres de votre navigateur ou notre bandeau de gestion des cookies.
                            </p>
                        </div>
                    </div>

                    {/* Sécurité */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-[#f39c12]/10 rounded-xl flex items-center justify-center">
                                <Lock className="w-6 h-6 text-[#f39c12]" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Sécurité de vos données
                            </h2>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-8 space-y-4 text-gray-700 leading-relaxed">
                            <p>
                                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, perte, destruction ou divulgation :
                            </p>

                            <ul className="space-y-2 ml-6 mt-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#f39c12] mt-1.5">•</span>
                                    <span>Chiffrement SSL/TLS pour les transmissions de données</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#f39c12] mt-1.5">•</span>
                                    <span>Accès restreint aux données personnelles (uniquement le personnel autorisé)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#f39c12] mt-1.5">•</span>
                                    <span>Sauvegardes régulières</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#f39c12] mt-1.5">•</span>
                                    <span>Pare-feu et systèmes de détection d'intrusion</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#f39c12] mt-1.5">•</span>
                                    <span>Mises à jour de sécurité régulières</span>
                                </li>
                            </ul>

                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-amber-900">
                                        <strong>Important :</strong> Malgré nos efforts, aucune transmission de données sur Internet n'est totalement sécurisée. Nous ne pouvons garantir une sécurité absolue.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vos droits */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-[#f39c12]/10 rounded-xl flex items-center justify-center">
                                <UserCheck className="w-6 h-6 text-[#f39c12]" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Vos droits sur vos données
                            </h2>
                        </div>

                        <div className="bg-gradient-to-br from-[#f39c12]/5 to-[#d68910]/5 border-2 border-[#f39c12]/20 rounded-2xl p-8">
                            <p className="text-gray-700 mb-6">
                                Conformément à la réglementation en vigueur, vous disposez des droits suivants :
                            </p>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white rounded-xl p-5 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 bg-[#f39c12] rounded-lg flex items-center justify-center">
                                            <Eye className="w-4 h-4 text-white" />
                                        </div>
                                        <h4 className="font-bold text-gray-900">Droit d'accès</h4>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Obtenir une copie de vos données personnelles
                                    </p>
                                </div>

                                <div className="bg-white rounded-xl p-5 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 bg-[#f39c12] rounded-lg flex items-center justify-center">
                                            <FileText className="w-4 h-4 text-white" />
                                        </div>
                                        <h4 className="font-bold text-gray-900">Droit de rectification</h4>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Corriger vos données inexactes ou incomplètes
                                    </p>
                                </div>

                                <div className="bg-white rounded-xl p-5 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 bg-[#f39c12] rounded-lg flex items-center justify-center">
                                            <AlertTriangle className="w-4 h-4 text-white" />
                                        </div>
                                        <h4 className="font-bold text-gray-900">Droit de suppression</h4>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Demander l'effacement de vos données
                                    </p>
                                </div>

                                <div className="bg-white rounded-xl p-5 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 bg-[#f39c12] rounded-lg flex items-center justify-center">
                                            <Lock className="w-4 h-4 text-white" />
                                        </div>
                                        <h4 className="font-bold text-gray-900">Droit de limitation</h4>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Limiter le traitement de vos données
                                    </p>
                                </div>

                                <div className="bg-white rounded-xl p-5 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 bg-[#f39c12] rounded-lg flex items-center justify-center">
                                            <Share2 className="w-4 h-4 text-white" />
                                        </div>
                                        <h4 className="font-bold text-gray-900">Droit de portabilité</h4>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Recevoir vos données dans un format structuré
                                    </p>
                                </div>

                                <div className="bg-white rounded-xl p-5 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 bg-[#f39c12] rounded-lg flex items-center justify-center">
                                            <Shield className="w-4 h-4 text-white" />
                                        </div>
                                        <h4 className="font-bold text-gray-900">Droit d'opposition</h4>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Vous opposer au traitement de vos données
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 p-6 bg-white rounded-xl border-2 border-[#f39c12]">
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-[#f39c12]" />
                                    Comment exercer vos droits ?
                                </h4>
                                <p className="text-gray-700 mb-4">
                                    Pour exercer l'un de ces droits, contactez-nous par email à :
                                </p>
                                <a
                                    href="mailto:contact@gdcouverture.ci"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#f39c12] text-white font-semibold rounded-full hover:bg-[#d68910] transition-colors"
                                >
                                    <Mail className="w-4 h-4" />
                                    contact@gdcouverture.ci
                                </a>
                                <p className="text-sm text-gray-600 mt-4">
                                    Nous vous répondrons dans un délai de 30 jours maximum après vérification de votre identité.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Modifications */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Modifications de cette politique
                        </h2>

                        <div className="bg-gray-50 rounded-2xl p-8 space-y-4 text-gray-700 leading-relaxed">
                            <p>
                                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page avec une date de mise à jour.
                            </p>
                            <p>
                                Nous vous encourageons à consulter régulièrement cette page pour rester informé de la manière dont nous protégeons vos données personnelles.
                            </p>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="bg-gradient-to-br from-[#f39c12] to-[#d68910] rounded-2xl p-8 text-white">
                        <h2 className="text-2xl font-bold mb-4">
                            Questions ou préoccupations ?
                        </h2>
                        <p className="mb-6 text-white/90">
                            Si vous avez des questions concernant cette politique de confidentialité ou le traitement de vos données personnelles, n'hésitez pas à nous contacter :
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5" />
                                <a href="mailto:contact@gdcouverture.ci" className="hover:underline">
                                    contact@gdcouverture.ci
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5" />
                                <a href="tel:+2250713488488" className="hover:underline">
                                    +225 07 13 48 84 88
                                </a>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                                <span> <a href="https://maps.google.com/?q=Abidjan,Cocody" target="_blank" rel="noopener noreferrer">Cocody Danga, Abidjan Côte d'Ivoire</a></span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
}