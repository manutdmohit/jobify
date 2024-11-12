'use client';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; // X icon
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ImageUpload = () => {
  const [image, setImage] = useState<string | null>(null);

  // Handle the image upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove the uploaded image
  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className="flex justify-center items-center flex-col p-6">
      <div className="relative w-80 h-80">
        {/* Shadcn Card component for styling */}
        <Card className="w-full h-full relative border-2 border-dashed border-gray-300 rounded-lg">
          {image ? (
            <div className="relative w-full h-full">
              <img
                src={image}
                alt="Uploaded"
                className="w-full h-full object-cover rounded-lg"
              />
              <FaTimes
                className="absolute top-2 right-2 text-white text-3xl cursor-pointer"
                onClick={removeImage}
              />
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center text-gray-500">
              {/* Lucid Button for file upload */}
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
                className="text-lg"
              >
                Upload Image
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ImageUpload;
