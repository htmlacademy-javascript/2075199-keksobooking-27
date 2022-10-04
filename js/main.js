const getRandomNumber = (min, max) => {
  if (min > max) {
    let swap = min
    min = max
    max = swap
  };
  min = Math.ceil(min);
  max = Math.floor(max);
  let randomNumber = Math.floor(Math.random() * (max - min) + min);
  return randomNumber;
}
