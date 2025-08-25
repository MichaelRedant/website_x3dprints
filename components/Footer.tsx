import Container from "./Container"

export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <Container className="py-10 text-sm text-neutral-600 grid md:grid-cols-3 gap-6">
        <div>
          <div className="font-semibold text-neutral-900">X3DPrints</div>
          <p className="mt-2">Professionele 3D prints voor prototypes en kleine series.</p>
        </div>
        <div>
          <div className="font-semibold text-neutral-900">Contact</div>
          <p className="mt-2">Gent, België<br/>info@x3dprints.be</p>
        </div>
        <div>
          <div className="font-semibold text-neutral-900">Links</div>
          <ul className="mt-2 space-y-2">
            <li><a href="/sitemap.xml">Sitemap</a></li>
            <li><a href="/privacy">Privacy</a></li>
          </ul>
        </div>
      </Container>
      <div className="text-center text-xs py-6 text-neutral-500">© {new Date().getFullYear()} X3DPrints</div>
    </footer>
  )
}
