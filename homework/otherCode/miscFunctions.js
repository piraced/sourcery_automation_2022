function getAnswer(n1, n2, label) {
  let ans;
  switch (label) {
    case 'Add':
      ans = n1 + n2;
      break;
    case 'Subtract':
      ans = n1 - n2;
      break;
    case 'Multiply':
      ans = n1 * n2;
      break;
    case 'Divide':
      ans = n1 / n2;
      break;
    case 'Concatenate':
      ans = n1 + '' + n2;
      break;
    default:
      return null;
  }
  if ((ans == 'Infinity') || (ans == '-Infinity') || (ans !== ans)) {
    ans = "";
  }
  return ans;
}

module.exports = { getAnswer };
