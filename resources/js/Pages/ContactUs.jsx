import Footer from "@/Components/Footer"
import Header from "@/Components/Header"
import { Package, RefreshCw, XCircle, Search, MessageCircle } from "lucide-react"

const ContactPage = () => {
  const helpCards = [
    {
      id: 1,
      icon: <Package className="w-6 h-6 text-blue-500" />,
      title: "I WANT TO KNOW WHERE MY ORDER IS",
      description: "Get status updates about your order with our Tracking Tool",
      link: "#",
    },
    {
      id: 2,
      icon: <RefreshCw className="w-6 h-6 text-blue-500" />,
      title: "I WANT TO RETURN AN ITEM",
      description: "Use our Online Return Form to start your return",
      link: "#",
    },
    {
      id: 3,
      icon: <XCircle className="w-6 h-6 text-blue-500" />,
      title: "I WANT TO CANCEL AN ORDER",
      description: "Use our Online Cancellation Form to start your order cancellation",
      link: "#",
    },
  ]



  return (
    <div className="min-h-screen bg-gray-50">
        <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Help Section */}
        <div className="mb-12">
          <h1 className="text-2xl font-medium mb-8">Hi, how can we help you?</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {helpCards.map((card) => (
              <a
                key={card.id}
                href={card.link}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="mb-4">{card.icon}</div>
                <h3 className="text-blue-500 font-medium mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.description}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <h2 className="text-lg font-medium mb-4">I have another question</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search our help center"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="bg-white text-blue-500 px-6 py-2 rounded-lg border hover:bg-blue-50">
              BROWSE HELP CENTER
            </button>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-medium mb-6">Contact us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl mb-4">Can't find the answer you are looking for?</h3>
              <p className="text-gray-600 mb-6">
                <span className="font-medium">Daz</span>, your friendly automated chat assistant is here to assist you{" "}
                <span className="text-green-500">24 hours</span> a day!
              </p>
              <p className="text-gray-600 mb-6">
                Live Chat Service is available from <span className="text-green-500">9:00 AM to 6:00 PM</span>
              </p>
              <button className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat With Us
              </button>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://icms-image.slatic.net/images/ims-web/40891662-b181-4c0f-b0f7-90713eeeeb7c.png  "
                alt="Contact illustration"
                className="w-48 h-48 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default ContactPage

