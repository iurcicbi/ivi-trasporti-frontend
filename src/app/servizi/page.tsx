"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import MobileBottomNav from "@/app/components/MobileBottomNav";
import { useContent } from "@/lib/useContent";

export default function ServiziPage() {
  const { get } = useContent("servizi");
  const distribBg = `url('${get("distribuzione_img_src", "https://lh3.googleusercontent.com/aida-public/AB6AXuAKvl9cHzcmu6sd695PVnNbG6n0RCV451VkkDNTr655py_vVegGjVYJF31Cjg8CmQRyqlCoaidBpsCTn37l1VvFhjzqS9jSXd5Z5jMSGe43EOWQdk-ZQKcNCHthWoZAUZXs6kMWH-w_AeFdyXRrIHWtOWW5QbHUMWz-F_tDANf5FVUPgoNJCZhzmpZIxtSA9Ayttxgg1pGa6ZuANRW7gm-GUHlNgAk_z1DSU76fWluzpURmHQgoToFf")}')`;
  const consulBg = `url('${get("consulenza_img_src", "https://lh3.googleusercontent.com/aida-public/AB6AXuAugsRP_piI6H7YGXsMMKv7bkKxIdWB6c_qEF297mUBlctk3qMFE6q3vWmKiYiZaLD8g4TqPKFSfnmv3nijRWXg1FUXewp1Bl_7RFLfimj3XLRiFs5AOD2jhVs52eTOSoOb8DS08IcjJzwq9L_VbeZa4xFcLX00hE0ndE9Q8CJN7l8_U6R1HejxlAzGHuNgKtVsUWmr_ItdGMq1GxVgKP-CSC3z0bHRHOWOuF9J6qoUUR88MfKRCpA7")}')`;

  return (
    <>
      <Header activeNav="services" />

      <main className="pt-[80px]">
        <section className="relative h-[300px] md:h-[450px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={get("hero_img_alt", "Flotta IVI Trasporti")}
              className="w-full h-full object-cover"
              src={get("hero_img_src", "/professional_commercial_photography_of_a_modern_black_daf_xf_truck_and_two.png")}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />
          </div>
          <div className="relative z-10 text-center max-w-4xl px-sm">
            <div className="inline-flex items-center gap-2 bg-secondary-container/20 border border-secondary-container/30 px-4 py-1 rounded-full mb-md backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
              <span className="font-label-sm text-label-sm text-secondary-container uppercase tracking-widest">
                {get("hero_badge", "Servizi di Trasporto")}
              </span>
            </div>
            <h2 className="text-on-primary font-display-lg text-3xl md:text-display-lg mb-xs md:mb-md leading-tight">
              {get("hero_title", "I Nostri Servizi Professionali")}
            </h2>
            <p className="font-body-lg text-body-lg text-white/80 max-w-2xl mx-auto">
              {get("hero_subtitle", "Trasporti affidabili in Italia e in Europa, con un servizio puntuale, flessibile e orientato alle esigenze di ogni cliente.")}
            </p>
          </div>
        </section>

        <section className="max-w-container-max mx-auto px-sm py-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="md:col-span-7 bg-surface-container-lowest rounded-xl transition-all duration-300 overflow-hidden group" style={{ boxShadow: "0 15px 35px -5px rgba(9, 20, 38, 0.04), 0 5px 15px rgba(9, 20, 38, 0.02)" }}>
              <div className="grid md:grid-cols-2 h-full">
                <div className="p-lg flex flex-col justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm text-secondary uppercase mb-xs block">
                      {get("distribuzione_badge", "Servizio Locale")}
                    </span>
                    <h3 className="font-headline-lg text-headline-lg text-primary mb-sm">
                      {get("distribuzione_title", "Consegne in Toda Italia")}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-md">
                      {get("distribuzione_desc", "Offriamo un servizio di distribuzione capillare su tutto il territorio nazionale. Con sede operativa a Parma, pianifichiamo ogni trasporto per rispettare le tempistiche concordate, dalla produzione alla consegna finale, ovunque tu sia.")}
                    </p>
                  </div>
                  <a
                    href={get("distribuzione_cta_link", "/contatti#quote-form")}
                    className="flex items-center gap-xs text-primary font-bold cursor-pointer group"
                  >
                    <span className="font-label-md text-label-md">
                      {get("distribuzione_cta_label", "Scopri di più")}
                    </span>
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </a>
                </div>
                <div className="relative min-h-[300px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: distribBg }}
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-5 bg-primary rounded-xl transition-all duration-300 p-lg flex flex-col justify-between text-on-primary" style={{ boxShadow: "0 15px 35px -5px rgba(9, 20, 38, 0.04), 0 5px 15px rgba(9, 20, 38, 0.02)" }}>
              <div className="flex justify-between items-start">
                <div className="bg-secondary-container/20 p-sm rounded-lg">
                  <span
                    className="material-symbols-outlined text-secondary-container"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    map
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-primary/60 uppercase tracking-widest">
                  {get("nazionale_area", "In tutta Italia")}
                </span>
              </div>
              <div>
                <h3 className="font-headline-lg text-headline-lg mb-sm">
                  {get("nazionale_title", "Trasporto Nazionale")}
                </h3>
                <p className="font-body-md text-body-md text-on-primary/80 mb-md">
                  {get("nazionale_desc", "Collegamenti tra le principali aree italiane con un servizio organizzato per lunghe tratte. I nostri mezzi sono scelti per efficienza e affidabilità. Copriamo ogni regione con partenze pianificate, seguendo ogni spedizione con attenzione alla sicurezza.")}
                </p>
                <ul className="space-y-2 mb-lg">
                  {[get("nazionale_feat1", "Consegna in 24-48 ore"), get("nazionale_feat2", "Pianificazione su misura")].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 font-label-md text-label-md">
                      <span className="material-symbols-outlined text-secondary-container">
                        check_circle
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={get("nazionale_cta_link", "/contatti#quote-form")}
                className="block w-full text-center py-xs border border-on-primary/20 rounded-lg font-label-md text-label-md hover:bg-on-primary hover:text-primary transition-colors"
              >
                {get("nazionale_cta_label", "Pianifica Percorso")}
              </a>
            </div>

            <div className="md:col-span-4 bg-primary rounded-xl transition-all duration-300 p-lg flex flex-col justify-between text-on-primary" style={{ boxShadow: "0 15px 35px -5px rgba(9, 20, 38, 0.04), 0 5px 15px rgba(9, 20, 38, 0.02)" }}>
              <div>
                <span className="material-symbols-outlined text-secondary-container text-[40px] mb-md inline-block">
                  {get("express_icon", "speed")}
                </span>
                <h3 className="font-headline-md text-headline-md mb-xs">
                  {get("express_title", "Spedizioni Express")}
                </h3>
                <p className="font-body-md text-body-md text-on-primary/80 mb-md">
                  {get("express_desc", "Un servizio pensato per spedizioni con tempistiche definite. Organizziamo trasporti dedicati per rispondere a esigenze produttive e consegne puntuali, con attenzione costante al monitoraggio del carico.")}
                </p>
              </div>
              <div className="bg-white/10 p-sm rounded-lg border border-white/10">
                <span className="font-label-sm text-label-sm text-secondary-container font-bold">
                  {get("express_badge", "Servizio Dedicato")}
                </span>
              </div>
            </div>

            <div className="md:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg" style={{ boxShadow: "0 15px 35px -5px rgba(9, 20, 38, 0.04), 0 5px 15px rgba(9, 20, 38, 0.02)" }}>
              <div className="grid md:grid-cols-2 gap-lg items-center">
                <div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-md">
                    {get("sicurezza_title", "Attenzione alla Sicurezza")}
                  </h3>
                  <div className="space-y-md">
                    <div className="flex gap-sm">
                      <span className="material-symbols-outlined text-primary">
                        verified_user
                      </span>
                      <div>
                        <p className="font-label-md text-label-md text-primary mb-1">
                          {get("sicurezza_feat1_title", "Verifica del Carico")}
                        </p>
                        <p className="font-body-sm text-label-sm text-on-surface-variant">
                          {get("sicurezza_feat1_desc", "Ogni spedizione viene controllata prima della partenza.")}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-sm">
                      <span className="material-symbols-outlined text-primary">
                        monitor_heart
                      </span>
                      <div>
                        <p className="font-label-md text-label-md text-primary mb-1">
                          {get("sicurezza_feat2_title", "Monitoraggio del Trasporto")}
                        </p>
                        <p className="font-body-sm text-label-sm text-on-surface-variant">
                          {get("sicurezza_feat2_desc", "Possibilità di seguire la posizione del carico durante il viaggio.")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative bg-primary-container rounded-lg p-md overflow-hidden min-h-[180px] flex items-center justify-center">
                  <div className="relative text-center">
                    <span className="font-display-sm text-display-sm text-on-primary-container block">
                      {get("sicurezza_big_text", "Consegne")}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-widest">
                      {get("sicurezza_big_subtext", "monitorate e puntuali")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-12 bg-surface-container-lowest rounded-xl p-lg border border-outline-variant/20 transition-all duration-300" style={{ boxShadow: "0 15px 35px -5px rgba(9, 20, 38, 0.04), 0 5px 15px rgba(9, 20, 38, 0.02)" }}>
              <div className="flex flex-col md:flex-row gap-lg items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-sm mb-sm">
                    <div className="bg-primary/5 p-sm rounded-lg">
                      <span className="material-symbols-outlined text-primary">
                        public
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                      {get("internazionale_badge", "Italia e Europa")}
                    </span>
                  </div>
                  <h3 className="font-headline-lg text-headline-lg text-primary mb-sm">
                    {get("internazionale_title", "Trasporto Internazionale")}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-md">
                    {get("internazionale_desc", "Organizziamo trasporti verso Germania, Francia, Benelux e altre destinazioni europee. Ogni spedizione internazionale viene seguita con attenzione alla documentazione e alla pianificazione del percorso, per garantire un servizio organizzato e puntuale.")}
                  </p>
                  <div className="flex flex-wrap gap-md">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary-container text-sm">
                        language
                      </span>
                      <span className="font-label-md text-label-md text-primary">
                        {get("internazionale_feat1", "Collegamenti Italia-Europa")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary-container text-sm">
                        gavel
                      </span>
                      <span className="font-label-md text-label-md text-primary">
                        {get("internazionale_feat2", "Gestione Documentale")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 w-full h-[200px] bg-surface-container rounded-lg flex items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={get("internazionale_img_alt", "Logistica Internazionale")}
                    className="w-full h-full object-cover opacity-80"
                    src={get("internazionale_img_src", "https://lh3.googleusercontent.com/aida-public/AB6AXuDYxQZ-4jTp2qFtV_6JnAVySm9qiORmFdOVfU3W-aamXl-7IE4YunNIz512jbLkE2z-YHYWp1iKmoW63A4zDZtMxNd9oovshbx_RIE6REpKxhDr9U1tZHPObe82ohgak1M1RNSw54ok_GC-yivqXBDzvnjzr3QYXd2xJRXxyMNcVx_WZzbMpWKwXqe76ezqVV7lD-CvfuVIAcWSUiuKeLfojTA8Xe6CvWzKL3G999eTfPzNwEBDnc9h")}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container py-xl">
          <div className="max-w-container-max mx-auto px-sm text-center">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-xs block">
              {get("mezzi_badge", "I Nostri Mezzi")}
            </span>
            <h2 className="font-display-sm text-display-sm text-primary mb-lg">
              {get("mezzi_title", "Veicoli Moderni e Affidabili")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/20">
                <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-md flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary">
                    local_shipping
                  </span>
                </div>
                <h4 className="font-headline-md text-headline-md text-primary mb-2">
                  {get("mezzi_feat1_title", "Trattori Stradali Moderni")}
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {get("mezzi_feat1_desc", "Veicoli scelti per affidabilità ed efficienza, adatti a trasporti nazionali e internazionali.")}
                </p>
              </div>
              <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/20">
                <div className="w-16 h-16 bg-surface-container-high rounded-full mx-auto mb-md flex items-center justify-center border-2 border-outline-variant">
                  <span className="material-symbols-outlined text-primary">
                    local_shipping
                  </span>
                </div>
                <h4 className="font-headline-md text-headline-md text-primary mb-2">
                  {get("mezzi_feat2_title", "Mezzi Efficienti")}
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {get("mezzi_feat2_desc", "I nostri veicoli sono mantenuti con regolarità per garantire continuità operativa e attenzione al trasporto.")}
                </p>
              </div>
              <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/20">
                <div className="w-16 h-16 bg-secondary-container rounded-full mx-auto mb-md flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-secondary-container">
                    construction
                  </span>
                </div>
                <h4 className="font-headline-md text-headline-md text-primary mb-2">
                  {get("mezzi_feat3_title", "Manutenzione 24/7")}
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {get("mezzi_feat3_desc", "Ogni veicolo segue un piano di manutenzione programmata per ridurre il rischio di imprevisti e garantire continuità nel servizio.")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary py-xl">
          <div className="max-w-container-max mx-auto px-sm">
            <div className="relative rounded-2xl overflow-hidden bg-tertiary-container p-lg md:p-xl flex flex-col md:flex-row items-center gap-xl">
              <div className="flex-1 z-10">
                <div className="bg-secondary-container text-on-secondary-container px-sm py-1 rounded-full w-fit mb-md">
                  <span className="font-label-sm text-label-sm font-bold uppercase tracking-widest">
                    {get("consulenza_badge", "Consulenza")}
                  </span>
                </div>
                <h2 className="font-display-sm text-display-sm text-on-tertiary mb-sm">
                  {get("consulenza_title", "Richiedi una Consulenza")}
                </h2>
                <p className="font-body-lg text-body-lg text-on-tertiary-container mb-lg">
                  {get("consulenza_desc", "Scopri come IVI Trasporti può supportare la tua attività con soluzioni di trasporto nazionali e internazionali. Analizziamo le tue esigenze e ti proponiamo un servizio personalizzato, costruito sui tempi e sulle necessità della tua azienda.")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-md mb-xl">
                  {[
                    { title: get("consulenza_feat1_title", "Preventivo Personalizzato"), desc: get("consulenza_feat1_desc", "Ricevi una proposta studiata in base ai tuoi volumi, alle destinazioni e alle esigenze operative.") },
                    { title: get("consulenza_feat2_title", "Supporto Dedicato"), desc: get("consulenza_feat2_desc", "Ti accompagniamo dalla richiesta iniziale fino alla consegna, con un contatto diretto e un'assistenza costante.") },
                    { title: get("consulenza_feat3_title", "Servizi Flessibili"), desc: get("consulenza_feat3_desc", "Organizziamo ogni trasporto in modo efficiente, adattandoci alle tempistiche e alle richieste del cliente.") },
                    { title: get("consulenza_feat4_title", "Affidabilità e Puntualità"), desc: get("consulenza_feat4_desc", "Lavoriamo ogni giorno per garantire consegne puntuali, comunicazione trasparente e un servizio di qualità.") },
                  ].map((feat, i) => (
                    <div key={i} className="border-l-2 border-secondary-container pl-md">
                      <p className="text-on-tertiary font-bold mb-1">{feat.title}</p>
                      <p className="text-on-tertiary-container text-label-sm">{feat.desc}</p>
                    </div>
                  ))}
                </div>
                <a
                  href={get("consulenza_cta_link", "/contatti#quote-form")}
                  className="inline-block bg-secondary-container text-on-secondary-container px-xl py-md rounded-full font-headline-md text-headline-md font-bold hover:scale-105 transition-transform active:scale-95"
                >
                  {get("consulenza_cta_label", "Richiedi un Preventivo")}
                </a>
              </div>
              <div className="flex-1 w-full relative h-[400px]">
                <div
                  className="absolute inset-0 bg-cover bg-center rounded-xl shadow-2xl"
                  style={{ backgroundImage: consulBg }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-container-max mx-auto px-sm py-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-md text-center">
            {[
              { icon: "location_on", label: get("feature1_label", "Sede a Parma"), sub: get("feature1_sub", "Operativi in tutta Italia") },
              { icon: "calendar_today", label: get("feature2_label", "Gestione Professionale"), sub: get("feature2_sub", "Pianificazione su misura") },
              { icon: "inventory_2", label: get("feature3_label", "Mezzi Efficienti"), sub: get("feature3_sub", "Flotta moderna e performante") },
              { icon: "support_agent", label: get("feature4_label", "Assistenza 24/7"), sub: get("feature4_sub", "Supporto sempre disponibile") },
            ].map((feat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="material-symbols-outlined text-primary mb-2">
                  {feat.icon}
                </span>
                <p className="font-label-md text-label-md text-primary">{feat.label}</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">{feat.sub}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav activeNav="services" />
    </>
  );
}
