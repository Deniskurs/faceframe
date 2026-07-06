/**
 * Contact components — barrel export.
 *
 * Contact is conversation-only: MessageSection (form + booking pointer) +
 * QuickInfo strip + StudioComparison. Booking lives at /booking.
 *
 * Legacy components (ContactHero, ContactFormWithProcess, ContactFAQ) are
 * intentionally not re-exported here — kept in the codebase only for git
 * history during the redesign.
 */

export { MessageSection } from "./MessageSection";
export { ContactForm } from "./ContactForm";
export { QuickInfo } from "./QuickInfo";
export { StudioComparison } from "./StudioComparison";
