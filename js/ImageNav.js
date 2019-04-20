$(function () {
    var
        $listItems = $("#site_slideshow_inner_text").children('div'),
        fadeDuration = 300,
        interval;

    var numOfPages = 72;
    var currPage = numOfPages;

    var borderHeightAdd = 25 + 45;

    resetDivs();

    $("#currpage").children("img").load(function () {
        setDivHeight(this.clientHeight);
    });

    // this function looks for child items that are visible and performs the fade function
    // elements that weren't last were hidden
    // now when we go to the next element it is no longer hidden and is visible while the rest
    // are hidden.  the elements are still taking up display space
    function showSlide(elm) {
        $listItems.filter(':visible').fadeOut(fadeDuration);
        elm.fadeIn(fadeDuration, resetDivs);
        setDivHeight(elm[0].firstElementChild.clientHeight);
    };

    // this sets up the events for button cliks
    // we pass in the child element and then make it visible instead of hidden
    $('#prev, #next, #first, #last').on('click',
        function () {
            showSlide(getNextElement(this.id));
        });
    function getNextElement(direction) {
        //return $listItems.next(':visible');
        var $next = $listItems.filter(':visible')[direction](),
            fallBack = (direction === 'prev' ? 'last' : 'first');

        $("html, body").animate({ scrollTop: 0 }, "slow");
        switch (direction) {
            case 'first':
                currPage = 1;
                $("#prevpage").children("img").attr("src", "img/pg" + pad(currPage, 3) + ".jpg");
                return $listItems.filter(':first');
                break;
            case 'next':
                if (currPage == numOfPages) {
                    window.location = "https://www.patreon.com/lemondeer";
                    window.onbeforeunload = function () {
                        return "Are you sure you want to leave?";
                    }
                }
                else if (currPage < numOfPages) {
                    currPage++;
                }
                return !$next.length ? $listItems[fallBack]() : $next;
                break;
            case 'prev':
                if (currPage > 1) {
                    currPage--;
                }
                return !$next.length ? $listItems[fallBack]() : $next;
                break;
            case 'last':
                currPage = numOfPages;
                $("#nextpage").children("img").attr("src", "img/pg" + pad(currPage, 3) + ".jpg");
                return $listItems.filter(':last');
                break;
        }
    }

    function pad(str, max) {
        str = str.toString();
        return str.length < max ? pad("0" + str, max) : str;
    }

    $('body').keydown(function (e) {
        if (e.which == 37) {
            // Left Arrow Pushed
            showSlide(getNextElement("prev"));
        } else if (e.which == 39) {
            showSlide(getNextElement("next"));
        }
    });

    function setDivHeight(height) {
        console.log("Set height to " + height);
        $("#site_slideshow_inner_text").css("height", height + borderHeightAdd);
    }


    function resetDivs() {
        $("#currpage").children("img").attr("src", "img/pg" + pad(currPage, 3) + ".jpg");
        $("#currpage").show();
        $("#prevpage").hide();
        $("#nextpage").hide();
        $("#prevpage").children("img").attr("src", "img/pg" + pad(currPage - 1, 3) + ".jpg");
        if (currPage == 1) {
            $("#prevpage").children("img").attr("src", "img/pg" + pad(currPage, 3) + ".jpg");
        } else {
            $("#prevpage").children("img").attr("src", "img/pg" + pad(currPage - 1, 3) + ".jpg");
        }
        if (currPage == numOfPages) {
            $("#nextpage").children("img").attr("src", "img/pg" + pad(currPage, 3) + ".jpg");
        } else {
            $("#nextpage").children("img").attr("src", "img/pg" + pad(currPage + 1, 3) + ".jpg");
        }
        if (currPage == numOfPages) {
            //Last page, set next button to Patreon
            $("#next").html("Next (Patreon)");
        } else {

            $("#next").html("Next");
        }



    }


});