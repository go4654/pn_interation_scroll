(() => {
  let yOffset;
  let prevScrollHeight = 0;
  let currentSection = 0;
  let intoNewSection = false;

  const sectionInfo = [
    {
      type: "fix",
      heightNum: 5,
      scrollHeight: 0,
      el: {
        section: document.querySelector(".section_0"),
        fixTitle_1: document.querySelector(".section_0 .fix_title_1"),
        fixTitle_2: document.querySelector(".section_0 .fix_title_2"),
        fixTitle_3: document.querySelector(".section_0 .fix_title_3"),
        fixTitle_4: document.querySelector(".section_0 .fix_title_4"),
        fixTitle_5: document.querySelector(".section_0 .fix_title_5"),
      },
      values: {
        fix_title_1_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        fix_title_1_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        fix_title_1_translateX_in: [7, 0, { start: 0.1, end: 0.2 }],
        fix_title_1_translateY_out: [0, -60, { start: 0.25, end: 0.3 }],

        fix_title_2_opacity_in: [0, 1, { start: 0.3, end: 0.35 }],
        fix_title_2_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
        fix_title_2_translateX_in: [-7, 0, { start: 0.3, end: 0.35 }],
        fix_title_2_translateY_out: [0, -60, { start: 0.4, end: 0.45 }],

        fix_title_3_opacity_in: [0, 1, { start: 0.45, end: 0.5 }],
        fix_title_3_opacity_out: [1, 0, { start: 0.55, end: 0.6 }],
        fix_title_3_translateX_in: [7, 0, { start: 0.45, end: 0.5 }],
        fix_title_3_translateY_out: [0, -60, { start: 0.55, end: 0.6 }],

        fix_title_4_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
        fix_title_4_opacity_out: [1, 0, { start: 0.7, end: 0.75 }],
        fix_title_4_translateX_in: [-7, 0, { start: 0.6, end: 0.65 }],
        fix_title_4_translateY_out: [0, -60, { start: 0.7, end: 0.75 }],

        fix_title_5_opacity_in: [0, 1, { start: 0.8, end: 0.9 }],
        fix_title_5_opacity_out: [1, 0, { start: 0.95, end: 1 }],
      },
    },
    {
      type: "fix",
      heightNum: 5,
      scrollHeight: 0,
      el: {
        section: document.querySelector(".section_1"),
      },
    },
    {
      type: "fix",
      heightNum: 5,
      scrollHeight: 0,
      el: {
        section: document.querySelector(".section_2"),
      },
    },
    {
      type: "fix",
      heightNum: 5,
      scrollHeight: 0,
      el: {
        section: document.querySelector(".section_3"),
      },
    },
  ];

  const navHandler = () => {
    if (yOffset >= 100) {
      document.body.classList.add("header_fix");
    } else {
      document.body.classList.remove("header_fix");
    }
  };

  const setLayout = () => {
    for (let i = 0; i < sectionInfo.length; i++) {
      if (sectionInfo[i].type === "fix") {
        sectionInfo[i].scrollHeight =
          sectionInfo[i].heightNum * window.innerHeight;
      } else if (sectionInfo[i].type === "normal") {
        sectionInfo[i].scrollHeight = sectionInfo[i].el.section.offsetHeight;
      }

      sectionInfo[
        i
      ].el.section.style.height = `${sectionInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset;
    let totalHeight = 0;
    for (let i = 0; i < sectionInfo.length; i++) {
      totalHeight += sectionInfo[i].scrollHeight;
      if (totalHeight >= yOffset) {
        currentSection = i;
        break;
      }
    }
    document.body.setAttribute("id", `view_section_${currentSection}`);
  };

  const calcValues = (values, currentYOffset) => {
    let reCalc;
    const scrollHeight = sectionInfo[currentSection].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
      const partStart = values[2].start * scrollHeight;
      const partEnd = values[2].end * scrollHeight;
      const partHeight = partEnd - partStart;

      if (currentYOffset >= partStart && currentYOffset <= partEnd) {
        reCalc =
          ((currentYOffset - partStart) / partHeight) *
            (values[1] - values[0]) +
          values[0];
      } else if (currentYOffset < partStart) {
        reCalc = values[0];
      } else if (currentYOffset > partEnd) {
        reCalc = values[1];
      }
    } else {
      reCalc = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return reCalc;
  };

  const scrollAni = () => {
    const el = sectionInfo[currentSection].el;
    const values = sectionInfo[currentSection].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sectionInfo[currentSection].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentSection) {
      case 0:
        if (scrollRatio < 0.22) {
          el.fixTitle_1.style.opacity = calcValues(
            values.fix_title_1_opacity_in,
            currentYOffset
          );
          el.fixTitle_1.style.transform = `translate3d(${calcValues(
            values.fix_title_1_translateX_in,
            currentYOffset
          )}%,0,0)`;
        } else {
          el.fixTitle_1.style.opacity = calcValues(
            values.fix_title_1_opacity_out,
            currentYOffset
          );
          el.fixTitle_1.style.transform = `translate3d(0,${calcValues(
            values.fix_title_1_translateY_out,
            currentYOffset
          )}%,0)`;
        }

        if (scrollRatio < 0.37) {
          el.fixTitle_2.style.opacity = calcValues(
            values.fix_title_2_opacity_in,
            currentYOffset
          );
          el.fixTitle_2.style.transform = `translate3d(${calcValues(
            values.fix_title_2_translateX_in,
            currentYOffset
          )}%,0,0)`;
        } else {
          el.fixTitle_2.style.opacity = calcValues(
            values.fix_title_2_opacity_out,
            currentYOffset
          );
          el.fixTitle_2.style.transform = `translate3d(0,${calcValues(
            values.fix_title_2_translateY_out,
            currentYOffset
          )}%,0)`;
        }

        if (scrollRatio < 0.52) {
          el.fixTitle_3.style.opacity = calcValues(
            values.fix_title_3_opacity_in,
            currentYOffset
          );
          el.fixTitle_3.style.transform = `translate3d(${calcValues(
            values.fix_title_3_translateX_in,
            currentYOffset
          )}%,0,0)`;
        } else {
          el.fixTitle_3.style.opacity = calcValues(
            values.fix_title_3_opacity_out,
            currentYOffset
          );
          el.fixTitle_3.style.transform = `translate3d(0,${calcValues(
            values.fix_title_3_translateY_out,
            currentYOffset
          )}%,0)`;
        }

        if (scrollRatio < 0.67) {
          el.fixTitle_4.style.opacity = calcValues(
            values.fix_title_4_opacity_in,
            currentYOffset
          );
          el.fixTitle_4.style.transform = `translate3d(${calcValues(
            values.fix_title_4_translateX_in,
            currentYOffset
          )}%,0,0)`;
        } else {
          el.fixTitle_4.style.opacity = calcValues(
            values.fix_title_4_opacity_out,
            currentYOffset
          );
          el.fixTitle_4.style.transform = `translate3d(0,${calcValues(
            values.fix_title_4_translateY_out,
            currentYOffset
          )}%,0)`;
        }

        if (scrollRatio < 0.92) {
          el.fixTitle_5.style.opacity = calcValues(
            values.fix_title_5_opacity_in,
            currentYOffset
          );
        } else {
          el.fixTitle_5.style.opacity = calcValues(
            values.fix_title_5_opacity_out,
            currentYOffset
          );
        }
        break;

      case 1:
        break;

      case 2:
        break;

      case 3:
        break;
    }
  };

  const scrollHandler = () => {
    prevScrollHeight = 0;
    for (let i = 0; i < currentSection; i++) {
      prevScrollHeight += sectionInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sectionInfo[currentSection].scrollHeight) {
      currentSection++;
      document.body.setAttribute("id", `view_section_${currentSection}`);
    }

    if (yOffset < prevScrollHeight) {
      if (yOffset === 0) return;
      currentSection--;
      document.body.setAttribute("id", `view_section_${currentSection}`);
    }

    scrollAni();
  };

  window.addEventListener("load", () => {
    setLayout();

    window.addEventListener("scroll", () => {
      yOffset = window.pageYOffset;
      navHandler();
      scrollHandler();
    });
  });
})();
