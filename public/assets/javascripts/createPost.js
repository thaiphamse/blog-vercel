Quill.register('modules/imageUpload', ImageUpload);
Quill.register('modules/blotFormatter', QuillBlotFormatter.default);
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
    quill1 = new Quill("#headingEditor", {
        theme: "snow",
        placeholder: "Tiêu đề bài viết...",
        modules: {
            toolbar: null

        }
    });

    // Khởi tạo Blot Formatter với các tùy chọn

    quill = new Quill("#editor", {
        theme: "snow",
        placeholder: "Nội dung bài viết...",
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
    const headingDelta = document.getElementById('headingDelta')
    saveContentBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const delta = quill.getContents()
        const heading = quill1.getContents()
        console.log(heading)
        contentDelta.value = JSON.stringify(delta.ops);
        headingDelta.value = JSON.stringify(heading.ops);

        contentForm.submit()
    })
});