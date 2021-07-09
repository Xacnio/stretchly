// const {Tray} = require('electron');
const mergeImg = require('merge-img-vwv');
const pathToImages = "app/images/app-icons/numbers/generated-numbers/";
const pathToImages2 = "numbers/generated-numbers/";
const pathToCircleImages = "app/images/app-icons/round-clock/";
const log = require('electron-log');
const iconTrayFilename = 'trayIcon.png';
const baseImages = 'app/images/app-icons/numbers/';

class TrayWithText2 {
  // setTrayWhenNeeded = async function (
  //   trayPath,
  //   minutes,
  //   showTrayIcon,
  //   breakIconType,
  //   minutesLongBreakTake
  // ) {
  //   if (showTrayIcon && breakIconType == "number") {
  //     this.showWithNumber(trayPath, minutes);
  //     this.setImage(pathToImages + iconTrayFilename);
  //   } else if (showTrayIcon && breakIconType == "circleIcon") {
  //     this.showWithCircle(trayPath, minutes, minutesLongBreakTake);
  //     this.setImage(pathToCircleImages + iconTrayFilename);
  //   } else {
  //     this.setImage(trayPath);
  //   }
  // };

  showWithCircle = async function (
    imagePath,
    minutesToLongBreak,
    totalLongBreak
  ) {
    let minutesOnTray = minutesToLongBreak;
    let timeLeftRatio = minutesOnTray / totalLongBreak;
    if (timeLeftRatio >= 0.875) {
      await this.pictureCombines(imagePath, pathToCircleImages, "0");
    } else if (timeLeftRatio < 0.875 && timeLeftRatio > 0.75) {
      await this.pictureCombines(imagePath, pathToCircleImages, "7");
    } else if (timeLeftRatio <= 0.75 && timeLeftRatio > 0.625) {
      await this.pictureCombines(imagePath, pathToCircleImages, "15");
    } else if (timeLeftRatio <= 0.625 && timeLeftRatio > 0.5) {
      await this.pictureCombines(imagePath, pathToCircleImages, "22");
    } else if (timeLeftRatio <= 0.5 && timeLeftRatio > 0.375) {
      await this.pictureCombines(imagePath, pathToCircleImages, "30");
    } else if (timeLeftRatio <= 0.375 && timeLeftRatio > 0.25) {
      await this.pictureCombines(imagePath, pathToCircleImages, "37");
    } else if (timeLeftRatio <= 0.25 && timeLeftRatio > 0.125) {
      await this.pictureCombines(imagePath, pathToCircleImages, "45");
    } else if (timeLeftRatio <= 0.125 && timeLeftRatio > 0.065) {
      await this.pictureCombines(imagePath, pathToCircleImages, "52");
    } else {
      await this.pictureCombines(imagePath, pathToCircleImages, "60");
    }
  };

  pictureCombines = async function (
    defaultIconPath,
    pathToImages,
    nameOfImage
  ) {
    try {
      let img = await mergeImg([
        {src: defaultIconPath},
        {
          src: pathToImages + nameOfImage + ".png",
          offsetX: -32,
        },
      ]);
      await img.write(pathToImages + iconTrayFilename, () => log.debug("done"));
    } catch (e) {
      log.debug("safely ignored error");
    }
  };

  storeNewNumber = async function (imagePath, minutesToLongBreak) {
    let minutesOnTray = minutesToLongBreak;
    if (minutesToLongBreak < 10) {
      minutesOnTray = "0" + minutesToLongBreak;
    }
    try {
      let img = await mergeImg([
        {src: imagePath},
        {
          src: pathToImages + minutesOnTray + ".png",
          offsetX: -32,
        },
      ]);
      await img.write(pathToImages + iconTrayFilename, () => {
        log.debug("doneImageUpdate");
        return true;
        // return pathToImages + iconTrayFilename;
      });
      // return pathToImages + iconTrayFilename;
    } catch (e) {
      log.debug("safely ignored error");
    }
  };

  iconWithNumber = function (
    imagePath,
    minutesToLongBreak,
    darkModeString,
    monochrome,
    platform,
    invertedMonochromeString
  ) {
    let minutesOnTray = minutesToLongBreak;
    if (minutesToLongBreak < 10) {
      minutesOnTray = "0" + minutesToLongBreak;
    }
    if (monochrome) {
      if (platform === "darwin") {
        return `${imagePath}traytMacMonochrome${minutesOnTray}.png`;
      } else {
        return `${imagePath}traytMonochrome${invertedMonochromeString}${minutesOnTray}.png`;
      }
    } else {
      if (platform === "darwin") {
        return `${imagePath}traytMac${darkModeString}${minutesOnTray}.png`;
      } else {
        return `${imagePath}trayt${darkModeString}${minutesOnTray}.png`;
      }
    }
  };

  pathWithCircularIcon = function (
    imagePath,
    minutesToLongBreak,
    totalLongBreak,
    darkModeString,
    monochrome,
    platform,
    invertedMonochromeString
  ) {
    let minutesOnTray = minutesToLongBreak;
    let timeLeftRatio = minutesOnTray / totalLongBreak;

    let pictureNo = "0";
    if (timeLeftRatio >= 0.875) {
      pictureNo = "0";
    } else if (timeLeftRatio < 0.875 && timeLeftRatio > 0.75) {
      pictureNo = "7";
    } else if (timeLeftRatio <= 0.75 && timeLeftRatio > 0.625) {
      pictureNo = "15";
    } else if (timeLeftRatio <= 0.625 && timeLeftRatio > 0.5) {
      pictureNo = "22";
    } else if (timeLeftRatio <= 0.5 && timeLeftRatio > 0.375) {
      pictureNo = "20";
    } else if (timeLeftRatio <= 0.375 && timeLeftRatio > 0.25) {
      pictureNo = "37";
    } else if (timeLeftRatio <= 0.25 && timeLeftRatio > 0.125) {
      pictureNo = "45";
    } else if (timeLeftRatio <= 0.125 && timeLeftRatio > 0.065) {
      pictureNo = "52";
    } else {
      pictureNo = "60";
    }
    if (monochrome) {
      if (platform === "darwin") {
        return `${imagePath}traytMacMonochrome${pictureNo}.png`;
      } else {
        return `${imagePath}traytMonochrome${invertedMonochromeString}${pictureNo}.png`;
      }
    } else {
      if (platform === "darwin") {
        return `${imagePath}traytMac${darkModeString}${pictureNo}.png`;
      } else {
        return `${imagePath}trayt${darkModeString}${pictureNo}.png`;
      }
    }
  };

  generateNumbers = async function (color = "b", mac = "m") {
    let range = {
      from: 0,
      to: 99,
      [Symbol.iterator]() {
        this.current = this.from;
        return this;
      },

      next() {
        if (this.current <= this.to) {
          return {done: false, value: this.current++};
        } else {
          return {done: true};
        }
      },
    };

    for await (let number of range) {
      if (number < 10) {
        try {
          let img = await mergeImg([
            {src: baseImages + mac + "iconFreeSpace.png"},
            {src: baseImages + mac + number + color + ".png"},
            {src: baseImages + mac + "iconFreeSpace.png"},
          ]);
          await img.write(
            pathToImages + mac + "0" + number + color + ".png",
            () =>
              log.debug(
                "done" + pathToImages + mac + "0" + number + color + ".png"
              )
          );
        } catch (e) {
          log.debug("safely ignored error");
        }
      } else {
        try {
          let lastDigit = number % 10;
          let decimalDigit = Math.floor((number / 10) % 10);
          let img = await mergeImg([
            {src: baseImages + mac + decimalDigit + color + ".png"},
            {
              src: baseImages + mac + lastDigit + color + ".png",
            },
          ]);
          await img.write(pathToImages + mac + number + color + ".png");
        } catch (e) {
          log.debug("safely ignored error");
        }
      }
    }
  };

  generateNumbersWithTray = async function (
    color = "b",
    createdName = "traytMonochrome",
    mac = "m",
    iconPath = "/home/m/p/stretchly/app/images/app-icons/traytMonochrome.png"
  ) {
    let range = {
      from: 0,
      to: 99,
      [Symbol.iterator]() {
        this.current = this.from;
        return this;
      },

      next() {
        if (this.current <= this.to) {
          return {done: false, value: this.current++};
        } else {
          return {done: true};
        }
      },
    };

    for await (let number of range) {
      let lastDigit = number % 10;
      let decimalDigit = Math.floor((number / 10) % 10);
      let leadingZero = "";
      if (decimalDigit == 0) leadingZero = "0";
      try {
        let pictureOffset = -32;
        if (mac === "m") {
          pictureOffset = -16;
        }
        let img = await mergeImg([
          {
            src: iconPath,
          },
          {
            src: pathToImages + mac + leadingZero + number + color + ".png",
            offsetX: pictureOffset,
          },
        ]);
        await img.write(pathToImages + createdName + number + ".png");
      } catch (e) {
        log.debug(e + "safely ignored error");
      }
    }
  };

  // generateNumbersMac = async function (color = "b") {
  //   let range = {
  //     from: 0,
  //     to: 99,
  //     [Symbol.iterator]() {
  //       this.current = this.from;
  //       return this;
  //     },

  //     next() {
  //       if (this.current <= this.to) {
  //         return {done: false, value: this.current++};
  //       } else {
  //         return {done: true};
  //       }
  //     },
  //   };

  //   for await (let number of range) {
  //     if (number < 10) {
  //       try {
  //         let img = await mergeImg([
  //           {src: baseImages + "miconFreeSpace.png"},
  //           {src: baseImages + "m" + number + color + ".png"},
  //           {src: baseImages + "miconFreeSpace.png"},
  //         ]);
  //         await img.write(pathToImages + "m0" + number + color + ".png", () =>
  //           log.debug("done" + pathToImages + "m0" + number + color + ".png")
  //         );
  //         let img2 = await mergeImg([
  //           {src: imagePath},
  //           {
  //             src: pathToImages + "m0" + number + color + ".png",
  //             offsetX: -16,
  //           },
  //         ]);
  //         await img2.write(pathToImages + iconTrayFilename, () =>
  //           log.debug("done0To9Generation")
  //         );
  //       } catch (e) {
  //         log.debug("safely ignored error");
  //       }
  //     } else {
  //       try {
  //         let lastDigit = number % 10;
  //         let decimalDigit = Math.floor((number / 10) % 10);
  //         let img = await mergeImg([
  //           {src: baseImages + "m" + decimalDigit + color + ".png"},
  //           {
  //             src: baseImages + "m" + lastDigit + color + ".png",
  //           },
  //         ]);
  //         await img.write(pathToImages + "m" + number + color + ".png");
  //       } catch (e) {
  //         log.debug("safely ignored error");
  //       }
  //     }
  //   }
  // };
  //   generateNumbersWithTrayMac = async function (
  //     color = "b",
  //     createdName = "trayMacMonochrome",
  //     iconPath = "/home/m/p/stretchly/app/images/app-icons/traytMacMonochrome.png"
  //   ) {
  //     let range = {
  //       from: 0,
  //       to: 99,
  //       [Symbol.iterator]() {
  //         this.current = this.from;
  //         return this;
  //       },
  //       next() {
  //         if (this.current <= this.to) {
  //           return {done: false, value: this.current++};
  //         } else {
  //           return {done: true};
  //         }
  //       },
  //     };

  //     for await (let number of range) {
  //       let lastDigit = number % 10;
  //       let decimalDigit = Math.floor((number / 10) % 10);
  //       let leadingZero = "";
  //       if (decimalDigit == 0) leadingZero = "0";
  //       try {
  //         let img = await mergeImg([
  //           {
  //             src: iconPath,
  //           },
  //           {
  //             src: pathToImages +'m' + leadingZero + number + color + ".png",
  //             offsetX: -16,
  //           },
  //         ]);
  //         await img.write(pathToImages + createdName + number + ".png");
  //       } catch (e) {
  //         log.debug("safely ignored error");
  //       }
  //     }
  //   };

  generateCirclesWithTray = async function (
    color = "b",
    createdName = "traytMonochrome",
    mac = "m",
    iconPath = "/home/m/p/stretchly/app/images/app-icons/traytMonochrome.png"
  ) {
    let range = {
      from: 0,
      to: 61,
      [Symbol.iterator]() {
        this.current = this.from;
        return this;
      },

      next() {
        if (this.current <= this.to) {
          return {done: false, value: this.current++};
        } else {
          return {done: true};
        }
      },
    };

    for await (let number of range) {
      if(number==0 || number == 7 || number == 15 || number == 22 || number == 30 
        || number == 37 || number == 45 | number == 52 || number == 60){
      let lastDigit = number % 10;
      let decimalDigit = Math.floor((number / 10) % 10);
      let leadingZero = "";
      // if (decimalDigit == 0) leadingZero = "0";
      try {
        let pictureOffset = -32;
        if (mac === "m") {
          pictureOffset = -16;
        }
        let img = await mergeImg([
          {
            src: iconPath,
          },
          {
            src:
              pathToCircleImages + mac + leadingZero + number + color + ".png",
            offsetX: pictureOffset,
          },
        ]);
        await img.write(pathToCircleImages + createdName + number + ".png");
      } catch (e) {
        log.debug(e + "safely ignored error");
      }
    }
    }
  };
}

module.exports = TrayWithText2;
