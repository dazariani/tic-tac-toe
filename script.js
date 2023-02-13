"use strict";

// solid marks
const xMarks = document.querySelectorAll(".x-mark"); // nodelist
const oMarks = document.querySelectorAll(".o-mark"); // nodelist

// outline marks
const xOutMarks = document.querySelectorAll(".x-outline"); // nodelist
const oOutMarks = document.querySelectorAll(".o-outline"); // nodelist

const restart = document.querySelector(".restart-icon-box");
const box = document.querySelectorAll(".cell"); // nodelist

// scorebar
const playerName1 = document.querySelector(".x-name");
const playerName2 = document.querySelector(".o-name");
const xScore = document.querySelector(".x-score");
const oScore = document.querySelector(".o-score");
const tieScore = document.querySelector(".ties-score");

// new game menu
const pickXMark = document.querySelector(".x-mark-box");
const pickOMark = document.querySelector(".o-mark-box");
const cpuBtn = document.querySelector(".vs-cpu");
const playerBtn = document.querySelector(".vs-player");

const newGamePage = document.querySelector(".menu-wrapper");
const gamePage = document.querySelector(".wrapper");

const pickX = document.querySelector(".x-mark-pick");
const pickO = document.querySelector(".o-mark-pick");

// game page
const turnIconX = document.querySelector(".icon-x");
const turnIconO = document.querySelector(".icon-o");

const cellBox = document.querySelector(".board-box");

// additional windows
const winScreen = document.querySelector(".w-l-window");
const winText = document.querySelector(".win-text");
const tieScreen = document.querySelector(".tied-window");
const takeRound = document.querySelector(".round-take-text");
const w_lIconX = document.querySelector(".x");
const w_lIconO = document.querySelector(".o");

// restart window
const restScreen = document.querySelector(".restart-window");
const restBtn = document.querySelector(".restart-icon-box");
const restNoBtn = document.querySelector(".no-btn");
const restYesBtn = document.querySelector(".yes-btn");

// w-l window buttons
const wlQuit = document.querySelectorAll(".quit");
const wlNext = document.querySelectorAll(".next");

// page mask
const mask = document.querySelector(".page-mask");

let allOptions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

let allOptions2 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
// Functions
// Pick marks
let pickArrYou;
let pickArrCpu;
const markPickX = function () {
  pickArrYou = [];
  pickArrYou.push("X");
  pickArrCpu = [];
  pickArrCpu.push("O");
  //   change bg color X
  pickXMark.classList.add("bg-grey");
  pickX.classList.remove("grey-filter");
  pickX.classList.add("dark-green-filter");

  pickOMark.classList.remove("bg-grey");
  pickO.classList.remove("dark-green-filter");
  pickO.classList.add("grey-filter");
};
const markPickO = function () {
  pickArrYou = [];
  pickArrYou.push("O");
  pickArrCpu = [];
  pickArrCpu.push("X");
  //   change bg color O
  pickOMark.classList.add("bg-grey");
  pickO.classList.remove("grey-filter");
  pickO.classList.add("dark-green-filter");

  pickXMark.classList.remove("bg-grey");
  pickX.classList.remove("dark-green-filter");
  pickX.classList.add("grey-filter");
};

// when X wins
const winCaseX = function () {
  arrX.push(Number(event.target.id));
  for (let i = 0; i < allOptions.length; i++) {
    if (allOptions[i].every((num) => arrX.includes(num))) {
      cellBox.removeEventListener("mouseover", showX);
      CountX++;
      allOptions[i].forEach((elem) => {
        document
          .getElementById(`${elem}`)
          .style.setProperty("background", "var(--clr-cyan-dark)");
        document
          .getElementById(`${elem}`)
          .querySelector(".x-mark")
          .classList.remove("no-filter");
        document
          .getElementById(`${elem}`)
          .querySelector(".x-mark")
          .classList.add("dark-green-filter");
        cellBox.removeEventListener("click", playVsPlayer);
        setTimeout(winWindowX, 1000);
      });
    }
  }
};

// when O wins
const winCaseO = function () {
  arrO.push(Number(event.target.id));
  for (let i = 0; i < allOptions.length; i++) {
    if (allOptions[i].every((num) => arrO.includes(num))) {
      cellBox.removeEventListener("mouseover", showX);
      CountO++;
      allOptions[i].forEach((elem) => {
        document
          .getElementById(`${elem}`)
          .style.setProperty("background", "var(--clr-orange-dark)");
        document
          .getElementById(`${elem}`)
          .querySelector(".o-mark")
          .classList.remove("no-filter");
        document
          .getElementById(`${elem}`)
          .querySelector(".o-mark")
          .classList.add("dark-green-filter");
        cellBox.removeEventListener("click", playVsPlayer);
        setTimeout(winWindowO, 1000);
      });
    }
  }
};

// win window pop up X
const winWindowX = function () {
  winScreen.classList.remove("hidden");
  xScore.textContent = CountX;
  winText.textContent = "PLAYER 1 WINS!";
  w_lIconO.classList.add("hidden");
  w_lIconX.classList.remove("hidden");
  takeRound.style.setProperty("color", "var(--clr-cyan-dark)");
  mask.classList.remove("hidden");
};

// win window pop up O
const winWindowO = function () {
  winScreen.classList.remove("hidden");
  oScore.textContent = CountO;
  winText.textContent = "PLAYER 2 WINS!";
  w_lIconX.classList.add("hidden");
  w_lIconO.classList.remove("hidden");
  takeRound.style.setProperty("color", "var(--clr-orange-dark)");
  mask.classList.remove("hidden");
};

// tie window pop up
let localTieCount = 0;
const tieWindow = function () {
  for (let i = 0; i < allOptions.length; i++) {
    if (
      arrX.length + arrO.length == box.length &&
      !allOptions2[i].every((num) => arrX.includes(num))
    ) {
      localTieCount++;
    }
  }
  if (localTieCount == 8) {
    tieCount++;
    setTimeout(setTieTime, 1000);
  }
};

// settimer function for tie window
const setTieTime = function () {
  tieScreen.classList.remove("hidden");
  mask.classList.remove("hidden");
  tieScore.textContent = tieCount;
  cellBox.removeEventListener("click", playVsPlayer);
};

// quit game from w-l screen (return to new game window)
const wlQuitGame = function (event) {
  gamePage.classList.add("hidden");
  mask.classList.add("hidden");
  winScreen.classList.add("hidden");
  tieScreen.classList.add("hidden");
  newGamePage.classList.remove("hidden");
  if (gameType === "cpu") {
    wlGameUiUpdateCpu();
  } else {
    wlGameUiUpdate();
  }
};

// update UI of game screen (quit)
const wlGameUiUpdate = function () {
  pickArrYou = undefined;
  pickArrCpu = undefined;
  gameType = "";
  arrX = [];
  arrO = [];
  CountX = 0;
  CountO = 0;
  tieCount = 0;
  markOn = "x";
  localTieCount = 0;
  xScore.textContent = CountX;
  oScore.textContent = CountO;
  tieScore.textContent = tieCount;

  pickXMark.classList.remove("bg-grey");
  pickOMark.classList.remove("bg-grey");
  pickX.classList.add("grey-filter");
  pickO.classList.add("grey-filter");

  pickXMark.addEventListener("click", markPickX);
  pickOMark.addEventListener("click", markPickO);
  cellBox.addEventListener("click", playVsPlayer);

  box.forEach((c) =>
    c.style.setProperty("background", "var(--clr-dark-green)")
  );
  xMarks.forEach((x) => {
    x.classList.add("no-filter");
    x.classList.add("hidden");
  });
  oMarks.forEach((o) => {
    o.classList.add("no-filter");
    o.classList.add("hidden");
  });
};

// next round from w-l screen
const wlNextRound = function () {
  winScreen.classList.add("hidden");
  mask.classList.add("hidden");
  tieScreen.classList.add("hidden");
  turnIconX.classList.remove("hidden");
  turnIconO.classList.add("hidden");
  arrX = [];
  arrO = [];
  markOn = "x";
  localTieCount = 0;

  rendomCount = [];

  allOptions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  if (gameType == "cpu" && pickArrYou[0] == "O") {
    cpuStartRandomActionsX();
  }
  cellBox.addEventListener("click", playVsPlayer);
  cellBox.addEventListener("click", playVsCpu);

  box.forEach((c) =>
    c.style.setProperty("background", "var(--clr-dark-green)")
  );
  xMarks.forEach((x) => {
    x.classList.add("no-filter");
    x.classList.add("hidden");
  });
  oMarks.forEach((o) => {
    o.classList.add("no-filter");
    o.classList.add("hidden");
  });
};

// restart game screen pop up
const restartWindow = function () {
  mask.classList.remove("hidden");
  restScreen.classList.remove("hidden");
};

// restart NO button actioons
const restNo = function () {
  mask.classList.add("hidden");
  restScreen.classList.add("hidden");
};

// restart YES button actioons
const restYes = function () {
  arrX = [];
  arrO = [];
  rendomCount = [];
  markOn = "x";
  allOptions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  if (gameType == "cpu" && pickArrYou[0] == "O") {
    cpuStartRandomActionsX();
  }
  box.forEach((c) =>
    c.style.setProperty("background", "var(--clr-dark-green)")
  );
  xMarks.forEach((x) => {
    x.classList.add("no-filter");
    x.classList.add("hidden");
  });
  oMarks.forEach((o) => {
    o.classList.add("no-filter");
    o.classList.add("hidden");
  });
  restNo();
  turnIconX.classList.remove("hidden");
  turnIconO.classList.add("hidden");
  cellBox.addEventListener("click", playVsCpu);
};

// Go to game page vs cpu
let gameType;
const pageVsCpu = function () {
  if (pickArrYou !== undefined) {
    gamePage.classList.remove("hidden");
    newGamePage.classList.add("hidden");
    // score bar
    if (pickArrYou[0] == "X") {
      playerName1.textContent = `${pickArrYou[0]}(YOU)`;
      playerName2.textContent = `${pickArrCpu[0]}(CPU)`;
    } else {
      playerName1.textContent = `${pickArrCpu[0]}(CPU)`;
      playerName2.textContent = `${pickArrYou[0]}(YOU)`;
    }
    gameType = "cpu";
  } else {
    alert("Pick Mark");
  }
};

// Go to game page vs player
const pageVsPlayer = function () {
  if (pickArrYou !== undefined) {
    gamePage.classList.remove("hidden");
    newGamePage.classList.add("hidden");

    if (pickArrYou[0] == "X") {
      playerName1.textContent = `${pickArrYou[0]}(P1)`;
      playerName2.textContent = `${pickArrCpu[0]}(P2)`;
    } else {
      playerName1.textContent = `${pickArrCpu[0]}(P2)`;
      playerName2.textContent = `${pickArrYou[0]}(P1)`;
    }
    gameType = "player";
  } else {
    alert("Pick Mark");
  }
};

// play vs player prossess
const playVsPlayer = function (event) {
  if (gameType == "player") {
    if (
      (markOn == "x" && event.target.classList.contains("cell")) ||
      event.target.classList.contains("x-outline")
    ) {
      // show X when clicked
      let curMark = event.target.querySelector(`.x-mark`);
      let nextMark = event.target.querySelector(`.o-mark`);
      let outlineX = event.target.querySelector(`.x-outline`);
      if (
        curMark &&
        curMark.classList.contains("hidden") &&
        nextMark &&
        nextMark.classList.contains("hidden")
      ) {
        if (screen.width >= "1440") {
          outlineX.classList.add("hidden");
        }
        curMark.classList.remove("hidden");

        // when round is won by X
        winCaseX();
        // when round is tied
        tieWindow();

        // switch turn
        markOn = "o";
        turnIconX.classList.add("hidden");
        turnIconO.classList.remove("hidden");
      }

      // cellBox.removeEventListener("mouseover", showX);
      // cellBox.removeEventListener("mouseout", hideX);
    } else if (markOn == "o" && event.target.classList.contains("cell")) {
      // show O when clicked
      let curMark = event.target.querySelector(`.o-mark`);
      let nextMark = event.target.querySelector(`.x-mark`);
      let outlineO = event.target.querySelector(`.o-outline`);
      if (
        curMark &&
        curMark.classList.contains("hidden") &&
        nextMark &&
        nextMark.classList.contains("hidden")
      ) {
        if (screen.width >= "1440") {
          outlineO.classList.add("hidden");
        }
        curMark.classList.remove("hidden");

        // when round is won by O
        winCaseO();

        // switch turn
        markOn = "x";
        turnIconX.classList.remove("hidden");
        turnIconO.classList.add("hidden");
      }
    }
  }
};

// <<<<<<<<<< VS PLAYER END>>>>>>>>>>>
// <<<<<<<<<< VS CPU START>>>>>>>>>>>
// functions

// when X wins CPU
const winCaseXCpu = function () {
  //   arrX.push(Number(event.target.id));
  for (let i = 0; i < allOptions2.length; i++) {
    if (allOptions2[i].every((num) => arrX.includes(num))) {
      clearTimeout(cpuActionsO);
      cellBox.removeEventListener("click", playVsCpu);
      cellBox.removeEventListener("mouseover", showX);
      CountX++;
      allOptions2[i].forEach((elem) => {
        document
          .getElementById(`${elem}`)
          .style.setProperty("background", "var(--clr-cyan-dark)");
        document
          .getElementById(`${elem}`)
          .querySelector(".x-mark")
          .classList.remove("no-filter");
        document
          .getElementById(`${elem}`)
          .querySelector(".x-mark")
          .classList.add("dark-green-filter");
        setTimeout(winWindowXCpu, 1000);
      });
    }
  }
};

// when O wins CPU
const winCaseOCpu = function () {
  //   arrO.push(Number(event.target.id));
  for (let i = 0; i < allOptions2.length; i++) {
    if (allOptions2[i].every((num) => arrO.includes(num))) {
      clearTimeout(cpuActionsX);
      cellBox.removeEventListener("mouseover", showX);
      cellBox.removeEventListener("click", playVsCpu);
      CountO++;
      allOptions2[i].forEach((elem) => {
        document
          .getElementById(`${elem}`)
          .style.setProperty("background", "var(--clr-orange-dark)");
        document
          .getElementById(`${elem}`)
          .querySelector(".o-mark")
          .classList.remove("no-filter");
        document
          .getElementById(`${elem}`)
          .querySelector(".o-mark")
          .classList.add("dark-green-filter");
        setTimeout(winWindowOCpu, 1000);
      });
    }
  }
};

// win window pop up X CPU
const winWindowXCpu = function () {
  winScreen.classList.remove("hidden");
  xScore.textContent = CountX;
  winText.textContent = pickArrYou[0] == "X" ? "YOU WON!" : "OH NO, YOU LOST…";
  w_lIconO.classList.add("hidden");
  w_lIconX.classList.remove("hidden");
  takeRound.style.setProperty("color", "var(--clr-cyan-dark)");
  mask.classList.remove("hidden");
};

// win window pop up O CPU
const winWindowOCpu = function () {
  winScreen.classList.remove("hidden");
  oScore.textContent = CountO;
  winText.textContent = pickArrYou[0] == "O" ? "YOU WON!" : "OH NO, YOU LOST…";
  w_lIconX.classList.add("hidden");
  w_lIconO.classList.remove("hidden");
  takeRound.style.setProperty("color", "var(--clr-orange-dark)");
  mask.classList.remove("hidden");
};

// update UI of game screen CPU (quit)
const wlGameUiUpdateCpu = function () {
  pickArrYou = undefined;
  pickArrCpu = undefined;
  gameType = "";
  arrX = [];
  arrO = [];
  CountX = 0;
  CountO = 0;
  tieCount = 0;
  markOn = "x";
  localTieCount = 0;

  rendomCount = [];

  allOptions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  xScore.textContent = CountX;
  oScore.textContent = CountO;
  tieScore.textContent = tieCount;

  pickXMark.classList.remove("bg-grey");
  pickOMark.classList.remove("bg-grey");
  pickX.classList.add("grey-filter");
  pickO.classList.add("grey-filter");

  pickXMark.addEventListener("click", markPickX);
  pickOMark.addEventListener("click", markPickO);
  cellBox.addEventListener("click", playVsCpu);

  box.forEach((c) =>
    c.style.setProperty("background", "var(--clr-dark-green)")
  );
  xMarks.forEach((x) => {
    x.classList.add("no-filter");
    x.classList.add("hidden");
  });
  oMarks.forEach((o) => {
    o.classList.add("no-filter");
    o.classList.add("hidden");
  });
};

// random actions of cpu O
const cpuRandomActionsO = function () {
  if (arrX.length + arrO.length >= 9) {
    return;
  }
  let currentCell = document.getElementById(
    `${Math.floor(Math.random() * 9) + 1}`
  );
  let currentMarkX = currentCell.querySelector(".x-mark");
  let currentMarkO = currentCell.querySelector(".o-mark");
  if (
    currentMarkX.classList.contains("hidden") &&
    currentMarkO.classList.contains("hidden")
  ) {
    currentMarkO.classList.remove("hidden");
    arrO.push(Number(currentCell.id));
    for (let i = 0; i < allOptions.length; i++) {
      if (
        allOptions[i] !== null &&
        allOptions[i].includes(Number(currentCell.id))
      ) {
        allOptions[i] = null;
      }
    }
  } else {
    cpuRandomActionsO();
  }
  // switch turn
  markOn = "x";
  turnIconX.classList.remove("hidden");
  turnIconO.classList.add("hidden");
};

// O actions when X is picked
const cpuTargetActionsO = function () {
  let tempArr = [];
  let tempArr2 = [];
  let filteredArr = [];
  let filteredArr2 = [];
  let target;
  let targetInd;
  let target2;
  let targetInd2;
  //   center O conditions
  let centerOTactics =
    (arrX.length == 1 && arrX[0] == 1) ||
    (arrX.length == 1 && arrX[0] == 3) ||
    (arrX.length == 1 && arrX[0] == 7) ||
    (arrX.length == 1 && arrX[0] == 9);
  // corner O conditions
  let cornerrOTactics = arrX.length == 1 && arrX[0] == 5;
  let cornerrOTacticsArr = [1, 3, 7, 9];

  //  O defensive tactics  <<<<<<<<<<<
  const defenceO = function () {
    // X in center tactics
    let randomCorner = Math.floor(Math.random() * 3);
    if (cornerrOTactics) {
      document
        .getElementById(`${cornerrOTacticsArr[randomCorner]}`)
        .querySelector(".o-mark")
        .classList.remove("hidden");
      arrO.push(cornerrOTacticsArr[randomCorner]);

      for (let i = 0; i < allOptions.length; i++) {
        if (
          allOptions[i] !== null &&
          allOptions[i].includes(cornerrOTacticsArr[randomCorner])
        ) {
          allOptions[i] = null;
        }
      }
      // switch turn
      markOn = "x";
      turnIconX.classList.remove("hidden");
      turnIconO.classList.add("hidden");
    }

    // X in corner tactics
    if (centerOTactics) {
      document
        .getElementById(`5`)
        .querySelector(".o-mark")
        .classList.remove("hidden");
      arrO.push(5);

      for (let i = 0; i < allOptions.length; i++) {
        if (allOptions[i] !== null && allOptions[i].includes(5)) {
          allOptions[i] = null;
        }
      }
      // switch turn
      markOn = "x";
      turnIconX.classList.remove("hidden");
      turnIconO.classList.add("hidden");
    }
    // two X to lock with O tactics
    for (let i = 0; i < allOptions.length; i++) {
      if (rendomCount.length >= 2 && allOptions[i] !== null) {
        for (let j = 0; j < allOptions[i].length; j++) {
          if (!rendomCount.includes(allOptions[i][j])) {
            tempArr.push(allOptions[i]);
            tempArr.push(j);
            tempArr.push(i);
          }
        }
      }
    }

    for (let j = 0; j < tempArr.length; j += 3) {
      if (tempArr[j] !== tempArr[j + 3] && tempArr[j] !== tempArr[j - 3]) {
        filteredArr.push(tempArr[j], tempArr[j + 1], tempArr[j + 2]);
      }
    }

    if (filteredArr[0] && arrX < 5) {
      for (let i = 0; i < arrO.length; i++) {
        if (filteredArr[0].includes(arrO[i])) {
          filteredArr.splice(0, 3);
        }
      }
    }
    target = filteredArr[0];
    targetInd = filteredArr[1];

    if (target !== undefined && arrX.length + arrO.length < 9) {
      document
        .getElementById(`${target[targetInd]}`)
        .querySelector(".o-mark")
        .classList.remove("hidden");
      arrO.push(target[targetInd]);

      for (let i = 0; i < allOptions.length; i++) {
        if (
          allOptions[i] !== null &&
          allOptions[i].includes(target[targetInd])
        ) {
          allOptions[i] = null;
        }
      }

      // switch turn
      markOn = "x";
      turnIconX.classList.remove("hidden");
      turnIconO.classList.add("hidden");
    } else {
      if (arrO.length <= 4 && !centerOTactics && !cornerrOTactics) {
        cpuRandomActionsO();
      } else null;
    }
  };

  //   O offensive tactics
  //  two O to end up with third O tactics
  for (let i = 0; i < allOptions2.length; i++) {
    if (arrO.length >= 2 && allOptions2[i] !== null) {
      for (let j = 0; j < allOptions2[i].length; j++) {
        if (!arrO.includes(allOptions2[i][j])) {
          tempArr2.push(allOptions2[i]);
          tempArr2.push(j);
          tempArr2.push(i);
        }
      }
    }
  }

  for (let j = 0; j < tempArr2.length; j += 3) {
    if (tempArr2[j] !== tempArr2[j + 3] && tempArr2[j] !== tempArr2[j - 3]) {
      filteredArr2.push(tempArr2[j], tempArr2[j + 1], tempArr2[j + 2]);
    }
  }

  if (filteredArr2[0] && arrO < 4) {
    for (let i = 0; i < arrX.length; i++) {
      if (filteredArr2[0].includes(arrX[i])) {
        filteredArr2.splice(0, 3);
      }
    }
  }

  if (arrO.length >= 2 && filteredArr2 !== []) {
    target2 = filteredArr2[0];
    targetInd2 = filteredArr2[1];

    if (
      target2 !== undefined &&
      arrX.length + arrO.length < 9 &&
      document
        .getElementById(`${target2[targetInd2]}`)
        .querySelector(".x-mark")
        .classList.contains("hidden")
    ) {
      document
        .getElementById(`${target2[targetInd2]}`)
        .querySelector(".o-mark")
        .classList.remove("hidden");

      arrO.push(target2[targetInd2]);

      // switch turn
      markOn = "x";
      turnIconX.classList.remove("hidden");
      turnIconO.classList.add("hidden");
    } else {
      //  O defensive tactics
      defenceO();
    }
  } else {
    //  O defensive tactics
    defenceO();
  }
  winCaseOCpu();
};

// ----------------- X actions ---------------------- //
// starting random action X
const cpuStartRandomXTimer = function () {
  if (pickArrYou[0] == "O" && gameType == "cpu") {
    let currentCell = document.getElementById(
      `${Math.floor(Math.random() * 9) + 1}`
    );
    let currentMarkX = currentCell.querySelector(".x-mark");
    currentMarkX.classList.remove("hidden");
    arrX.push(Number(currentCell.id));
    for (let i = 0; i < allOptions.length; i++) {
      if (
        allOptions[i] !== null &&
        allOptions[i].includes(Number(currentCell.id))
      ) {
        allOptions[i] = null;
      }
    }

    // switch turn
    markOn = "o";
    turnIconX.classList.add("hidden");
    turnIconO.classList.remove("hidden");
  }
};

// Timer of starting random action X
const cpuStartRandomActionsX = function () {
  setTimeout(cpuStartRandomXTimer, 700);
};

// random actions of cpu X
const cpuRandomActionsX = function () {
  if (arrX.length + arrO.length >= 9) {
    return;
  }
  let currentCell = document.getElementById(
    `${Math.floor(Math.random() * 9) + 1}`
  );
  let currentMarkX = currentCell.querySelector(".x-mark");
  let currentMarkO = currentCell.querySelector(".o-mark");
  if (
    currentMarkX.classList.contains("hidden") &&
    currentMarkO.classList.contains("hidden")
  ) {
    currentMarkX.classList.remove("hidden");
    arrX.push(Number(currentCell.id));
    for (let i = 0; i < allOptions.length; i++) {
      if (
        allOptions[i] !== null &&
        allOptions[i].includes(Number(currentCell.id))
      ) {
        allOptions[i] = null;
      }
    }
  } else {
    cpuRandomActionsX();
  }
  // switch turn
  markOn = "o";
  turnIconX.classList.add("hidden");
  turnIconO.classList.remove("hidden");
};

// X actions in game prossess
const cpuTargetActionsX = function () {
  // defence tactics
  let tempArrO = [];
  let tempArrO2 = [];
  let filteredArrO = [];
  let filteredArrO2 = [];
  let targetO;
  let targetIndO;
  let targetO2;
  let targetIndO2;

  // two O to lock with X tactics
  const defenceX = function () {
    for (let i = 0; i < allOptions.length; i++) {
      if (arrO.length >= 2 && allOptions[i] !== null) {
        for (let j = 0; j < allOptions[i].length; j++) {
          if (!arrO.includes(allOptions[i][j])) {
            tempArrO.push(allOptions[i]);
            tempArrO.push(j);
            tempArrO.push(i);
          }
        }
      }
    }

    for (let j = 0; j < tempArrO.length; j += 3) {
      if (tempArrO[j] !== tempArrO[j + 3] && tempArrO[j] !== tempArrO[j - 3]) {
        filteredArrO.push(tempArrO[j], tempArrO[j + 1], tempArrO[j + 2]);
      }
    }

    if (filteredArrO[0] && arrO < 4) {
      for (let i = 0; i < arrX.length; i++) {
        if (filteredArrO[0].includes(arrX[i])) {
          filteredArrO.splice(0, 3);
        }
      }
    }
    targetO = filteredArrO[0];
    targetIndO = filteredArrO[1];

    if (targetO !== undefined && arrX.length + arrO.length < 9) {
      document
        .getElementById(`${targetO[targetIndO]}`)
        .querySelector(".x-mark")
        .classList.remove("hidden");

      arrX.push(targetO[targetIndO]);

      for (let i = 0; i < allOptions.length; i++) {
        if (
          allOptions[i] !== null &&
          allOptions[i].includes(targetO[targetIndO])
        ) {
          allOptions[i] = null;
        }
      }

      // switch turn
      markOn = "o";
      turnIconX.classList.add("hidden");
      turnIconO.classList.remove("hidden");
    } else {
      if (arrX.length < 5) {
        // random actions X
        cpuRandomActionsX();
      } else null;
    }
  };

  //   X offensive tactics
  //  two X to end up with third X tactics

  for (let i = 0; i < allOptions2.length; i++) {
    if (arrX.length >= 2 && allOptions2[i] !== null) {
      for (let j = 0; j < allOptions2[i].length; j++) {
        if (!arrX.includes(allOptions2[i][j])) {
          tempArrO2.push(allOptions2[i]);
          tempArrO2.push(j);
          tempArrO2.push(i);
        }
      }
    }
  }

  for (let j = 0; j < tempArrO2.length; j += 3) {
    if (
      tempArrO2[j] !== tempArrO2[j + 3] &&
      tempArrO2[j] !== tempArrO2[j - 3]
    ) {
      filteredArrO2.push(tempArrO2[j], tempArrO2[j + 1], tempArrO2[j + 2]);
    }
  }

  const filter = function () {
    if (filteredArrO[0] && arrO < 4) {
      for (let i = 0; i < arrO.length; i++) {
        if (filteredArrO2[0].includes(arrO[i])) {
          filteredArrO2.splice(0, 3);
        }
      }
    }
  };
  filter();

  if (arrX.length >= 2 && filteredArrO2 !== []) {
    targetO2 = filteredArrO2[0];
    targetIndO2 = filteredArrO2[1];

    if (
      targetO2 !== undefined &&
      arrX.length + arrO.length < 9 &&
      document
        .getElementById(`${targetO2[targetIndO2]}`)
        .querySelector(".x-mark")
        .classList.contains("hidden") &&
      document
        .getElementById(`${targetO2[targetIndO2]}`)
        .querySelector(".o-mark")
        .classList.contains("hidden")
    ) {
      document
        .getElementById(`${targetO2[targetIndO2]}`)
        .querySelector(".x-mark")
        .classList.remove("hidden");

      arrX.push(targetO2[targetIndO2]);

      // switch turn
      markOn = "o";
      turnIconX.classList.add("hidden");
      turnIconO.classList.remove("hidden");
    } else {
      //  O defensive tactics
      defenceX();
    }
  } else {
    //  O defensive tactics
    defenceX();
  }
  winCaseXCpu();
  tieWindow();
};

// Hover func
const showX = function (event) {
  // vs player mode
  if (screen.width >= "1440" && gameType == "player") {
    if (markOn == "x") {
      if (
        event.target.classList.contains("cell") &&
        event.target.querySelector(".x-mark").classList.contains("hidden") &&
        event.target.querySelector(".o-mark").classList.contains("hidden")
      ) {
        event.target.querySelector(".x-outline").classList.remove("hidden");
      }
    }

    if (markOn == "o") {
      if (
        event.target.classList.contains("cell") &&
        event.target.querySelector(".x-mark").classList.contains("hidden") &&
        event.target.querySelector(".o-mark").classList.contains("hidden")
      ) {
        event.target.querySelector(".o-outline").classList.remove("hidden");
      }
    }
  }
  //  vs CPU mode
  // X is picked
  if (screen.width >= "1440" && gameType == "cpu") {
    if (pickArrYou[0] == "X" && markOn == "x") {
      if (
        event.target.classList.contains("cell") &&
        event.target.querySelector(".x-mark").classList.contains("hidden") &&
        event.target.querySelector(".o-mark").classList.contains("hidden")
      ) {
        event.target.querySelector(".x-outline").classList.remove("hidden");
      }
    }
  }

  // O is picked
  if (screen.width >= "1440" && gameType == "cpu") {
    if (pickArrYou[0] == "O" && markOn == "o") {
      if (
        event.target.classList.contains("cell") &&
        event.target.querySelector(".x-mark").classList.contains("hidden") &&
        event.target.querySelector(".o-mark").classList.contains("hidden")
      ) {
        event.target.querySelector(".o-outline").classList.remove("hidden");
      }
    }
  }
};

const hideX = function (event) {
  if (event.target.classList.contains("cell")) {
    event.target.querySelector(".x-outline").classList.add("hidden");
    event.target.querySelector(".o-outline").classList.add("hidden");
  }
};

// play vs cpu prossess
let cpuActionsO;
let cpuActionsX;
let rendomCount = [];
const playVsCpu = function (event) {
  if (
    gameType == "cpu" &&
    event.target.querySelector(".x-mark") !== null &&
    event.target.querySelector(".o-mark") !== null &&
    event.target.querySelector(".x-mark").classList.contains("hidden") &&
    event.target.querySelector(".o-mark").classList.contains("hidden")
  ) {
    if (markOn == "x" && event.target.classList.contains("cell")) {
      if (pickArrYou[0] == "X") {
        cpuActionsO = setTimeout(cpuTargetActionsO, 700);
        arrX.push(Number(event.target.id));
        rendomCount.push(Number(event.target.id));
        // show X when clicked
        let curMark = event.target.querySelector(`.x-mark`);
        let nextMark = event.target.querySelector(`.o-mark`);
        let outlineX = event.target.querySelector(`.x-outline`);
        if (
          curMark &&
          curMark.classList.contains("hidden") &&
          nextMark &&
          nextMark.classList.contains("hidden")
        ) {
          if (screen.width >= "1440") {
            outlineX.classList.add("hidden");
          }
          curMark.classList.remove("hidden");

          winCaseXCpu();

          tieWindow();

          // switch turn
          markOn = "o";
          turnIconX.classList.add("hidden");
          turnIconO.classList.remove("hidden");
        }

        cpuActionsO;
      }
    }
    // When O is picked
    if (markOn == "o" && event.target.classList.contains("cell")) {
      if (pickArrYou[0] == "O") {
        // rendomCount.push(Number(event.target.id));
        cpuActionsX = setTimeout(cpuTargetActionsX, 700);
        arrO.push(Number(event.target.id));

        // show X when clicked
        let curMark = event.target.querySelector(`.o-mark`);
        let nextMark = event.target.querySelector(`.x-mark`);
        let outlineO = event.target.querySelector(`.o-outline`);
        if (
          curMark &&
          curMark.classList.contains("hidden") &&
          nextMark &&
          nextMark.classList.contains("hidden")
        ) {
          if (screen.width >= "1440") {
            outlineO.classList.add("hidden");
          }
          curMark.classList.remove("hidden");

          // switch turn
          markOn = "x";
          turnIconX.classList.remove("hidden");
          turnIconO.classList.add("hidden");
        }
        cpuActionsX;
        winCaseOCpu();
      }
    }
  }
};

// ========= CODE =========

// save mark in array when clicked (picked)
pickXMark.addEventListener("click", markPickX);
pickOMark.addEventListener("click", markPickO);

// Go to game page vs cpu
cpuBtn.addEventListener("click", pageVsCpu);

// Go to game page vs player
playerBtn.addEventListener("click", pageVsPlayer);

// Game vs player proccess
let markOn = "x";
let arrX = [];
let arrO = [];
let CountX = 0;
let CountO = 0;
let tieCount = 0;
cellBox.addEventListener("mousedown", (event) => {
  if (event.target.classList.contains("x-outline")) {
    event.target.classList.add("hidden");
  }
  if (event.target.classList.contains("o-outline")) {
    event.target.classList.add("hidden");
  }
});
cellBox.addEventListener("click", playVsPlayer);
wlQuit.forEach((quit) => quit.addEventListener("click", wlQuitGame));
wlNext.forEach((next) => next.addEventListener("click", wlNextRound));
restBtn.addEventListener("click", restartWindow);
restNoBtn.addEventListener("click", restNo);
restYesBtn.addEventListener("click", restYes);

// <<<<<<<<<<<<<>>>>>>>>>>>>>>
// Game vs CPU proccess
// When X is picked
cellBox.addEventListener("click", playVsCpu);

//  When O is picked
cpuBtn.addEventListener("click", cpuStartRandomActionsX);
// display outline marks on hover
cellBox.addEventListener("mouseover", showX);
cellBox.addEventListener("mouseout", hideX);
