export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-background border-t border-border py-8 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-0 right-0 h-px bg-primary/30" />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-foreground/60">
          <p>
            © {currentYear} Randrianasolo Jean Marc Thonny. Tous droits réservés.
          </p>
          <p className="text-center sm:text-right">
            Développeur Front-End & Full-Stack — Fianarantsoa, Madagascar
          </p>
        </div>
      </div>
    </footer>
  )
}
