function DSNV() {
    this.arrDS = []

    this.timNV = function (maNV) {
        var index = -1
        for (var i = 0; i < this.arrDS.length; i++) {
            if (this.arrDS[i].taiKhoan === maNV) {
                index = i
                break
            }
        }
        return index
    }


    this.themNV = function (nhanVien) {
        this.arrDS.push(nhanVien)

    }
    this.editNV = function (nhanVien2) {
        for (var i = 0; i < this.arrDS.length; i++) {
            if (this.arrDS[i].taiKhoan === nhanVien2.taiKhoan) {
                this.arrDS[i] = nhanVien2
            }
        }

    }
    this.xoaNV = function () {

    }


}