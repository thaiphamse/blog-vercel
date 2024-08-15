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

    function convertToSlug(text) {
        // Bước 1: Chuyển về chữ thường
        text = text.toLowerCase();

        // Bước 2: Thay thế các ký tự có dấu tiếng Việt bằng ký tự không dấu
        const from = "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ";
        const to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd";

        for (let i = 0; i < from.length; i++) {
            text = text.replace(new RegExp(from[i], 'g'), to[i]);
        }

        // Bước 3: Loại bỏ các ký tự đặc biệt và thay thế khoảng trắng bằng dấu '-'
        text = text.replace(/[^a-z0-9\s-]/g, '') // Loại bỏ ký tự không phải chữ và số
            .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu '-'
            .replace(/-+/g, '-'); // Xóa bớt dấu '-'

        // Bước 4: Xóa dấu '-' ở đầu và cuối chuỗi
        text = text.replace(/^-+|-+$/g, '');

        return text;
    }

    // Ví dụ sử dụng
    const title = "Định nghĩa web động";
    const slug = convertToSlug(title);
    console.log(slug); // Output: "dinh-nghia-web-dong"


    // Generate Table of Contents
    function generateTableOfContents() {
        // const toc = document.getElementById('table-of-contents');
        // toc.innerHTML = '';

        const headers = document.querySelectorAll('.main-editor .ql-editor h1, .main-editor .ql-editor h2, .main-editor .ql-editor h3, .main-editor .ql-editor h4, .main-editor .ql-editor h5, .main-editor .ql-editor h6');
        console.log(headers)
        headers.forEach((header, index) => {
            const tableOfContent = document.querySelector(".table-of-content")
            const headerSlug = convertToSlug(header.textContent)
            const id = `${headerSlug}`;
            header.setAttribute('id', id);

            const link = document.createElement('a');
            link.setAttribute('href', `#${id}`);
            link.classList.add("list-group-item")
            link.classList.add("list-group-item-action")

            link.textContent = `${header.textContent}`;
            link.style.display = 'block';
            link.style.paddingLeft = `${(parseInt(header.tagName[1]) - 1) * 22}px`; // indent based on header level
            tableOfContent.appendChild(link);
        });
    }
    generateTableOfContents()
});

console.log("cak")



