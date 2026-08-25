# AI CRITIQUE & REFLECTION

## 1. Mức độ đóng góp của AI
* **Hỗ trợ tạo kịch bản:** AI giúp xây dựng nhanh cấu trúc file JMX chuẩn theo yêu cầu命名 (naming conventions).
* **Phân tích dữ liệu log:** AI xử lý và phân tích nhanh dữ liệu thô từ file `.jtl` sang các chỉ số thống kê (Average, Error %, Connect Time) chính xác.
* **Giải quyết sự cố (Troubleshooting):** AI cung cấp giải pháp khắc phục lỗi giao diện JMeter khi đọc/ghi file `.jtl`.

## 2. Điểm hạn chế & Kiểm chứng độc lập (Fact-Checking)
* **Giới hạn của AI:** AI có xu hướng mặc định các file log tự động tạo khi bấm Browse trên giao diện, dẫn đến việc người dùng gặp lỗi thiếu file `.jtl` nếu chưa thực thi test.
* **Xác minh từ sinh viên:**
  * Đối chiếu độc lập chỉ số trong file `.jtl` thô với bảng tổng hợp của AI.
  * Kiểm tra tài nguyên CPU/RAM trên Task Manager thực tế để xác nhận điểm nghẽn hạ tầng.