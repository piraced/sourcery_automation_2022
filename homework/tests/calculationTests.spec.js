// @ts-check
const { test, expect } = require('@playwright/test');
const { CalculatorPage } = require('../otherCode/calculatorPage');
const { getAnswer } = require('../otherCode/miscFunctions');

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


// main test for calculation functions. This tests if the calculator gets the expected results with various inputs
// warning: this is a total of 1250 tests, it will take a while (10 versions * 5 operations * 25 calculations)
data.forEach(calcVersion => {
  labels.forEach(labelVersion => {
    number1.forEach(num1Version => {
      number2.forEach(num2Version => {

        test.describe(calcVersion + `: ${labelVersion}`, () => {

          // calcultaing answer
          let answer = getAnswer(num1Version, num2Version, labelVersion);

          test(`${num1Version} and ${num2Version} should result in ${answer}`, async ({ page }) => {
            let calculatorPage = new CalculatorPage(page);
            await calculatorPage.enterData(calcVersion, labelVersion, num1Version + '', num2Version + '');
            await calculatorPage.clickCalculate();

            await expect(await calculatorPage.getInput('#numberAnswerField')).toEqual(answer + '');
          });
        });
      });
    });
  });
});

