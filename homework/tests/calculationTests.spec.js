// @ts-check
const { test, expect } = require('@playwright/test');

test.describe.configure({ mode: 'parallel' });

const data = [
  'Prototype',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9'
]

const labels = [ 'Add', 'Subtract', 'Multiply', 'Divide', 'Concatenate']

const number1 = [2, 0, -3.5, 0.5, -999999999]
const number2 = [3, 0, -8, 9999999999, 0.00001]


// main test for calculation functions
data.forEach(calcVersion => {
  labels.forEach(labelVersion => {
    number1.forEach(num1Version => {
      number2.forEach(num2Version => {

        test.describe(calcVersion + `: ${labelVersion}`, () => {

          // calcultaing answer
          let answer = getAnswer(num1Version, num2Version, labelVersion);
          if ((answer == 'Infinity') || (answer == '-Infinity') || (answer == 'NaN')){
            answer = "";
          }

          test(`${num1Version} and ${num2Version} should result in ${answer}`, async ({ page }) => {
            await page.goto('https://testsheepnz.github.io/BasicCalculator');
            await page.selectOption('#selectBuild', { label: calcVersion });
            await page.locator('#number1Field').type(num1Version + '');
            await page.locator('#number2Field').type(num2Version + '');
            await page.selectOption('#selectOperationDropdown', { label: labelVersion });
            await page.locator('#calculateButton').click();

            await expect(page.locator('#numberAnswerField')).toHaveValue(answer + '');
          });
        });
      });
    });
  });
});




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

