"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import MobileBottomNav from "@/app/components/MobileBottomNav";
import { useContent } from "@/lib/useContent";
import { sendContactMail } from "@/lib/api";

export default function ContattiPage() {
  const { get } = useContent("contatti");

  const [formState, setFormState] = useState({
    company: "",
    phone: "",
    email: "",
    service: "",
    details: "",
    privacy: false,
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formStatus === "sending") return;
    if (!formState.privacy) {
      setFormStatus("error");
      setFormError("Devi accettare la Privacy Policy per inviare la richiesta");
      return;
    }
    setFormStatus("sending");
    setFormError("");
    try {
      await sendContactMail({ ...formState });
      setFormStatus("success");
      setFormState({
        company: "",
        phone: "",
        email: "",
        service: "",
        details: "",
        privacy: false,
      });
    } catch (err) {
      setFormStatus("error");
      setFormError(err instanceof Error ? err.message : "Errore nell'invio");
    }
  };

  return (
    <>
      <Header activeNav="contact" />

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
                {get("hero_badge", "Servizio di Trasporto")}
              </span>
              <h1 className="text-on-primary font-display-lg text-3xl md:text-display-lg mb-xs md:mb-md leading-tight">
                {get("hero_title", "Precisione in Movimento.")}
              </h1>
              <p className="text-on-primary/80 font-body-md md:font-body-lg text-body-md md:text-body-lg">
                {get("hero_subtitle", "IVI Trasporti offre un servizio di trasporto nazionale e internazionale con attenzione all'organizzazione, alla puntualità e alla cura di ogni spedizione.")}
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-md py-md md:py-xl" id="quote-form">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-md md:gap-gutter">
            <div
              className="md:col-span-7 bg-surface-container-lowest rounded-xl p-md md:p-lg"
              style={{
                boxShadow:
                  "0 15px 35px -5px rgba(9, 20, 38, 0.04)",
              }}
            >
              <h2 className="font-headline-sm md:font-headline-lg text-headline-sm md:text-headline-lg text-primary mb-base md:mb-md">
                {get("form_title", "Richiedi un Preventivo")}
              </h2>
              <p className="text-on-surface-variant font-body-sm md:font-body-md text-body-sm md:text-body-md mb-xs md:mb-lg">
                {get("form_subtitle", "Compila il modulo per ricevere un preventivo personalizzato in base alle tue esigenze di trasporto.")}
              </p>
              <form className="space-y-xs md:space-y-md" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-xs md:gap-md">
                  <div className="space-y-base">
                    <label className="text-label-sm md:text-label-sm font-label-sm text-outline">
                      {get("form_field_company", "NOME / R.SOCIALE")}
                    </label>
                    <input
                      className="w-full bg-surface border border-outline-variant focus:border-primary rounded-lg p-xs md:p-sm outline-none transition-colors text-body-sm md:text-body-md"
                      placeholder={get("form_field_company_placeholder", "Mario Rossi S.r.l.")}
                      type="text"
                      required
                      value={formState.company}
                      onChange={(e) => setFormState((s) => ({ ...s, company: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-base">
                    <label className="text-label-sm md:text-label-sm font-label-sm text-outline">
                      {get("form_field_phone", "TELEFONO")}
                    </label>
                    <input
                      className="w-full bg-surface border border-outline-variant focus:border-primary rounded-lg p-xs md:p-sm outline-none transition-colors text-body-sm md:text-body-md"
                      placeholder={get("form_field_phone_placeholder", "+39 0521 123456")}
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => setFormState((s) => ({ ...s, phone: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-base">
                    <label className="text-label-sm md:text-label-sm font-label-sm text-outline">
                      {get("form_field_email", "EMAIL AZIENDALE")}
                    </label>
                    <input
                      className="w-full bg-surface border border-outline-variant focus:border-primary rounded-lg p-xs md:p-sm outline-none transition-colors text-body-sm md:text-body-md"
                      placeholder={get("form_field_email_placeholder", "mario@azienda.it")}
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    />
                </div>
                <div className="space-y-base">
                  <label className="text-label-sm md:text-label-sm font-label-sm text-outline">
                    {get("form_field_service", "TIPOLOGIA SERVIZIO")}
                  </label>
                  <select
                    className="w-full bg-surface border border-outline-variant focus:border-primary rounded-lg p-xs md:p-sm outline-none transition-colors text-body-sm md:text-body-md"
                    value={formState.service}
                    onChange={(e) => setFormState((s) => ({ ...s, service: e.target.value }))}
                  >
                    {[
                      get("form_option1", "Trasporto Nazionale (Italia)"),
                      get("form_option2", "Trasporto Internazionale (UE)"),
                      get("form_option3", "Logistica Specializzata"),
                      get("form_option4", "Carichi Completi (FTL)"),
                    ].map((opt, i) => (
                      <option key={i}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-base">
                  <label className="text-label-sm md:text-label-sm font-label-sm text-outline">
                    {get("form_field_details", "DETTAGLI DELLA SPEDIZIONE")}
                  </label>
                  <textarea
                    className="w-full bg-surface border border-outline-variant focus:border-primary rounded-lg p-xs md:p-sm outline-none transition-colors text-body-sm md:text-body-md"
                    placeholder={get("form_field_details_placeholder", "Indica tratta, tipologia merce e urgenza...")}
                    rows={2}
                    value={formState.details}
                    onChange={(e) => setFormState((s) => ({ ...s, details: e.target.value }))}
                  />
                </div>
                <div className="flex items-center gap-xs text-label-sm md:text-label-sm text-outline">
                  <input
                    className="rounded border-outline-variant text-primary focus:ring-primary"
                    id="privacy"
                    type="checkbox"
                    checked={formState.privacy}
                    onChange={(e) => setFormState((s) => ({ ...s, privacy: e.target.checked }))}
                  />
                  <label htmlFor="privacy">
                    {get("form_privacy_label", "Accetto il trattamento dei dati personali secondo la Privacy Policy.")}
                  </label>
                </div>
                {formStatus === "success" && (
                  <p className="bg-secondary-container/20 border border-secondary-container rounded-lg px-sm py-sm text-center text-body-sm md:text-body-md">
                    Richiesta inviata con successo. Ti ricontatteremo al più presto.
                  </p>
                )}
                {formStatus === "error" && (
                  <p className="bg-red-100 border border-red-300 text-red-700 rounded-lg px-sm py-sm text-center text-body-sm md:text-body-md">
                    {formError}
                  </p>
                )}
                <button
                  className="w-full bg-primary text-on-primary py-sm md:py-md rounded-xl font-label-md md:font-headline-md text-label-md md:text-headline-md hover:bg-primary-container transition-all active:scale-[0.98] disabled:opacity-60"
                  disabled={formStatus === "sending"}
                >
                  {formStatus === "sending"
                    ? "Invio in corso..."
                    : get("form_submit_label", "Invia Richiesta")}
                </button>
              </form>
            </div>

            <div className="md:col-span-5 space-y-md md:space-y-gutter">
              <div className="bg-primary text-on-primary rounded-xl p-md md:p-lg overflow-hidden relative group">
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-secondary-container text-3xl md:text-headline-lg mb-xs md:mb-sm">
                    location_on
                  </span>
                  <h3 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md mb-xs">
                    {get("info_office_title", "Centro Operativo")}
                  </h3>
                  <p className="text-on-primary/70 font-body-sm md:font-body-md text-body-sm md:text-body-md mb-sm md:mb-md">
                    {get("info_office_desc", "Parma, Italia - Sede Operativa")}
                  </p>
                  <div className="w-full h-32 md:h-40 rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                    <div className="w-full h-full bg-surface-container-highest flex items-center justify-center text-primary font-bold text-label-sm md:text-label-md">
                      {get("info_office_map", "Mappa Parma Nord")}
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-md md:p-lg opacity-10">
                  <span className="material-symbols-outlined text-[80px] md:text-[120px]">
                    map
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-high rounded-xl p-md md:p-lg border border-outline-variant/30">
                <h3 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-primary mb-sm md:mb-md border-b border-primary/10 pb-xs md:pb-sm">
                  {get("info_legal_title", "Dati Societari")}
                </h3>
                <div className="space-y-xs md:space-y-sm">
                  <div className="flex flex-col border-b border-outline-variant pb-xs">
                    <span className="text-label-xs md:text-label-sm font-label-sm text-outline uppercase">
                      {get("info_legal_company_label", "Ragione Sociale")}
                    </span>
                    <span className="text-label-xs md:text-label-md font-label-md text-primary font-bold">
                      {get("info_legal_company", "IVI TRASPORTI S.R.L.S.")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-outline-variant pb-xs">
                    <span className="text-label-xs md:text-label-sm font-label-sm text-outline uppercase">
                      {get("info_legal_vat_label", "P.IVA / C.F.")}
                    </span>
                    <span className="text-label-xs md:text-label-md font-label-md text-primary font-mono">
                      {get("info_legal_vat", "03081230348")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-outline-variant pb-xs">
                    <span className="text-label-xs md:text-label-sm font-label-sm text-outline uppercase">
                      {get("info_legal_rea_label", "Numero REA")}
                    </span>
                    <span className="text-label-xs md:text-label-md font-label-md text-primary">
                      {get("info_legal_rea", "PR-356920")}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-label-xs md:text-label-sm font-label-sm text-outline uppercase">
                      {get("info_legal_pec_label", "Indirizzo PEC")}
                    </span>
                    <span className="text-label-xs md:text-label-md font-label-md text-primary break-all">
                      {get("info_legal_pec", "ivitrasportisrls@pec.it")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <MobileBottomNav activeNav="contact" />
    </>
  );
}
