export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t border-gray-200 dark:border-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-foreground/60">
          <p>
            © {currentYear} Portfolio. Tous droits réservés.
          </p>
          <p className="text-center sm:text-right">
            Créé par RANDRIANASOLO Jean Marc Thonny
          </p>
        </div>
      </div>
    </footer>
  )
}
