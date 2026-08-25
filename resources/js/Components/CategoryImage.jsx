import { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";
import { cn, imageSrc } from "@/lib/utils";

export default function CategoryImage({
    src,
    alt,
    className,
    imageClassName,
    showLabel = true,
}) {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setHasError(false);
    }, [src]);

    const canDisplayImage = Boolean(src) && !hasError;

    return (
        <div
            className={cn(
                "flex items-center justify-center overflow-hidden bg-gray-100 text-gray-400",
                className,
            )}
        >
            {canDisplayImage ? (
                <img
                    src={imageSrc(src)}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    onError={() => setHasError(true)}
                    className={cn("h-full w-full object-cover", imageClassName)}
                />
            ) : (
                <div className="flex flex-col items-center justify-center gap-1 px-2 text-center">
                    <ImageOff className="h-5 w-5" aria-hidden="true" />
                    {showLabel && <span className="text-xs">No image</span>}
                </div>
            )}
        </div>
    );
}
