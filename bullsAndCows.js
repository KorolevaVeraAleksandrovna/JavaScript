//Компьютер загадывает число из нескольких различающихся цифр (от 3 до 6).
//Игроку дается несколько попыток на то, чтобы угадать это число.
//После каждой попытки компьютер сообщает количество совпавших цифр стоящих не на своих местах,
//а также количество правильных цифр на своих местах.
//Например загаданное число: 56478 предположение игрока: 52976
//ответ: совпавших цифр не на своих местах - 1 (6), цифр на своих местах - 2 (5 и 7)
//игра ведется до окончания количества ходов либо до отгадывания
"use strict";

let num = "";
let lengthOfNum = readlineSync.question("Choose the difficultly level (from 3 to 6): ");
let numOfTries = Math.ceil(lengthOfNum * 1.5);
let guess;
let currentTry = 1;
let onPlace = [];
let notOnPlace = [];

function genTheNum(length) {
  while(length !== 0) {
    let digit = Math.floor(Math.random() * 10);
    if (num.includes(digit)) {
      digit = Math.floor(Math.random() * 10);
    } else {
      num = num + digit;
      length-=1;
    }
  }
  return num;
} // return: str
function tryHandler(num, someTry) {
  for (let i = 0; i < someTry.length; i++) {
    let tryDigit = someTry[i];
    for (let j = 0; j < num.length; j++) {
      let numDigit = num[j];
      if (tryDigit == numDigit && i == j) {
        onPlace.push(tryDigit);
      } else if (tryDigit == numDigit && i !== j) {
        notOnPlace.push(tryDigit);
      } else continue;
    }
  }
}

let number = genTheNum(lengthOfNum);

console.log(`You have ${numOfTries} tries to guess the number.\n Let get started!`);

while (numOfTries !== 0) {
  guess = readlineSync.question(`Entre your guess #${currentTry}: `);
  let result = tryHandler(number, guess);
  console.log(`Digits on their place(${onPlace.length}): ${onPlace}`);
  console.log(`Digits not on their place(${notOnPlace.length}): ${notOnPlace}`);
  currentTry +=1;
  numOfTries -=1;
  if (onPlace.length == number.length) {
    console.log("Congratulations!!! YOU WIN!");
    break;
    } else if (numOfTries == 0) {
      console.log(`OH, you should pump your brains to win next time :D\n
                   The hidden number${number}`);
    } else {
    onPlace = [];
    notOnPlace = [];
    }
}


