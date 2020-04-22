import {message} from 'antd'; 

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
            case 'note':
                return 'Ghi chú';
            case 'identifyFront':
                return 'Ảnh cmnd mặt trước';
            case 'identifyBack':
                return 'Ảnh cmnd mặt sau';
            default:
                return '';
        }
    }
};

export function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

export function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}