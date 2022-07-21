document.getElementById("first").addEventListener("change", checkValue);

async function checkValue() {
  let x = document.getElementById("first");
  let result = 1;

  //===== Screen Value =====//
  if (x.value > 0) {
    x.value = Math.round(x.value);
    result = x.value;
    // console.log(result);
  } else {
    x.value = 1;
    result = x.value;
    // console.log(result);
  }

  //   console.log(result);
  return result;
}

//===== Auto Update on input number change =====//
document.getElementById("first").addEventListener("change", getSelectValue);

//===== Update when user select type to calculate =====//

await function getSelectValue() {
  let finalResult;
  let selectedValue = document.getElementById("list").value;
  let value = checkValue();

  if (selectedValue === "isPrime") {
    console.log(selectedValue);
    console.log(value);
    finalResult = isPrime(value);
    console.log(finalResult);
    document.getElementById("third").innerHTML = finalResult;
  }

  if (selectedValue === "isFibonacci") {
    console.log(selectedValue);
    console.log(value);
    finalResult = console.log("call function = " + isFibonacci(value));
    console.log(finalResult);
    document.getElementById("third").innerHTML = finalResult;
  }
  

  //   console.log(typeof(selectedValue));
}

//===== Check Prime number function =====//
// console.log(isPrime(9));
await function isPrime(num) {
  if (isNaN(num) || !isFinite(num) || num % 1 || num < 2) return false;
  if (num % 2 == 0) return num == 2;
  if (num % 3 == 0) return num == 3;
  let m = Math.sqrt(num);
  for (let i = 5; i <= m; i += 6) {
    if (num % i == 0) return false;
    if (num % (i + 2) == 0) return false;
  }
  return true;
}

// console.log(isFibonacci(1));
//===== Check Fibonacci number function =====//
await function isFibonacci(num) {
  let fibSeq = [0, 1], i = 1, fibSeqL;
  for (i; i <= num; i = (fibSeq[fibSeqL - 1] + fibSeq[fibSeqL])) {
    fibSeq.push(i);
    fibSeqL = fibSeq.length -1;
  }
  return fibSeq[fibSeqL] === num;
}

const isFibonacci = (num, count = 1, last = 0) => {
  if (count < num) {
    return isFibonacci(num, count + last, count);
  }
  if (count === num) {
    return true;
  }
  return false;
}
