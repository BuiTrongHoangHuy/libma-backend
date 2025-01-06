const nodemailer = require('nodemailer');
const AWS = require('aws-sdk');
require('dotenv').config();

const accessKeyId = process.env.AWS_ACCESS_KEY || "";
const secretAccessKey = process.env.AWS_SECRET_KEY || "";
AWS.config.update({
    region: 'ap-southeast-1',
    accessKeyId: accessKeyId, // Lấy từ IAM
    secretAccessKey: secretAccessKey,
    AWS_SDK_LOAD_CONFIG:1// Lấy từ IAM
});

const transporter = nodemailer.createTransport({
    SES: new AWS.SES({
        apiVersion: '2010-12-01',
    }),
});

export const sendEmail = async ({data,reader}) => {
    const mailOptions = {
        from: 'h5inventory@h5shop.shop',
        to: 'cuhuy2004vn@gmail.com',
        subject: 'Thông Báo Xử Lý Vi Phạm',
        html: `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thông Báo Xử Lý Vi Phạm</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 {
            font-size: 24px;
            color: #333;
        }
        p {
            font-size: 16px;
            line-height: 1.6;
        }
        .highlight {
            color: #d9534f;
            font-weight: bold;
        }
        .button {
            display: inline-block;
            background-color: #007bff;
            color: #fff;
            padding: 12px 25px;
            border-radius: 4px;
            text-decoration: none;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #888;
            margin-top: 30px;
        }
        .footer a {
            color: #007bff;
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>Thông Báo Xử Lý Vi Phạm</h1>
        <p>Chào <strong>${reader.full_name}</strong>,</p>

        <p>Chúng tôi muốn thông báo đến bạn về hành động xử lý vi phạm liên quan đến các hoạt động của bạn tại thư viện.</p>

        <p><span class="highlight">Số vi phạm:</span> ${data.violation_id}</p>
        <p><span class="highlight">Mức phạt:</span> ${data.fine_amount} VNĐ</p>
        <p><span class="highlight">Lý do:</span> ${data.violation_type}</p>

        <p>Xin lưu ý, việc thanh toán phạt này là cần thiết để bạn có thể tiếp tục sử dụng dịch vụ của thư viện. Nếu bạn có bất kỳ câu hỏi nào về vi phạm này, vui lòng liên hệ với chúng tôi qua email này hoặc gọi đến số điện thoại hỗ trợ.</p>



        <div class="footer">
            <p>Thư viện Libma</p>
            <p>Địa chỉ: UIT</p>
            <p>Điện thoại: +84 123 456 789</p>
            <p>Email: <a href="mailto:support@xyzlibrary.com">support@xyzlibrary.com</a></p>
        </div>
    </div>

</body>
</html>
    `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email đã gửi thành công: ', info);
    } catch (error) {
        console.error('Lỗi khi gửi email: ', error);
    }
};

