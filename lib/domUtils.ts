// domUtils.ts
export const addDummyImage = (setShowContent: (value: boolean) => void) => {
  // Find the image with the class lnXdpd
  const targetImage = document.querySelector<HTMLImageElement>("img.lnXdpd");
  if (targetImage) {
    console.log("Found target image. Adding dummy image...");

    // Add click event to the existing target image
    targetImage.addEventListener("click", () => {
      console.log("Target image clicked");
      setShowContent(true);
    });

    // Create a new image element
    const dummyImage = document.createElement("img");
    dummyImage.src = "https://via.placeholder.com/150"; // Dummy image source
    dummyImage.alt = "Dummy Image";
    dummyImage.style.marginLeft = "10px"; // Add some spacing

    // Add click event to the dummy image
    dummyImage.addEventListener("click", () => {
      console.log("Dummy image clicked");
      setShowContent(true);
    });

    // Insert the dummy image next to the target image
    targetImage.parentElement?.appendChild(dummyImage);
  } else {
    console.log("Target image not found.");
  }
};
