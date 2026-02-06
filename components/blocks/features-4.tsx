import { Droplet, Home, Wrench, PaintBucket, Brush, Building2, Mountain, ClipboardCheck } from 'lucide-react'

export function Features() {
    return (
        <section className="py-12 md:py-20 bg-[#f9f9f9]">
            <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-balance text-4xl font-medium lg:text-5xl text-[#f39c12]">
                        Une gamme complète pour la santé de vos bâtiments
                    </h2>
                    <p className="text-gray-600">
                        De l'entretien courant aux interventions les plus complexes, nous protégeons votre patrimoine avec rigueur et expertise technique.
                    </p>
                </div>

                {/* Main Services Grid */}
                <div className="relative mx-auto grid max-w-2xl lg:max-w-5xl divide-x divide-y border *:p-8 sm:grid-cols-2 lg:grid-cols-3">

                    {/* Couverture */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Home className="size-8 text-[#f39c12]" />
                            <h3 className="text-base font-semibold text-[#f39c12]">Couverture</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Protection durable de votre bâtiment : pose de toitures neuves adaptées au climat ivoirien, rénovation, traitement des fuites, isolation thermique et entretien préventif.
                        </p>
                    </div>

                    {/* Étanchéité */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Droplet className="size-8 text-[#f39c12]" />
                            <h3 className="text-base font-semibold text-[#f39c12]">Étanchéité</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Préserver la structure et éviter les dégradations : toitures-terrasses, balcons, murs enterrés, recherche et réparation de fuites avec solutions préventives et correctives.
                        </p>
                    </div>

                    {/* Plomberie */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Wrench className="size-8 text-[#f39c12]" />
                            <h3 className="text-base font-semibold text-[#f39c12]">Plomberie</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Interventions rapides et efficaces : installation de réseaux, détection et réparation de fuites, débouchage, remplacement de sanitaires et maintenance préventive.
                        </p>
                    </div>

                    {/* Ravalement de façades */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Building2 className="size-8 text-[#f39c12]" />
                            <h3 className="text-base font-semibold text-[#f39c12]">Ravalement de façades</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Valoriser et protéger votre patrimoine : nettoyage, réparation des fissures, traitement anti-humidité, enduits durables et isolation thermique par l'extérieur (ITE).
                        </p>
                    </div>

                    {/* Peinture intérieure */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <PaintBucket className="size-8 text-[#f39c12]" />
                            <h3 className="text-base font-semibold text-[#f39c12]">Peinture intérieure</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Des finitions soignées pour sublimer vos espaces : peinture murs, plafonds et boiseries avec préparation des supports et peintures durables adaptées.
                        </p>
                    </div>

                    {/* Rénovation & maintenance */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Brush className="size-8 text-[#f39c12]" />
                            <h3 className="text-base font-semibold text-[#f39c12]">Rénovation & maintenance</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Services complémentaires : maintenance générale, rénovation complète, réhabilitation, coordination multi-métiers, menuiserie aluminium et électricité.
                        </p>
                    </div>

                </div>

                {/* Specialties Section */}
                <div className="grid md:grid-cols-2 gap-8 pt-8">

                    {/* Travaux en hauteur */}
                    <div className="bg-white p-8 rounded-lg  border">
                        <div className="flex items-center gap-3 mb-4">
                            <Mountain className="size-10 text-[#f39c12]" />
                            <h3 className="text-xl font-semibold text-[#f39c12]">Travaux en hauteur / Travaux à la corde</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            Interventions sans échafaudage, rapides et économiques
                        </p>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p className="font-semibold text-[#f39c12] mb-2">Avantages :</p>
                            <ul className="space-y-1 ml-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#f39c12] ">•</span>
                                    <span>Rapidité d'exécution</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#f39c12] ">•</span>
                                    <span>Réduction des coûts</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#f39c12] ">•</span>
                                    <span>Sécurité maximale</span>
                                </li>
                            </ul>
                            <p className="pt-3 text-xs italic">
                                Interventions en hauteur sur façades et toitures, accès difficiles, réparations ponctuelles, maintenance urgente, nettoyage et étanchéité localisée.
                            </p>
                        </div>
                    </div>

                    {/* Offre maintenance */}
                    <div className="bg-white p-8 rounded-lg border">
                        <div className="flex items-center gap-3 mb-4">
                            <ClipboardCheck className="size-10 text-[#f39c12]" />
                            <h3 className="text-xl font-semibold text-[#f39c12]">Offre maintenance & entretien</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            Contrats de maintenance sur mesure
                        </p>
                        <div className="space-y-2 text-sm text-gray-600">
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#f39c12] ">✓</span>
                                    <span>Visites régulières d'inspection</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#f39c12] ">✓</span>
                                    <span>Contrôle toitures, façades et étanchéité</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#f39c12] ">✓</span>
                                    <span>Nettoyage des gouttières</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#f39c12] ">✓</span>
                                    <span>Détection préventive des fuites</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#f39c12] ">✓</span>
                                    <span>Petites réparations incluses</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#f39c12] ">✓</span>
                                    <span>Interventions prioritaires en cas d'urgence</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#f39c12] ">✓</span>
                                    <span>Rapport d'intervention avec recommandations</span>
                                </li>
                            </ul>
                            <p className="pt-3 text-xs italic text-gray-500">
                                (Travaux hors forfait sur devis après diagnostic)
                            </p>
                        </div>
                    </div>

                </div>

                {/* CTA Section */}
                <div className="text-center pt-8">
                    <button className="px-8 py-3 rounded-full bg-[#f39c12] text-white font-normal text-sm transition-all duration-200 hover:bg-[#d68910] cursor-pointer shadow-lg hover:shadow-xl">
                        Demander un devis personnalisé
                    </button>
                </div>
            </div>
        </section>
    )
}