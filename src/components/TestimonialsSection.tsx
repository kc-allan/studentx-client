import * as React from "react";
import { PenLine, Star } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { Button } from "@/components/ui/button";
import { Cta } from "@/components/ui/cta";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "@/api/axios";
import { toast } from "@/hooks/use-toast";
import SectionHeading from "./SectionHeading";

interface Testimonial {
  name: string;
  year: string;
  university: string;
  review: string;
  avatar: string;
  rating: number;
}

const TestimonialsSection = () => {
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const [name, setName] = React.useState("");
  const [university, setUniversity] = React.useState("");
  const [review, setReview] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([]);

  React.useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axiosInstance.get("/user/testimonials?limit=3");
        if (response.status !== 200) {
          throw new Error(response.data.message || "Failed to fetch testimonials");
        }
        setTestimonials(response.data.data);
      } catch (error) {
        toast({
          title: error.response?.data?.message || "An unexpected error occurred",
          description: error instanceof Error ? error.message : "Failed to fetch testimonials",
          variant: "destructive",
        });
      }
    };

    fetchTestimonials();
  }, []);

  const renderStars = (value: number) => (
    <div className="flex gap-0.5" aria-label={`${value} out of 5`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          aria-hidden
          className={`h-3.5 w-3.5 ${i < value ? "fill-brand-primary text-brand-primary" : "text-neutral-300"}`}
        />
      ))}
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setName("");
      setUniversity("");
      setReview("");
      setRating(0);
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

  const reviewDialog = (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Cta tone="outline" icon={PenLine}>
          Write a review
        </Cta>
      </DialogTrigger>
      <DialogContent className="max-w-[96%] rounded-lg text-sm sm:max-w-md sm:text-base">
        <DialogHeader>
          <DialogTitle className="text-center">Share your experience</DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center">
            <h3 className="text-lg font-semibold text-neutral-900">Thank you</h3>
            <p className="mt-2 text-neutral-600">Your review has been submitted.</p>
            <Button
              className="mt-6 bg-neutral-900 text-white hover:bg-neutral-700"
              onClick={() => {
                setOpen(false);
                setSubmitted(false);
              }}
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-neutral-900">
                Your name (optional)
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
              <label htmlFor="university" className="mb-1 block text-sm font-medium text-neutral-900">
                Your university (optional)
              </label>
              <Input
                id="university"
                placeholder="University of Nairobi"
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <span className="mb-1 block text-sm font-medium text-neutral-900">Rating*</span>
              <div className="flex justify-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${(hoverRating || rating) >= star ? "fill-brand-primary text-brand-primary" : "text-neutral-300"}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="review" className="mb-1 block text-sm font-medium text-neutral-900">
                Your review*
              </label>
              <Textarea
                id="review"
                placeholder="What has StudentX actually got you?"
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                className="min-h-[100px]"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-brand-primary text-white hover:bg-brand-primary/90"
              disabled={rating === 0 || submitting || !review.trim()}
            >
              {submitting ? "Submitting..." : "Submit review"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );

  // With nothing to show, a full section would be mostly empty space
  if (testimonials.length === 0) {
    return (
      <section className="w-full bg-white py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8 border border-neutral-200 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Reviews
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
                Used StudentX? Tell us how it went
              </h2>
              <p className="mt-2 text-sm text-neutral-600">Yours would be the first.</p>
            </div>
            <div className="shrink-0">{reviewDialog}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Reviews"
          title="What students say"
          action={reviewDialog}
        />

        {testimonials.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <figure key={index} className="flex flex-col border-t border-neutral-900 pt-6">
                {renderStars(testimonial.rating)}

                <blockquote className="mt-5 flex-1 text-base leading-relaxed text-neutral-800">
                  {testimonial.review}
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-neutral-100">
                    <UserAvatar src={testimonial.avatar} alt={testimonial.name} className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-neutral-900">
                      {testimonial.name}
                    </p>
                    <p className="truncate text-xs text-neutral-500">
                      {testimonial.year && `${testimonial.year} · `}
                      {testimonial.university}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
