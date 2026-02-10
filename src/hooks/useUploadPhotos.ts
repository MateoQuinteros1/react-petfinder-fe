import { useState, useEffect, useRef } from "react";

export function useUploadPhotos() {
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  useEffect(() => {
    if (profilePhoto) {
      const url = URL.createObjectURL(profilePhoto);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [profilePhoto]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  const MAX_FILE_SIZE = 1048576;

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setPhotoError("El formato de imagen no es válido. Usa JPEG, PNG o WebP");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setPhotoError("La imagen no debe superar 1MB de tamaño");
      e.target.value = "";
      return;
    }

    setPhotoError(null);
    setProfilePhoto(file);
  };
  const handleRemovePhoto = () => {
    setProfilePhoto(null);
    setPhotoError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return {
    profilePhoto,
    previewUrl,
    photoError,
    handlePhotoChange,
    handleRemovePhoto,
    fileInputRef,
  };
}
