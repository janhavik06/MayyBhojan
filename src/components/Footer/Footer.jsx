export default function Footer() {
    return (
      <footer className="border-t mt-16">
  
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
  
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-orange-500">
              MayBhojan
            </h3>
  
            <p className="mt-4 text-gray-600 leading-relaxed">
              Connecting home kitchens with people who crave authentic,
              fresh, and warm meals. Empowering homemakers and students.
            </p>
          </div>
  
          {/* Community */}
          <div>
            <h4 className="font-semibold text-lg mb-4">
              Our Community
            </h4>
            <ul className="space-y-2 text-gray-600">
              <li>For Homemakers</li>
              <li>For Students</li>
              <li>Success Stories</li>
              <li>Safety Standards</li>
            </ul>
          </div>
  
          {/* Support */}
          <div>
            <h4 className="font-semibold text-lg mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-gray-600">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Refund Policy</li>
              <li>FAQs</li>
            </ul>
          </div>
  
          {/* App */}
          <div>
            <h4 className="font-semibold text-lg mb-4">
              Download App
            </h4>
  
            <div className="space-y-4">
              <div className="bg-gray-200 h-12 rounded-xl" />
              <div className="bg-gray-200 h-12 rounded-xl" />
            </div>
          </div>
  
        </div>
      </footer>
    );
  }
  