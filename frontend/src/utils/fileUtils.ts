export function convertMegabytesToBytes(megabytes: number) {
  return megabytes * 1024 * 1024;
}

export function convertBytesToMegaBytes(bytes: number) {
  return bytes / (1024 * 1024);
}



// Function to check file size in MB
export const isFileSizeValid = (file: File) => {
  const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
  const maxFileSize = import.meta.env.VITE_PUBLIC_MAX_FILE_SIZE || 2;
  return fileSizeInMB <= maxFileSize; // Check if file size is less than or equal to 2MB
};
