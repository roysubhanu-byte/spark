import { Link } from 'react-router-dom'

const COMPANY = 'BrandAlly LLC'
const APP = 'Spark'
const DOMAIN = 'spark-tau-virid.vercel.app'
const EMAIL = 'support@brandally.net'
const LAST_UPDATED = 'April 27, 2026'

function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-12 max-w-2xl mx-auto">
      <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 no-underline">&larr; Back to {APP}</Link>
      <h1 className="text-2xl font-bold mt-6 mb-2">{title}</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: {LAST_UPDATED}</p>
      <div className="prose prose-sm max-w-none text-gray-700 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:mb-4 [&_ul]:mb-4 [&_li]:mb-1">
        {children}
      </div>
    </div>
  )
}

export function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>{APP} ({DOMAIN}) is operated by {COMPANY}. This policy explains how we collect, use, and protect your information.</p>

      <h2>Information We Collect</h2>
      <ul>
        <li><strong>Account data:</strong> Email address and name when you create an account (via Google OAuth or email/password).</li>
        <li><strong>Usage data:</strong> Which ideas you save, swipe on, and interact with. This helps us personalize your experience.</li>
        <li><strong>Device data:</strong> Browser type, screen size, and general location (country level) for analytics.</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To personalize the ideas shown to you based on your preferences.</li>
        <li>To save your progress (saved ideas, 30-day plan, todos) across devices.</li>
        <li>To improve the app based on aggregate usage patterns.</li>
        <li>We do not sell your personal information to third parties.</li>
      </ul>

      <h2>Third-Party Services</h2>
      <ul>
        <li><strong>Supabase:</strong> Database and authentication. Data stored securely with row-level security.</li>
        <li><strong>Vercel:</strong> App hosting and delivery.</li>
        <li><strong>PostHog:</strong> Privacy-friendly analytics (no personal data shared).</li>
      </ul>

      <h2>Affiliate Links</h2>
      <p>{APP} contains links to products on Amazon, AliExpress, Etsy, and other platforms. Some of these are affiliate links, meaning {COMPANY} may earn a commission if you make a purchase. This does not affect the price you pay. As an Amazon Associate, {COMPANY} earns from qualifying purchases.</p>

      <h2>Data Retention</h2>
      <p>Your account data is retained as long as your account is active. You can delete your account at any time by contacting {EMAIL}.</p>

      <h2>Cookies</h2>
      <p>{APP} uses local storage to save your preferences and session data. We use minimal cookies for authentication only.</p>

      <h2>Children</h2>
      <p>{APP} is not intended for use by anyone under the age of 18.</p>

      <h2>Contact</h2>
      <p>Questions about this policy? Email {EMAIL}.</p>
    </LegalLayout>
  )
}

export function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service">
      <p>By using {APP} ({DOMAIN}), you agree to these terms. {APP} is operated by {COMPANY}.</p>

      <h2>What {APP} Is</h2>
      <p>{APP} is a discovery tool that helps you find business ideas. We provide curated product ideas, supplier information, and educational content to help you evaluate potential businesses.</p>

      <h2>No Guarantees</h2>
      <p>{APP} provides information and tools for educational purposes. We do not guarantee any specific income, profit, or business outcome. Business success depends on many factors outside our control. Any financial projections, profit estimates, or market data shown in the app are estimates only and should not be relied upon as financial advice.</p>

      <h2>Affiliate Relationships</h2>
      <p>{APP} contains affiliate links to third-party platforms (Amazon, AliExpress, Etsy, etc.). {COMPANY} may earn commissions from purchases made through these links. We recommend suppliers based on general category relevance, not paid placement. Always do your own due diligence before purchasing from any supplier.</p>

      <h2>Your Account</h2>
      <ul>
        <li>You are responsible for keeping your account credentials secure.</li>
        <li>You must be at least 18 years old to use {APP}.</li>
        <li>We may suspend accounts that violate these terms.</li>
      </ul>

      <h2>Intellectual Property</h2>
      <p>The content, design, and data in {APP} are owned by {COMPANY}. You may not scrape, copy, or redistribute the app content without written permission.</p>

      <h2>Limitation of Liability</h2>
      <p>{COMPANY} is not liable for any losses, damages, or expenses arising from your use of {APP} or any business decisions you make based on information in the app. Use at your own risk.</p>

      <h2>Changes</h2>
      <p>We may update these terms from time to time. Continued use of {APP} after changes constitutes acceptance of the updated terms.</p>

      <h2>Contact</h2>
      <p>Questions? Email {EMAIL}.</p>
    </LegalLayout>
  )
}
