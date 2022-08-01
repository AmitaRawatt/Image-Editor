const fileInput= document.querySelector(".file-input"),
chooseImgBtn = document.querySelector(".choose-img"),

previewImg = document.querySelector(".preview-img img"),
filterOptions = document.querySelectorAll(".filter button"),
rotateOptions = document.querySelectorAll(".rotate button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
resetFilterBtn = document.querySelector(".reset-filter"),
saveImgBtn = document.querySelector(".save-img"),
filterSlider = document.querySelector(".slider input");

let brightness=100,saturation=100,inversion=0,grayscale=0,sepia=0,blur=0;
let rotate=0,flipHorizontal=1,flipVertical=1;

const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) blur(${blur}px) sepia(${sepia}%)`;
}

const loadImage=()=>{
     let file= fileInput.files[0];
     if(!file) return;
   previewImg.src=URL.createObjectURL(file);
   previewImg.addEventListener("load",()=>{
       document.querySelector(".container").classList.remove("disable");
   });
}

filterOptions.forEach(option => {
    option.addEventListener("click",()=>{
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id=="brightness"){
            filterSlider.max="200";
            filterSlider.value=brightness;
            filterValue.innerText=`${brightness}%`;
        }
        else if(option.id=="saturation"){
            filterSlider.max="200";
            filterSlider.value=saturation;
            filterValue.innerText=`${saturation}%`;
        }
        else if(option.id=="inversion"){
            filterSlider.max="100";
            filterSlider.value=inversion;
            filterValue.innerText=`${inversion}%`;
        }
        else if(option.id=="grayscale"){
            filterSlider.max="100";
            filterSlider.value=grayscale;
            filterValue.innerText=`${grayscale}%`;

        }
        else if(option.id=="blur"){
            filterSlider.max="10";
            filterSlider.value=blur;
            filterValue.innerText=`${blur}%`;

        }
        else{
            filterSlider.max="100";
            filterSlider.value=sepia;
            filterValue.innerText=`${sepia}%`;

        }
    });
});

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");
    if(selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else if(selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    } else if(selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    } else if(selectedFilter.id === "grayscale") {
        grayscale = filterSlider.value;
    }
    else if(selectedFilter.id === "blur") {
       blur = filterSlider.value;
    }
    else {
        sepia = filterSlider.value;
    }
    applyFilter();
}

rotateOptions.forEach(option =>{
    option.addEventListener("click",()=>{
        if(option.id == "left"){
            rotate-=90;
        }
        else  if(option.id == "right"){
            rotate+=90;
        }
        else  if(option.id == "horizontal"){
           flipHorizontal=flipHorizontal === 1? -1 : 1;
        }
        else  if(option.id == "vertical"){
            flipVertical=flipVertical === 1? -1 : 1;
         }
        applyFilter();
    })
})

const resetFilter = ()=>{
    brightness=100; saturation=100; inversion=0; grayscale=0;sepia=0;blur=0;
 rotate=0; flipHorizontal=1; flipVertical=1;
 filterOptions[0].click();
 applyFilter();
}

const saveImage = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = previewImg.naturalWidth;
        canvas.height = previewImg.naturalHeight;
        
        ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) blur(${blur}px) sepia(${sepia}%)`;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        if(rotate !== 0) {
            ctx.rotate(rotate * Math.PI / 180);
        }
        ctx.scale(flipHorizontal, flipVertical);
        ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        
        const link = document.createElement("a");
        link.download = "image.jpg";
        link.href = canvas.toDataURL();
        link.click();
    }
filterSlider.addEventListener("input",updateFilter);
fileInput.addEventListener("change",loadImage);
resetFilterBtn.addEventListener("click",resetFilter);
saveImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", ()=> fileInput.click());

