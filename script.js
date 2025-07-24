const input = document.getElementById("fileInput");
const inputImage = document.getElementById("inputImage");
const canvas = document.getElementById("outputCanvas");
const downloadBtn = document.getElementById("downloadBtn");

input.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      inputImage.src = img.src;

      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Fake background removal by removing white background
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        if (r > 200 && g > 200 && b > 200) {
          data[i + 3] = 0; // transparent
        }
      }

      ctx.putImageData(imageData, 0, 0);
      downloadBtn.style.display = "inline-block";
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "clearshot.png";
  link.href = canvas.toDataURL();
  link.click();
});
