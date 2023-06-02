$(function () {
    let searchTimer;
    $('#search input').focus();

    function fetchSearch(query) {
        if(query){
            fetch(`${ORIGIN}/assets/data/search-index.json`).then((response) =>
                response.json().then((item) => {
                    let resultHtml = "";
                    let docs = item.data;
                    for(let i in docs) {
                        if(docs[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                            let separateTitle = "";
                            let startPositon = docs[i].title.toLowerCase().indexOf(query.toLowerCase());
                            let endPositon = query.length + startPositon;
                            separateTitle = docs[i].title.substr(0, startPositon) + '<b>' + docs[i].title.substr(startPositon, query.length) + '</b>' + docs[i].title.substr(endPositon, docs[i].title.length);
                            // resultHtml += `<li><a href="${docs[i].id}" target="_blank">${docs[i].title}</a>`
                            resultHtml += `<li><a href="${ORIGIN}${docs[i].url}" >${separateTitle}</a></li>`

                        }
                    }
                    return resultHtml;
                })
            ).then((result)=>{
                $("#searchResults").html("");
                if(result) {
                    $("#noResultsFound").removeClass("active");
                    $("#searchResults").append(result);
                } else {
                    $("#noResultsFound").addClass("active");
                }
            });
        } else {
            $("#noResultsFound").removeClass("active");
            $("#searchResults").html("");
        }
    };

    $('#search input').on("keydown", function (e) {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
            let searchVal = $(this).val();
            if (searchVal != null && searchVal.trim() != "") {
                fetchSearch(searchVal);
            }
        }, 500)
    });
});