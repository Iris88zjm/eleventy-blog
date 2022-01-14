function scrollPageNav(scrollH, pageID, divID, row) {
  let value = $(divID).length;
  if (value > 0) {
    let divIDTop = $(divID).offset().top;
    if (scrollH >= divIDTop && scrollH < (divIDTop + $(divID).outerHeight())) {
      $(pageID + ' .container-left ul li').removeClass('active');
      $(pageID + ' .container-left ul li:nth-child(' + row + ')').addClass('active');
    }
  }
}
// cookie
function setCookie(name, val, days) {
  let cookiePath = window.location.pathname.substring(0, 1);
  let exp = new Date();
  exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = name + '=' + val + ';expires=' + exp.toGMTString() + ';path=' + cookiePath;
}
function getCookie(name) {
  let arr = document.cookie.match(new RegExp('[sS]*' + name + '=([^;]*)'));
  if (arr != null) {
    return arr[1]
  } else {
    return null
  }
}
function removeCookie(name) {
  let exp = new Date();
  exp.setTime(exp.getTime() + (-1 * 24 * 60 * 60 * 1000));
  document.cookie = name + '=; expires=' + exp.toUTCString() + '; path=/';
}

if(document.getElementById('skillsChart')) {
  // 基于准备好的dom，初始化echarts实例
  var skillsChart = echarts.init(document.getElementById('skillsChart'));
  // 指定图表的配置项和数据
  option = {
    title: {
      // text: 'Tech ECharts Demo'
    },
    textStyle: {
      fontFamily: '"nanoleaf", sans-serif', 
    },
    color: ['#3fae29'],
    // tooltip: {},
    legend: {
      // data: ['Tech']
    },
    grid: {
      left: '0%',
      right: '0%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['HTML', 'CSS', 'Javascript', 'jQuery', 'Node', 'Vue', 'MySQL', 'SQL Server', 'PHP', '.NET', 'Liquid' ]
    },
    yAxis: {
      // type: 'value'
    },
    series: [
      {
        // name: "Tech",
        data: [95, 90, 80, 80, 70, 85, 75, 75, 60, 50, 90],
        type: 'bar',
        barWidth: '30%',
        itemStyle: {
          // barBorderRadius: 30,
        },
        label: {
          show: true,
          position: 'inside'
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(220, 220, 220, 0.8)'
        }
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  skillsChart.setOption(option);
}

// init wow.js
new WOW().init();

$(function () {
  $("html").attr("data-theme", getCookie("theme-color"));
  if (getCookie("theme-color") == "dark") {
    $("footer .theme-switch input").prop('checked', true);
  }

  // footer switch theme
  $("footer .theme-switch label").on("tap click", function () {
    let checkboxVal = $(this).siblings("input")[0].checked;
    if (checkboxVal) {
      $("html").attr("data-theme", "light");
      setCookie("theme-color", "light", 7);
    } else {
      $("html").attr("data-theme", "dark");
      setCookie("theme-color", "dark", 7);
    }
  });

  // open menus
  $("header .toggle-menu").on("tap click", function () {
    $("header .menus-container").addClass("active");
    return false;
  });
  $("header .close-menus").on("tap click", function () {
    $("header .menus-container").removeClass("active");
    return false;
  });

  // links page
  $("#links .open-popup").on("tap click", function () {
    $("#links .container-left").addClass("active");
    return false;
  });
  $("#links .close-popup").on("tap click", function () {
    $("#links .container-left").removeClass("active");
    return false;
  });
  $("#links .container-left ul li a").on("tap click", function () {
    let href = $(this).attr("href");
    let docWidth = window.screen.width;
    let scrollVal = 0;
    if (docWidth >= 1024) {
      if (href == "#vue") {
        scrollVal = 100;
      } else {
        scrollVal = 40;
      }
    } else {
      scrollVal = 100;
    }
    $("#links .container-left").removeClass("active");
    $('html, body').animate({
      scrollTop: $("#links " + href).offset().top - scrollVal
    }, 500);
    return false;
  });
  $(window).scroll(function () {
    let scrollH = $(this).scrollTop() + 100;
    if ($('#links').length > 0) {
      scrollPageNav(scrollH, '#links', '#vue', 1);
      scrollPageNav(scrollH, '#links', '#11ty', 2);
      scrollPageNav(scrollH, '#links', '#javascript', 3);
      scrollPageNav(scrollH, '#links', '#css', 4);
      scrollPageNav(scrollH, '#links', '#node', 5);
      scrollPageNav(scrollH, '#links', '#wordpress', 6);
      scrollPageNav(scrollH, '#links', '#canvas', 7);
      scrollPageNav(scrollH, '#links', '#charts', 8);
      scrollPageNav(scrollH, '#links', '#tech', 9);
      scrollPageNav(scrollH, '#links', '#blogs', 10);
      scrollPageNav(scrollH, '#links', '#design', 11);
    }
  });

});