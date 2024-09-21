import { useState, useEffect } from 'react'
import { ChevronDown, Globe, Menu, MessageCircle, Instagram } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from 'next/link'

export default function Component() {
  const [lang, setLang] = useState('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const [fishPositions, setFishPositions] = useState([])

  useEffect(() => {
    const fishCount = 5
    const newPositions = Array.from({ length: fishCount }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.5 + Math.random() * 0.5,
      speed: 0.5 + Math.random() * 0.5,
      direction: Math.random() > 0.5 ? 1 : -1,
    }))
    setFishPositions(newPositions)

    const animateFish = () => {
      setFishPositions(prevPositions =>
        prevPositions.map(fish => ({
          ...fish,
          x: (fish.x + fish.speed * fish.direction + 100) % 100,
        }))
      )
    }

    const intervalId = setInterval(animateFish, 50)
    return () => clearInterval(intervalId)
  }, [])

  const translations = {
    en: {
      about: "About Purnama Jaya",
      inquiry: "Inquiry",
      contact: "Contact Us",
      hero: "Fresh Catch, Global Reach",
      subHero: "Bringing the ocean's finest to your table",
      cta: "Explore Our Products",
      internationalSales: "International Sales",
      forSupplier: "For Supplier",
      forRetailWholesale: "For Retail/Wholesale",
      getInTouch: "Get in Touch",
      whatsappUs: "WhatsApp Us",
      socialMedia: "Social Media",
      instagram: "Instagram",
    },
    id: {
      about: "Tentang Purnama Jaya",
      inquiry: "Pertanyaan",
      contact: "Hubungi Kami",
      hero: "Tangkapan Segar, Jangkauan Global",
      subHero: "Membawa yang terbaik dari laut ke meja Anda",
      cta: "Jelajahi Produk Kami",
      internationalSales: "Penjualan Internasional",
      forSupplier: "Untuk Pemasok",
      forRetailWholesale: "Untuk Ritel/Grosir",
      getInTouch: "Hubungi Kami",
      whatsappUs: "WhatsApp Kami",
      socialMedia: "Media Sosial",
      instagram: "Instagram",
    }
  }

  const t = translations[lang]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-white bg-opacity-90 backdrop-blur-sm fixed w-full z-50">
        <Button variant="ghost" className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <img
          src="/placeholder.svg?height=40&width=40"
          width="40"
          height="40"
          alt="Purnama Jaya logo"
          className="mr-4"
        />
        <nav className={`${menuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto bg-white lg:bg-transparent z-50`}>
          <Button variant="ghost" className="justify-start">{t.about}</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="justify-start">
                {t.inquiry} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>{t.internationalSales}</DropdownMenuItem>
              <DropdownMenuItem>{t.forSupplier}</DropdownMenuItem>
              <DropdownMenuItem>{t.forRetailWholesale}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" className="justify-start">{t.contact}</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="justify-start">
                {t.socialMedia} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <a href="https://www.instagram.com/purnamajaya.idn?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
                  <Instagram className="mr-2 h-4 w-4" />
                  {t.instagram}
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-4 w-4" />
                <span className="sr-only">Toggle Language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setLang('en')}>English</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setLang('id')}>Bahasa Indonesia</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[#ef7a00] relative overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            {fishPositions.map((fish, index) => (
              <svg
                key={index}
                className="absolute"
                style={{
                  left: `${fish.x}%`,
                  top: `${fish.y}%`,
                  transform: `scale(${fish.scale}) scaleX(${fish.direction})`,
                  transition: 'left 2s linear',
                }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ))}
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white text-shadow-lg">
                  {t.hero}
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl text-shadow-md">
                  {t.subHero}
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-[#1d30ed] text-white hover:bg-[#1d30ed]/90">{t.cta}</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              {t.getInTouch}
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
              <a href="https://wa.me/6281390648899" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-[#1d30ed] hover:underline">
                <MessageCircle className="h-6 w-6" />
                <span>+62 813-9064-8899</span>
              </a>
              <a href="https://wa.me/6281330748762" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-[#1d30ed] hover:underline">
                <MessageCircle className="h-6 w-6" />
                <span>+62 813-3074-8762</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-[#1d30ed]">
        <p className="text-xs text-white">© 2023 Purnama Jaya Fisheries. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-white" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-white" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
