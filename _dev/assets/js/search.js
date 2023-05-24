$(function () {
    $('#search input').on("input propertychange change", function () {
        let searchStr = $(this).val();
        if(searchStr){
            fetch("/search-index.json").then((response) =>
                response.json().then((rawIndex) => {
                    let resultHtml = "";
                    let docs = rawIndex.documentStore.docs;
                    // window.searchIndex = elasticlunr.Index.load(rawIndex);
                    for(let i in docs) {
                        if(docs[i].title.toLowerCase().indexOf(searchStr.toLowerCase()) >= 0) {
                            let separateTitle = "";
                            let startPositon = docs[i].title.toLowerCase().indexOf(searchStr.toLowerCase());
                            let endPositon = searchStr.length + startPositon;
                            separateTitle = docs[i].title.substr(0, startPositon) + '<b>' + docs[i].title.substr(startPositon, searchStr.length) + '</b>' + docs[i].title.substr(endPositon, docs[i].title.length);
                            // resultHtml += `<li><a href="${docs[i].id}" target="_blank">${docs[i].title}</a>`
                            resultHtml += `<li><a href="${ORIGIN}${docs[i].id}" >${separateTitle}</a>`

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
    });
});