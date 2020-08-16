
import randomNumber from "./randomNumber";

// Build random image URL
export default function randomImage() {
    let imageNames = ["FMAimages1.jpg", "FMAimages2.jpg", "FMAimages3.jpg", "FMAimages4.jpg", "FMAimages5.jpg", "FMAimages6.jpg", "FMAimages7.jpg", "FMAimages8.jpg", "FMAimages9.jpg", "FMAimages10.jpg", "FMAimages11.jpg", "FMAimages12.jpg", "FMAimages13.jpg", "FMAimages14.jpg", "FMAimages15.jpg", "FMAimages16.jpg", "FMAimages17.jpg", "FMAimages18.jpg", "FMAimages19.jpg", "FMAimages20.jpg", "FMAimages21.jpg", "FMAimages22.jpg", "FMAimages23.jpg", "FMAimages24.jpg", "FMAimages25.jpg", "FMAimages26.jpg", "FMAimages27.jpg", "FMAimages28.jpg", "FMAimages29.jpg"];
    let imageURL = "https://github.com/JohanBester/JBBesterCapstoneProject/blob/master/FMAimages/";
    let rand = randomNumber(1, imageNames.length-1); // params are min, max values
    let randomName = imageNames[rand];
    let randomURL = imageURL + randomName + "?raw=true";
    return randomURL;
};
