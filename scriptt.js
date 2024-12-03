const form = document.getElementById("uploadForm");
const canvas = document.getElementById("tagCanvas");
const ctx = canvas.getContext("2d");
const downloadButton = document.getElementById("downloadButton");
const tagTemplate = document.getElementById("tagTemplate");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const fileInput = document.getElementById("uploadImage").files[0];
  const userName = document.getElementById("nameInput").value;
  if (!fileInput || !userName) return alert("Please upload an image!");

  const uploadedImage = new Image();
  const reader = new FileReader();
  reader.onload = () => {
    uploadedImage.src = reader.result;
  };
  reader.readAsDataURL(fileInput);

  uploadedImage.onload = () => {
    // Draw the tag template as the background
    canvas.width = tagTemplate.width;
    canvas.height = tagTemplate.height;
    ctx.drawImage(tagTemplate, 0, 0, canvas.width, canvas.height);

    // Overlay the uploaded image
    const imgWidth = 370; // Adjust image width
    const imgHeight = 471; // Adjust image height
    const imgX = 508; // X-coordinate of the image
    const imgY = 550; // Y-coordinate of the image
    ctx.drawImage(uploadedImage, imgX, imgY, imgWidth, imgHeight);

    // Add user's name
    ctx.font = "34px Arial";
    ctx.fillStyle = "White";
    ctx.textAlign = "left";
    ctx.fillText(userName, canvas.width / 2, canvas.height - 90);


    // Display the canvas and download button
    canvas.style.display = "block";
    downloadButton.style.display = "block";
  };
});

downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "event-tag.png";
    link.href = canvas.toDataURL();
    link.click();
  });