// Original func from https://www.mukto.info/code/adding-and-removing-class-based-on-element-visibility-in-the-viewport/
function isElementVerticallyInViewport(el) {
    var rect = el.getBoundingClientRect();

    // Element is vertically visable if the abs y value is atleast half of the view port height.
    return Math.floor((window.innerHeight || document.documentElement.clientHeight)/2) >= Math.abs(rect.top);
  }

  function getCurrentSectionIndex(sectionList, pageId) {
    if (pageId == null || !Array.isArray(sectionList)) {
        return 0;
    }
    let currIndex = sectionList.indexOf(pageId);
    return Math.max(currIndex, 0);
}

let throttle = (callback, delay) => {
    let timeoutId = null;
    return (...args) => {
        if (timeoutId === null) {
            callback(...args);
            timeoutId = setTimeout(() => {
                timeoutId = null;
            }, delay);
        }
    }
}

// Temp
let $ = jQuery;
let linksList = $('.link');
const sectionOrderList = ['hero', 'about', 'projects', 'experience', 'contact'];
const sectionElementList = sectionOrderList.map(sectionId => $(`#${sectionId}`));
let currentSectionIndex = getCurrentSectionIndex(sectionOrderList, window.location.hash);
console.log({
    sectionOrderList: sectionOrderList,
    sectionElementList: sectionElementList,
    currIndex: currentSectionIndex
});

// May want to do scroll behaviour using JS.
// from: https://stackoverflow.com/questions/31223341/detecting-scroll-direction

// F*ck this, change it to check the current window y and compare it to the element's y pos.
let lastScrollTop =  window.pageYOffset || document.documentElement.scrollTop;
$(window).on("scroll", () => {
    sectionElementList.forEach((element) => {
        let currentId = element[0].id;
        let relatedMenuLink = $(`[href='#${currentId}']`);
        if (relatedMenuLink.length <= 0) {
            return;
        }
        relatedMenuLink = relatedMenuLink[0];
        if (isElementVerticallyInViewport(element[0])) {
            $(relatedMenuLink).addClass("link-active");
        } else {
            $(relatedMenuLink).removeClass("link-active");
        }
        // console.log({currentId: currentId, isElementVisible: isElementVerticallyInViewport(element[0]) });
    });
})
// $(window).on("scroll", throttle((event) => {
//         console.log("Triggered in throttle");
        
//         let st = window.pageYOffset || document.documentElement.scrollTop;
//         console.log({
//             "currentData": {
//                 lstScrlTop: lastScrollTop,
//                 crntScrlTop: st,
//                 currIndx: currentSectionIndex,     
//             }
//         });
//         if (st > lastScrollTop) {
//             if ((currentSectionIndex + 1) < sectionOrderList.length) {
//                 currentSectionIndex++;
//             }
            
//             let currentSectionId = sectionOrderList[currentSectionIndex]
//             currSection = $(`#${currentSectionId}`);

//             if (currSection.length <= 0) {
//                 console.error("Current section couldn't be found!");
//                 return;
//             }

//             console.log(`snapping to ${currentSectionId}`);

//             currSection[0].scrollIntoView({
//                 behavior: "smooth", // or "auto" or "instant"
//                 block: "end" // or "end"
//             });
//             // window.location.hash = currentSectionId;
//         } else if (st < lastScrollTop) {
//             if ((currentSectionIndex - 1) >= 0) {
//                 currentSectionIndex--;
//             }

//             let currentSectionId = sectionOrderList[currentSectionIndex]
//             currSection = $(`#${currentSectionId}`);

//             if (currSection.length <= 0) {
//                 console.error("Current section couldn't be found!");
//                 return;
//             }

//             console.log(`snapping to ${currentSectionId}`);

//             currSection[0].scrollIntoView({
//                 behavior: "smooth", // or "auto" or "instant"
//                 block: "start" // or "end"
//             });
//             // window.location.hash = currentSectionId;
//             // window.location.hash = "hero";
//         }
//         lastScrollTop = st <= 0 ? 0 : st;
//     }, 1000)
// );

// let current
//  Change to make only one link active at a time
linksList.each((index, element) => {
    $(element).on('click', () => {
        console.log({"activeHash": window.location.hash});
        $(element).addClass("link-active");
    })
});