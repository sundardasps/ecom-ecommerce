import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function Footer() {
  const [email, setEmail] = useState('')

  function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Hook up to newsletter API
    setEmail('')
  }

  return (
    <footer className="border-t bg-background text-foreground ">
      <div className="mx-auto w-full  px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand + blurb */}
          <div>
            <Link to="/" className="text-xl font-semibold">Ecom</Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Your one‑stop shop for fashion and lifestyle. Discover new arrivals every week.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-primary">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">Shop</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/men" className="text-muted-foreground hover:text-foreground">Men</Link></li>
              <li><Link to="/women" className="text-muted-foreground hover:text-foreground">Women</Link></li>
              <li><Link to="/topwear" className="text-muted-foreground hover:text-foreground">Topwear</Link></li>
              <li><Link to="/bottomwear" className="text-muted-foreground hover:text-foreground">Bottomwear</Link></li>
              <li><Link to="/new" className="text-muted-foreground hover:text-foreground">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">Support</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/help" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
              <li><Link to="/shipping" className="text-muted-foreground hover:text-foreground">Shipping</Link></li>
              <li><Link to="/returns" className="text-muted-foreground hover:text-foreground">Returns</Link></li>
              <li><Link to="/track" className="text-muted-foreground hover:text-foreground">Track Order</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">Stay in the loop</h3>
            <p className="mt-3 text-sm text-muted-foreground">Subscribe to get special offers, free giveaways, and once‑in‑a‑lifetime deals.</p>
            <form onSubmit={handleSubscribe} className="mt-4 flex w-full flex-col gap-2 sm:flex-row">
              <div className="flex-1">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Email address"
                  required
                />
              </div>
              <Button type="submit" className="whitespace-nowrap">
                Subscribe
              </Button>
            </form>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4" />
                <span>123 Market Street, Suite 100, San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+1234567890" className="hover:text-foreground">+1 (234) 567‑890</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:support@ecom.com" className="hover:text-foreground">support@ecom.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-border" />

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-3 text-sm text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Ecom. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-foreground">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
