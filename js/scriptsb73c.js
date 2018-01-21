(function(){
    window.config = {
        origin: 1048,
        title: 'BR Videochat',
        show_logo: false,
        rules_link: 'https://chat-pt.com/rules',
        vertical_layout: true
    };
    var socialButtons = ["google", "facebook", "facebook-share", "twitter"],
        embedded = !!window.embed,
        $socialWrapper = $('#social-wrapper');

    var initializeSocialWrapper = function(e) {
        if (embedded) return;

        return new Promise(function(resolve, reject) {
            var sumWidgetsWidth = 0;
            $.each(socialButtons, function (priority, button) {
                widgetId = typeof button == 'string' ? button : button.id;
                sumWidgetsWidth += $("#" + widgetId).width() + 15;
                socialButtons[priority] = {id: widgetId, widthToShow: sumWidgetsWidth};
            });
            if (e) {
                $socialWrapper.show();
                gapi.plus.go();
                interval = setInterval(function(){
                    if ($('#google').width()) {
                        resizeSocialWrapper();
                        clearInterval(interval);
                    }
                }, 50);
            }
            resolve();
        });
    };
    var resizeSocialWrapper = function (e, data) {
        if (embedded) return;

        initializeSocialWrapper().then(function() {
            // if (data) {
            //     var top = data.topOffset - $socialWrapper.height() / 2;
            //     $socialWrapper.css("left", (data.chatOffset + data.topOffset - 35) + "px");
            //     $socialWrapper.css("right", data.topOffset - 10 + "px");
            //     $socialWrapper.css("top", top + "px");
            // }

            var w = $socialWrapper.width();
            $.each(socialButtons, function (priority, widgetInfo) {
                var display = w >= widgetInfo.widthToShow ? 'block' : 'none';
                $("#" + widgetInfo.id).css('display', display);
            });
        });
    };
    $(window).on('roulette:resize', resizeSocialWrapper);

    $(window).on('roulette:init', initializeSocialWrapper);
})();
