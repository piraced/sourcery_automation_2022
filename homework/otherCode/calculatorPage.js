class CalculatorPage{

    constructor(page){
        this.page = page;
    }

    async enterData(version, label, num1, num2){
        await this.page.goto('https://testsheepnz.github.io/BasicCalculator');
        await this.page.selectOption('#selectBuild', { label: version });
        await this.page.locator('#number1Field').type(num1);
        await this.page.locator('#number2Field').type(num2);
        await this.page.selectOption('#selectOperationDropdown', { label: label });
    }

    async clickCalculate(){
        await this.page.locator('#calculateButton').click();
    }

    async genericLocator(input){
        return await this.page.locator(input);
    }


    async clickIntegers(){
        await this.page.waitForSelector('#integerSelect', 'visible');
        await this.page.locator('#integerSelect').click();
    }

    async clickClear(){
        await this.page.locator('#clearButton').click();
    }

    async getInput(inputField){
        return await this.page.inputValue(inputField);
    }

    async getLabel(label){
        return await this.page.innerText(label);
    }

    async pause(){
        await this.page.pause();
    }

}

module.exports = { CalculatorPage };