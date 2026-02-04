import { Fingerprint, Pencil, Settings2, ShieldCheck, Sparkles, Zap } from 'lucide-react'

export function Features() {
    return (
        <section className="py-12 md:py-20 bg-[#f9f9f9]">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-balance text-4xl font-medium lg:text-5xl text-[#f39c12]">Une gamme complète pour la santé de votre toiture.</h2>
                    <p>De l'entretien courant aux interventions les plus complexes, nous protégeons votre habitat avec rigueur et expertise technique.</p>
                </div>

                <div className="relative mx-auto grid max-w-2xl lg:max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="size-8 text-[#f39c12]" />
                            <h3 className="text-sm font-medium text-[#f39c12]">Couverture & Tuiles</h3>
                        </div>
                        <p className="text-sm">Pose, remplacement et réparation de tous types de tuiles et ardoises pour une toiture esthétique et robuste.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="size-8 text-[#f39c12]" />
                            <h3 className="text-sm font-medium text-[#f39c12]">Étanchéité & Zinc</h3>
                        </div>
                        <p className="text-sm">Travaux de zinguerie et isolation pour garantir une protection totale contre les infiltrations et l'humidité.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Fingerprint className="size-8 text-[#f39c12]" />

                            <h3 className="text-sm font-medium text-[#f39c12]">Accès Difficile</h3>
                        </div>
                        <p className="text-sm">Interventions en mode cordiste pour les zones inaccessibles, sans besoin d'échafaudages encombrants.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Pencil className="size-8 text-[#f39c12]" />

                            <h3 className="text-sm font-medium text-[#f39c12]">Recherche de Fuite</h3>
                        </div>
                        <p className="text-sm">Diagnostic précis et colmatage immédiat pour stopper les dégâts des eaux avant qu'ils ne s'aggravent.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Settings2 className="size-8 text-[#f39c12]" />

                            <h3 className="text-sm font-medium text-[#f39c12]">Nettoyage & Soin</h3>
                        </div>
                        <p className="text-sm">Démoussage, traitement hydrofuge et nettoyage de gouttières pour prolonger la durée de vie de votre toit.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-8 text-[#f39c12]" />

                            <h3 className="text-sm font-medium text-[#f39c12]">Dépannage Urgent</h3>
                        </div>
                        <p className="text-sm">Service d'intervention rapide en Île-de-France après intempéries ou sinistres pour mise en sécurité.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}