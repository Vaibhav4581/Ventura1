import type { Metadata } from "next";
import styles from "./not-found.module.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

/* Branded 404 — emitted as out/404.html by the static export; Cloudflare
   Pages serves it automatically for unknown routes. */

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist or has moved.",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <PageHeader
          eyebrow="Error 404"
          title="Page not found"
          lead="The page you're looking for doesn't exist or has moved. Let's get you back to solid ground."
        />
        <section className={`section ${styles.notFound}`}>
          <div className={`container ${styles.actions}`}>
            <Button href="/" variant="primary" size="lg" icon="arrow">
              Back to the homepage
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Contact us
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
