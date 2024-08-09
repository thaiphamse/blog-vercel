Quill.register('modules/imageUpload', ImageUpload);
var quill
document.addEventListener("DOMContentLoaded", function () {
    const fullToolbarOptions = [
        [{ 'align': [] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline"],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        ["link"],
        ["image"]
    ];

    console.log("Dom loaded");
    Quill.register('modules/blotFormatter', QuillBlotFormatter.default);

    // Khởi tạo Blot Formatter với các tùy chọn

    quill = new Quill("#editor", {
        theme: "snow",
        modules: {
            toolbar: {
                container: fullToolbarOptions
            },
            blotFormatter: {
                overlay: {
                    className: 'blot-formatter__overlay',
                    style: {
                        boxSizing: 'border-box',
                        border: 'none',
                    }
                },

            }
        }
    });
    quill.getModule('toolbar').addHandler('image', () => {
        const imageUploader = new ImageUpload(quill, {
            uploadPreset: 'vr8eratg',
            uploadUrl: 'https://api.cloudinary.com/v1_1/disrx4gzn/image/upload'
        });
        imageUploader.selectLocalImage();
    });


    const contentForm = document.getElementById('content-form')
    const saveContentBtn = document.querySelector('.save-content-btn')
    const contentDelta = document.getElementById('contentDelta')
    saveContentBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const delta = quill.getContents()
        console.log(delta)
        contentDelta.value = JSON.stringify(delta.ops);
        contentForm.submit()
    })
});