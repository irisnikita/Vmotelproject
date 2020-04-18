export const fortmatName = (key) => {
    if (key && typeof key === 'string') {
        switch (key) {
            case 'fullName':
                return 'Tên khách hàng';
            case 'sex':
                return 'Giới tính';
            case 'job':
                return 'Nghề nghiệp';
            case 'workPlace':
                return 'Nơi làm việc';
            case 'tempReg':
                return 'Đăng ký tạm trú';
            case 'address':
                return 'Địa chỉ';
            case 'dateBirth':
                return 'Ngày sinh';
            case 'email':
                return 'Địa chỉ email';
            case 'avatar':
                return 'Ảnh đại diện';
            case 'phoneNumber':
                return 'Số điện thoại';
            case 'codeUser':
                return 'Mã khách hàng';
            case 'male':
                return 'Name';
            case 'female':
                return 'Nữ';
            default:
                return '';
        }
    }
};