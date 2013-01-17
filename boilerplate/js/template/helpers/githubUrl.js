define(['handlebars', 'underscore'], function (Handlebars, Underscore) {
    "use strict";
    function githubUrl(file, title) {
        var url = "https://github.com/beenokle/brixjs/blob/master/boilerplate/js/" + file;
        if (!Underscore.isString(title)) {
            title = file;
        }
        return new Handlebars.SafeString("<a href='" + url + "' target='_blank'>" + title + "</a>");
    }

    Handlebars.registerHelper('githubUrl', githubUrl);
    return githubUrl;
});
