import { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { AccountPortal } from "@/components/account/AccountPortal";
import { BRAND } from "@/config/business";

export const metadata: Metadata = {
  title: `My Account | ${BRAND.name}`,
  description: `View your upcoming appointments, booking history, and package credits at ${BRAND.name}.`,
  robots: { index: false }, // personal surface — keep out of search
};

export default function AccountPage() {
  return (
    <main>
      <PageHero
        label="Your Space"
        title="My Account"
        description="Appointments, packages, and everything in between."
        height="minimal"
      />
      <section className="pt-6 sm:pt-8 pb-16 sm:pb-20 bg-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-10 max-w-3xl">
          <AccountPortal />
        </div>
      </section>
    </main>
  );
}
