# HW06 - Bảng đánh giá và tổng kết kiểm thử

MSSV: **22127315**

## Assessment Template

| STT | Tiêu chí | Điểm tối đa | Tự đánh giá |
|---:|---|---:|---:|
| 1 | API 1 (FR-05) - đủ quy trình: tạo bằng AI, audit, bổ sung, thực thi, bug | 30 | _Chờ thực hiện_ |
| 2 | API 2 (FR-08) - đủ quy trình: tạo bằng AI, audit, bổ sung, thực thi, bug | 30 | _Chờ thực hiện_ |
| 3 | API 3 (FR-15) - đủ quy trình: tạo bằng AI, audit, bổ sung, thực thi, bug | 30 | _Chờ thực hiện_ |
| 4 | Agent Skill - AI-driven test generator | 10 | _Chờ thực hiện_ |
|  | **Tổng cộng** | **100** | **_Chờ thực hiện_** |

## Tổng kết test

| Chức năng | Số endpoint kiểm thử | Test AI tạo | Test tự thêm | Đã chạy | Pass | Fail | Số bug |
|---|---:|---:|---:|---:|---:|---:|---:|
| FR-05 Liệt kê/tìm kiếm sản phẩm | 2 | 0 | 0 | 4 request pilot | 11 assertions | 1 assertion | 0 (chưa xác nhận) |
| FR-08 Thanh toán | 2 | 0 | 0 | 4 request pilot | 9 assertions | 0 assertions | 0 (chưa xác nhận) |
| FR-15 Quản lý sản phẩm CRUD | 3 | 0 | 0 | 7 request pilot | 9 assertions | 1 assertion | 0 (chưa xác nhận) |
| **Tổng cộng** | **7** | **0** | **0** | **15 request pilot** | **29 assertions** | **2 assertions** | **0** |

Các số liệu trên là pilot run từ Newman ngày 2026-08-30. Chỉ cập nhật thành kết quả cuối sau khi audit và thực thi toàn bộ test case đã chọn.
