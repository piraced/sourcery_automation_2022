

function getAnswer(n1, n2, label){
    switch (label){
      case 'Add':
        return n1 + n2;
      case 'Subtract':
        return n1 - n2;
      case 'Multiply':
        return n1 * n2;
      case 'Divide':
        return n1 / n2;
      case 'Concatenate':
        return n1 + '' + n2;
      default:
        return null;
    }
}

function enterData(num1, num2, label, version){
    
}