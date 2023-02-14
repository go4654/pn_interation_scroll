(() => {
  let yOffset;
  let prevScrollHeight = 0;
  let currentSection = 0;
  let intoNewSection = false;

  const sectionInfo = [
    {
      //0
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
        fix_title_1_translateX_in: [5, 0, { start: 0.1, end: 0.2 }],
        fix_title_1_translateY_out: [0, -120, { start: 0.25, end: 0.3 }],

        fix_title_2_opacity_in: [0, 1, { start: 0.3, end: 0.35 }],
        fix_title_2_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
        fix_title_2_translateX_in: [-5, 0, { start: 0.3, end: 0.35 }],
        fix_title_2_translateY_out: [0, -120, { start: 0.4, end: 0.45 }],

        fix_title_3_opacity_in: [0, 1, { start: 0.45, end: 0.5 }],
        fix_title_3_opacity_out: [1, 0, { start: 0.55, end: 0.6 }],
        fix_title_3_translateX_in: [2, 0, { start: 0.45, end: 0.5 }],
        fix_title_3_translateY_out: [0, -120, { start: 0.55, end: 0.6 }],

        fix_title_4_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
        fix_title_4_opacity_out: [1, 0, { start: 0.7, end: 0.75 }],
        fix_title_4_translateX_in: [-2, 0, { start: 0.6, end: 0.65 }],
        fix_title_4_translateY_out: [0, -120, { start: 0.7, end: 0.75 }],

        fix_title_5_opacity_in: [0, 1, { start: 0.8, end: 0.9 }],
        fix_title_5_opacity_out: [1, 0, { start: 0.95, end: 1 }],
        fix_title_5_scale_in: [5, 1, { start: 0.8, end: 0.9 }],
        fix_title_5_translateY_out: [0, -120, { start: 0.95, end: 1 }],
      },
    },
    {
      //1
      type: "fix",
      heightNum: 5,
      scrollHeight: 0,
      el: {
        section: document.querySelector(".section_1"),
        canvas: document.querySelector(".section_1 .canvas_1"),
        context: document
          .querySelector(".section_1 .canvas_1")
          .getContext("2d"),
        canvasImgs: [],
      },
      values: {
        totalImgCount: 255,
        imgCount: [0, 254],

        canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
        canvas_opacity_out: [1, 0, { start: 0.9, end: 1 }],
      },
    },
    {
      //2
      type: "fix",
      heightNum: 5,
      scrollHeight: 0,
      el: {
        section: document.querySelector(".section_2"),
        title: document.querySelector(".section_2 .title"),
        canvas: document.querySelector(".section_2 .canvas_2"),
        context: document
          .querySelector(".section_2 .canvas_2")
          .getContext("2d"),
        imgPath: ["./img/img_1.jpg"],
        imgs: [],
      },
      values: {
        canvas_scale: [1, 0.5, { start: 0, end: 0.1 }],
        title_translateX: [70, -100, { start: 0.1, end: 0.5 }],
        canvas_opacity_out: [1, 0, { start: 0.5, end: 1 }],

        // fix_canvas: [],
        canvasY: 0,
      },
    },
    {
      //3
      type: "fix",
      heightNum: 5,
      scrollHeight: 0,
      el: {
        section: document.querySelector(".section_3"),
        fixBox: document.querySelector(".section_3 .fix_box"),
        con_1: document.querySelector(".section_3 .fix_box .con_1"),
        con_2: document.querySelector(".section_3 .fix_box .con_2"),
        con_3: document.querySelector(".section_3 .fix_box .con_3"),
      },
      values: {
        fixBox_opacity: [0, 1, { start: 0, end: 0.1 }],
        fixBox_translateY: [100, 0, { start: 0, end: 0.1 }],

        con_1_rotate: [0, -10, { start: 0.2, end: 0.3 }],
        con_3_rotate: [0, 10, { start: 0.2, end: 0.3 }],

        con_2_translateY: [0, -70, { start: 0.2, end: 0.3 }],
      },
    },
  ];

  // const navHandler = () => {
  //   if (yOffset >= 100) {
  //     document.body.classList.add("header_fix");
  //   } else {
  //     document.body.classList.remove("header_fix");
  //   }
  // };

  const setCanvasImg = () => {
    let imgEl;
    for (let i = 0; i < sectionInfo[1].values.totalImgCount; i++) {
      imgEl = new Image();
      imgEl.src = `./videos/section_1/intro_${1000 + i}.jpg`;
      sectionInfo[1].el.canvasImgs.push(imgEl);
    }

    let imgEl2;
    for (let i = 0; i < sectionInfo[2].el.imgPath.length; i++) {
      imgEl2 = new Image();
      imgEl2.src = sectionInfo[2].el.imgPath[i];
      sectionInfo[2].el.imgs.push(imgEl2);
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

    // const heightRatio = window.innerHeight / 1080;
    sectionInfo[1].el.canvas.style.transform = `translate3d(-50%,-50%,0)`;
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
          el.fixTitle_5.style.transform = `scale(${calcValues(
            values.fix_title_5_scale_in,
            currentYOffset
          )})`;
        } else {
          el.fixTitle_5.style.opacity = calcValues(
            values.fix_title_5_opacity_out,
            currentYOffset
          );
          el.fixTitle_5.style.transform = `translate3d(0,${calcValues(
            values.fix_title_5_translateY_out,
            currentYOffset
          )}%,0)`;
        }

        break;

      case 1:
        const imgs = Math.round(calcValues(values.imgCount, currentYOffset));
        el.context.drawImage(el.canvasImgs[imgs], 0, 0);

        if (scrollRatio <= 0.5) {
          el.canvas.style.opacity = calcValues(
            values.canvas_opacity_in,
            currentYOffset
          );
        } else {
          el.canvas.style.opacity = calcValues(
            values.canvas_opacity_out,
            currentYOffset
          );
        }

        if (scrollRatio <= 0.7) {
          sectionInfo[2].el.section.style.backgroundColor = "#1d1d1d";
          sectionInfo[2].el.context.drawImage(sectionInfo[2].el.imgs[0], 0, 0);
        }

        break;

      case 2:
        el.context.drawImage(el.imgs[0], 0, 0);
        const widthRatio = el.canvas.width / document.body.offsetWidth;
        const heightRatio = el.canvas.height / window.innerHeight;
        let scaleRatio;

        if (widthRatio <= heightRatio) {
          scaleRatio = heightRatio;
        } else {
          scaleRatio = widthRatio;
        }

        if (scrollRatio <= 0.7) {
          el.canvas.style.transform = `scale(${calcValues(
            values.canvas_scale,
            currentYOffset
          )})`;

          if (scrollRatio <= sectionInfo[2].values.canvas_scale[2].end) {
            el.canvas.style.top = 0;
            el.canvas.classList.remove("img_fix");
            el.title.classList.remove("fix");
            // console.log(
            //   scrollRatio <= sectionInfo[2].values.canvas_scale[2].end
            // );
            console.log(scrollRatio);
            console.log(sectionInfo[2].values.canvas_scale[2].end);
          } else {
            console.log("@@@");
            el.canvas.classList.add("img_fix");
            el.title.classList.add("fix");

            // el.canvas.style.top = `${
            //   (el.canvas.height - el.canvas.height * scaleRatio) / 2
            // }px`;
          }
        }

        if (scrollRatio <= sectionInfo[2].values.canvas_scale[2].end + 0.8) {
          el.title.style.transform = `translate3d(${calcValues(
            values.title_translateX,
            currentYOffset
          )}%,0,0)`;

          el.canvas.style.opacity = calcValues(
            values.canvas_opacity_out,
            currentYOffset
          );
        }

        if (scrollRatio >= sectionInfo[2].values.canvas_scale[2].end + 0.8) {
          el.canvas.classList.remove("img_fix");
        }

        break;

      case 3:
        if (scrollRatio <= 0.12) {
          el.fixBox.style.opacity = calcValues(
            values.fixBox_opacity,
            currentYOffset
          );

          el.fixBox.style.transform = `translate3d(0,${calcValues(
            values.fixBox_translateY,
            currentYOffset
          )}%,0)`;
        }

        if (scrollRatio <= 0.32) {
          el.con_1.style.transform = `rotate(${calcValues(
            values.con_1_rotate,
            currentYOffset
          )}deg)`;

          el.con_2.style.transform = `translate3d(0,${calcValues(
            values.con_2_translateY,
            currentYOffset
          )}px,0)`;

          el.con_3.style.transform = `rotate(${calcValues(
            values.con_3_rotate,
            currentYOffset
          )}deg)`;
        }

        break;
    }
  };

  const scrollHandler = () => {
    intoNewSection = false;
    prevScrollHeight = 0;
    for (let i = 0; i < currentSection; i++) {
      prevScrollHeight += sectionInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sectionInfo[currentSection].scrollHeight) {
      intoNewSection = true;
      currentSection++;
      document.body.setAttribute("id", `view_section_${currentSection}`);
    }

    if (yOffset < prevScrollHeight) {
      intoNewSection = true;
      if (yOffset === 0) return;
      currentSection--;
      document.body.setAttribute("id", `view_section_${currentSection}`);
    }

    if (intoNewSection) return;

    scrollAni();
  };

  window.addEventListener("load", () => {
    setLayout();

    window.addEventListener("scroll", () => {
      yOffset = window.pageYOffset;
      // navHandler();
      scrollHandler();
    });
    window.addEventListener("resize", () => {
      location.reload();
      setLayout();
    });
  });

  setCanvasImg();
})();
