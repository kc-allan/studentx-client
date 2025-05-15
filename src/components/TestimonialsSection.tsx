import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { Avatar } from "@mui/material";
import UserAvatar from "./UserAvatar";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Alex Johnson",
      university: "State University",
      quote: "StudentX has saved me hundreds this semester alone! The food discounts are amazing.",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      rating: 5
    },
    {
      name: "Taylor Kim",
      university: "City College",
      quote: "I love how easy it is to find tech deals. Got 30% off my new laptop!",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      rating: 4
    },
    {
      name: "Jordan Smith",
      university: "Metro University",
      quote: "The app is super easy to use and I've found so many deals near campus.",
      avatar: "/placeholder.jpeg",
      rating: 5
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex justify-center space-x-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? 'fill-brand-primary text-brand-primary' : 'text-neutral-light'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-background-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium mb-4">
            <Quote className="h-4 w-4 mr-2" />
            Student Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
            Real Students, Real Savings
          </h2>
          <p className="text-neutral-medium text-lg max-w-2xl mx-auto">
            Hear from students who are already enjoying exclusive discounts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border border-border hover:border-brand-primary/30 hover:shadow-md transition-all bg-background relative overflow-hidden"
            >
              {/* Floating quote icon */}
              <div className="absolute top-6 right-6 text-brand-primary/10">
                <Quote className="h-16 w-16" />
              </div>

              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full border-2 border-border">
                    <UserAvatar src={testimonial.avatar} alt={testimonial.name} className='object-cover' />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-brand-primary text-text-inverted rounded-full p-1">
                    <Quote className="h-4 w-4" />
                  </div>
                </div>

                {renderStars(testimonial.rating)}

                <blockquote className="text-neutral-medium italic mb-6 relative z-10">
                  "{testimonial.quote}"
                </blockquote>

                <div className="mt-auto">
                  <p className="font-semibold text-text-primary">{testimonial.name}</p>
                  <p className="text-sm text-neutral-light">{testimonial.university}</p>
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