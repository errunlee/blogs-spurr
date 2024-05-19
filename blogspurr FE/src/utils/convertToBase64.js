export function compressAndConvertToBase64(
  file,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.7
) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let width = img.width;
        let height = img.height;

        // Calculate the new dimensions while maintaining the aspect ratio
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Convert the canvas to a Base64 string
        const base64String = canvas.toDataURL("image/jpeg", quality);
        resolve(base64String);
      };

      img.onerror = (error) => {
        reject(error);
      };
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
