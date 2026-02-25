export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/40 mt-20">
      <div className="container mx-auto py-8 px-4">
        <div className="text-center text-sm text-muted-foreground">
          <p>כל הזכויות שמורות © {currentYear}</p>
        </div>
      </div>
    </footer>
  )
}
