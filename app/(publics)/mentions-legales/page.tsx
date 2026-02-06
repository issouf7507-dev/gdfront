"use client";
import { ContainerStagger, ContainerAnimated } from "@/components/blocks/cta-section-with-gallery";
import {
    Building2,
    MapPin,
    Phone,
    Mail,
    Scale,
    Globe,
    Shield,
    Server,
    Eye,
    Lock
} from "lucide-react";

export default function MentionsLegalesPage() {
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
                                <Scale className="w-12 h-12 text-white" />
                            </div>
                        </ContainerAnimated>
                        <ContainerAnimated>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                                Mentions Légales
                            </h1>
                        </ContainerAnimated>
                        <ContainerAnimated>
                            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                                Informations légales et réglementaires concernant GD Couverture
                            </p>
                        </ContainerAnimated>
                    </ContainerStagger>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-8">

                    {/* Identification de l'entreprise */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-[#f39c12]/10 rounded-xl flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-[#f39c12]" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Identification de l'entreprise
                            </h2>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-8 space-y-4">
                            <div>
                                <p className="text-sm font-semibold text-gray-500 mb-1">Dénomination sociale</p>
                                <p className="text-lg font-semibold text-gray-900">GD COUVERTURE CÔTE D'IVOIRE</p>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-500 mb-1">Forme juridique</p>
                                <p className="text-gray-700">SARL (Société à Responsabilité Limitée)</p>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-500 mb-1">Capital social</p>
                                <p className="text-gray-700">[À compléter] FCFA</p>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-500 mb-1">Numéro RCCM</p>
                                <p className="text-gray-700">[À compléter]</p>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-500 mb-1">Numéro de compte contribuable</p>
                                <p className="text-gray-700">[À compléter]</p>
                            </div>

                            <div className="pt-4 border-t border-gray-200">
                                <p className="text-sm font-semibold text-gray-500 mb-3">Siège social</p>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-[#f39c12] flex-shrink-0 mt-0.5" />
                                    <p className="text-gray-700">
                                        Abidjan, Cocody<br />
                                        Côte d'Ivoire
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-[#f39c12]/10 rounded-xl flex items-center justify-center">
                                <Phone className="w-6 h-6 text-[#f39c12]" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Coordonnées
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <Phone className="w-5 h-5 text-[#f39c12]" />
                                <div>
                                    <p className="text-sm text-gray-500">Téléphone</p>
                                    <a href="tel:+2250713488488" className="text-gray-900 font-medium hover:text-[#f39c12] transition-colors">
                                        +225 07 13 48 84 88
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <Mail className="w-5 h-5 text-[#f39c12]" />
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <a href="mailto:contact@gdcouverture.ci" className="text-gray-900 font-medium hover:text-[#f39c12] transition-colors">
                                        contact@gdcouverture.ci
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <Globe className="w-5 h-5 text-[#f39c12]" />
                                <div>
                                    <p className="text-sm text-gray-500">Site internet</p>
                                    <p className="text-gray-900 font-medium">www.gdcouverture.ci</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Directeur de publication */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-[#f39c12]/10 rounded-xl flex items-center justify-center">
                                <Eye className="w-6 h-6 text-[#f39c12]" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Directeur de publication
                            </h2>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-8">
                            <p className="text-gray-700 leading-relaxed">
                                Le directeur de la publication du site www.gdcouverture.ci est <strong className="text-gray-900">[Nom du Gérant]</strong>, en sa qualité de gérant de la société GD COUVERTURE CÔTE D'IVOIRE.
                            </p>
                        </div>
                    </div>



                    {/* Propriété intellectuelle */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-[#f39c12]/10 rounded-xl flex items-center justify-center">
                                <Lock className="w-6 h-6 text-[#f39c12]" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Propriété intellectuelle
                            </h2>
                        </div>

                        <div className="prose prose-gray max-w-none">
                            <div className="bg-gray-50 rounded-2xl p-8 space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    L'ensemble du contenu de ce site (structure, textes, logos, images, vidéos, etc.) est la propriété exclusive de GD COUVERTURE CÔTE D'IVOIRE ou de ses partenaires.
                                </p>

                                <p>
                                    Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de GD COUVERTURE CÔTE D'IVOIRE.
                                </p>

                                <p>
                                    Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles de la loi ivoirienne et internationale relatives à la protection des droits d'auteur et des droits voisins.
                                </p>

                                <p className="font-semibold text-gray-900">
                                    Marques et logos
                                </p>

                                <p>
                                    Les marques, logos, signes ainsi que tous les contenus du site (textes, images, son, vidéo...) font l'objet d'une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d'auteur.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Protection des données personnelles */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-[#f39c12]/10 rounded-xl flex items-center justify-center">
                                <Shield className="w-6 h-6 text-[#f39c12]" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Protection des données personnelles
                            </h2>
                        </div>

                        <div className="prose prose-gray max-w-none">
                            <div className="bg-gray-50 rounded-2xl p-8 space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    Conformément à la réglementation en vigueur en Côte d'Ivoire relative à la protection des données à caractère personnel, vous disposez des droits suivants concernant vos données personnelles :
                                </p>

                                <ul className="space-y-2 ml-6">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#f39c12] mt-1.5">•</span>
                                        <span>Droit d'accès et de rectification</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#f39c12] mt-1.5">•</span>
                                        <span>Droit de suppression</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#f39c12] mt-1.5">•</span>
                                        <span>Droit d'opposition au traitement</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#f39c12] mt-1.5">•</span>
                                        <span>Droit à la portabilité de vos données</span>
                                    </li>
                                </ul>

                                <p className="pt-4">
                                    Pour exercer ces droits ou pour toute question sur le traitement de vos données dans ce dispositif, vous pouvez nous contacter par email à l'adresse : <a href="mailto:contact@gdcouverture.ci" className="text-[#f39c12] font-semibold hover:underline">contact@gdcouverture.ci</a>
                                </p>

                                <p>
                                    Pour plus d'informations sur la protection de vos données personnelles, veuillez consulter notre <a href="/confidentialite" className="text-[#f39c12] font-semibold hover:underline">Politique de Confidentialité</a>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Responsabilité */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Limitation de responsabilité
                        </h2>

                        <div className="prose prose-gray max-w-none">
                            <div className="bg-gray-50 rounded-2xl p-8 space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
                                </p>

                                <p>
                                    Si vous constatez une lacune, erreur ou ce qui paraît être un dysfonctionnement, merci de bien vouloir le signaler par email à <a href="mailto:contact@gdcouverture.ci" className="text-[#f39c12] font-semibold hover:underline">contact@gdcouverture.ci</a>, en décrivant le problème de la manière la plus précise possible.
                                </p>

                                <p>
                                    GD COUVERTURE CÔTE D'IVOIRE ne peut être tenue responsable de l'utilisation faite de ces informations, et de tout préjudice direct ou indirect pouvant en découler.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Liens hypertextes */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Liens hypertextes
                        </h2>

                        <div className="prose prose-gray max-w-none">
                            <div className="bg-gray-50 rounded-2xl p-8 space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    Les liens hypertextes mis en place dans le cadre du présent site internet en direction d'autres ressources présentes sur le réseau Internet ne sauraient engager la responsabilité de GD COUVERTURE CÔTE D'IVOIRE.
                                </p>

                                <p>
                                    Tout site public ou privé est autorisé à établir, sans autorisation préalable, un lien vers les informations diffusées par GD COUVERTURE CÔTE D'IVOIRE.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Droit applicable */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Droit applicable et juridiction compétente
                        </h2>

                        <div className="bg-gradient-to-br from-[#f39c12]/5 to-[#d68910]/5 border-2 border-[#f39c12]/20 rounded-2xl p-8">
                            <p className="text-gray-700 leading-relaxed">
                                Les présentes mentions légales sont régies par le droit ivoirien. En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux d'Abidjan, Côte d'Ivoire, auxquels les parties attribuent compétence territoriale, quel que soit le lieu d'exécution de l'obligation ou le domicile du défendeur.
                            </p>
                        </div>
                    </div>

                    {/* Date de dernière mise à jour */}
                    <div className="border-t border-gray-200 pt-8">
                        <p className="text-sm text-gray-500 text-center">
                            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>

                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-4xl mx-auto px-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        Des questions sur nos mentions légales ?
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Notre équipe est à votre disposition pour répondre à toutes vos questions
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#f39c12] to-[#d68910] text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
                    >
                        <Mail className="w-5 h-5" />
                        Nous contacter
                    </a>
                </div>
            </section>

        </div>
    );
}