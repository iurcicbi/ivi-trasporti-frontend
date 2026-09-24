"use client";

import { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import MobileBottomNav from "@/app/components/MobileBottomNav";
import { useContent } from "@/lib/useContent";
import { sendContactMail } from "@/lib/api";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const { get } = useContent("home");
  const g = useContent("globale");

  const [formState, setFormState] = useState({
    company: "",
    email: "",
    pickup: "",
    destination: "",
    notes: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formStatus === "sending") return;
    setFormStatus("sending");
    setFormError("");
    try {
      await sendContactMail({ ...formState });
      setFormStatus("success");
      setFormState({ company: "", email: "", pickup: "", destination: "", notes: "" });
    } catch (err) {
      setFormStatus("error");
      setFormError(err instanceof Error ? err.message : "Errore nell'invio");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "home";
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          current = section.getAttribute("id") || "home";
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const phone = g.get("phone_number", "+393288625535");

  return (
    <>
      <Header activeNav={activeSection} />

      <main className="pt-16">
        <section
          className="relative min-h-[90vh] w-full flex items-center overflow-hidden bg-primary"
          id="home"
        >
          <div className="absolute inset-0 z-0">
            <img
              alt={get("hero_img_alt", "Flotta IVI Trasporti")}
              className="w-full h-full object-cover opacity-60 md:opacity-40"
              src={get("hero_img_src", "/professional_commercial_photography_of_a_modern_black_daf_xf_truck_and_two.png")}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/70" />
          </div>
          <div className="container mx-auto px-md z-10 relative py-lg md:py-xl">
            <div className="max-w-3xl text-on-primary">
              <div className="inline-flex items-center gap-xs bg-white/10 border border-white/20 px-xs py-1 md:py-base rounded-full mb-sm md:mb-md backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse shrink-0" />
                <span className="text-label-xs md:text-label-sm font-label-sm text-secondary-container uppercase tracking-widest">
                  {get("hero_badge", "Trasporto Professionale su Misura")}
                </span>
              </div>
              <h1 className="font-display-lg text-3xl md:text-display-lg mb-xs md:mb-sm leading-tight text-white">
                {get("hero_title_line1", "Affidabilità in Movimento,")}
                <br />
                <span className="text-secondary-container">{get("hero_title_line2", "Consegne Senza Compromessi.")}</span>
              </h1>
              <p className="font-body-md md:font-body-lg text-body-md md:text-body-lg mb-md md:mb-lg text-white/80 max-w-2xl">
                {get("hero_description", "Trasportiamo le tue merci con la massima cura e puntualità. Che si tratti di un singolo collo o di un carico completo, ogni spedizione è gestita con la stessa attenzione ai dettagli e affidabilità. Soluzioni logistiche flessibili per ogni esigenza.")}
              </p>
              <div className="flex flex-wrap gap-sm md:gap-md">
                <a
                  href={get("hero_cta_link", "#quote")}
                  className="bg-secondary-container text-on-secondary-container px-lg md:px-xl py-sm md:py-md rounded-xl font-label-md md:font-headline-md text-label-md md:text-headline-md font-bold shadow-lg hover:shadow-secondary-container/30 transition-all active:scale-95 hover:-translate-y-0.5"
                >
                  {get("hero_cta_label", "Richiedi Preventivo")}
                </a>
                <div className="flex items-center gap-xs md:gap-sm px-sm md:px-md">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center text-white font-bold text-2xs md:text-xs backdrop-blur-sm">
                      {get("hero_badge_247", "24/7")}
                    </div>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/30 bg-secondary-container/30 flex items-center justify-center text-white font-bold text-2xs md:text-xs backdrop-blur-sm">
                      {get("hero_badge_eu", "EU")}
                    </div>
                  </div>
                  <span className="text-white/70 font-label-xs md:font-label-sm text-label-xs md:text-label-sm">
                    {get("hero_support_label", "Monitoraggio Attivo e Supporto H24")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-lg md:py-2xl bg-surface relative overflow-hidden">
          <div className="container mx-auto px-md relative">
            <div className="text-center mb-lg md:mb-xl max-w-2xl mx-auto">
              <span className="text-label-xs md:text-label-sm font-label-sm text-secondary-container uppercase tracking-widest bg-secondary-container/10 px-xs py-1 md:py-base rounded-full mb-xs md:mb-sm inline-block">
                {get("valori_badge", "I Nostri Punti di Forza")}
              </span>
              <h2 className="font-display-xs md:font-display-sm text-display-xs md:text-display-sm text-primary mt-xs md:mt-sm">
                {get("valori_title", "Perché Sceglierci")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md md:gap-lg">
              <div className="group bg-surface-container-lowest rounded-2xl p-md md:p-lg border border-outline-variant/20 hover:border-secondary-container/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-2xl flex items-center justify-center mb-sm md:mb-md shadow-lg">
                  <span className="material-symbols-outlined text-2xl md:text-3xl">{get("valore1_icon", "timer")}</span>
                </div>
                <h3 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-primary mb-xs">
                  {get("valore1_title", "Precisione")}
                </h3>
                <p className="font-body-sm md:font-body-md text-body-sm md:text-body-md text-on-surface-variant">
                  {get("valore1_desc", "Ogni consegna è pianificata nei minimi dettagli. Rispettiamo le tempistiche concordate per garantire la continuità operativa della tua azienda.")}
                </p>
              </div>
              <div className="group bg-surface-container-lowest rounded-2xl p-md md:p-lg border border-outline-variant/20 hover:border-secondary-container/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-secondary-container to-secondary text-on-secondary-container rounded-2xl flex items-center justify-center mb-sm md:mb-md shadow-lg">
                  <span className="material-symbols-outlined text-2xl md:text-3xl">{get("valore2_icon", "verified_user")}</span>
                </div>
                <h3 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-primary mb-xs">
                  {get("valore2_title", "Affidabilità")}
                </h3>
                <p className="font-body-sm md:font-body-md text-body-sm md:text-body-md text-on-surface-variant">
                  {get("valore2_desc", "Una flotta moderna e ben mantenuta, conducenti esperti e protocolli di sicurezza rigorosi per ogni tipo di trasporto.")}
                </p>
              </div>
              <div className="group bg-surface-container-lowest rounded-2xl p-md md:p-lg border border-outline-variant/20 hover:border-secondary-container/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-2xl flex items-center justify-center mb-sm md:mb-md shadow-lg">
                  <span className="material-symbols-outlined text-2xl md:text-3xl">{get("valore3_icon", "dynamic_feed")}</span>
                </div>
                <h3 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-primary mb-xs">
                  {get("valore3_title", "Flessibilità")}
                </h3>
                <p className="font-body-sm md:font-body-md text-body-sm md:text-body-md text-on-surface-variant">
                  {get("valore3_desc", "Ci adattiamo alle tue esigenze: trasporti singoli, carichi completi o spedizioni programmate. Un servizio su misura per il tuo business.")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-lg md:py-2xl bg-surface-container-low relative overflow-hidden" id="services">
          <div className="container mx-auto px-md relative">
            <div className="mb-lg md:mb-xl max-w-3xl">
              <span className="text-label-xs md:text-label-sm font-label-sm text-secondary-container uppercase tracking-widest bg-secondary-container/10 px-xs py-1 md:py-base rounded-full mb-xs md:mb-sm inline-block">
                {get("servizi_badge", "Cosa Offriamo")}
              </span>
              <h2 className="font-display-xs md:font-display-sm text-display-xs md:text-display-sm text-primary mt-xs md:mt-sm">
                {get("servizi_title", "I Nostri Servizi")}
              </h2>
              <p className="font-body-sm md:font-body-lg text-body-sm md:text-body-lg text-on-surface-variant mt-xs md:mt-sm">
                {get("servizi_subtitle", "Soluzioni di trasporto pensate per ogni necessità, con la massima attenzione alla cura della merce e alla puntualità delle consegne.")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-md md:gap-gutter">
              <div className="md:col-span-8 group relative overflow-hidden rounded-2xl bg-primary text-white flex flex-col justify-end min-h-[220px] md:min-h-[420px]">
                <div className="absolute inset-0 opacity-50 group-hover:scale-110 transition-transform duration-700">
                  <img
                    alt={get("servizio_nazionale_img_alt", "Trasporto Nazionale IVI Trasporti")}
                    className="w-full h-full object-cover"
                    src={get("servizio_nazionale_img_src", "https://lh3.googleusercontent.com/aida-public/AB6AXuAahuh6S7mN9JwNfaWGFeZ1QBFJT0TnjbmSb-ZC-G2Mawng5IAvI_ppP4GCD0DJ1mK0Q5wRqh5ix_5114JhnJBIGMoDtaWueDqHSGQ7DMxQA_2xZ1a6x3Roj9DRopdq8uBIPJpop68XniLqy8g-vEZ19Di2bibpHRoCaeQoAozvCQCj0NfaXULpuvOLed2I095WxNYdfspWlST8epR8CjMNVkHAcuU3zPkeYBLiY0NyLBQagAPxieyC")}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
                <div className="relative z-10 p-md md:p-lg">
                  <span className="bg-secondary-container text-on-secondary-container px-xs py-1 md:py-base rounded-lg text-label-xs md:text-label-sm font-bold mb-xs md:mb-sm inline-block">
                    {get("servizio_nazionale_badge", "CARICO COMPLETO (FTL)")}
                  </span>
                  <h3 className="font-display-xs md:font-display-sm text-display-xs md:text-display-sm mb-xs">
                    {get("servizio_nazionale_title", "Trasporto Nazionale")}
                  </h3>
                  <p className="font-body-sm md:font-body-md text-body-sm md:text-body-md text-white/70 max-w-2xl">
                    {get("servizio_nazionale_desc", "Copertura su tutto il territorio italiano. Gestiamo ogni spedizione con tracciamento in tempo reale e report dettagliati di consegna.")}
                  </p>
                </div>
              </div>
              <div className="md:col-span-4 bg-surface-container-lowest p-md md:p-lg rounded-2xl border border-outline-variant/20 flex flex-col justify-between group hover:shadow-lg transition-all duration-300">
                <div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-secondary-container to-secondary/30 rounded-2xl flex items-center justify-center mb-sm md:mb-md">
                    <span className="material-symbols-outlined text-secondary-container text-2xl md:text-3xl">
                      {get("servizio_industriali_icon", "inventory_2")}
                    </span>
                  </div>
                  <h3 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-primary mb-xs">
                    {get("servizio_industriali_title", "Trasporti Industriali")}
                  </h3>
                  <p className="font-body-sm md:font-body-md text-body-sm md:text-body-md text-on-surface-variant">
                    {get("servizio_industriali_desc", "Soluzioni dedicate per il settore industriale. Gestiamo materiali, componenti e prodotti finiti con la massima professionalità.")}
                  </p>
                </div>
                <div className="pt-md md:pt-lg border-t border-surface-container mt-md md:mt-lg">
                  <ul className="space-y-xs text-label-xs md:text-label-md font-label-md text-primary">
                    {[get("servizio_industriali_feat1", "Logistica Integrata"), get("servizio_industriali_feat2", "Flessibilità Operativa")].map((feat, i) => (
                      <li key={i} className="flex items-center gap-xs">
                        <span className="material-symbols-outlined text-xs md:text-sm text-secondary-container">
                          check_circle
                        </span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:col-span-4 bg-gradient-to-br from-primary to-primary-container text-white p-md md:p-lg rounded-2xl group hover:-translate-y-1 transition-all duration-300">
                <span className="material-symbols-outlined text-secondary-container text-3xl md:text-4xl mb-sm md:mb-md">
                  {get("servizio_express_icon", "bolt")}
                </span>
                <h3 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md mb-xs">
                  {get("servizio_express_title", "Spedizioni Express")}
                </h3>
                <p className="font-body-sm md:font-body-md text-body-sm md:text-body-md text-white/80 mb-sm md:mb-md">
                  {get("servizio_express_desc", "Per consegne con tempistiche stringenti, organizziamo trasporti dedicati e prioritari. Affidabilità e velocità senza compromessi.")}
                </p>
                <div className="bg-white/10 rounded-lg p-xs md:p-sm border border-white/10 backdrop-blur-sm">
                  <span className="text-label-xs md:text-label-sm font-label-sm uppercase text-secondary-container tracking-widest">
                    {get("servizio_express_badge", "Servizio")}
                  </span>
                  <div className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md font-bold">
                    {get("servizio_express_feat", "Consegne Prioritarie")}
                  </div>
                </div>
              </div>
              <div className="md:col-span-8 bg-surface-container-lowest p-md md:p-lg rounded-2xl border border-outline-variant/20 flex flex-col justify-between group hover:shadow-lg transition-all duration-300">
                <div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-primary-container/30 rounded-2xl flex items-center justify-center mb-sm md:mb-md">
                    <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">
                      {get("servizio_internazionale_icon", "public")}
                    </span>
                  </div>
                  <h3 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-primary mb-xs">
                    {get("servizio_internazionale_title", "Trasporto Internazionale")}
                  </h3>
                  <p className="font-body-sm md:font-body-md text-body-sm md:text-body-md text-on-surface-variant">
                    {get("servizio_internazionale_desc", "Operiamo in tutta Europa con la stessa affidabilità e attenzione che ci contraddistingue. Gestiamo ogni spedizione con cura e professionalità.")}
                  </p>
                </div>
                <div className="pt-md md:pt-lg border-t border-surface-container mt-md md:mt-lg">
                  <span className="text-label-xs md:text-label-sm font-label-sm uppercase text-secondary-container tracking-widest font-bold">
                    {get("servizio_internazionale_area", "Italia e Europa")}
                  </span>
                </div>
              </div>
              <div className="md:col-span-12 bg-surface-container-lowest p-md md:p-lg rounded-2xl border border-outline-variant/20 flex flex-col md:flex-row gap-md md:gap-lg items-center group hover:shadow-lg transition-all duration-300">
                <div className="flex-1">
                  <h3 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-primary mb-xs">
                    {get("flotta_title", "La Nostra Flotta")}
                  </h3>
                  <p className="font-body-sm md:font-body-md text-body-sm md:text-body-md text-on-surface-variant mb-sm md:mb-md">
                    {get("flotta_desc", "Mezzi di ultima generazione pronti a partire in 24 ore. Niente attese, niente scuse: la tua merce viaggia quando decidi tu, con la certezza di un servizio senza intoppi.")}
                  </p>
                  <div className="flex gap-md flex-wrap">
                    <div className="text-center flex-1 min-w-[80px]">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-primary-container rounded-full mb-xs mx-auto flex items-center justify-center text-white shadow-lg">
                        <span className="material-symbols-outlined text-lg md:text-xl">{get("flotta_feat1_icon", "schedule")}</span>
                      </div>
                      <span className="text-label-xs md:text-label-sm font-label-sm text-primary uppercase">
                        {get("flotta_feat1_label", "Partenza in 24h")}
                      </span>
                    </div>
                    <div className="text-center flex-1 min-w-[80px]">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-secondary-container to-secondary rounded-full mb-xs mx-auto flex items-center justify-center text-white shadow-lg">
                        <span className="material-symbols-outlined text-lg md:text-xl">{get("flotta_feat2_icon", "local_shipping")}</span>
                      </div>
                      <span className="text-label-xs md:text-label-sm font-label-sm text-primary uppercase">
                        {get("flotta_feat2_label", "Nessun Carico Minimo")}
                      </span>
                    </div>
                    <div className="text-center flex-1 min-w-[80px]">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white border-2 border-outline-variant rounded-full mb-xs mx-auto flex items-center justify-center text-primary shadow-sm">
                        <span className="material-symbols-outlined text-lg md:text-xl text-primary">{get("flotta_feat3_icon", "track_changes")}</span>
                      </div>
                      <span className="text-label-xs md:text-label-sm font-label-sm text-primary uppercase">
                        {get("flotta_feat3_label", "Tracciamento in Tempo Reale")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-72 h-32 md:h-44 rounded-xl overflow-hidden shrink-0 shadow-lg">
                  <img
                    alt={get("flotta_img_alt", "Dettaglio flotta IVI Trasporti")}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={get("flotta_img_src", "https://lh3.googleusercontent.com/aida-public/AB6AXuDx9n2RLzFfZRFcZ85YRxwxmum1ZxAcWLNrtBh5VJEYKGOtHNjG6NogL3DwZnH7xZlODS_eIcFr_0uzek07SlnvqThm8Xca8SU8Yy4CKTV9NtUyXccrZ_nYxC0VUL3MwgojDq6fgpqgFM92Fpph80G_OkgDcOSP9jXRQ6dtpMG-p2bw7t5I2bvLoDODp_TJ5TO7LVlsQmMrPC1FeiHX-7x8rJO8gDHMytVvFrnhLL01FzahouL4dr5n")}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-lg md:py-2xl bg-surface overflow-hidden relative">
          <div className="container mx-auto px-md relative">
            <div className="flex flex-col lg:flex-row items-center gap-lg md:gap-xl">
              <div className="lg:w-1/2 relative">
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    alt={get("whychoose_img_alt", "Sede IVI Trasporti")}
                    className="w-full h-48 md:h-96 object-cover"
                    src={get("whychoose_img_src", "https://lh3.googleusercontent.com/aida-public/AB6AXuDaZOZBfNUKKYAdwjhDUuxcUbAYaDOxYWjJ7VlmQn9lhaTdPrAik6JTGvdxk_IJjca6sF-J1YihWn-gw6dsKMlVxxUWmoQeYTqVDIrQYSFdFCVgiIyuxpj1M45EneGtbmCayKilyF4lVRXatHtrdINPZ7vuST65Lk_yHxzE2zRrpLj8aycOTyp2L5lTLbnLv2xbJh6CeKh_IvAXejsqu47gGLWPwa_S-TgaQ6_8jKzRuIPuvQWwCPiJ")}
                  />
                </div>
                <div className="absolute -bottom-6 md:-bottom-8 -right-4 md:-right-8 bg-white p-sm md:p-md rounded-xl shadow-xl z-20 border border-surface-container max-w-[180px] md:max-w-[220px]">
                  <div className="flex items-center gap-xs md:gap-sm">
                    <div className="bg-gradient-to-br from-secondary-container to-secondary p-1 md:p-xs rounded-lg shrink-0">
                      <span className="material-symbols-outlined text-on-secondary-container text-lg md:text-xl">
                        {get("whychoose_sticker_icon", "stars")}
                      </span>
                    </div>
                    <div>
                      <div className="font-bold text-primary text-label-xs md:text-label-md">
                        {get("whychoose_sticker_title", "Trasporti Nazionali e Internazionali")}
                      </div>
                      <div className="text-2xs md:text-label-sm text-on-surface-variant">
                        {get("whychoose_sticker_subtitle", "Soluzioni su Misura")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <span className="text-label-xs md:text-label-sm font-label-sm text-secondary-container uppercase tracking-widest bg-secondary-container/10 px-xs py-1 md:py-base rounded-full mb-xs md:mb-sm inline-block">
                  {get("whychoose_badge", "Perché Noi")}
                </span>
                <h2 className="font-display-xs md:font-display-sm text-display-xs md:text-display-sm text-primary mb-sm md:mb-md mt-xs md:mt-sm">
                  {get("whychoose_title", "Perché Scegliere IVI Trasporti?")}
                </h2>
                <div className="space-y-md md:space-y-lg">
                  <div className="flex gap-sm md:gap-md p-sm md:p-md rounded-2xl bg-surface-container-lowest border border-outline-variant/10 group hover:border-secondary-container/20 transition-all duration-300">
                    <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-lg md:text-2xl">{get("whychoose1_icon", "verified")}</span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-primary mb-xs md:mb-base">
                        {get("whychoose1_title", "Servizio Personalizzato")}
                      </h4>
                      <p className="font-body-sm md:font-body-md text-body-sm md:text-body-md text-on-surface-variant">
                        {get("whychoose1_desc", "Non siamo una grande azienda anonima. Siamo un partner che conosce le tue esigenze e cura ogni dettaglio del tuo carico con attenzione.")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-sm md:gap-md p-sm md:p-md rounded-2xl bg-surface-container-lowest border border-outline-variant/10 group hover:border-secondary-container/20 transition-all duration-300">
                    <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-lg md:text-2xl">{get("whychoose2_icon", "distance")}</span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-primary mb-xs md:mb-base">
                        {get("whychoose2_title", "Tecnologia e Ottimizzazione")}
                      </h4>
                      <p className="font-body-sm md:font-body-md text-body-sm md:text-body-md text-on-surface-variant">
                        {get("whychoose2_desc", "Utilizziamo sistemi avanzati per pianificare percorsi efficienti, ridurre i tempi di consegna e garantire la massima trasparenza.")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-sm md:gap-md p-sm md:p-md rounded-2xl bg-surface-container-lowest border border-outline-variant/10 group hover:border-secondary-container/20 transition-all duration-300">
                    <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-lg md:text-2xl">{get("whychoose3_icon", "headset_mic")}</span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-primary mb-xs md:mb-base">
                        {get("whychoose3_title", "Assistenza Dedicata")}
                      </h4>
                      <p className="font-body-sm md:font-body-md text-body-sm md:text-body-md text-on-surface-variant">
                        {get("whychoose3_desc", "Un referente sempre disponibile per seguire ogni fase della spedizione. Comunicazione chiara e supporto costante 365 giorni all'anno.")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="py-lg md:py-2xl bg-primary text-white relative overflow-hidden"
          id="quote"
        >
          <div className="container mx-auto px-md relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-label-xs md:text-label-sm font-label-sm text-secondary-container uppercase tracking-widest bg-white/10 px-xs py-1 md:py-base rounded-full mb-xs md:mb-sm inline-block border border-white/10">
                {get("quote_badge", "Richiedi un Preventivo")}
              </span>
              <h2 className="font-display-xs md:font-display-sm text-display-xs md:text-display-sm mb-sm md:mb-md mt-xs md:mt-sm">
                {get("quote_title", "Pronto a far muovere il tuo business?")}
              </h2>
              <p className="font-body-sm md:font-body-lg text-body-sm md:text-body-lg text-white/70 mb-lg md:mb-xl">
                {get("quote_subtitle", "Richiedi un preventivo gratuito e personalizzato. Il nostro team analizzerà le tue esigenze e ti proporrà la soluzione di trasporto più adatta.")}
              </p>
              <form
                className="bg-white/10 backdrop-blur-md p-md md:p-lg rounded-2xl border border-white/20 text-left grid grid-cols-1 md:grid-cols-2 gap-md shadow-2xl"
                onSubmit={handleQuoteSubmit}
              >
                <div className="space-y-xs">
                  <label className="font-label-xs md:font-label-sm text-label-xs md:text-label-sm text-white/70 uppercase">
                    {get("quote_field_company", "Ragione Sociale")}
                  </label>
                  <input
                    className="w-full bg-white/5 border-white/10 rounded-xl px-sm md:px-md py-xs md:py-sm text-white placeholder:text-white/30 focus:border-secondary-container focus:ring-0 transition-colors text-body-sm md:text-body-md"
                    placeholder={get("quote_field_company_placeholder", "Nome Azienda S.r.l.")}
                    type="text"
                    required
                    value={formState.company}
                    onChange={(e) => setFormState((s) => ({ ...s, company: e.target.value }))}
                  />
                </div>
                <div className="space-y-xs">
                  <label className="font-label-xs md:font-label-sm text-label-xs md:text-label-sm text-white/70 uppercase">
                    {get("quote_field_email", "Email di Contatto")}
                  </label>
                  <input
                    className="w-full bg-white/5 border-white/10 rounded-xl px-sm md:px-md py-xs md:py-sm text-white placeholder:text-white/30 focus:border-secondary-container focus:ring-0 transition-colors text-body-sm md:text-body-md"
                    placeholder={get("quote_field_email_placeholder", "esempio@email.it")}
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-xs">
                  <label className="font-label-xs md:font-label-sm text-label-xs md:text-label-sm text-white/70 uppercase">
                    {get("quote_field_pickup", "Punto di Carico")}
                  </label>
                  <input
                    className="w-full bg-white/5 border-white/10 rounded-xl px-sm md:px-md py-xs md:py-sm text-white placeholder:text-white/30 focus:border-secondary-container focus:ring-0 transition-colors text-body-sm md:text-body-md"
                    placeholder={get("quote_field_pickup_placeholder", "Città, Prov. o CAP")}
                    type="text"
                    value={formState.pickup}
                    onChange={(e) => setFormState((s) => ({ ...s, pickup: e.target.value }))}
                  />
                </div>
                <div className="space-y-xs">
                  <label className="font-label-xs md:font-label-sm text-label-xs md:text-label-sm text-white/70 uppercase">
                    {get("quote_field_destination", "Destinazione")}
                  </label>
                  <input
                    className="w-full bg-white/5 border-white/10 rounded-xl px-sm md:px-md py-xs md:py-sm text-white placeholder:text-white/30 focus:border-secondary-container focus:ring-0 transition-colors text-body-sm md:text-body-md"
                    placeholder={get("quote_field_destination_placeholder", "Città, Prov. o CAP")}
                    type="text"
                    value={formState.destination}
                    onChange={(e) => setFormState((s) => ({ ...s, destination: e.target.value }))}
                  />
                </div>
                <div className="md:col-span-2 space-y-xs">
                  <label className="font-label-xs md:font-label-sm text-label-xs md:text-label-sm text-white/70 uppercase">
                    {get("quote_field_notes", "Specifiche della Merce")}
                  </label>
                  <textarea
                    className="w-full bg-white/5 border-white/10 rounded-xl px-sm md:px-md py-xs md:py-sm text-white placeholder:text-white/30 focus:border-secondary-container focus:ring-0 transition-colors text-body-sm md:text-body-md"
                    placeholder={get("quote_field_notes_placeholder", "Peso, dimensioni, numero bancali e tipologia merce...")}
                    rows={3}
                    value={formState.notes}
                    onChange={(e) => setFormState((s) => ({ ...s, notes: e.target.value }))}
                  />
                </div>
                <div className="md:col-span-2 pt-xs md:pt-sm">
                  {formStatus === "success" && (
                    <p className="mb-sm md:mb-md bg-white/10 border border-white/20 rounded-xl px-sm md:px-md py-xs md:py-sm text-center text-white text-body-sm md:text-body-md">
                      Richiesta inviata con successo. Ti ricontatteremo al più presto.
                    </p>
                  )}
                  {formStatus === "error" && (
                    <p className="mb-sm md:mb-md bg-red-500/90 border border-red-300 rounded-xl px-sm md:px-md py-xs md:py-sm text-center text-white text-body-sm md:text-body-md">
                      {formError}
                    </p>
                  )}
                  <button
                    className="w-full bg-secondary-container text-on-secondary-container font-label-md md:font-headline-md text-label-md md:text-headline-md font-bold py-sm md:py-md rounded-xl hover:opacity-90 transition-all active:scale-[0.98] hover:-translate-y-0.5 shadow-lg disabled:opacity-60 disabled:hover:translate-y-0"
                    type="submit"
                    disabled={formStatus === "sending"}
                  >
                    {formStatus === "sending"
                      ? "Invio in corso..."
                      : get("quote_submit_label", "Invia Richiesta Preventivo")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav activeNav={activeSection} />
    </>
  );
}
