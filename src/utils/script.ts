import type { Alpine } from "alpinejs";
import JustValidate from "just-validate";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: false,
});

function raf(time: number) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

lenis.on("scroll", ScrollTrigger.update);

gsap.defaults({
  ease: "power2.out",
  duration: 1,
});

const nav = document.querySelector("[data-gsap-nav]");
const heroBg = document.querySelector("[data-gsap-hero-bg]");
const heroTitle = document.querySelector("[data-gsap-hero-title]");
const heroText = document.querySelector("[data-gsap-hero-text]");
const heroScroll = document.querySelector("[data-gsap-hero-scroll]");

if (nav && heroBg && heroTitle && heroText && heroScroll) {
  gsap.set(nav, { opacity: 0, y: -30 });
  gsap.set([heroTitle, heroText, heroScroll], { opacity: 0, y: 40 });
  gsap.set(heroBg, { scale: 1.1, opacity: 0 });

  const tl = gsap.timeline({
    defaults: { ease: "power2.out", duration: 1.2 },
  });

  tl.to(nav, { opacity: 1, y: 0, duration: 0.8 }, "+=0.7")
    .to(heroBg, { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }, 0)
    .to(heroTitle, { opacity: 1, y: 0, duration: 1 }, "-=1.2")
    .to(heroText, { opacity: 1, y: 0, duration: 1 }, "-=0.8")
    .to(heroScroll, { opacity: 1, y: 0, duration: 1 }, "-=0.6");
}

const categories = gsap.utils.toArray("[data-gsap-category]");

if (categories.length) {
  gsap.set(categories, { y: 80, opacity: 0 })
  gsap.to(categories, {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.15,
    scrollTrigger: {
      trigger: "[data-gsap-categories]",
      start: "top 85%",
    },
  })
}

const aboutImages = gsap.utils.toArray("[data-gsap-about-img]")
const aboutContent = document.querySelector("[data-gsap-about-content]")

if (aboutImages.length && aboutContent) {
  gsap.set(aboutImages, { opacity: 0, x: -60 })
  gsap.set(aboutContent, { opacity: 0, x: 60 })

  gsap.to([...aboutImages, aboutContent], {
    opacity: 1,
    x: 0,
    duration: 1,
    stagger: 0.15,
    scrollTrigger: {
      trigger: "[data-gsap-about]",
      start: "top 85%",
    },
  })
}

const numbers = gsap.utils.toArray("[data-gsap-number]")

if (numbers.length) {
  gsap.set(numbers, { y: 60, opacity: 0 })
  gsap.to(numbers, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.12,
    scrollTrigger: {
      trigger: "[data-gsap-numbers]",
      start: "top 85%",
    },
  })
}

const numberVals = document.querySelectorAll("[data-gsap-number-val]")

numberVals.forEach((el) => {
  const full = el.getAttribute("data-gsap-number-val") || el.textContent || ""
  const match = full.match(/^([\d.]+)(.*)$/)
  if (!match) return
  const target = parseFloat(match[1])
  const suffix = match[2]

  el.textContent = "0" + suffix

  gsap.to({ val: 0 }, {
    val: target,
    duration: 2,
    ease: "power2.out",
    onUpdate: function () {
      el.textContent = Math.round(this.targets()[0].val) + suffix
    },
    scrollTrigger: {
      trigger: el.closest("[data-gsap-number]"),
      start: "top 85%",
    },
  })
})

const pubCards = gsap.utils.toArray("[data-gsap-pub-card]")
const pubThumbs = gsap.utils.toArray("[data-gsap-pub-thumb]")

if (pubCards.length) {
  gsap.set(pubCards, { y: 60, opacity: 0 })
  gsap.to(pubCards, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.12,
    scrollTrigger: {
      trigger: "[data-gsap-pub]",
      start: "top 85%",
    },
  })
}

if (pubThumbs.length) {
  gsap.set(pubThumbs, { y: 40, opacity: 0 })
  gsap.to(pubThumbs, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.1,
    scrollTrigger: {
      trigger: "[data-gsap-pub]",
      start: "top 65%",
    },
  })
}

const contactHeading = document.querySelector("[data-gsap-contact-heading]")
const contactForm = document.querySelector("[data-gsap-contact-form]")

if (contactHeading && contactForm) {
  gsap.set([contactHeading, contactForm], { y: 60, opacity: 0 })
  gsap.to([contactHeading, contactForm], {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: "[data-gsap-contact]",
      start: "top 85%",
    },
  })
}

export default function (Alpine: Alpine) {
  Alpine.data("formHandler", () => ({
    formData: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      companyName: "",
      country: "",
      phoneNumber: "",
      corporateEmail: "",
      message: "",
    },

    init() {
      const validator = new JustValidate(this.$refs.form, {
        errorLabelCssClass: ["mt-1", "text-sm", "text-red-500"],
      });

      validator
        .addField("#firstName", [
          {
            rule: "required",
            errorMessage: "First name is required",
          },
        ])
        .addField("#lastName", [
          {
            rule: "required",
            errorMessage: "Last name is required",
          },
        ])
        .addField("#jobTitle", [
          {
            rule: "required",
            errorMessage: "Job title is required",
          },
        ])
        .addField("#companyName", [
          {
            rule: "required",
            errorMessage: "Company name is required",
          },
        ])
        .addField("#country", [
          {
            rule: "required",
            errorMessage: "Country is required",
          },
        ])
        .addField("#phoneNumber", [
          {
            rule: "required",
            errorMessage: "Phone number is required",
          },
        ])
        .addField("#corporateEmail", [
          {
            rule: "required",
            errorMessage: "Corporate email is required",
          },
          {
            rule: "email",
            errorMessage: "Please enter a valid email",
          },
        ])
        .addField("#message", [
          {
            rule: "required",
            errorMessage: "Message is required",
          },
        ])
        .onSuccess(async (event: Event) => {
          event.preventDefault();
          console.log("Form Data:", this.formData);
          // const response = await fetch("/api/contact", {
          //   method: "POST",
          //   headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify(this.formData),
          // });
          this.resetForm();
        });
    },

    resetForm() {
      this.formData = {
        firstName: "",
        lastName: "",
        jobTitle: "",
        companyName: "",
        country: "",
        phoneNumber: "",
        corporateEmail: "",
        message: "",
      };
    },
  }));
}
