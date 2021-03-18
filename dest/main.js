//menu header
let hamburger = document.querySelector(".hamburger");
let menu = document.querySelector(".nav");
hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("act_hamburger");
  if (hamburger.classList.contains("act_hamburger")) {
    menu.classList.add("act_nav");
  } else {
    menu.classList.remove("act_nav");
  }
});

//language header
let lang = document.querySelector(".language");
let clicklang = document.querySelector(".language .language__currently");
let showlang = document.querySelector(".language .language__select");
let langItems = document.querySelectorAll(".language .language__select a");
let langcurrent = document.querySelector(".language .language__currently span");

clicklang.addEventListener("click", function (e) {
  e.stopPropagation();
  lang.classList.toggle("activelanguage");
});
document.querySelector("body").addEventListener("click", function () {
  lang.classList.remove("activelanguage");
});
console.log(langItems);
langItems.forEach(function (item) {
  item.addEventListener("click", function () {
    let langText = this.textContent;
    let langCurrentSpan = langcurrent.textContent;
    langcurrent.innerHTML = langText;
    this.innerHTML = langCurrentSpan;
  });
});

// //change color header when scroll
let header = document.querySelector("header");
let slider = document.querySelector(".slider");
let heightSlider = slider.clientHeight;
let heightHeader = header.clientHeight;

window.addEventListener("scroll", function () {
  let scroll = window.scrollY;
  if (scroll > heightSlider - heightHeader) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

//back to top
let backtotop = document.querySelector(".back-to-top");
backtotop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
let positionContent = document.querySelector(".content").offsetTop;
window.addEventListener("scroll", function () {
  let positionScroll = window.pageYOffset;
  if (positionScroll > positionContent) {
    backtotop.style.display = "block";
  } else {
    backtotop.style.display = "none";
  }
});

//popup video

let buttonVideo = document.querySelectorAll(
  ".quality__threevideo .quality__threevideo-video .bordervideo .picture .btnplay img"
);
let popup = document.querySelector(".popup-video");
let closePopup = document.querySelector(".close");
let iframe = document.querySelector(".popup-video iframe");
buttonVideo.forEach(function (button) {
  button.addEventListener("click", function () {
    let id_video = button.getAttribute("data-video-id");
    iframe.setAttribute("src", "https://www.youtube.com/embed/" + id_video);
    popup.style.display = "flex";
  });
});
closePopup.addEventListener("click", function () {
  iframe.setAttribute("src", "");
  popup.style.display = "none";
});
document.querySelector(".popup-video").addEventListener("click", function () {
  iframe.setAttribute("src", "");
  popup.style.display = "none";
});

//slider

// let listItemSlider = document.querySelectorAll(
//   ".slider .slider__list .slider__list-item"
// );
// let number = document.querySelector(".paging h3");
// let dotSlider = document.querySelectorAll(".paging ul li");
// currentSlider = 0;
// listItemSlider.forEach(function (item, index) {
//   if (item.classList.contains("activeSlider")) {
//     currentSlider = index;
//   }
// });

// function numberSlider(index) {
//   number.innerHTML = index.toString().padStart(2, "0");
// }

// document.querySelector(".control .next").addEventListener("click", function () {
//   if (currentSlider < listItemSlider.length - 1) {
//     goTo(currentSlider + 1);
//   } else {
//     goTo(0);
//   }
// });

// document
//   .querySelector(".control .previous")
//   .addEventListener("click", function () {
//     console.log("ok");
//     if (currentSlider > 0) {
//       goTo(currentSlider - 1);
//     } else {
//       goTo(listItemSlider.length - 1);
//     }
//   });

// function goTo(index) {
//   listItemSlider[currentSlider].classList.remove("activeSlider");
//   listItemSlider[index].classList.add("activeSlider");
//   dotSlider[currentSlider].classList.remove("is-selected");
//   dotSlider[index].classList.add("is-selected");
//   currentSlider = index;
//   numberSlider(currentSlider + 1);
// }

// dotSlider.forEach(function (li, index) {
//   li.addEventListener("click", function () {
//     goTo(index);
//   });
// });

//menu
let menuHeader = document.querySelectorAll("header .menu ul li a");
menuHeader.forEach(function (element, index) {
  element.addEventListener("click", function () {
    let href = element.getAttribute("href");
    let className = href.replace("#", "");
    let section = document.querySelectorAll("." + className);
    let positionSection = section.offsetTop;
    window.scrollTo({
      top: positionSection,
      behavior: "smooth",
    });
  });
});

//gallery
var initPhotoSwipeFromDOM = function (gallerySelector) {
  var parseThumbnailElements = function (el) {
    var thumbElements = el.childNodes,
      numNodes = thumbElements.length,
      items = [],
      figureEl,
      linkEl,
      size,
      item;
    for (var i = 0; i < numNodes; i++) {
      figureEl = thumbElements[i]; // <figure> element
      if (figureEl.nodeType !== 1) {
        continue;
      }
      linkEl = figureEl.children[0]; // <a> element
      size = linkEl.getAttribute("data-size").split("x");
      item = {
        src: linkEl.getAttribute("href"),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10),
      };
      if (figureEl.children.length > 1) {
        item.title = figureEl.children[1].innerHTML;
      }
      if (linkEl.children.length > 0) {
        // <img> thumbnail element, retrieving thumbnail url
        item.msrc = linkEl.children[0].getAttribute("src");
      }
      item.el = figureEl; // save link to element for getThumbBoundsFn
      items.push(item);
    }
    return items;
  };
  var closest = function closest(el, fn) {
    return el && (fn(el) ? el : closest(el.parentNode, fn));
  };
  var onThumbnailsClick = function (e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    var eTarget = e.target || e.srcElement;
    var clickedListItem = closest(eTarget, function (el) {
      return el.tagName && el.tagName.toUpperCase() === "FIGURE";
    });
    if (!clickedListItem) {
      return;
    }
    var clickedGallery = clickedListItem.parentNode,
      childNodes = clickedListItem.parentNode.childNodes,
      numChildNodes = childNodes.length,
      nodeIndex = 0,
      index;
    for (var i = 0; i < numChildNodes; i++) {
      if (childNodes[i].nodeType !== 1) {
        continue;
      }
      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }
    if (index >= 0) {
      openPhotoSwipe(index, clickedGallery);
    }
    return false;
  };
  var photoswipeParseHash = function () {
    var hash = window.location.hash.substring(1),
      params = {};
    if (hash.length < 5) {
      return params;
    }
    var vars = hash.split("&");
    for (var i = 0; i < vars.length; i++) {
      if (!vars[i]) {
        continue;
      }
      var pair = vars[i].split("=");
      if (pair.length < 2) {
        continue;
      }
      params[pair[0]] = pair[1];
    }
    if (params.gid) {
      params.gid = parseInt(params.gid, 10);
    }
    return params;
  };
  var openPhotoSwipe = function (
    index,
    galleryElement,
    disableAnimation,
    fromURL
  ) {
    var pswpElement = document.querySelectorAll(".pswp")[0],
      gallery,
      options,
      items;
    items = parseThumbnailElements(galleryElement);
    options = {
      galleryUID: galleryElement.getAttribute("data-pswp-uid"),
      getThumbBoundsFn: function (index) {
        var thumbnail = items[index].el.getElementsByTagName("img")[0], // find thumbnail
          pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop,
          rect = thumbnail.getBoundingClientRect();

        return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
      },
      showAnimationDuration: 0,
      hideAnimationDuration: 0,
    };
    if (fromURL) {
      if (options.galleryPIDs) {
        for (var j = 0; j < items.length; j++) {
          if (items[j].pid == index) {
            options.index = j;
            break;
          }
        }
      } else {
        options.index = parseInt(index, 10) - 1;
      }
    } else {
      options.index = parseInt(index, 10);
    }
    if (isNaN(options.index)) {
      return;
    }
    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };
  var galleryElements = document.querySelectorAll(gallerySelector);
  for (var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute("data-pswp-uid", i + 1);
    galleryElements[i].onclick = onThumbnailsClick;
  }
  var hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
  }
};

$(window).on("load", function () {
  initPhotoSwipeFromDOM(".carousel-img");
});

//slider

let $carousel = $(".slider .slider__list");
$carousel.flickity({
  contain: true,
  cellAlign: "left",
  wrapAround: true,
  imagesLoaded: true,
  autoPlay: true,
  on: {
    ready: function () {
      let dotted = $(".flickity-page-dots");
      paging = $(".slider__bottom .paging .dotted");
      dotted.appendTo(paging);
    },
    change: function (index) {
      let number = $(".slider .slider__bottom .paging h3");
      let indexPage = index + 1;
      number.text(indexPage.toString().padStart(2, 0));
    },
  },
});
$(".slider .slider__bottom .control .previous").on("click", function () {
  $carousel.flickity("previous");
});
$(".slider .slider__bottom .control .next").on("click", function () {
  $carousel.flickity("next");
});

//change slider
setTimeout(function () {
  $(".slider .slider__list-item:nth-child(1)").addClass("show");
}, 500);
$carousel.on("change.flickity", function (event, index) {
  setTimeout(function () {
    $(".slider .slider__list-item").removeClass("show");
    $(".slider .slider__list-item:nth-child(" + (index + 1) + ")").addClass(
      "show"
    );
  }, 500);
});
