//Боевой маг Евстафий сражается с лютым монстром.
//Бой идет по ходам. Каждый ход компьютер (Лютый) случайно выбирает одно из доступных действий
//и сообщает, что он собирается делать. В ответ на это игрок (Евстафий) должен выбрать свое действие.
//После происходит взаимное нанесение урона.
//Магическая броня блокирует магический урон, физическая броня блокирует физический урон.
//После совершения действия, оно не может быть повторно выбрано в течение cooldown ходов
//Бой идет до победы одного из противников.
//Перед началом боя игрок выбирает сложность (начальное здоровье Евстафия)
const readlineSync = require('readline-sync');
"use strict";

const monster = {
        maxHealth: 10,
        name: "Лютый",
        moves: [
            {
                "name": "Удар когтистой лапой",
                "physicalDmg": 3, // физический урон
                "magicDmg": 0,    // магический урон
                "physicArmorPercents": 20, // физическая броня
                "magicArmorPercents": 20,  // магическая броня
                "cooldown": 0     // ходов на восстановление
            },
            {
                "name": "Огненное дыхание",
                "physicalDmg": 0,
                "magicDmg": 4,
                "physicArmorPercents": 0,
                "magicArmorPercents": 0,
                "cooldown": 3
            },
            {
                "name": "Удар хвостом",
                "physicalDmg": 2,
                "magicDmg": 0,
                "physicArmorPercents": 50,
                "magicArmorPercents": 0,
                "cooldown": 2
            },
        ]
    }
let moves = [
            {
                "name": "Удар боевым кадилом",
                "physicalDmg": 2,
                "magicDmg": 0,
                "physicArmorPercents": 0,
                "magicArmorPercents": 50,
                "cooldown": 0
            },
            {
                "name": "Вертушка левой пяткой",
                "physicalDmg": 4,
                "magicDmg": 0,
                "physicArmorPercents": 0,
                "magicArmorPercents": 0,
                "cooldown": 4
            },
            {
                "name": "Каноничный фаербол",
                "physicalDmg": 0,
                "magicDmg": 5,
                "physicArmorPercents": 0,
                "magicArmorPercents": 0,
                "cooldown": 3
            },
            {
                "name": "Магический блок",
                "physicalDmg": 0,
                "magicDmg": 0,
                "physicArmorPercents": 100,
                "magicArmorPercents": 100,
                "cooldown": 4
            },
        ];
let warrior = {};

let warriorCurrentMove;
let monsterCurrentMove;

let usedMovesNames_W = [];
let usedMovesNames_M = [];
let counterList_W = [];
let counterList_M = [];

function counterHandler (namesList, counterList) {
  for (let i = 0; i < namesList.length; i++) {
    let j = i;
    if (counterList[j] > 0) {
      counterList[j] = counterList[j] - 1;
      } else {
      counterList.splice(j, 1);
      namesList.splice(i, 1);
      }
    }     
  }
function genMonsterMove(obj) {
    let moveNum = Math.floor(Math.random() * obj.moves.length);
    let move = obj.moves[moveNum];
  return move;
}
function createWarrior(obj) {
  obj.name = readlineSync.question("What will you call your warrior? ");
  obj.maxHealth = readlineSync.question(`Choose the difficulty level
  (The warrior initial health level) `);
  obj.moves = moves;
  return obj;
}
function chooseWarriorMove(obj, a = counterList_W, b = usedMovesNames_W) {
  console.log(`Here are your possible moves to respond!`);
  for (let i = 0; i < obj.length; i++) {
    if (b.includes(obj[i].name)) {
      let j = b.indexOf(obj[i].name);
      if (a[j] > 0) {
        console.log(`Move NUM${i} is unavailable ${a[j]} moves`);
        }
    } else {
      console.log(`
               NUM:${i}
         **** ${obj[i].name} ****
      Physical damage: ${obj[i].physicalDmg};
      Magical damage: ${obj[i].magicDmg};
      Physical armor: ${obj[i].physicArmorPercents}%;
      Magical armor: ${obj[i].magicArmorPercents}%;
      Moves to cooldown: ${obj[i].cooldown};
      `);
    }
  }
  let num = readlineSync.question("Entre the NUM of your choice: ");
  return obj[num];
}
function moveResults(obj1, obj2, move1, move2) {
  obj1.maxHealth = (obj1.maxHealth - ((move2.physicalDmg - move1.physicArmorPercents * 0.01) +
                   (move2.magicDmg - move1.magicArmorPercents * 0.01)));
  obj2.maxHealth = (obj2.maxHealth - ((move1.physicalDmg - move2.physicArmorPercents * 0.01) +
                   (move1.magicDmg - move2.magicArmorPercents * 0.01)));
  if (obj1.maxHealth > 0 && obj2.maxHealth <== 0) {
    console.log(`You win!`);
  } else if (obj2.maxHealth > 0 && obj1.maxHealth <== 0) {
    console.log(`Monster kills you!`);
  } else {
    console.log(`Unfortunately you both are died!`);
  }
}

warrior = createWarrior(warrior);

while (warrior.maxHealth > 0 && monster.maxHealth > 0) {

  counterHandler(usedMovesNames_M, counterList_M);
  monsterCurrentMove = genMonsterMove(monster);
  for (let i = 0; i < usedMovesNames_M.length; i++) {
    if (usedMovesNames_M[i] == monsterCurrentMove.name) {
      monsterCurrentMove = genMonsterMove(monster);
      i = 0;
    }
  }
  if (monsterCurrentMove.cooldown > 0) {
    usedMovesNames_M.push(monsterCurrentMove.name);
    counterList_M.push(monsterCurrentMove.cooldown + 1);
  }
  console.log(`Monster will strike:
         **** ${monsterCurrentMove.name} ****
  Physical damage: ${monsterCurrentMove.physicalDmg};
  Magical damage: ${monsterCurrentMove.magicDmg};
  Physical armor: ${monsterCurrentMove.physicArmorPercents}%;
  Magical armor: ${monsterCurrentMove.magicArmorPercents}%;
  Moves to cooldown: ${monsterCurrentMove.cooldown};
  `);

  counterHandler(usedMovesNames_W, counterList_W);
  warriorCurrentMove = chooseWarriorMove(warrior.moves);
  if (warriorCurrentMove.cooldown > 0) {
    usedMovesNames_W.push(warriorCurrentMove.name);
    counterList_W.push(warriorCurrentMove.cooldown + 1);
  }
  console.log(`
        **** Your move ${warriorCurrentMove.name} ****
    Physical damage: ${warriorCurrentMove.physicalDmg};
    Magical damage: ${warriorCurrentMove.magicDmg};
    Physical armor: ${warriorCurrentMove.physicArmorPercents}%;
    Magical armor: ${warriorCurrentMove.magicArmorPercents}%;
    Moves to cooldown: ${warriorCurrentMove.cooldown};
`);

  moveResults(warrior, monster, warriorCurrentMove, monsterCurrentMove);
  console.log(` New warrior health: ${warrior.maxHealth}\n New monster health: ${monster.maxHealth}`);
}

