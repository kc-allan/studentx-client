import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star, X } from "lucide-react";
import { Avatar } from "@mui/material";
import UserAvatar from "./UserAvatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "@/api/axios";
import { toast } from "@/hooks/use-toast";

const TestimonialsSection = () => {
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const [name, setName] = React.useState("");
  const [university, setUniversity] = React.useState("");
  const [review, setReview] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const [testimonials, setTestimonials] = React.useState<
    {
      name: string;
      year: string;
      university: string;
      review: string;
      avatar: string;
      rating: number;
    }[]
  >([]);

  React.useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axiosInstance.get("/user/testimonials?limit=3");
        if (response.status !== 200) {
          throw new Error(response.data.message || "Failed to fetch testimonials");
        }
        setTestimonials(response.data.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        toast({
          title: error.response?.data?.message || "An unexpected error occurred",
          description: error instanceof Error ? error.message : "Failed to fetch testimonials",
          variant: "destructive",
        });
      }
    };

    fetchTestimonials();
  }, []);
  // [
  //   {
  //     name: "Alex",
  //     year: "2nd Year",
  //     university: "UoN",
  //     quote: "StudentX has saved me hundreds this semester on meal cards!",
  //     avatar: "",
  //     rating: 5
  //   },
  //   {
  //     name: "Ephy Njeru",
  //     year: "1st Year",
  //     university: "Kenyatta University",
  //     quote: "I love how easy it is to find discounted deals. Got the $10 discount on my first signup!",
  //     avatar: "",
  //     rating: 4
  //   },
  //   {
  //     name: "Allan",
  //     year: "3rd Year",
  //     university: "Egerton University",
  //     quote: "The app is super easy to use and I've found so many deals near campus.",
  //     avatar: "",
  //     rating: 5
  //   },
  // ];

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    try {
      setSubmitting(true);
      const response = await axiosInstance.post("/user/testimonials", {
        name,
        university,
        review,
        rating,
      });
      if (response.status !== 201) {
        throw new Error(response.data.message || "Failed to submit review");
      }
      setSubmitted(true);
      // Reset form
      setName("");
      setUniversity("");
      setReview("");
      setRating(0);
      // setOpen(false);

    } catch (error) {
      toast({
        title: error.response?.data?.message || "An unexpected error occurred",
        description: error instanceof Error ? error.message : "Failed to submit review",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-background-subtle">
      <div className="mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center text-center px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium mb-4">
            <Quote className="h-4 w-4 mr-2" />
            Student Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
            Real Students, Real Savings
          </h2>
          <p className="text-neutral-medium text-lg max-w-full ">
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
                  "{testimonial.review}"
                </blockquote>

                <div className="mt-auto">
                  <p className="font-semibold text-text-primary">{testimonial.name}</p>
                  <p className="text-sm text-neutral-light">{testimonial.year && `${testimonial.year} • `}{testimonial.university} student</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA to leave a review */}
        <div className="mt-12 text-center">
          <p className="text-neutral-medium mb-4">Having a great experience? Leave us a review!</p>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="inline-flex items-center px-6 py-3 bg-brand-primary text-text-inverted rounded-full hover:bg-brand-primary/90 transition-colors">
                Leave a Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md max-w-[96%] text-sm sm:text-base rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-center">Share Your Experience</DialogTitle>
              </DialogHeader>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-text-primary mb-1">Thank You!</h3>
                  <p className="text-neutral-medium">Your review has been submitted.</p>
                  <button
                    className="mt-6 inline-flex items-center px-4 py-2 bg-brand-primary text-text-inverted rounded-full hover:bg-brand-primary/90 transition-colors"
                    onClick={() => {
                      setOpen(false);
                      setSubmitted(false);
                    }}>
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">
                      Your Name (optional)
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="university" className="block text-sm font-medium text-text-primary mb-1">
                      Your University (optional)
                    </label>
                    <Input
                      id="university"
                      placeholder="StudentX University"
                      type="text"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Rating*
                    </label>
                    <div className="flex justify-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-6 w-6 ${(hoverRating || rating) >= star ? 'fill-brand-primary text-brand-primary' : 'text-neutral-light'}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="review" className="block text-sm font-medium text-text-primary mb-1">
                      Your Review*
                    </label>
                    <Textarea
                      id="review"
                      placeholder="Share your experience with StudentX..."
                      rows={4}
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      required
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white"
                    disabled={rating === 0 || submitting || !review.trim()}
                  >
                    {submitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;