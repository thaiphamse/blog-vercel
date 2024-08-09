document.addEventListener("DOMContentLoaded", function () {

    console.log("Dom loaded");
    headingQuill = new Quill(".headingEditor", {
        theme: "snow",
        modules: {
            toolbar: null
        },
        readOnly: true
    });

    quill = new Quill(".editor", {
        theme: "snow",
        modules: {
            toolbar: null
        },
        readOnly: true
    });

});





