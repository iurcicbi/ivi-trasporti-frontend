"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import MobileBottomNav from "@/app/components/MobileBottomNav";
import { useContent } from "@/lib/useContent";

export default function ChiSiamoPage() {
  const { get } = useContent("chi-siamo");
  const storyBg = `url('${get("story_img_src", "https://lh3.googleusercontent.com/aida-public/AB6AXuC5HpUbkxj5N4BRuCV9pWERo4Ge0aXklV_fidcMvDFNwDL2mTP2dus4ayaTEJH3Sc1XNEH6piN92vfQ8cOmRst_Zm8OYNbtlyjprZixgX-3PTC6MoJGa6_o38_e8QnHIG2e8nuS4XGwKBhIS_0OXayB1KLuXQx3fcgDA04lHSZexRv9lbJQen0uNlqybJRBCEeJn_woUfrEwuw2DFv3S7pbfEv4KcPnSH02-vL6CCT7qqaVRpQFRao0")}')`;

  return (
    <>
      <Header activeNav="about" />

      <main className="pt-16">
        <section className="relative h-[300px] md:h-[450px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={get("hero_img_alt", "Flotta IVI Trasporti")}
              className="w-full h-full object-cover"
              src={get("hero_img_src", "/professional_commercial_photography_of_a_modern_black_daf_xf_truck_and_two.png")}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent opacity-90" />
          </div>
          <div className="container mx-auto px-md relative z-10">
            <div className="max-w-2xl">
              <span className="inline-block bg-secondary-container text-on-secondary-container text-label-xs md:text-label-sm font-label-sm px-xs py-1 md:py-base rounded-lg mb-xs md:mb-sm uppercase tracking-widest">
                {get("hero_badge", "Chi Siamo")}
              </span>
              <h1 className="text-on-primary font-display-lg text-3xl md:text-display-lg mb-xs md:mb-md leading-tight">
                {get("hero_title", "Una Realtà Giovane con una Visione Concreta.")}
              </h1>
              <p className="text-on-primary/80 font-body-md md:font-body-lg text-body-md md:text-body-lg">
                {get("hero_subtitle", "Trasporti nazionali e internazionali con professionalità, trasparenza e attenzione ai dettagli.")}
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-md py-md md:py-xl">
          <div className="flex flex-col md:flex-row gap-md md:gap-xl items-start">
            <div className="flex-1 space-y-xs md:space-y-md">
              <p className="text-on-surface-variant font-body-md md:font-body-lg text-body-md md:text-body-lg leading-relaxed">
                {get("story_p1", "IVI Trasporti nasce nel 2024 con l'obiettivo di offrire un servizio di trasporto affidabile, puntuale e costruito sulle reali esigenze dei clienti. Fin dall'inizio abbiamo scelto di puntare su professionalità, trasparenza e attenzione ai dettagli, perché crediamo che ogni consegna rappresenti un impegno da rispettare.")}
              </p>
              <p className="text-on-surface-variant font-body-sm md:font-body-md text-body-sm md:text-body-md">
                {get("story_p2", "Con sede a Parma, seguiamo trasporti nazionali e internazionali con un approccio organizzato e flessibile. Ogni spedizione viene gestita con attenzione ai dettagli e comunicazione costante con il cliente.")}
              </p>
              <p className="text-on-surface-variant font-body-sm md:font-body-md text-body-sm md:text-body-md">
                {get("story_p3", "Ogni viaggio è pianificato con cura per assicurare puntualità, sicurezza e affidabilità. Il nostro obiettivo è crescere insieme ai nostri clienti, costruendo collaborazioni basate sulla fiducia e sulla qualità del servizio.")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-xs md:gap-md">
                {[
                  { label: get("metric1_label", "TRASPORTI"), sub: get("metric1_sub", "ITALIA E EUROPA") },
                  { label: get("metric2_label", "MEZZI EFFICIENTI"), sub: get("metric2_sub", "PRONTI A OPERARE") },
                  { label: get("metric3_label", "H24"), sub: get("metric3_sub", "SUPPORTO") },
                ].map((m, i) => (
                  <div key={i} className="bg-surface-container-lowest p-xs md:p-sm rounded-xl shadow-sm text-center border border-outline-variant/20">
                    <span className="block font-headline-xs md:font-headline-sm text-headline-xs md:text-headline-sm text-secondary">{m.label}</span>
                    <span className="text-label-2xs md:text-label-sm font-label-sm text-outline block">{m.sub}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full md:w-auto">
              <div className="rounded-xl overflow-hidden shadow-lg h-[200px] md:h-[550px] relative">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: storyBg }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-primary/80 backdrop-blur-sm p-xs md:p-md text-on-primary">
                  <p className="font-label-xs md:font-label-md font-bold uppercase tracking-tighter">
                    {get("story_caption_title", "Manutenzione ed Efficienza")}
                  </p>
                  <p className="text-body-xs md:text-body-sm opacity-80">
                    {get("story_caption_sub", "Manutenzione programmata per garantire continuità operativa.")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-lg md:py-xl">
          <div className="container mx-auto px-md">
            <h2 className="font-display-xs md:font-display-sm text-display-xs md:text-display-sm text-primary text-center mb-lg md:mb-xl">
              {get("valori_title", "I Nostri Valori")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {[
                { icon: get("valore1_icon", "handshake"), title: get("valore1_title", "Affidabilità e Trasparenza"), desc: get("valore1_desc", "Ogni spedizione è seguita con attenzione, senza sorprese. Comunichiamo in modo chiaro e tempestivo per garantire la massima fiducia in ogni fase del trasporto.") },
                { icon: get("valore2_icon", "schedule"), title: get("valore2_title", "Puntualità e Organizzazione"), desc: get("valore2_desc", "Pianifichiamo ogni tratta con cura per rispettare le scadenze e ottimizzare i tempi di consegna, senza compromettere la qualità del servizio.") },
                { icon: get("valore3_icon", "support_agent"), title: get("valore3_title", "Assistenza Diretta H24"), desc: get("valore3_desc", "Restiamo sempre a disposizione dei nostri clienti con un supporto costante, per rispondere a ogni esigenza in tempo reale.") },
                { icon: get("valore4_icon", "verified"), title: get("valore4_title", "Qualità e Cura del Dettaglio"), desc: get("valore4_desc", "Dalla pianificazione alla consegna, ogni passaggio è seguito con professionalità per garantire un servizio all'altezza delle aspettative.") },
              ].map((v, i) => (
                <div key={i} className="bg-surface-container-lowest p-md md:p-lg rounded-xl border border-outline-variant/20">
                  <span className="material-symbols-outlined text-secondary text-3xl md:text-headline-lg mb-xs md:mb-sm">{v.icon}</span>
                  <h3 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-primary mb-xs">{v.title}</h3>
                  <p className="text-on-surface-variant font-body-sm md:font-body-md text-body-sm md:text-body-md">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav activeNav="about" />
    </>
  );
}
