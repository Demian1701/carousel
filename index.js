function initCarousel(carouselContainerID, dotsActive=false){
    var carouselContainerIDSelector = "#"+carouselContainerID; 
    var carouselContainer = document.querySelector(carouselContainerIDSelector);
    
    var carouselItems = carouselContainer.querySelectorAll("article");
    
    var sliderHeight = carouselItems[0].clientHeight*1.05 + "px";
    carouselContainer.style.height = sliderHeight;
    
    for (let index = 0; index < carouselItems.length; index++) {
        const item = carouselItems[index];
        item.classList.add("carousel-item");
        item.dataset.indexNumber=index;
        if(index==0) {item.classList.add("active")}
    }

    addArrows();

    if(dotsActive){
        addDots();   
    }
    
    function scrollRight() {
        var activeItem = carouselContainer.querySelector(".active");
        var activeItemIndex = parseInt(activeItem.dataset.indexNumber);
        var nextItemDataIndex = activeItemIndex+1;
        var nextItemDataIndexString = "[data-index-number='"+nextItemDataIndex+"']";
        var nextItem = carouselContainer.querySelector(nextItemDataIndexString);
        
        if(nextItem){
            activeItem.classList.remove("active");
            nextItem.classList.add("active");

            if(dotsActive){
                var dotActiveStringIndex = "[data-dot-number='"+activeItemIndex+"']";
                var dotActive = carouselContainer.querySelector(dotActiveStringIndex);
                var nextDotActiveStringIndex = "[data-dot-number='"+nextItemDataIndex+"']";
                var nextDotActive = carouselContainer.querySelector(nextDotActiveStringIndex);

                dotActive.classList.remove("active");
                nextDotActive.classList.add("active");
            }
        }
    }

    function scrollLeft() {
        var activeItem = carouselContainer.querySelector(".active");
        var activeItemIndex = parseInt(activeItem.dataset.indexNumber);
        var prevItemDataIndex = activeItemIndex-1;
        var prevItemDataIndexString = "[data-index-number='"+prevItemDataIndex+"']";
        var prevItem = carouselContainer.querySelector(prevItemDataIndexString);
        
        if(prevItem){
            activeItem.classList.remove("active");
            prevItem.classList.add("active");

            if(dotsActive){
                var dotActiveStringIndex = "[data-dot-number='"+activeItemIndex+"']";
                var dotActive = carouselContainer.querySelector(dotActiveStringIndex);
                var prevDotActiveStringIndex = "[data-dot-number='"+prevItemDataIndex+"']";
                var prevDotActive = carouselContainer.querySelector(prevDotActiveStringIndex);

                dotActive.classList.remove("active");
                prevDotActive.classList.add("active");
            }
        }
    }

    function addArrows () {
        var fragment = document.createDocumentFragment();
        
        var leftArrowContainer = document.createElement("div");
        leftArrowContainer.classList.add("left-arrow-container");
        var leftArrow = document.createElement("img");
        leftArrow.classList.add("left-arrow-img");
        leftArrow.src="./images/left-arrow@2x.png";
        leftArrowContainer.appendChild(leftArrow);
        fragment.appendChild(leftArrowContainer);
        
        var rightArrowContainer = document.createElement("div");
        rightArrowContainer.classList.add("right-arrow-container");
        var rightArrow = document.createElement("img");
        rightArrow.classList.add("right-arrow-img");
        rightArrow.src="./images/right-arrow@2x.png";
        rightArrowContainer.appendChild(rightArrow);
        fragment.appendChild(rightArrowContainer);

        leftArrowContainer.addEventListener("click", scrollLeft)
        rightArrowContainer.addEventListener("click", scrollRight)
        carouselContainer.appendChild(fragment);
    }

    function scrollTo(event){
        var activeItem = carouselContainer.querySelector(".active");
        var dotsContainer = carouselContainer.querySelector(".dots-container");
        var dotActive = dotsContainer.querySelector(".active");
        var dotClicked = event.currentTarget;
        var selectedItemDataIndex = parseInt(dotClicked.dataset.dotNumber);
        var selectedItemDataIndexString = "[data-index-number='"+selectedItemDataIndex+"']";
        var selectedItem = carouselContainer.querySelector(selectedItemDataIndexString);

        activeItem.classList.remove("active");
        selectedItem.classList.add("active");
        dotActive.classList.remove("active");
        dotClicked.classList.add("active");
    }

    function addDots(){
        var fragment = document.createDocumentFragment();
        var sliderItemQuantity = carouselContainer.querySelectorAll(".carousel-item");
        var dotsQuantity = sliderItemQuantity.length;
        var dotsContainer = document.createElement("div");
        dotsContainer.classList.add("dots-container");
        
        for (let index = 0; index < dotsQuantity; index++) {
            var dot = document.createElement("div");
            dot.classList.add("dot-item");
            if(index==0){dot.classList.add("active")}
            dot.dataset.dotNumber=index;
            dot.addEventListener("click",function(){scrollTo(event)});
            dotsContainer.appendChild(dot);
        }

        fragment.appendChild(dotsContainer);
        carouselContainer.appendChild(fragment);
    }
}

window.addEventListener("load",function(){
    initCarousel("carousel-container", true);
})