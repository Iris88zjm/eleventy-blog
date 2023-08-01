function getFruitFamily() {
    fetch(`${ORIGIN}/assets/data/fruitMenu.json`).then((response) =>
        response.json().then((fruitMenu) => {
            fruitMenu.map(menu => {
                $("#searchFamily").append(`<option value=${menu.familyName}>${menu.familyName}</option>`);
            })
        })
    ).then((result) => {

    });
}

function getFruitGenu(familyName) {
    $("#searchGenu option:not(:nth-child(1))").remove();
    fetch(`${ORIGIN}/assets/data/fruitMenu.json`).then((response) =>
        response.json().then((fruitMenu) => {
            fruitMenu.map(menu => {
                if (familyName == menu.familyName) {
                    for (let i in menu.genuNames) {
                        $("#searchGenu").append(`<option value=${menu.genuNames[i]}>${menu.genuNames[i]}</option>`);
                    }
                }
            })
        })
    ).then((result) => {

    });
}

function renderFruitHTML(item) {
    return `<div class="fruit" data-genu-name="${item.genuName}" data-chinese-name="${item.chineseName}">
        <div class="front-content">
        <div class="divimg">
            <img src="${ORIGIN}/assets/img/fruits/${item.images}.jpg"
            alt="">
        </div>
        <div class="content-bottom">
            <div class="tags">
            <span class="tag-family">${item.familyName}</span> -
            <span class="tag-genu">${item.genuName}</span>
            </div>
            <div class="chinese-name">${item.chineseName}</div>
        </div>
        </div>

        <div class="back-content">
        <div class="scientific-name">学名: ${item.scientificName}</div>
        <div class="chinese-name">中文名: ${item.chineseName}</div>
        <div class="english-name">英文名: ${item.englishName}</div>
        <div class="nickname">别名: ${item.nickname}</div>
        <div class="origin">产地: ${item.origin}</div>
        <div class="mutation">变异: ${item.mutation}</div>
        <div class="description">描述: ${item.description}</div>
        <div class="comment">备注: ${item.comment}</div>
        </div>

        <div class="toggle-content">
        <span></span>
        <span></span>
        </div>
    </div>`;

}

function fetchFruit() {
    let fruitNameVal = $(".fruits-search-form #searchFruitName").val();
    let familyVal = $(".fruits-search-form #searchFamily option:selected").val();
    let genuVal = $(".fruits-search-form #searchGenu option:selected").val();
    // console.log("family", familyVal);
    // console.log("genu", genuVal);
    // console.log("fruit", fruitNameVal);

    let rate = 2;
    if(DOC_WIDTH < 1200 && DOC_WIDTH >= 768) {
        rate = 3
    } else if(DOC_WIDTH < 1600 && DOC_WIDTH >= 1200) {
        rate = 4
    } else if(DOC_WIDTH >= 1600) {
        rate = 5
    } else {
        rate = 2
    }
    
    fetch(`${ORIGIN}/assets/data/fruitList.json`).then((response) => 
        response.json().then((fruits) => {
            let result = [];
            fruits.map((item, i) => {
                if(genuVal.length > 0 && fruitNameVal.length > 0) {
                    if(item.genuName == genuVal && item.chineseName.indexOf(fruitNameVal) >= 0) {
                        result.push(item);
                    }
                } else if(genuVal.length > 0 && fruitNameVal.length <= 0) {
                    if(item.genuName == genuVal) {
                        result.push(item)
                    }
                } else if(genuVal.length <= 0 && fruitNameVal.length > 0) {
                    if(item.chineseName.indexOf(fruitNameVal) >= 0) {
                        result.push(item)
                    }
                }
            })
            return result;
        })
    ).then((result) => {
        $(".fruits-container-right .family").remove();
        result.map((item, i) => {
            if((i + 1) % rate == 1) {
                $(".fruits-container-right").append(`<div class="family cols-${rate}">${renderFruitHTML(item)}</div>`)
            } else {
                $(`.fruits-container-right .family:nth-child(${Math.ceil((i + 1) / rate)})`).append(renderFruitHTML(item))
            }
        })
    });
};

$(function () {
    let searchTimer;
    // $("#search input").focus();
    getFruitFamily();

    $(".fruits-search-form #searchFruitName").on("keydown", function () {
        let familyVal = $(".fruits-search-form #searchFamily").val();
        let genuVal = $(".fruits-search-form #searchGenu").val();
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
            let searchVal = $(this).val();
            fetchFruit(familyVal, genuVal, searchVal);
            // if (searchVal != null && searchVal.trim() != "") {
            // }
        }, 500)
    });

    $(".fruits-search-form #searchFamily").on('input propertychange', function () {
        getFruitGenu($(this).val())
        // fetchFruit();
    });
    $(".fruits-search-form #searchGenu").on('input propertychange', function () {
        fetchFruit();
    });
});