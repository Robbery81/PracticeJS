//пофіксить баг з +10 +20 +30

document.addEventListener('DOMContentLoaded', function () {
    //resourse panel
    let wood = document.querySelector('.wood'),
        rubber = document.querySelector('.rubber'), //0
        metal = document.querySelector('.metal'), //1
        plastic = document.querySelector('.plastic'), //2
        oil = document.querySelector('.oil'), //3
        concrete = document.querySelector('.concrete'), //4
        money = document.querySelector('.money'), //5
        resourseArr = [wood, rubber, metal, plastic, oil, concrete, money];


    //manual btn
    let workBtn = document.querySelector('.work_btn'),
        mineBtns = document.querySelectorAll(".mine_rubber_metal"),
        metalBtn = document.querySelector(".metal_btn"),
        rubberBtn = document.querySelector(".rubber_btn");


    //manual craft
    let craftRubberBtns = document.querySelectorAll('.craftRubber'),
        elasticBtn = document.querySelector('.elastic_btn'),
        elastic = document.querySelector('.elastic_count'),
        //for add new resourse
        gasketBtn = document.querySelector('.gasket_btn'),
        gasket = document.querySelector('.gasket_count'),
        woodBtn = document.querySelector('.wood_btn'),
        craftMetalBtns = document.querySelectorAll('.craftMetal'),
        manualWrapper = document.querySelectorAll('.manual_wrapper'),
        manualBtn = manualWrapper[0].querySelectorAll(".btn");

    let marketMenu = document.querySelector("a[href*=market]");

    //market
    let sellInput = document.querySelector(".sell_input"),
        marketSelect = document.getElementById('marketSelect'),
        sellBtn = document.querySelector(".btn_sell"),
        btnPlusMinusMax = document.querySelector(".market__item_frame");

    //tab
    let tabsWrapper = document.querySelector('.factory_wrapper_tab'),
        tabs = document.querySelectorAll('.btn_tab'),
        tabContent = document.querySelectorAll('.tabcontent');

    let factEqTablr = document.querySelector(".factory_equipment_table"),
        equipmentBtns = factEqTablr.querySelectorAll('.btn'),
        possession = document.querySelector(".possession"),
        possessionBtns = possession.querySelectorAll('.btn');

    let hotPresBtn = document.querySelector(".hotPres_btn"),
        licenseBtn = document.querySelector(".license_btn"),
        license = document.querySelector(".have_license"),
        hotPres = document.querySelector(".have_hotPres");
    //for add new resourse BTN
    let sometreeBtn = document.querySelector(".sometree_btn"),
        sometree = document.querySelector(".have_sometree");
    //for add new resourse Input



    let allBTN = []; //fined all button
    allBTN.push.apply(allBTN, manualBtn);
    allBTN.push.apply(allBTN, equipmentBtns);
    allBTN.push.apply(allBTN, possessionBtns);

    let resourseHaveObj = {
        woodCounter: 0, //for add new resourse
        sometreeCounter: 0,
        rubberCounter: 0,
        metalCounter: 0,
        elasticCounter: 0,
        gasketCounter: 0,
        moneyCounter: 0,
        licenseCounter: 0,
        hotPresCounter: 0
    };

    let costPrice = {
        "wood": 1,
        "rubber": 1,
        "metal": 1,
        "elastic": 2,
        "gasket": 3,
        "hotPres": 100, //for add new resourse
    };

    let resurseNeed = {
        wood: [
            ["sometree", 1]
        ],
        rubber: [
            ["money", 0]
        ],
        metal: [
            ["money", 0],
            /* 
                        ["equpment1", 1] */
        ],
        elastic: [
            ["rubber", 2]
        ],
        gasket: [
            ["rubber", 5], //for add new resourse
        ],
        //equipment
        license: [
            ["money", 0]
        ],
        hotPres: [
            ["money", 5],
            ["license", 1],
        ],
        sometree: [
            ["money", 1]
        ],
    };

    document.documentElement.style.cursor = "url('icons/cursor.png'), auto";
    updateCountElement();
    hideTabContent();
    showTabContent();

    function hideTabContent() {
        tabContent.forEach((item) => {
            item.classList.add("factory_hide");
            item.classList.remove("factory_active");
        });
        tabs.forEach((item) => {
            item.classList.remove("btn_tab_active"); //factory_active
        });
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.add('factory_active');
        tabContent[i].classList.remove("factory_hide");
        tabs[i].classList.add('btn_tab_active');
    }

    tabsWrapper.addEventListener('click', (e) => {
        let target = e.target;
        if (target && target.classList.contains("btn_tab")) {
            tabs.forEach((item, i) => {
                if (item === target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    function createSelect() {
        marketSelect.innerHTML = "";
        let selectArr = [];
        for (let key in resourseHaveObj) {
            let k = key;
            key = key.substring(0, 1).toUpperCase() + key.slice(1, key.length);
            if ((key != "MoneyCounter") &&
                (key != "LicenseCounter") &&
                resourseHaveObj[k] != 0) {
                selectArr.push(key.slice(0, key.length - 7) +
                    ` (${resourseHaveObj[k]})`);
            }
        }
        if (selectArr.length > 0) {
            for (let i of selectArr) {
                let elem = document.createElement('option');
                elem.innerHTML = `${i}`;
                marketSelect.append(elem);
            }
        } else {
            let elem = document.createElement('option');
            elem.innerHTML = 'Have not resourse';
            marketSelect.append(elem);
        }

    }

    allBTN.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (btn && btn.classList.contains("work_btn")) {
                goWork();
            }
            if (btn && btn.classList.contains("wood_btn") &&
                !btn.classList.contains("btn_no_enough")) {
                craft("wood");
            }
            if (btn && btn.classList.contains("rubber_btn") &&
                !btn.classList.contains("btn_no_enough")) {
                craft("rubber");
            }
            if (btn && btn.classList.contains("metal_btn") &&
                !btn.classList.contains("btn_no_enough")) {
                craft("metal");
            }
            if (btn && btn.classList.contains("elastic_btn") &&
                !btn.classList.contains("btn_no_enough")) {
                craft("elastic"); //for add new resourse
            }
            if (btn && btn.classList.contains("gasket_btn") &&
                !btn.classList.contains("btn_no_enough")) {
                craft("gasket");
            }
            if (btn && btn.classList.contains("license_btn") &&
                !btn.classList.contains("btn_no_enough")) {
                craft("license");
            }
            if (btn && btn.classList.contains("hotPres_btn") &&
                !btn.classList.contains("btn_no_enough")) {
                craft("hotPres");
            }
            if (btn && btn.classList.contains("sometree_btn") &&
                !btn.classList.contains("btn_no_enough")) {
                craft("sometree");
            }
        });
    });

    function goWork() {
        resourseHaveObj.moneyCounter++;
        updateCountElement();
    }

    function craft(resourse, count = resourse + 'Counter') {
        if (resourseHaveObj[count]) {
            resourseHaveObj[count] += 1;
        } else {
            resourseHaveObj[count] = 1;
        }
        updateCountElement();
        resurseNeed[resourse].forEach((item) => {
            resourseHaveObj[item[0] + "Counter"] -= item[1];
            updateCountElement();
        });
    }

    function updateCountElement() {
        wood.textContent = resourseHaveObj.woodCounter;
        rubber.textContent = resourseHaveObj.rubberCounter;
        metal.textContent = resourseHaveObj.metalCounter;
        money.textContent = resourseHaveObj.moneyCounter;
        elastic.textContent = resourseHaveObj.elasticCounter;
        gasket.textContent = resourseHaveObj.gasketCounter;
        license.textContent = resourseHaveObj.licenseCounter;
        hotPres.textContent = resourseHaveObj.hotPresCounter;
        sometree.textContent = resourseHaveObj.sometreeCounter;
    }


    marketMenu.addEventListener("click", (e) => {
        e.preventDefault();
        marketOn();
    });

    function maxBtnClick() {
        let key = selectResourseinMarket();
        sellInput.value = resourseHaveObj[key];
    }

    function marketOn() {
        createSelect();
        btnPlusMinusMax.addEventListener("click", (e) => {
            let text = e.target.textContent;
            switch (text) {
                case "+10":
                    sellInput.value = +sellInput.value + 10;
                    break;
                case "-10":
                    sellInput.value >= 10 ? sellInput.value -= 10 : sellInput.value = 0;
                    break;
                case "MAX":
                    maxBtnClick();
                    break;
            }
        });

        let marketSection = document.querySelector(".market");
        marketSection.classList.remove('hide');
        document.documentElement.style.cursor = "url('icons/1.png'), auto";

        marketSection.addEventListener("click", (e) => {
            if (e.target.classList.value == "market") {
                marketSection.classList.add('hide');
                document.documentElement.style.cursor =
                    "url('icons/cursor.png'), auto";
            }
        });
        let marketItem = document.querySelector(".market__item");
        changeCursor(marketItem);
    }

    function changeCursor(item) {
        item.addEventListener("mouseleave", () => {
            document.documentElement.style.cursor =
                "url('icons/1.png'), auto";
        });
        item.addEventListener("mouseenter", () => {
            document.documentElement.style.cursor =
                "url('icons/cursor.png'), auto";
        });
    }

    function selectResourseinMarket() {

        let optionWithNumber = marketSelect.options[marketSelect.selectedIndex];
        let option = optionWithNumber.textContent;
        let resourseName = option[0].toLowerCase();
        for (let i = 1; i < option.length; i++) {
            if (option[i] !== " ") {
                resourseName += option[i];
            } else {
                break;
            }
        }
        let optionCounter = resourseName + "Counter";
        return optionCounter;
    }

    function sale(key, requestResourse) {
        let index = marketSelect.selectedIndex;
        resourseHaveObj[key] -= requestResourse;
        resourseArr[index].textContent = resourseHaveObj[key];
        sellInput.value = 0;
        let moneyReseived = calculateMoney(key, requestResourse);
        resourseHaveObj.moneyCounter += moneyReseived;
        money.textContent = resourseHaveObj.moneyCounter;
        createSelect();
        updateCountElement();

    }

    function calculateMoney(key, requestResourse) {
        key = key.slice(0, key.length - 7);
        return costPrice[key] * requestResourse;
    }

    function checkAvailabilityResourse(requestResourse) {
        let key = selectResourseinMarket();
        let haveResourse = resourseHaveObj[key];
        if (haveResourse >= requestResourse) {
            sale(key, requestResourse);
        } else {
            errorTransaction();
        }
    }

    function errorTransaction() {
        sellInput.style.borderColor = "red";

        function colorize() {
            sellInput.style.borderColor = "black";
        }
        setTimeout(colorize, 1000);
    }

    function checkInputSell() {
        let resourseCountEnter = sellInput.value;
        if (resourseCountEnter == 0) {
            return 0;
        } else {
            return resourseCountEnter;
        }
    }

    function checkTransaction() {
        checkAvailabilityResourse(checkInputSell());
    }

    sellBtn.addEventListener("click", (e) => {
        checkTransaction();
    });

    function showInfoAboutDefisiteResourse(item) {
        let message = "Need:   ";
        resurseNeed[item].forEach((arr) => {
            message += `${arr[0]}:${arr[1]}    `;
        });
        return message;
    }

    function checkResourseNew() {
        //for add new resourse
        for (const item in resurseNeed) {
            //if (item == "wood") {
            let resourseDoneFlag = true;
            for (let resourseNeedArr of resurseNeed[item]) {
                let resourseName = resourseNeedArr[0] + "Counter";
                let coutResourseName = resourseNeedArr[1];
                let debagOne = resourseHaveObj[resourseName];
                if (resourseHaveObj[resourseName] < coutResourseName) {
                    resourseDoneFlag = false;
                    break;
                }
            }
            let button = eval(`${item}Btn`);
            if (resourseDoneFlag) {
                button.classList.remove('btn_no_enough', 'data');
            } else {
                button.classList.add('btn_no_enough', 'data');
                button.dataset[item] = showInfoAboutDefisiteResourse(item);
            }
            //}
        }
    }

    //checkResourseNew();

    const checkR = setInterval(checkResourseNew, 200);

}, false);