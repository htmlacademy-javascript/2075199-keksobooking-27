// Целое случайное число в раданном диапазоне

const getRangeFullNumber = (min, max) => {
  if (min < 0 || max < 0 || min === max) {
    return NaN;
  } if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min) + min);
  return randomNumber;
};

getRangeFullNumber (1, 10);

// Случайное число с плавающей точкой в раданном диапазоне

const getRangePointNumber = (min, max, digitalAfterPoint) => {
  if (min < 0 || max < 0 || min === max || digitalAfterPoint < 0) {
    return NaN;
  } if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }
  const randomNumber = Math.random() * (max - min) + min;

  return randomNumber.toFixed(digitalAfterPoint);
};

getRangePointNumber(1.2, 30.9, 3);
