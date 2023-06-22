function getID(id) {
    return document.getElementById(id)
}
var dsnv = new DSNV
var btnThemND = getID('btnThemNV')
var btnThemNV = getID('btnThem')
var btnUpdate = getID('btnCapNhat')
var isValid = true


getLocal()
renderDS()



function getThongTinNV() {
    var taiKhoan = getID('tknv').value
    var name = getID('name').value
    var email = getID('email').value
    var pw = getID('password').value
    var ngayLam = getID('datepicker').value
    var luongCB = getID('luongCB').value * 1
    var gioLam = getID('gioLam').value * 1
    var chucVu = getID('chucvu').value

    var nhanVien = new NhanVien(taiKhoan, name, email, pw, ngayLam, luongCB, gioLam, chucVu)
    return nhanVien
}



btnThemND.onclick = function () {
    var testTk = testTaiKhoan()
    var testCV = testChucVu()
    var tstEmail = testEmail()
    var nameTest = testTen()
    var testGL = testGioLam()
    var testLCB = testLuongCB()
    var testNL = testNgayLam()
    var testPassword = testPW()

    if (testTk === true && nameTest === true && tstEmail === true && testPassword === true && testNL === true && testLCB === true && testCV === true && testGL === true) {
        var nhanVien = getThongTinNV()
        dsnv.themNV(nhanVien)
        setLocal()
        renderDS()
    }
}



btnThemNV.onclick = function () {
    getID('myForm').reset()
    getID('tknv').readOnly = false
    var thongBao = document.getElementsByClassName('sp-thongbao')
    for (var i = 0; i < thongBao.length; i++) {
        thongBao[i].style.display = 'none'
    }

}

// local function 
function setLocal() {
    var data = JSON.stringify(dsnv.arrDS)
    localStorage.setItem('dsnv', data)
}


function getLocal() {
    var data = localStorage.getItem('dsnv')
    var data2 = JSON.parse(data)
    if (data2) {
        var parseData = []
        for (var i = 0; i < data2.length; i++) {
            var nvTemp = data2[i]
            var nv = new NhanVien(nvTemp.taiKhoan, nvTemp.name, nvTemp.email, nvTemp.pw, nvTemp.ngayLam, nvTemp.luongCB, nvTemp.gioLam, nvTemp.chucVu)
            parseData.push(nv)
        }
        dsnv.arrDS = parseData
    }
}



//RENDER 
function renderDS(arrNV = dsnv.arrDS) {
    var content = ''
    for (var i = 0; i < arrNV.length; i++) {
        content += `
        <tr>
		    <td>${arrNV[i].taiKhoan}</td>
		    <td>${arrNV[i].name}</td>
		    <td>${arrNV[i].email}</td>
		    <td>${arrNV[i].ngayLam}</td>
		    <td>${arrNV[i].chucVu}</td>
		    <td>${arrNV[i].tongLuong()}</td>
		    <td>${arrNV[i].xepLoai()}</td>
		    <td>
            <button class="btn btn-success btn__margin" data-toggle="modal"
            data-target="#myModal" onclick = editNV('${dsnv.arrDS[i].taiKhoan}')>Edit</button>
            <button class="btn btn-danger btn__margin" onclick = deleteNV('${dsnv.arrDS[i].taiKhoan}')>Delete</button></td>
		</tr>
        `
    }
    getID('tableDanhSach').innerHTML = content
}


function editNV(maNV) {
    var index = dsnv.timNV(maNV)
    var thongBao = document.getElementsByClassName('sp-thongbao')
    for (var i = 0; i < thongBao.length; i++) {
        thongBao[i].style.display = 'none'
    }
    getID('tknv').value = dsnv.arrDS[index].taiKhoan
    getID('tknv').readOnly = true
    getID('tbTKNV').style.display = 'none'

    getID('name').value = dsnv.arrDS[index].name
    getID('email').value = dsnv.arrDS[index].email
    getID('password').value = dsnv.arrDS[index].pw
    getID('datepicker').value = dsnv.arrDS[index].ngayLam
    getID('luongCB').value = dsnv.arrDS[index].luongCB
    getID('gioLam').value = dsnv.arrDS[index].gioLam
    getID('chucvu').value = dsnv.arrDS[index].chucVu
}




function testTaiKhoan() {
    var tkTest = lengthTest('tknv', 4, 6, "tbTKNV", "Tài khoản phải từ 4 - 6 ký tự")
    if (tkTest === true && getID('tknv').readOnly === false) {
        var trungTK = true
        for (var i = 0; i < dsnv.arrDS.length; i++) {
            if (getID('tknv').value === dsnv.arrDS[i].taiKhoan) {
                getID('tbTKNV').style.display = 'inline-block'
                getID('tbTKNV').innerHTML = 'Tài khoản bị trùng'
                trungTK = false
            }
        }
        if (trungTK === true) {
            getID('tbTKNV').style.display = 'none'
            return true
        } else return false
    } else return false
}



function testTen() {
    var nameTest = lengthTest('name', 1, undefined, 'tbTen', 'Không để trống')
    if (nameTest) {
        var test = patternTest('name', 'tbTen', namePattern, "Tên phải là chữ ")
        if (test) { return true } else return false
    } else return true
}



function testEmail() {
    var emailTest = lengthTest('email', 1, undefined, 'tbEmail', 'Không để trống')
    if (emailTest) {
        var test = patternTest('email', 'tbEmail', emailPattern, "Email không đúng định dạng")
        if (test) { return true } else return false
    } else false
}


function testPW() {
    var pwTest = lengthTest('password', 1, undefined, 'tbMatKhau', 'Không để trống')
    if (pwTest) {
        var test = patternTest('password', 'tbMatKhau', pwPattern, "Password từ 6 đến 10 lý tự, cần chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt")
        if (test) { return true } else return false
    }
}
function testNgayLam() {
    var pwTest = lengthTest('datepicker', 1, undefined, 'tbNgay', 'Không để trống')
    if (pwTest) {
        var test = patternTest('datepicker', 'tbNgay', dayPattern, "Ngày theo định dạng mm/dd/yyyy")
        if (test) { return true } else return false
    } else return false
}
function testLuongCB() {
    var luongCBTest = lengthTest('luongCB', 1, undefined, 'tbLuongCB', 'Không để trống')
    var luongtest = getID('luongCB').value * 1
    if (luongCBTest === true && Number.isInteger(luongtest) === true) {
        if (luongtest < 1000000 || luongtest > 20000000) {
            getID('tbLuongCB').style.display = 'inline-block'
            getID('tbLuongCB').innerHTML = 'Lương từ 1 tới 20 triệu'
            return false
        } else {
            getID('tbLuongCB').style.display = 'none'
            return true
        }
    }
}
function testChucVu() {
    if (getID('chucvu').value === 'Chọn chức vụ') {
        getID('tbChucVu').style.display = 'inline-block'
        getID('tbChucVu').innerHTML = 'Chọn chức vụ'
        return false
    } else {
        getID('tbChucVu').style.display = 'none'
        return true
    }
}
function testGioLam() {
    var gioLamTest = lengthTest('gioLam', 1, undefined, 'tbGiolam', 'Không để trống')
    var gltest = getID('gioLam').value * 1
    if (gioLamTest === true && Number.isInteger(gltest) === true) {
        if (gltest < 80 || gltest > 200) {
            getID('tbGiolam').style.display = 'inline-block'
            getID('tbGiolam').innerHTML = 'Giờ làm trong tháng từ 80 - 200 giờ'
            return false
        } else {
            getID('tbGiolam').style.display = 'none'
            return true
        }
    } else return false
}




btnUpdate.onclick = function () {
    

    // var testTk = testTaiKhoan()
    var testCV = testChucVu()
    var tstEmail = testEmail()
    var nameTest = testTen()
    var testGL = testGioLam()
    var testLCB = testLuongCB()
    var testNL = testNgayLam()
    var testPassword = testPW()

    // console.log(testCV, tstEmail, nameTest, testGL, testLCB, testNL, testPassword)

    if ( nameTest === true && tstEmail === true && testPassword === true && testNL === true && testLCB === true && testCV === true && testGL === true) {
        var nhanVien2 = getThongTinNV()
        dsnv.editNV(nhanVien2)
        setLocal()
        getLocal()
        renderDS()
    }

}



function deleteNV(maNV) {
    var index = dsnv.timNV(maNV)
    dsnv.arrDS.splice(index, 1)
    setLocal()
    getLocal()
    renderDS()
}





var namePattern = new RegExp('^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$')
var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
var pwPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,10}$/
var dayPattern = /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}/






//runtime validation
getID("tknv").onblur = function () {
    testTaiKhoan()
}
getID('name').onblur = function () {
    testTen()
}
getID('email').onblur = function () {
    testEmail()
}
getID('password').onblur = function () {
    testPW()
}
getID('datepicker').onblur = function () {
    testNgayLam()
}
getID('luongCB').onblur = function () {
    testLuongCB()
}
getID('chucvu').onclick = function () {
    testChucVu()
}
getID('gioLam').onblur = function () {
    testGioLam()
}





getID('searchName').addEventListener('keyup', function () {
    var valueSearch = getID('searchName').value.toLowerCase()
    var arrNVSearch = []
    for (var i = 0; i < dsnv.arrDS.length; i++) {
        var xepLoaiNV = dsnv.arrDS[i].xepLoai().toLowerCase()
        // console.log(xepLoaiNV)
        if (xepLoaiNV.indexOf(valueSearch) !== -1) {
            arrNVSearch.push(dsnv.arrDS[i])
        }
    }

    // console.log(arrNVSearch)
    renderDS(arrNVSearch)
})
