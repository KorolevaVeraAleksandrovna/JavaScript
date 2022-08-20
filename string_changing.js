'use strict';

let string = `Старший братец ПОНЕДЕЛЬНИК –
работяга, не бездельник.
Он неделю открывает
всех трудиться зазывает.

ВТОРНИК следует за братом
у него идей богато.

А потом СРЕДА-сестрица,
не пристало ей лениться.

Брат ЧЕТВЕРГ и так, и сяк,
он мечтательный чудак.

ПЯТНИЦА-сестра сумела
побыстрей закончить дело.

Предпоследний брат СУББОТА
не выходит на работу.

В гости ходит ВОСКРЕСЕНЬЕ,
очень любит угощенье`;

function changeWord(str) {
  const daysArr = new Map([
    [ "ПОНЕДЕЛЬНИК", "MONDAY"],
    [ "ВТОРНИК", "TUESDAY" ],
    [ "СРЕДА", "WEDNESDAY" ],
    [ "ЧЕТВЕРГ", "THURSDAY" ],
    [ "ПЯТНИЦА", "FRIDAY" ],
    [ "СУББОТА", "SATURDAY"],
    [ "ВОСКРЕСЕНЬЕ", "SUNDAY" ]
  ]);
  let strArr = str.split(/[-,",",\n," "]/);
  let wordIndex;
  let daysIndex;
  for (wordIndex = 0; wordIndex < strArr.length; wordIndex++) {
    let word = strArr[wordIndex];
    for(let pair of daysArr.entries()) {
      if (daysArr.has(word)) {
        word = daysArr.get(word);
        strArr[wordIndex] = word;
      }
    }
  }
  let string = strArr.join(" ");
  return string;
}

let newString = changeWord(string);
console.log(newString);
