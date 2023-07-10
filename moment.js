let date = new Date();

const month = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentabr",
  "Oktabr",
  "Noyabr",
  "Dekabr",
];
const day = [
  "Dushanba",
  "Seyshanba",
  "Chorshanba",
  "Payshanba",
  "Juma",
  "Shanba",
  "Yakshanba",
];

let hur = date.getHours();
let min = date.getMinutes();
let setMin =
  date.getMinutes() - 10 <= 0 ? `0${date.getMinutes()}` : date.getMinutes();
let sec = date.getSeconds();
let setSec =
  date.getSeconds() - 10 <= 0 ? `0${date.getSeconds()}` : date.getSeconds();
let timeZon = date.getTimezoneOffset();
let week = date.getDay();
let mnth =
  `${date.getMonth() + 1}`.length === 1
    ? `0${date.getMonth() + 1}`
    : date.getMonth() + 1;
let dat =
  `${date.getDate()}`.length === 1 ? `0${date.getDate()}` : date.getDate();
let year = date.getFullYear();

setInterval(() => {
  document.querySelector(".code-one").innerHTML = `<span>// ${
    month[date.getMonth()]
  } ${dat}th  ${year},  ${min === 60 ? (hur += 1) : hur}:${
    sec === 60 ? (min += 1) : min
  }:${sec === 60 ? (sec = 0) : (sec += 1)}  am</span>`;

  document.querySelector(".code-two").innerHTML = `<span>// ${
    day[date.getDay() - 1]
  }</span>`;

  document.querySelector(".code-there").innerHTML = `<span>// ${`${
    month[date.getMonth()]
  }`.slice(0, 3)} ${dat}th  ${`${year}`.slice(2, 4)} 
</span>`;
  document.querySelector(
    ".code-four"
  ).innerHTML = `<span>// ${date.getFullYear()}  [escaped]  ${date.getFullYear()}
  </span>`;
  document.querySelector(
    ".code-five"
  ).innerHTML = `<span>// ${year}-${mnth}-${week}T${
    min === 60 ? (hur += 1) : hur
  }:${sec === 60 ? (min += 1) : min}:${sec === 60 ? (sec = 0) : (sec += 1)} ${
    `${timeZon}`.includes("-")
      ? `+${-Math.trunc(timeZon / 60)}:${
          Math.trunc(timeZon % 60) === 0 ? "00" : Math.trunc(timeZon % 60)
        }`
      : `-${Math.trunc(timeZon / 60)}:${
          Math.trunc(timeZon % 60) === 0 ? "00" : Math.trunc(timeZon % 60)
        }`
  }
  </span>`;
  // ===============
}, 1000);

const moment = () => {
  let momentInfo = {
    MMMM: month[date.getMonth()],
    MMM: `${`${month[date.getMonth()]}`.slice(0, 3)}`,
    Do: `${dat}th`,
    YYYY: year,
    YY: `${`${year}`.slice(2, 4)}`,
    h: hur,
    mm: setMin,
    ss: setSec,
    "h:mm:ss": `${hur}:${setMin}:${setSec}`,
    a: "pm",
    dddd: day[date.getDay() - 1],
    LT: `${hur}:${setMin} PM`,
    LTS: `${hur}:${setMin}:${setSec} PM`,
    L: `${dat}/${mnth}/${year}`,
    l: `${date.getDate()}/${mnth}/${year}`,
    LL: `${month[date.getMonth()]} ${dat}, ${year}`,
    ll: `${`${month[date.getMonth()]}`.slice(0, 3)} ${dat}, ${year}`,
    LLL: `${month[date.getMonth()]} ${dat}, ${year} ${hur}:${setMin} PM`,
    lll: `${`${month[date.getMonth()]}`.slice(
      0,
      3
    )}  ${dat}, ${year}   ${hur}:${setMin} PM`,
    LLLL: `${day[date.getDay() - 1]} ${`${
      month[date.getMonth()]
    }`}  ${dat}, ${year}  ${hur}:${setMin} PM`,
    llll: `${day[date.getDay() - 1].slice(0, 3)} ${`${
      month[date.getMonth()]
    }`.slice(0, 4)} ${dat}, ${year} ${hur}:${setMin} PM`,
  };
  return {
    format(key) {
      let arr = key?.split(" ");
      let res = "";
      if (arr) {
        arr?.forEach((value) => {
          if (value.includes(",")) {
            let valRes = value.replace(",", "");
            res += `${momentInfo[valRes]}, `;
          } else if (value.includes("]")) {
            res += value.replace("]", "] ");
          } else if (momentInfo[value]) {
            res += `${momentInfo[value]} `;
          }
          return res;
        });
        return res;
      } else return date;
    },
    locale() {
      return `en`;
    },
    subtract(num, keyNum) {
      return {
        calendar() {
          if (num && keyNum) {
            if (num === 1) {
              return `Yesterday at ${hur}:${min} PM`;
            } else if (num >= 6 && dat - num > 0) {
              return `${mnth}/${dat - num}/${year}`;
            } else if (num >= 6 && dat - num < 0) {
              return `${mnth - Math.ceil(-(dat - num) / 30)}/${
                30 + dat - num
              }/${year}`;
            } else {
              return `Last at ${day[6 - num]} at ${hur}:${min} PM`;
            }
          }
        },
      };
    },
    calendar() {
      return `Today at ${momentInfo["h"]}:${momentInfo["mm"]}`;
    },
    add(num, keyNum) {
      return {
        calendar() {
          if (num && keyNum) {
            if (num === 1) {
              return `Tomorrow at ${hur}:${min} PM`;
            } else if (num >= 6 && dat + num < 30) {
              return `${mnth}/${dat + num}/${year}`;
            } else if (num >= 6 && dat + num > 30) {
              return `${mnth + Math.trunc((dat + num) / 30)}/${
                dat + num - 30
              }/${year}`;
            } else {
              return `Last at ${day[week + num]} at ${hur}:${min} PM`;
            }
          }
        },
      };
    },
  };
};

console.log(moment().locale());
console.log(moment().format("LT"));
console.log(moment().format("LTS"));
console.log(moment().format("L"));
console.log(moment().format("l"));
console.log(moment().format("LL"));
console.log(moment().format("ll"));
console.log(moment().format("LLL"));
console.log(moment().format("lll"));
console.log(moment().format("LLLL"));
console.log(moment().format("llll"));

// let sc = date.getSeconds();
// setInterval(() => {
//   console.log(sc);
//   document.querySelector(".time").innerHTML = `<span>${(sc += 1)}</span>`;
// }, 1000);

// console.log((date.getTime() - 20111031) / 365 / 24 / 60 / 60 / 100);

// console.log(date.getTimezoneOffset());
// console.log(date.getDate());
