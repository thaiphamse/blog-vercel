const classLoading = [
    'submit', 'loading',
]
classLoading.forEach(className => {
    let button = document.querySelectorAll(`.${className}`)
    if (!button) return
    button.forEach(item => {
        item.addEventListener('click', function () {
            // Hiển thị spinner
            var spinner = document.getElementById('spinner-overlay');
            console.log(spinner);
            spinner.style = 'display: flex !important;';

        });
    })

});

// Đảm bảo rằng overlay được ẩn khi trang được tải lại hoặc khi người dùng quay lại trang
window.addEventListener('pageshow', function () {
    var overlay = document.getElementById('spinner-overlay');
    overlay.style.display = 'none';
});

let lastScrollTop = 0;
const header = document.querySelector('.header');
const hideThreshold = 100; // Đoạn cuộn xuống để ẩn header
const revealThreshold = 100; // Đoạn cuộn lên để hiện lại header
let scrollDownDistance = 0;
let scrollUpDistance = 0;

window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Cuộn xuống
        scrollDownDistance += scrollTop - lastScrollTop;
        scrollUpDistance = 0; // Reset khoảng cách cuộn lên khi cuộn xuống

        if (scrollDownDistance >= hideThreshold) {
            header.style.top = '-80px'; // Ẩn header sau khi cuộn xuống đủ đoạn
        }
    } else {
        // Cuộn lên
        // Cuộn lên
        if (scrollTop === 0) {
            header.style.top = '0'; // Hiện lại header khi cuộn lên đầu trang
        }
    }

    lastScrollTop = scrollTop;
});


