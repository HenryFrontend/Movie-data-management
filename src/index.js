const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

var preIndex = 0
var preIndexOp = 0
var preIndexCg = 0

//* FORM
const infoMovie = [
    "tên phim",
    "năm phát hành",
    "link phim",
    "link ảnh nền",
    "tập số",
    "ngày update",
    "đạo diễn",
    "diễn viên",
    "thể loại",
    "hạng mục",
    "tóm tắt phim",
    "nguồn phim( link web chủ)"
]
const nameInput = [
    "movie'sName",
     "releaseYear",
     "movieLink",
     "backgroundImageLink",
     "numberSet",
     "updateDate",
     "director",
     "cast",
     "Category",
     "Categories",
     "movieSummary",
     "filmSource(websiteLink)"
]
function renderForm() {
    const input = infoMovie.map(info =>{
        return `<div class="blockInput">
        <label for="">${info}</label>
        <br>
        <input type="text" name="${nameInput[infoMovie.indexOf(info)]}" class="inputField">
        </div>`
    })
    $("form").innerHTML = input.join("")

    const listInput = $$('input')
    var listInputArr = Array.from(listInput)

    listInputArr.map(input=>{
        switch(input.name) {
            case  "releaseYear":
                input.type = "number"
                break
            case  "numberSet":
                input.placeholder = "Đối với phim lẻ hãy nhập chữ!"
                break
            case  "updateDate":
                input.type = "date"
                break
        }
        input.oninput = function( ){
            input.style.border = "1px solid black"
        }
    })


    // ! QUY ƯỚC: Nếu giá trị của trường Tập Số không phải là số thì mặc định đó là phim lẻ
    var i =0
    $('button').onclick = function() {
        listInputArr.forEach(input=>{
            if(input.value.trim().length ===0 ){
                input.style.border = "1px solid red"
                i++
            }
        })
        if(i===0) {
            postApi()
        } else {
            msg(i)
        }
        i=0
    }

    function msg(i) {
        alert("Bạn còn bỏ sót " + i +  " trường --- Vui lòng hoàn thành!!!")
    }
    function postApi(){
        alert("UPDATE thành công.")
    }
}
renderForm()

// ! Handle click event OPTION

const categories = [
    "phim tội phạm",
    "phim lịch sử",
    "phim chiến tranh",
    "phim khoan học viễn tưởng",
    "phim thể thao",
    "phim kiếm hiệp",
    "phim cổ trang",
    "phim hành động",
    "phim phiêu lưu",
    "phim bí ẩn",
    "phim hài kịch",
    "phim kinh dị",
    "phim giật gân",
    "phim kì ảo",
    "phim lãng mạn",
    "phim hoạt hình",
    "phim khoa học",
    "phim ca nhạc",
]

function renderCategory() {
    const blockCategory = categories.map(category=>{
        return `<button>${category}</button>`
    })
    $('.category').innerHTML = blockCategory.join("")
}
renderCategory()

const listOption = $$('.option button')
var listOptionArr = Array.from(listOption)
const listCategory = $$('.category button')
var listCategoryArr = Array.from(listCategory)

var option = ''
var category = ''

listOptionArr.map(item=>{
    item.onclick = function () {
        listOptionArr[preIndexOp].style.backgroundColor = "green"
        preIndexOp = listOptionArr.indexOf(item)
        item.style.backgroundColor = "#333"
        option = item.innerText
        renderResult(option, category)
    }
})

listCategoryArr.map(item=>{
    item.onclick = function () {
        listCategoryArr[preIndexCg].style.backgroundColor = "orangered"
        preIndexCg = listCategoryArr.indexOf(item)
        item.style.backgroundColor = "#333"
        category = item.innerText
        renderResult(option, category)
    }
})

function renderResult(option, category) {
    console.log(option, category)
    $('.nameResult p').innerText = `${option} - Thể loại ${category}`
}

// ! Handle click event ITEM

const listItem = $$('.item')
var listItemArr = Array.from(listItem)

listItemArr.map(item=>{
    item.onclick = function () {
        listItemArr[preIndex].style.backgroundColor = "#eee"
        listItemArr[preIndex].style.color = "black"
        listItemArr[preIndex].style.border = "1px solid #555"
        preIndex = listItemArr.indexOf(item)
        item.style.backgroundColor = "#ccc"
        item.style.color = "blue"
        item.style.border = "1px solid blue"
    }
})


fetch("https://henryfrontend.github.io/Movie-Source-Data")
.then(res=>{
    res.json()
})
.then(source=>{
    console.log(source)
})