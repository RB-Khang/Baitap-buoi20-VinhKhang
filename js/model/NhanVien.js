function NhanVien(_taiKhoan, _name, _email, _pw, _ngayLam, _luongCB, _gioLam, _chucVu) {
    this.taiKhoan = _taiKhoan
    this.name = _name
    this.email = _email
    this.pw = _pw
    this.ngayLam = _ngayLam
    this.luongCB = _luongCB
    this.gioLam = _gioLam
    this.chucVu = _chucVu
    this.xepLoai = function () {
        if (this.gioLam < 160) {
            return 'Nhân viên trung bình'
        } else if (this.gioLam < 176) {
            return 'Nhân viên khá'
        } else if (this.gioLam < 192) {
            return 'Nhân viên giỏi'
        } else if (this.gioLam >= 192) {
            return 'Nhân viên xuất sắc'
        }
    }

    this.tongLuong = function () {
        if (this.chucVu === 'Sếp') {
            return this.luongCB * 3
        } else if (this.chucVu === 'Trưởng phòng') {
            return this.luongCB * 2
        } else if (this.chucVu === 'Nhân viên') {
            return this.luongCB * 1
        }
    }



  

}