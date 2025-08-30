import gsap from "gsap";

export const animatePageIn = () => {
  const bannerUm = document.getElementById("banner-1");
  const bannerDois = document.getElementById("banner-2");
  const bannerTres = document.getElementById("banner-3");
  const bannerQuatro = document.getElementById("banner-4");

  if (bannerUm && bannerDois && bannerTres && bannerQuatro) {
    const tl = gsap.timeline();

    tl.set([bannerUm, bannerDois, bannerTres, bannerQuatro], {
      yPercent: 0,
    }).to([bannerUm, bannerDois, bannerTres, bannerQuatro], {
      yPercent: 100,
      stagger: 0.2,
    });
  }
};
