// FORMULARIO
async function contactForm() {
  var nombre = document.getElementById("nombre").value;
  var email = document.getElementById("email").value;
  var asunto = document.getElementById("asunto").value;
  var mensaje = document.getElementById("mensaje").value;
  var jsonData = {
    nombre,
    email,
    asunto,
    mensaje,
  };

  await fetch("https://nuevasocialfenix.com.ar/formulario", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jsonData),
  })
    .then((res) => {
      document.getElementById("form-contacto").reset();
      $("#modalExito").modal("show");
    })
    .catch((err) => {
      document.getElementById("form-contacto").reset();
      $("#modalFail").modal("show");
      console.error(err);
    });
}

// SMOOTH SCROLLING
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  });
});

// SCROLL NAVBAR CHANGE
$(function () {
  $(document).scroll(function () {
    var $nav = $(".sticky-top");
    $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height() + 450);
  });
});

// CARRUSEL PRINCIPAL
$(".carru")
  .slick({
    dots: true,
    arrows: false,
    autoplay: true,
    draggable: true,
    fade: true,
    lazyLoad: "progressive",
    infinite: true,
    autoplaySpeed: 6000,
    speed: 2000,
  })
  .slick("slickPause");
let initialDelay = 2000;
setTimeout(function () {
  $(".carru").slick("slickPlay");
}, initialDelay);

// CARRUSEL PRODUCTOS
$(".carru-prod").slick({
  slidesToShow: 4,
  slidesToScroll: 4,
  dots: false,
  arrows: false,
  autoplay: true,
  draggable: true,
  infinite: true,
  autoplaySpeed: 4000,
  speed: 2000,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1008,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
      },
    },
  ],
});
