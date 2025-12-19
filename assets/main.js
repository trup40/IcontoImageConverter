var ara = '';
var ikonset = 'hepsi';

var ayar1 = { allowTaint: true, useCORS: true, backgroundColor: '' };
var ayar2 = { allowTaint: true, useCORS: true, backgroundColor: 'white' };
var ayar3 = { allowTaint: true, useCORS: true, backgroundColor: 'black' };

$('.dropdown-select').on('click', '.dropdown-menu li a', function () {
    var secilen = $(this).html();
    var set = $(this).attr('data-set');

    $(this).parents('.dropdown-menu').find('li').removeClass('active');
    $(this).parent('li').addClass('active');

    $(this).parents('.dropdown-select').find('.dropdown-toggle').html(secilen + ' <span class="caret"></span>');

	ara = '';

    ikonset = set;

    $('#ikonlar').iconpicker('setIconset', set);;
	
	$('.search-control').on('input', function () {
		ara = $(this).val();
	});
})
$(document).ready(function () {

    var colorpicker = $('#colorpicker').colorpicker({
        inline: true,
        container: true,
        customClass: 'colorpicker-2x',
        sliders: {
            saturation: { maxLeft: 175, maxTop: 175 },
            hue: { maxTop: 175 },
            alpha: { maxTop: 175 }
        }
    });

    colorpicker.on('changeColor', function (e) {
        $("#alan").css('color', e.color.toHex());
        $("#alan2").css('color', e.color.toHex());
    });

    $('#basecolorpicker').colorpicker().on('changeColor', function (e) {
        $('#alan2')[0].style.backgroundColor = e.color
            .toString('rgba');
    });

    $('.palet').on('click', function () {
        var renk = $(this).css("background-color");
        $('#colorpicker').colorpicker().colorpicker('setValue', renk);
    });


    $('#boyut').on('input propertychange paste', function () {
        var value = parseInt($('#boyut').val(), 10);

        if (ikonset == 'glyphicon') {
            $("#alan").css("font-size", ($('#boyut').val() * 0.843) + "px");
        }
        if (ikonset == 'weathericon') {
            $("#alan").css("font-size", ($('#boyut').val() * 0.7) + "px");
        }
        if (ikonset == 'ionicon' || ikonset == 'typicon') {
            $("#alan").css("font-size", ($('#boyut').val() * 0.895) + "px");
        }
        else {
            $("#alan").css("font-size", $('#boyut').val() + "px");
        }

        $('#boyutslider').slider('setValue', value);
    });

    $('#boyutslider').slider({ value: 300, max: 2500, tooltip_position: 'bottom' });

    $('#boyutslider').on("slide", function (slideEvt) {

        if (ikonset == 'glyphicon') {
            $("#alan").css("font-size", ($('#boyut').val() * 0.843) + "px");
        }
        if (ikonset == 'weathericon') {
            $("#alan").css("font-size", (slideEvt.value * 0.7) + "px");
        }
        if (ikonset == 'ionicon' || ikonset == 'typicon') {
            $("#alan").css("font-size", (slideEvt.value * 0.895) + "px");
        }
        else {
            $("#alan").css("font-size", slideEvt.value + "px");
        }

        $('#boyut').val(slideEvt.value).change();
        $('#boyut').val(slideEvt.value);
    });

    $('#ikonlar').iconpicker({
        align: 'center',
        arrowClass: 'btn-danger',
        arrowPrevIconClass: 'fas fa-angle-left',
        arrowNextIconClass: 'fas fa-angle-right',
        cols: 10,
        footer: true,
        header: true,
        icon: 'el-icon-check',
        iconset: 'hepsi',
        labelHeader: '{0} of {1} pages',
        labelFooter: '{0}-{1} of {2} icons',
        rows: 5,
        search: true,
        searchText: 'Search icon',
        selectedClass: 'btn-success',
        unselectedClass: ''
    });
	
	$('.iconpicker input').val('el-icon-check').change();
	$('.search-control').val(ara).change();
	$("#iconName").val("el-icon-check");

    $('.search-control').on('input', function () {
		ara = $(this).val();
	});

    $('#ikonlar').click(function (e) {
        $("#iconName").val($('.iconpicker input').val());

        if (ikonset == 'glyphicon') {
            $("#alan").css("font-size", ($('#boyut').val() * 0.843) + "px");
        }
        if (ikonset == 'weathericon') {
            $("#alan").css("font-size", ($('#boyut').val() * 0.7) + "px");
        }
        if (ikonset == 'ionicon' || ikonset == 'typicon') {
            $("#alan").css("font-size", ($('#boyut').val() * 0.895) + "px");
        }

        $('#alan').html("<span class='" + $('.iconpicker input').val() + "' id='simge'></span>");
        $('#alan2').html("<span class='" + $('.iconpicker input').val() + "' id='simge2' style='vertical-align:sub'></span>");

        $('#btnPNG').html("<i class='" + $('.iconpicker input').val() + "'></i> Download PNG");
        $('#btnJPEG1').html("<i class='" + $('.iconpicker input').val() + "'></i> Download JPEG");
        $('#btnJPEG2').html("<i class='" + $('.iconpicker input').val() + "'></i> Download JPEG");
// alert(ara);
        $('.search-control').val(ara).change();
    });

    $('#btnPNG').click(function () {
        var element = document.querySelector("#simge");

        if (ikonset == 'weathericon') {
            element = document.querySelector("#alan");
            var limit = document.querySelector("body");

            var yukseklik = parseInt($('#alan').css('font-size'), 10);
            var base = ($('#simge').attr('class') == 'wi wi-day-snow-thunderstorm' || $('#simge').attr('class') == 'wi wi-day-storm-showers') ? 1090.5 : 1095.5;
            var kesinti = (base + ((yukseklik - 1) * 0.175));

            ayar1 = { allowTaint: true, useCORS: true, backgroundColor: '', y: kesinti }
        }
        if (ikonset == 'flagicon') {
            $('body').css('overflow', 'unset');
            var limit = document.querySelector("body");
            ayar1 = { allowTaint: true, useCORS: true, foreignObjectRendering: true, backgroundColor: '', windowWidth: element.scrollWidth, windowHeight: limit.scrollHeight }
        }

        html2canvas(element, ayar1).then(function (canvas) {
            imgBase64 = canvas.toDataURL();
            var imgURL = "data:image/" + imgBase64;
            var triggerDownload = $("<a>").attr("href", imgURL).attr("download", $('#simge').attr("class") + ".png").appendTo("body");
            triggerDownload[0].click();
            triggerDownload.remove();
            $('body').css('overflow', 'hidden');
        })
    });

    $('#btnJPEG1').click(function () {
        var element = document.querySelector("#simge");

        if (ikonset == 'weathericon') {
            element = document.querySelector("#alan");
            var limit = document.querySelector("body");

            var yukseklik = parseInt($('#alan').css('font-size'), 10);
            var base = ($('#simge').attr('class') == 'wi wi-day-snow-thunderstorm') ? 1090.5 : 1095.5;
            var kesinti = (base + ((yukseklik - 1) * 0.175));

            ayar2 = { allowTaint: true, useCORS: true, backgroundColor: 'white', y: kesinti }
        }
        if (ikonset == 'flagicon') {
            $('body').css('overflow', 'unset');
            var limit = document.querySelector("body");
            ayar2 = { allowTaint: true, useCORS: true, foreignObjectRendering: true, backgroundColor: 'white', windowWidth: limit.scrollWidth, windowHeight: limit.scrollHeight }
        }

        html2canvas(element, ayar2).then(function (canvas) {
            imgBase64 = canvas.toDataURL("image/jpeg");
            var imgURL = "data:image/" + imgBase64;
            var triggerDownload = $("<a>").attr("href", imgURL).attr("download", $('#simge').attr("class") + ".jpeg").appendTo("body");
            triggerDownload[0].click();
            triggerDownload.remove();
            $('body').css('overflow', 'hidden');
        })
    });

    $('#btnJPEG2').click(function () {
        var element = document.querySelector("#simge");

        if (ikonset == 'weathericon') {
            element = document.querySelector("#alan");
            var limit = document.querySelector("body");

            var yukseklik = parseInt($('#alan').css('font-size'), 10);
            var base = ($('#simge').attr('class') == 'wi wi-day-snow-thunderstorm') ? 1090.5 : 1095.5;
            var kesinti = (base + ((yukseklik - 1) * 0.175));

            ayar3 = { allowTaint: true, useCORS: true, backgroundColor: 'black', y: kesinti }
        }
        if (ikonset == 'flagicon') {
            $('body').css('overflow', 'unset');
            var limit = document.querySelector("body");
            ayar3 = { allowTaint: true, useCORS: true, foreignObjectRendering: true, backgroundColor: 'black', windowWidth: limit.scrollWidth, windowHeight: limit.scrollHeight }
        }

        html2canvas(element, ayar3).then(function (canvas) {
            imgBase64 = canvas.toDataURL("image/jpeg");
            var imgURL = "data:image/" + imgBase64;
            var triggerDownload = $("<a>").attr("href", imgURL).attr("download", $('#simge').attr("class") + ".jpeg").appendTo("body");
            triggerDownload[0].click();
            triggerDownload.remove();
            $('body').css('overflow', 'hidden');
        })
    });
});