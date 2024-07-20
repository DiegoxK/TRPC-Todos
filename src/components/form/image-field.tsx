import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cropImage } from "@/lib/utils";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { ReactCrop, type Crop } from "react-image-crop";

interface FileFieldProps<T extends FieldValues> {
  setCroppedImage: Dispatch<SetStateAction<string | undefined>>;
  control: Control<T>;
  name: Path<T>;
}

export default function ImageField<T extends FieldValues>({
  setCroppedImage,
  control,
  name,
}: FileFieldProps<T>) {
  const showCropped = (blob: Blob) => {
    setCroppedImage((croppedImage) => {
      if (croppedImage) {
        URL.revokeObjectURL(croppedImage);
      }
      return URL.createObjectURL(blob);
    });
  };

  const [selectedImage, setSelectedImage] = useState<string>();

  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Select a file</FormLabel>
          <FormControl>
            <Input
              className="cursor-pointer file:text-accent-foreground"
              type="file"
              multiple={false}
              onChange={(e) => {
                const file = e.target.files![0];
                if (file) {
                  setSelectedImage(URL.createObjectURL(file));
                  setCrop((prev) => ({
                    ...prev,
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                  }));
                }
              }}
            />
          </FormControl>
          {selectedImage && (
            <ReactCrop
              className="min-w-full border-4 border-accent"
              aspect={1}
              ruleOfThirds={true}
              crop={crop}
              onChange={(c) => setCrop(c)}
              onDragEnd={async () => {
                const blob = await cropImage(imgRef, crop);
                if (blob) {
                  field.onChange(blob);
                  showCropped(blob);
                } else {
                  field.onChange(undefined);
                  setCroppedImage(undefined);
                }
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="min-w-full"
                alt="Selected Image"
                ref={imgRef}
                src={selectedImage}
              />
            </ReactCrop>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
