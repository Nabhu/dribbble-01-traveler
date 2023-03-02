import barba from "@barba/core";
import { gsap } from "gsap";

barba.init({
  transitions: [
    {
      name: "default",
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0,
        });
      },
    },
    {
      name: "home-to-travels",
      from: {
        custom: ({ trigger }) => {
          return trigger.classList && trigger.classList.contains("btn");
        },
      },
      to: {
        namespace: ["travels"],
      },
      leave() {},
      afterEnter() {
        animationHomeTravels();
      },
    },
  ],
  views: [
    {
      namespace: "home",
      beforeEnter() {
        document.body.classList.remove("travels");
        document.body.classList.remove("light");
      },
    },
    // {
    //   namespace: "travels",
    //   beforeEnter() {
    //     // update the menu based on user navigation
    //     // document.body.classList.add("travels");
    //   },
    //   afterEnter() {
    //     // refresh the parallax based on new page content
    //     // parallax.refresh();
    //   },
    // },
  ],
});

function animationHomeTravels() {
  const travels = document.querySelectorAll("article");
  travels.forEach((travel, index) => {
    let properties = travel.getBoundingClientRect();
    travel.style.position = `absolute`;
    travel.style.top = `${properties.top - window.innerHeight - 120}px`;
    if (properties.x < 0) {
      properties.x = 0;
    }
    if (properties.x > window.innerWidth / 2) {
      properties.x -= 70;
    }
    travel.style.left = `${properties.x}px`;
    travel.style.width = `${properties.width}px`;
    travel.style.height = `${properties.height}px`;
    document.querySelectorAll(".section-title").forEach((section) => {
      section.style.height = `${section.getBoundingClientRect().height}px`;
      setTimeout(() => {
        section.classList.add("remove");
      }, 10);
    });
    document.querySelector("body").classList.add("light");
    setTimeout(() => {
      travel.classList.add("travel-barba-enter");
      travel.style.left = `${400 * (index % 5)}px`;
    }, 10);
    setTimeout(() => {
      travel.style.position = `relative`;
      travel.style.left = `auto`;
      travel.style.width = `400px`;
      travel.style.height = `auto`;
      travel.style.top = `auto`;
      travel.classList.remove("travel-barba-enter");
    }, 1000);
  });
  setTimeout(() => {
    document.body.classList.add("travels");
  }, 1000);
}
