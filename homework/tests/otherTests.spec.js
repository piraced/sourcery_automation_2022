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


//test if the answer is consistent after multiple presses of "calculate"
data.forEach(calcVersion => {
    labels.forEach(labelVersion => {

        test.describe(calcVersion + `: ${labelVersion}`, () => {
            test(' Result should be consistent after pressing calculate multiple times', async ({ page }) => {
                await page.goto('https://testsheepnz.github.io/BasicCalculator');
                await page.selectOption('#selectBuild', { label: calcVersion });
                await page.locator('#number1Field').type('7');
                await page.locator('#number2Field').type('5');
                await page.selectOption('#selectOperationDropdown', { label: labelVersion });

                await page.locator('#calculateButton').click();
                let firstAnswer = await page.inputValue('#numberAnswerField');
                if (firstAnswer == null) {
                    firstAnswer = '';
                }

                await page.locator('#calculateButton').click();
                await expect(page.locator('#numberAnswerField')).toHaveValue(firstAnswer);
            });
        });
    });
});


//test if the "integers only" button works on all versions and operations other than concatenate
data.forEach(calcVersion => {
    labels.forEach(labelVersion => {
        if (labelVersion == 'Concatenate'){
            return;
        }

        test.describe(calcVersion + `: ${labelVersion}`, () => {
            test(' "Integers only" checkbox should turn result into an integer', async ({ page }) => {
                await page.goto('https://testsheepnz.github.io/BasicCalculator');
                await page.selectOption('#selectBuild', { label: calcVersion });
                await page.locator('#number1Field').type('7.33');
                await page.locator('#number2Field').type('5');
                await page.selectOption('#selectOperationDropdown', { label: labelVersion });

                await page.locator('#calculateButton').click();
                let firstAnswer = await page.inputValue('#numberAnswerField');
                if (firstAnswer == null) {
                    firstAnswer = '';
                }
                else{
                 firstAnswer = Math.trunc(parseFloat(firstAnswer)) + '';
                }


                await page.locator('#integerSelect').click();
                await expect(page.locator('#numberAnswerField')).toHaveValue(firstAnswer);
            });
        });
    });
});


//test if the calculator handles non-number inputs properly
data.forEach(calcVersion => {
    labels.forEach(labelVersion => {

        test.describe(calcVersion + `: ${labelVersion}`, () => {
            test(' "Integers only" checkbox should turn result into an integer', async ({ page }) => {
                await page.goto('https://testsheepnz.github.io/BasicCalculator');
                await page.selectOption('#selectBuild', { label: calcVersion });
                await page.locator('#number1Field').type('test');
                await page.locator('#number2Field').type('abc');
                await page.selectOption('#selectOperationDropdown', { label: labelVersion });

                await page.locator('#calculateButton').click();

                await expect(page.locator('#numberAnswerField')).toHaveValue(firstAnswer);
            });
        });
    });
});
