const SliderFunctions = {

    showHideArrow: (mediaId, scrollPos, page) => {
        let element = document.querySelector(`.slider_wrapper_${page}.wrapp-${mediaId}`);
        let rect = element.getBoundingClientRect();
        let scrollWidth = element.scrollWidth + (parseInt(rect.width) - rect.width)
        let scrollAmount = scrollWidth - rect.width;
        // console.log("width", rect.width, "scrollWidth", scrollWidth, "scrollAmount", scrollAmount, "scrollPos", scrollPos);
        let diff = scrollAmount - scrollPos;
        // console.log(diff);
        // console.log(scrollAmount, scrollPos);
        let rightArr = document.querySelector(`.right-arr_${page}.right-${mediaId}`);
        let leftArr = document.querySelector(`.left-arr_${page}.left-${mediaId}`);
        // console.log(scrollPos, scrollAmount, diff);
        if ((scrollPos >= scrollAmount) || (diff < 1 && diff > 0)) {
            // if (diff < 1 && diff > 0) {
            rightArr.style.display = "none";
        } else {
            rightArr.style.display = "flex";
        }

        if (scrollPos <= 0) {
            leftArr.style.display = "none";
        } else {
            leftArr.style.display = "flex";
        }

    },
    handleSlide: (mediaId, setScrollPos, setPageCircle, page, val) => {
        let sliderWrapper = document.querySelector(`.slider_wrapper_${page}.wrapp-${mediaId}`);
        // let scrollAmt = sliderWrapper.clientWidth;
        let scrollAmt = sliderWrapper.getBoundingClientRect().width;
        let page_count_circle = "";
        if(page === "content"){
            page_count_circle = document.querySelectorAll(`div.${page}_count_container.c${mediaId} > *`);
        }else {
            page_count_circle = document.querySelectorAll(`div.${page}_count_container > *`);
        }

        if (val === "right") {
            let rightArr = document.querySelector(`.right-arr_${page}.right-${mediaId}`);
            // console.log(rightArr);
            rightArr.disabled = true;
            setTimeout(() => {
                rightArr.disabled = false;
            }, 1000);

            sliderWrapper.scrollLeft += scrollAmt;
            setScrollPos((prevVal) => prevVal += scrollAmt);

            page_count_circle.forEach((e) => e.style.opacity = 0.5);
            setPageCircle((prevVal) => prevVal += 1);
        }
        if (val === "left") {
            // ENABELING AND DISABLING A BUTTON
            let leftArr = document.querySelector(`.left-arr_${page}.left-${mediaId}`);
            leftArr.disabled = true;
            setTimeout(() => {
                leftArr.disabled = false;

            }, 1000);

            sliderWrapper.scrollLeft -= scrollAmt;
            setScrollPos((prevVal) => prevVal -= scrollAmt);

            page_count_circle.forEach((e) => e.style.opacity = 0.5);
            setPageCircle((prevVal) => prevVal -= 1);
        }
    },

    getSlideNum: (mediaId, page, setSlideNum) => {
        // FINDING NUMBER OF SLIDES
        let element = document.querySelector(`.slider_wrapper_${page}.wrapp-${mediaId}`);
        let rect = element.getBoundingClientRect();
        let scrollWidth = element.scrollWidth + (parseInt(rect.width) - rect.width)
        let slideLen = (scrollWidth / rect.width).toFixed(1);
        // console.log(slideLen);
        slideLen = Math.ceil(slideLen);
        setSlideNum(new Array(slideLen).fill(""));
    },

    handleResize: (page, mediaId, setScrollPos, setPageCircle, pageCircle) => {
        document.querySelector(`.slider_wrapper_${page}.wrapp-${mediaId}`).scrollLeft = 0;
        setScrollPos(0);
        // let page_count_circle = document.querySelectorAll(`div.${page}_count_container > *`);
        let page_count_circle = "";
        if(page === "content"){
            page_count_circle = document.querySelectorAll(`div.${page}_count_container.c${mediaId} > *`);
        }else {
            page_count_circle = document.querySelectorAll(`div.${page}_count_container > *`);
        }
        page_count_circle.forEach((e) => e.style.opacity = 0.5);

        setPageCircle(1);

        if(page === "content"){
            document.querySelector(`.${page}_count_circle.c${mediaId}:nth-child(${pageCircle})`).style.opacity = 1;
        }else {
            document.querySelector(`.${page}_count_circle:nth-child(${pageCircle})`).style.opacity = 1;
        }
    },

    inc: (page) => {

        // console.log("inc");
    }

}

export default SliderFunctions;