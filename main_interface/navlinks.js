$(function(){
    $('#homeicon a').attr("href", "../main_interface/main_interface.html")
    $('#gameicon a').attr("href", "../game/index.html")
    $('#inboxicon a').attr("href", "../postbox/mybox.html")
    $('#chaticon a').attr("href", "../postbox/index.html")
    $('#questionicon a').attr("href", "../questionnaire/index.html")
    $('#welcomeicon a').attr("href", "../index.html")
    $('#usericon a').attr("href", "../userSettings/userSettings.html")
    $(".icons a").css({ "font-size": "2.5vw", "color": "#0c3327" });
    $(".icons span").css({ "font-size": "1.5vw", "color": "#0c3327", "padding-left": "1vw" });
    $("#navbar").css({ "padding-left": "0", "padding-right": "1vw" });
})