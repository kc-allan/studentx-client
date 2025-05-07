
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Alex Johnson",
      university: "State University",
      quote: "StudentX has saved me hundreds this semester alone! The food discounts are amazing.",
      avatar: "/placeholder.svg",
    },
    {
      name: "Taylor Kim",
      university: "City College",
      quote: "I love how easy it is to find tech deals. Got 30% off my new laptop!",
      avatar: "/placeholder.svg",
    },
    {
      name: "Jordan Smith",
      university: "Metro University",
      quote: "The app is super easy to use and I've found so many deals near campus.",
      avatar: "/placeholder.svg",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-primary-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-900">What Students Say</h2>
          <p className="text-gray-600 mt-2 max-w-lg mx-auto">
            Don't just take our word for it — hear from fellow students who are saving big
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-primary">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.university}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
