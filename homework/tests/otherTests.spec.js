// @ts-check
const { test, expect } = require('@playwright/test');
const { CalculatorPage } = require('../otherCode/calculatorPage');

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
                let calculatorPage = new CalculatorPage(page);
                await calculatorPage.enterData(calcVersion, labelVersion, '7', '5');
                await calculatorPage.clickCalculate();

                let firstAnswer = await calculatorPage.getInput('#numberAnswerField');
                if (firstAnswer == null) {
                    firstAnswer = '';
                }

                await calculatorPage.clickCalculate();
                await expect(await calculatorPage.getInput('#numberAnswerField')).toEqual(firstAnswer);
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
                let calculatorPage = new CalculatorPage(page);
                await calculatorPage.enterData(calcVersion, labelVersion, '7.33', '5');
                await calculatorPage.clickCalculate();

                let firstAnswer = await calculatorPage.getInput('#numberAnswerField');
                if (firstAnswer == null) {
                    firstAnswer = '';
                }
                else{
                 firstAnswer = Math.trunc(parseFloat(firstAnswer)) + '';
                }

                await calculatorPage.clickIntegers();
                await expect(await calculatorPage.getInput('#numberAnswerField')).toEqual(firstAnswer);
            });
        });
    });
});


//test if the calculator handles non-number inputs properly
data.forEach(calcVersion => {
    labels.forEach(labelVersion => {
        if (labelVersion == 'Concatenate') {
            return;
        }
        for (let i = 1; i < 4; i++) {

            let errorField = i;
            let text = 'letters in input ' + i;
            if (i == 3){
                text = 'letters in both inputs';
                errorField = 1;
            }

            test.describe(calcVersion + `: ${labelVersion}`, () => {
                test(`(${text}) Calculator should give an error if non-numbers are entered`, async ({ page }) => {
                    let calculatorPage = new CalculatorPage(page);
                    if (i == 1) {
                        await calculatorPage.enterData(calcVersion, labelVersion, 'test', '7');
                    }
                    if (i == 2) {
                        await calculatorPage.enterData(calcVersion, labelVersion, '7', 'abc');
                    }
                    if(i == 3){
                        await calculatorPage.enterData(calcVersion, labelVersion, 'test', 'abc');
                    }
                    await calculatorPage.clickCalculate();

                    await expect(await calculatorPage.getLabel('#errorForm')).toContain(`Number ${errorField} is not a number`);

                });
            });
        }
    });
});


//test if "Integers only" button is hidden when "Concatenate" operation is selected
data.forEach(calcVersion => {


        test.describe(calcVersion + `: Concatenate`, () => {
            test(' "Integers only" button should be hidden if "Concatenate" operation is selected', async ({ page }) => {
                let calculatorPage = new CalculatorPage(page);
                await calculatorPage.enterData(calcVersion, 'Concatenate', '7', '5');

                await expect(await calculatorPage.genericLocator('#integerSelect')).toBeHidden();
            });
        });

});


//test if the "Clear" button works in all versions and operations
data.forEach(calcVersion => {
    labels.forEach(labelVersion => {

        test.describe(calcVersion + `: ${labelVersion}`, () => {
            test('"Clear" button should clear the result field', async ({ page }) => {
                let calculatorPage = new CalculatorPage(page);
                await calculatorPage.enterData(calcVersion, labelVersion, '7', '5');
                await calculatorPage.clickCalculate();
                await calculatorPage.clickClear();

                await expect(await calculatorPage.getInput('#numberAnswerField')).toEqual('');
            });
        });
    });
});