import { useState } from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import { Info, ImagePlus } from "lucide-react";
import { imageSrc } from "@/lib/utils";

const MAX_SIZE_KB = 1024;

export default function ImageField({
    label = "Upload Image",
    recommendation,
    value,
    error,
    previewSrc,
    onChange,
}) {
    const [filePreview, setFilePreview] = useState(null);

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > MAX_SIZE_KB * 1024) {
                alert("Image must be 1MB or smaller.");
                e.target.value = "";
                return;
            }
            setFilePreview(URL.createObjectURL(file));
            onChange(file);
        }
    };

    return (
        <div>
            <Label>{label}</Label>
            <Input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFile}
                className="mt-1"
            />
            <div className="mt-2 flex items-start gap-2 rounded-lg bg-blue-50 border border-blue-100 px-3 py-2">
                <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                <p className="text-xs text-blue-700">{recommendation}</p>
            </div>

            {filePreview || previewSrc ? (
                <img
                    src={filePreview || imageSrc(previewSrc)}
                    alt="Preview"
                    className="mt-2 w-full max-h-40 object-contain rounded border"
                />
            ) : (
                <div className="mt-2 flex items-center justify-center gap-2 rounded border-2 border-dashed border-gray-300 py-6 text-gray-400">
                    <ImagePlus className="h-5 w-5" />
                    <span className="text-xs">Preview will appear here</span>
                </div>
            )}

            <div className="mt-3">
                <Label>Or paste an image URL</Label>
                <Input
                    type="text"
                    placeholder="https://example.com/image.png"
                    value={typeof value === "string" ? value : ""}
                    onChange={(e) => {
                        setFilePreview(null);
                        onChange(e.target.value);
                    }}
                    className="mt-1"
                />
            </div>
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
}
