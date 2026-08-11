import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Expand, ImageOff, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * How far an image's shape may drift from the frame before we stop cropping it.
 * 1.35 lets a 4:3 frame crop anything between roughly 1:1 and 16:9, and falls
 * back to letterboxing for posters, banners and screenshots outside that range.
 */
const CROP_TOLERANCE = 1.35;

type ImageFit = "cover" | "contain";

interface ImageLightboxProps {
  src: string;
  alt: string;
  caption?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Shows a single image at its own proportions, capped to the viewport. */
export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  src,
  alt,
  caption,
  open,
  onOpenChange,
}) => (
  <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-[70] bg-neutral-950/92 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
      <DialogPrimitive.Content
        onClick={(event) => {
          if (event.target === event.currentTarget) onOpenChange(false);
        }}
        className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-5 p-4 focus:outline-none sm:p-10"
      >
        <DialogPrimitive.Title className="sr-only">{alt}</DialogPrimitive.Title>
        <DialogPrimitive.Description className="sr-only">
          Press Escape to close this image.
        </DialogPrimitive.Description>

        <img
          src={src}
          alt={alt}
          className="max-h-[80vh] max-w-full object-contain"
        />

        {caption && (
          <p className="max-w-xl text-center text-sm leading-relaxed text-white/70">
            {caption}
          </p>
        )}

        <DialogPrimitive.Close
          aria-label="Close image"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:right-8 sm:top-8"
        >
          <X className="h-5 w-5" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
);

interface ImagePreviewProps {
  src?: string | null;
  alt: string;
  /** Frame proportions as a number, e.g. 4 / 3. */
  ratio?: number;
  /** Adds a control that opens the untouched image over the page. */
  expandable?: boolean;
  /** Shown under the image once it is expanded. */
  caption?: React.ReactNode;
  className?: string;
  /** Set when the frame sits on a dark surface so letterboxing blends in. */
  tone?: "light" | "dark";
  loading?: "lazy" | "eager";
}

/**
 * Fits an image of unknown proportions into a fixed frame: close-enough shapes
 * fill it, everything else is shown whole against a plain surface rather than
 * being cropped down to a strip.
 */
const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  alt,
  ratio = 4 / 3,
  expandable = false,
  caption,
  className,
  tone = "light",
  loading = "lazy",
}) => {
  const imageRef = React.useRef<HTMLImageElement>(null);
  const [fit, setFit] = React.useState<ImageFit>("cover");
  const [status, setStatus] = React.useState<"loading" | "ready" | "failed">(
    src ? "loading" : "failed"
  );
  const [expanded, setExpanded] = React.useState(false);

  const measure = React.useCallback(
    (image: HTMLImageElement) => {
      const { naturalWidth, naturalHeight } = image;
      if (naturalWidth && naturalHeight) {
        const drift = naturalWidth / naturalHeight / ratio;
        setFit(drift > CROP_TOLERANCE || drift < 1 / CROP_TOLERANCE ? "contain" : "cover");
      }
      setStatus("ready");
    },
    [ratio]
  );

  React.useEffect(() => {
    setStatus(src ? "loading" : "failed");
    setFit("cover");
  }, [src]);

  // A cached image can finish before React binds onLoad, which would leave it hidden
  React.useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth) measure(image);
  }, [src, measure]);

  const surface = tone === "dark" ? "bg-white/5" : "bg-neutral-100";

  return (
    <div
      className={cn("group/preview relative overflow-hidden", surface, className)}
      style={{ aspectRatio: ratio }}
    >
      {status === "failed" ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-neutral-400">
          <ImageOff className="h-6 w-6" />
          <span className="text-xs">No image</span>
        </div>
      ) : (
        <>
          <img
            ref={imageRef}
            src={src ?? undefined}
            alt={alt}
            loading={loading}
            onLoad={(event) => measure(event.currentTarget)}
            onError={() => setStatus("failed")}
            className={cn(
              "h-full w-full",
              fit === "cover" ? "object-cover" : "object-contain",
              status === "loading" ? "opacity-0" : "opacity-100"
            )}
          />
          {status === "loading" && (
            <div className={cn("absolute inset-0 animate-pulse", surface)} />
          )}
        </>
      )}

      {expandable && status === "ready" && src && (
        <>
          <button
            type="button"
            aria-label={`View full image: ${alt}`}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setExpanded(true);
            }}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-950/60 text-white opacity-0 backdrop-blur-sm focus:outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-white group-hover/preview:opacity-100 max-md:opacity-100"
          >
            <Expand className="h-4 w-4" />
          </button>
          <ImageLightbox
            src={src}
            alt={alt}
            caption={caption}
            open={expanded}
            onOpenChange={setExpanded}
          />
        </>
      )}
    </div>
  );
};

export default ImagePreview;
