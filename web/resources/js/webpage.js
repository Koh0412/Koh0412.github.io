$(function () {
    document.body.oncontextmenu = () => {
        $('.mywindow').show();
        return false;
    };

    $('.close-window').on('click', () => {
        $('.mywindow').hide();
    });
});
