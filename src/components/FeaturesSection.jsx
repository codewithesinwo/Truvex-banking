import React from "react";
import { ShieldCheck, ArrowLeftRight, Smartphone } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      title: "Secure & Reliable",
      description:
        "Advanced security features to keep your account safe and secure.",
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      bgColor: "bg-blue-50",
    },
    {
      title: "Easy Transfers",
      description: "Quickly send money to anyone, anywhere, anytime.",
      icon: <ArrowLeftRight className="w-8 h-8 text-blue-500" />,
      bgColor: "bg-blue-50",
    },
    {
      title: "24/7 Access",
      description:
        "Manage your money from anywhere with our mobile and web apps.",
      icon: <Smartphone className="w-8 h-8 text-blue-600" />,
      bgColor: "bg-blue-50",
    },
  ];

  const trustLogos = ["TRUSTSCURE", "PAYSAFE", "PCI Standards", "DIGISECURE"];

  return (
    <section className="py-6 px-6 bg-gradient-to-br from-white via-blue-50 to-blue-100 min-h-screen flex flex-col items-center">
      {/* Trust Header */}
      <div className="text-center mb-12">
        <p className="text-slate-600 font-medium mb-6 text-lg">
          Trusted by over 1,000,000 users!
        </p>
        <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale">
          {trustLogos.map((logo, idx) => (
            <span key={idx} className="font-bold text-sm tracking-widest">
              {logo}
            </span>
          ))}
        </div>
      </div>

      {/* Cards Container */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex gap-5 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100"
          >
            <div
              className={`${feature.bgColor} p-4 h-17 rounded-full flex items-center justify-center`}
            >
              {feature.icon}
            </div>
            <div>
              {" "}
              <h3 className="text-2xl font-bold text-slate-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-lg">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
