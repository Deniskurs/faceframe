/**
 * Contact components — barrel export.
 *
 * Active redesign uses BookOrMessage (Acuity-ready Tabs) + ContactForm
 * (shadcn Form + zod) + QuickInfo strip + StudioComparison.
 *
 * Legacy components (ContactHero, ContactFormWithProcess, ContactFAQ) are
 * intentionally not re-exported here — kept in the codebase only for git
 * history during the redesign.
 */

export { BookOrMessage } from "./BookOrMessage";
export { ContactForm } from "./ContactForm";
export { QuickInfo } from "./QuickInfo";
export { StudioComparison } from "./StudioComparison";
