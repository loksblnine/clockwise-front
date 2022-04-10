const {Builder, By, Key} = require('selenium-webdriver');

//to test it in real time u should have
// a) Firefox browser
// b) geckodriver.exe  https://github.com/mozilla/geckodriver/releases/
// c) SET env 'PATH' to the .exe above (reload comp if it wasn`t any PATH to our .exe)
// d) active geckodriver.exe session to up the test below

(async function example() {
    let driver = await new Builder().forBrowser('firefox').build();
    try {
        await driver.get('https://clockwise-clockware-test.herokuapp.com/login');
        new Promise((resolve) => {
            setTimeout(resolve, 15000);
        })
            .then(() => {
                driver.findElements(By.className("form-control"))
                    .then(async (resp) => {
                        resp[0].sendKeys("admin@example.com", Key.ENTER)
                        resp[1].sendKeys("passwordsecret", Key.ENTER)
                        const script = () => driver.executeScript(
                            "localStorage.getItem('token')"
                        )
                        setTimeout(script, 10000);
                    })
            })

    } catch (e) {
        console.log("Error: " + e.toString())
    }
})();