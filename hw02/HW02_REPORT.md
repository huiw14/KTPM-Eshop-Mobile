# BÁO CÁO BÀI TẬP HW02 - DOMAIN TESTING TRÊN ESHOP

## 1. Thông tin chung
- Học phần: Kiểm thử phần mềm
- Bài tập: HW02 - Domain Testing & BVA
- Sinh viên thực hiện: Nguyễn Hoàng Uyển Như - 22127315

---

## 2. Danh sách tính năng thực hiện kiểm thử 
- Pool A: FR-04: Quản lý hồ sơ cá nhân
- Pool B: FR-07: Giỏ hàng (Shopping Cart)
- Pool c: FR-14: Quản lý Danh mục (Category CRUD)
- Pool D: FR-05: Xem danh sách & Tìm kiếm sản phẩm

---

## 3. Chi tiết các tính năng
---

# Tính năng FR-04: Quản lý hồ sơ cá nhân (User Profile Management)

## 1. Phân tích Thành phần Hộp đen

### **Inputs & Triggers:**

#### **Explicit Inputs (Dữ liệu người dùng điền/chọn):**
1. **Họ Tên (Full Name)** — Người dùng nhập vào trường text
   - Loại dữ liệu: String
   - Điều kiện: Bắt buộc (dựa trên FR-01, tên là thông tin đăng ký)

2. **Số điện thoại (Phone Number)** — Người dùng nhập vào trường text
   - Loại dữ liệu: String
   - Điều kiện: Bắt đầu với `0`, từ 10–11 chữ số (optional / required?)

3. **Địa chỉ giao hàng mặc định (Default Shipping Address)** — Người dùng nhập vào trường text
   - Loại dữ liệu: String
   - Điều kiện: Optional (không bắt buộc)

#### **Implicit Inputs (Trạng thái/Điều kiện hệ thống):**
1. **Trạng thái đăng nhập** — Người dùng **phải đã đăng nhập** (JWT Token hợp lệ)
2. **User ID / Context** — Hệ thống xác định người dùng từ Token (không cho phép thay đổi hồ sơ người khác)
3. **Role trong Token** — Người dùng **không thể tự thay đổi** thuộc tính `role` (bảo mật)
4. **Email từ DB** — Email **không được phép hiển thị trong form edit** (read-only hoặc ẩn)

#### **Triggers (Hành động bấm nút):**
1. **Truy cập trang/form Quản lý hồ sơ** — Xem form với các trường hiện tại
2. **Cập nhật thông tin** — Bấm nút "Lưu" / "Cập nhật" / "Hoàn tất"
3. **Hủy bỏ** — Bấm nút "Hủy" / "Quay lại" (không lưu thay đổi)

---

### **Outputs (Phản hồi/Thông báo mong đợi):**

1. **Form hiển thị thông tin hiện tại:**
   - Họ Tên: [giá trị hiện tại]
   - Số điện thoại: [giá trị hiện tại hoặc trống]
   - Địa chỉ giao hàng: [giá trị hiện tại hoặc trống]
   - Email: **Hiển thị (read-only, không cho edit)** hoặc ẩn
   - Role: **KHÔNG hiển thị trong form** (không cho edit)

2. **Validation Messages (Thông báo lỗi):**
   - "Họ Tên không được để trống"
   - "Số điện thoại phải bắt đầu bằng 0"
   - "Số điện thoại phải từ 10–11 chữ số"
   - "Địa chỉ không hợp lệ" (nếu có validation khác)

3. **Success Messages (Thông báo thành công):**
   - "Cập nhật hồ sơ thành công" (Toast / Alert)
   - Form reset sau khi lưu, hoặc chuyển hướng về trang hồ sơ

4. **Authorization Messages (Lỗi quyền hạn):**
   - "Bạn không có quyền cập nhật hồ sơ này" (nếu cố gắng edit hồ sơ người khác)
   - "Vui lòng đăng nhập" (nếu chưa đăng nhập)

5. **Email Read-Only:**
   - Email hiển thị nhưng không thể chỉnh sửa (disabled input hoặc text-only)

---

## 2. Bảng Phân Hoạch Lớp Tương Đương (Equivalence Classes)

| Biến Đầu Vào | Mã Lớp | Miền Giá Trị / Mô Tả | Loại |
| --- | --- | --- | --- |
| **Họ Tên (Full Name — String)** | | | |
| | EC1 | Full Name: 1–255 ký tự hợp lệ (VD: "Nguyễn Văn A") | Valid |
| | EC2 | Full Name: Rỗng ("") | Invalid |
| | EC3 | Full Name: Chứa ký tự đặc biệt / XSS (VD: "<script>alert(1)</script>") | Invalid (Security) |
| | EC4 | Full Name: Quá dài (> 255 ký tự) | Invalid |
| **Số điện thoại (Phone Number — String, Ordered)** | | | |
| | EC5 | Phone: 10 chữ số, bắt đầu "0" (VD: "0987654321") | Valid |
| | EC6 | Phone: 11 chữ số, bắt đầu "0" (VD: "09876543210") | Valid |
| | EC7 | Phone: Rỗng ("") | Valid (Optional) |
| | EC8 | Phone: Không bắt đầu "0" (VD: "1987654321") | Invalid |
| | EC9 | Phone: 9 chữ số, bắt đầu "0" (VD: "098765432") — dưới min | Invalid |
| | EC10 | Phone: 12 chữ số, bắt đầu "0" (VD: "098765432101") — trên max | Invalid |
| | EC11 | Phone: Chứa ký tự không phải số (VD: "0987ABC321") | Invalid |
| | EC12 | Phone: Chứa khoảng trắng hoặc ký tự đặc biệt (VD: "09 8765 4321") | Invalid |
| **Địa chỉ giao hàng (Shipping Address — String)** | | | |
| | EC13 | Address: 1–500 ký tự hợp lệ (VD: "123 Đường A, Quận 1, TP.HCM") | Valid |
| | EC14 | Address: Rỗng ("") | Valid (Optional) |
| | EC15 | Address: Chứa ký tự XSS (VD: "<img src=x onerror=alert(1)>") | Invalid (Security) |
| | EC16 | Address: Quá dài (> 500 ký tự) | Invalid |
| **Trạng thái Đăng nhập (Authentication — Implicit)** | | | |
| | EC17 | User đã đăng nhập (JWT Token hợp lệ) | Valid |
| | EC18 | User chưa đăng nhập (không có Token hoặc Token hết hạn) | Invalid |
| **Quyền truy cập (Authorization — Implicit)** | | | |
| | EC19 | Cập nhật hồ sơ của chính mình (User_ID từ Token = User_ID trong URL) | Valid |
| | EC20 | Cố gắng cập nhật hồ sơ người khác (User_ID từ Token ≠ User_ID trong URL) | Invalid |
| **Email (Read-Only — Implicit)** | | | |
| | EC21 | Email hiển thị nhưng không cho edit (disabled / read-only) | Valid |
| | EC22 | Cố gắng thay đổi Email qua form / API | Invalid |
| **Role (Read-Only — Implicit)** | | | |
| | EC23 | Role không hiển thị trong form edit | Valid |
| | EC24 | Cố gắng thay đổi Role từ user (VD: từ "user" thành "admin") | Invalid |

---

## 3. Các Bảng Kịch Bản Thành Phần (Rời Rạc)

### 3.1. Bảng Kịch Bản Domain Testing (DT)

| DT ID | Lớp Bao Phủ | Mô tả Kịch Bản | Dữ liệu đầu vào | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| FR-04-DT-01 | EC1 | Cập nhật Họ Tên hợp lệ | Full Name = "Trần Thị B", Phone = "" (giữ nguyên), Address = "" | **Success:** "Cập nhật thành công", Họ Tên = "Trần Thị B" |
| FR-04-DT-02 | EC2 | Họ Tên để trống | Full Name = "", Phone = "0987654321" | **Error:** "Họ Tên không được để trống" |
| FR-04-DT-03 | EC3 | Họ Tên chứa XSS payload | Full Name = "<script>alert(1)</script>", Phone = "" | **Error:** Từ chối hoặc escape payload (không render HTML) |
| FR-04-DT-04 | EC4 | Họ Tên quá dài (> 255) | Full Name = [256 ký tự], Phone = "" | **Error:** "Họ Tên quá dài" |
| FR-04-DT-05 | EC5 | Phone hợp lệ 10 chữ số | Full Name = "Nguyễn Văn C", Phone = "0987654321", Address = "" | **Success:** "Cập nhật thành công", Phone = "0987654321" |
| FR-04-DT-06 | EC6 | Phone hợp lệ 11 chữ số | Full Name = "Nguyễn Văn D", Phone = "09876543210", Address = "" | **Success:** "Cập nhật thành công", Phone = "09876543210" |
| FR-04-DT-07 | EC7 | Phone để trống (optional) | Full Name = "Nguyễn Văn E", Phone = "", Address = "TP.HCM" | **Success:** "Cập nhật thành công", Phone = "" (hoặc NULL) |
| FR-04-DT-08 | EC8 | Phone không bắt đầu "0" | Full Name = "Nguyễn Văn F", Phone = "1987654321" | **Error:** "Số điện thoại phải bắt đầu bằng 0" |
| FR-04-DT-09 | EC9 | Phone dưới 10 chữ số | Full Name = "Nguyễn Văn G", Phone = "098765432" | **Error:** "Số điện thoại phải từ 10–11 chữ số" |
| FR-04-DT-10 | EC10 | Phone trên 11 chữ số | Full Name = "Nguyễn Văn H", Phone = "098765432101" | **Error:** "Số điện thoại phải từ 10–11 chữ số" |
| FR-04-DT-11 | EC11 | Phone chứa ký tự không phải số | Full Name = "Nguyễn Văn I", Phone = "0987ABC321" | **Error:** "Số điện thoại phải chỉ chứa chữ số" |
| FR-04-DT-12 | EC12 | Phone chứa khoảng trắng | Full Name = "Nguyễn Văn J", Phone = "09 8765 4321" | **Error:** "Số điện thoại không hợp lệ" |
| FR-04-DT-13 | EC13 | Address hợp lệ | Full Name = "Nguyễn Văn K", Phone = "0987654321", Address = "123 Đường A, Q.1, TP.HCM" | **Success:** "Cập nhật thành công", Address = "123 Đường A, Q.1, TP.HCM" |
| FR-04-DT-14 | EC14 | Address để trống (optional) | Full Name = "Nguyễn Văn L", Phone = "0987654321", Address = "" | **Success:** "Cập nhật thành công", Address = "" (hoặc NULL) |
| FR-04-DT-15 | EC15 | Address chứa XSS payload | Full Name = "Nguyễn Văn M", Address = "<img src=x onerror=alert(1)>" | **Error:** Từ chối hoặc escape (không render HTML) |
| FR-04-DT-16 | EC16 | Address quá dài (> 500) | Full Name = "Nguyễn Văn N", Address = [501 ký tự] | **Error:** "Địa chỉ quá dài" |
| FR-04-DT-17 | EC17 | User đã đăng nhập, cập nhật hồ sơ của chính mình | Token hợp lệ, User_ID = 5 (from Token), cập nhật User_ID = 5 | **Success:** "Cập nhật thành công" |
| FR-04-DT-18 | EC18 | User chưa đăng nhập | Không có Token, truy cập form | **Error/Redirect:** "Vui lòng đăng nhập", chuyển trang đăng nhập |
| FR-04-DT-19 | EC19 | User cập nhật hồ sơ của chính mình | User_ID = 5 (Token), cập nhật User_ID = 5 | **Success:** Hồ sơ được cập nhật |
| FR-04-DT-20 | EC20 | User cố gắng cập nhật hồ sơ người khác | User_ID = 5 (Token), cập nhật URL User_ID = 10 | **Error:** "Bạn không có quyền cập nhật hồ sơ này" |
| FR-04-DT-21 | EC21 | Email hiển thị read-only | Truy cập form, kiểm tra Email field | **Pass:** Email hiển thị nhưng disabled/read-only |
| FR-04-DT-22 | EC22 | Cố gắng thay đổi Email qua form | Nếu Email input enabled, cố gắng thay đổi | **Error/No-op:** Email không thay đổi, hoặc error |
| FR-04-DT-23 | EC23 | Role không hiển thị trong form | Truy cập form edit hồ sơ | **Pass:** Role field không có trong form |
| FR-04-DT-24 | EC24 | Cố gắng thay đổi Role từ API (bypass form) | POST /api/user/profile {role: "admin"} (user là "user") | **Error/No-op:** Role không thay đổi, hoặc lỗi quyền hạn |

---

### 3.2. Kịch Bản Giá Trị Biên (BVA)

#### **Xác định các điểm biên:**

* **Biến Họ Tên (Full Name — String, Length-ordered):**
  - Biên dưới hợp lệ: $\min = 1$ ký tự
  - Ngay dưới biên (không hợp lệ): $\min - 1 = 0$ ký tự (rỗng)
  - Biên trên hợp lệ: $\max = 255$ ký tự (từ FR-15 Product name)
  - Ngay trên biên (không hợp lệ): $\max + 1 = 256$ ký tự

* **Biến Số điện thoại (Phone Number — String, Length-ordered):**
  - Biên dưới hợp lệ: $\min = 10$ chữ số, bắt đầu "0"
  - Ngay dưới biên (không hợp lệ): $\min - 1 = 9$ chữ số
  - Biên trên hợp lệ: $\max = 11$ chữ số, bắt đầu "0"
  - Ngay trên biên (không hợp lệ): $\max + 1 = 12$ chữ số

* **Biến Địa chỉ (Address — String, Length-ordered):**
  - Biên dưới hợp lệ: $\min = 1$ ký tự
  - Ngay dưới biên (không hợp lệ): $\min - 1 = 0$ ký tự (rỗng — nhưng Optional nên Valid)
  - Biên trên hợp lệ: $\max = 500$ ký tự
  - Ngay trên biên (không hợp lệ): $\max + 1 = 501$ ký tự

* **Ký tự đặc biệt trong Phone (Format Check):**
  - Biên: Ký tự đầu = "0" (hợp lệ) vs. ≠ "0" (không hợp lệ)

#### **Bảng Kịch Bản Kiểm Thử Biên (BVA):**

| BVA ID | Biên Phân Tích | Mô tả Kịch Bản Biên | Dữ liệu đầu vào | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| FR-04-BVA-01 | Full Name: min = 1 ký tự | Họ Tên = "A" (biên dưới hợp lệ) | Full Name = "A" | **Success:** Cập nhật hợp lệ |
| FR-04-BVA-02 | Full Name: min - 1 = 0 ký tự (rỗng) | Họ Tên = "" (không hợp lệ) | Full Name = "" | **Error:** "Họ Tên không được để trống" |
| FR-04-BVA-03 | Full Name: max = 255 ký tự | Họ Tên = [chính xác 255 ký tự] | Full Name = [255 ký tự hợp lệ] | **Success:** Cập nhật hợp lệ |
| FR-04-BVA-04 | Full Name: max + 1 = 256 ký tự | Họ Tên = [256 ký tự] (vượt giới hạn) | Full Name = [256 ký tự] | **Error:** "Họ Tên quá dài" |
| FR-04-BVA-05 | Phone: min = 10 chữ số, bắt đầu "0" | Phone = "0000000000" (biên dưới hợp lệ) | Phone = "0000000000" | **Success:** Cập nhật hợp lệ |
| FR-04-BVA-06 | Phone: min - 1 = 9 chữ số | Phone = "000000000" (dưới min, không hợp lệ) | Phone = "000000000" | **Error:** "Số điện thoại phải từ 10–11 chữ số" |
| FR-04-BVA-07 | Phone: max = 11 chữ số, bắt đầu "0" | Phone = "00000000000" (biên trên hợp lệ) | Phone = "00000000000" | **Success:** Cập nhật hợp lệ |
| FR-04-BVA-08 | Phone: max + 1 = 12 chữ số | Phone = "000000000000" (vượt max, không hợp lệ) | Phone = "000000000000" | **Error:** "Số điện thoại phải từ 10–11 chữ số" |
| FR-04-BVA-09 | Phone: Ký tự đầu ≠ "0" | Phone = "1987654321" (10 chữ số nhưng không bắt đầu "0") | Phone = "1987654321" | **Error:** "Số điện thoại phải bắt đầu bằng 0" |
| FR-04-BVA-10 | Address: min = 1 ký tự | Address = "A" (biên dưới hợp lệ) | Address = "A" | **Success:** Cập nhật hợp lệ |
| FR-04-BVA-11 | Address: min - 1 = 0 ký tự (rỗng, Optional) | Address = "" (rỗng nhưng optional) | Address = "" | **Success:** Cập nhật hợp lệ (optional) |
| FR-04-BVA-12 | Address: max = 500 ký tự | Address = [chính xác 500 ký tự] | Address = [500 ký tự hợp lệ] | **Success:** Cập nhật hợp lệ |
| FR-04-BVA-13 | Address: max + 1 = 501 ký tự | Address = [501 ký tự] (vượt max) | Address = [501 ký tự] | **Error:** "Địa chỉ quá dài" |

---

## 4. Bảng Tổng Hợp Kịch Bản Kiểm Thử Cuối Cùng (Optimized)

| TC ID | Nguồn Gốc (Coverage) | Mô tả Kịch Bản Chi Tiết | Dữ liệu đầu vào | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| FR-04-TC-01 | DT-01 | Cập nhật Họ Tên hợp lệ | Full Name = "Trần Thị B", Phone = "", Address = "" | **Success:** "Cập nhật thành công", Họ Tên = "Trần Thị B" |
| FR-04-TC-02 | DT-02 / BVA-02 | Họ Tên để trống (min-1, không hợp lệ) | Full Name = "", Phone = "0987654321" | **Error:** "Họ Tên không được để trống" |
| FR-04-TC-03 | DT-03 | Họ Tên chứa XSS payload | Full Name = "<script>alert(1)</script>" | **Error:** Từ chối hoặc escape (bảo mật XSS) |
| FR-04-TC-04 | DT-04 / BVA-04 | Họ Tên quá dài (max+1, 256 ký tự) | Full Name = [256 ký tự] | **Error:** "Họ Tên quá dài" |
| FR-04-TC-05 | BVA-01 | Họ Tên tối thiểu hợp lệ (min, 1 ký tự) | Full Name = "A" | **Success:** Cập nhật hợp lệ |
| FR-04-TC-06 | BVA-03 | Họ Tên tối đa hợp lệ (max, 255 ký tự) | Full Name = [255 ký tự] | **Success:** Cập nhật hợp lệ |
| FR-04-TC-07 | DT-05 / BVA-05 | Phone 10 chữ số, bắt đầu "0" (min hợp lệ) | Full Name = "Nguyễn Văn C", Phone = "0987654321" | **Success:** "Cập nhật thành công", Phone = "0987654321" |
| FR-04-TC-08 | DT-06 / BVA-07 | Phone 11 chữ số, bắt đầu "0" (max hợp lệ) | Full Name = "Nguyễn Văn D", Phone = "09876543210" | **Success:** "Cập nhật thành công", Phone = "09876543210" |
| FR-04-TC-09 | DT-07 / BVA-11 | Phone để trống (optional, min-1 nhưng Valid) | Full Name = "Nguyễn Văn E", Phone = "" | **Success:** "Cập nhật thành công", Phone = NULL/empty |
| FR-04-TC-10 | DT-08 / BVA-09 | Phone không bắt đầu "0" (format error) | Full Name = "Nguyễn Văn F", Phone = "1987654321" | **Error:** "Số điện thoại phải bắt đầu bằng 0" |
| FR-04-TC-11 | DT-09 / BVA-06 | Phone 9 chữ số (min-1, không hợp lệ) | Full Name = "Nguyễn Văn G", Phone = "098765432" | **Error:** "Số điện thoại phải từ 10–11 chữ số" |
| FR-04-TC-12 | DT-10 / BVA-08 | Phone 12 chữ số (max+1, không hợp lệ) | Full Name = "Nguyễn Văn H", Phone = "098765432101" | **Error:** "Số điện thoại phải từ 10–11 chữ số" |
| FR-04-TC-13 | DT-11 | Phone chứa ký tự không phải số | Full Name = "Nguyễn Văn I", Phone = "0987ABC321" | **Error:** "Số điện thoại phải chỉ chứa chữ số" |
| FR-04-TC-14 | DT-12 | Phone chứa khoảng trắng | Full Name = "Nguyễn Văn J", Phone = "09 8765 4321" | **Error:** "Số điện thoại không hợp lệ" |
| FR-04-TC-15 | DT-13 / BVA-10 | Address 1–500 ký tự hợp lệ | Full Name = "Nguyễn Văn K", Address = "123 Đường A, Q.1, TP.HCM" | **Success:** "Cập nhật thành công", Address = "123 Đường A, Q.1, TP.HCM" |
| FR-04-TC-16 | DT-14 / BVA-11 | Address để trống (optional) | Full Name = "Nguyễn Văn L", Address = "" | **Success:** "Cập nhật thành công", Address = NULL/empty |
| FR-04-TC-17 | DT-15 | Address chứa XSS payload | Full Name = "Nguyễn Văn M", Address = "<img src=x onerror=alert(1)>" | **Error:** Từ chối hoặc escape (bảo mật XSS) |
| FR-04-TC-19 | BVA-12 | Address tối đa hợp lệ (max, 500 ký tự) | Full Name = "Nguyễn Văn O", Address = [500 ký tự] | **Success:** Cập nhật hợp lệ |
| FR-04-TC-20 | DT-17 / DT-19 | User đã đăng nhập, cập nhật hồ sơ của chính mình | Token hợp lệ, User_ID = 5, cập nhật User_ID = 5 | **Success:** "Cập nhật thành công" |
| FR-04-TC-21 | DT-18 | User chưa đăng nhập | Không có Token, truy cập form | **Error/Redirect:** "Vui lòng đăng nhập" |
| FR-04-TC-22 | DT-20 | User cố gắng cập nhật hồ sơ người khác | User_ID = 5 (Token), cập nhật User_ID = 10 | **Error:** "Bạn không có quyền cập nhật hồ sơ này" |
| FR-04-TC-23 | DT-21 | Email hiển thị read-only (không cho edit) | Truy cập form, kiểm tra Email input | **Pass:** Email disabled/read-only, không thể chỉnh sửa |
| FR-04-TC-24 | DT-22 | Cố gắng thay đổi Email qua API bypass | POST /api/user/profile {email: "newemail@test.com"} | **Error/No-op:** Email không thay đổi hoặc lỗi |
| FR-04-TC-25 | DT-23 | Role không hiển thị trong form edit | Truy cập form, kiểm tra role field | **Pass:** Role field không tồn tại trong form |
| FR-04-TC-26 | DT-24 | Cố gắng thay đổi Role từ API bypass | POST /api/user/profile {role: "admin"} (user hiện tại = "user") | **Error/No-op:** Role không thay đổi, backend từ chối |

---

## 5. AI Gap Analysis (User-defined Section)

### 🔹 Các khoảng trống kịch bản bị AI bỏ sót 

* **Xử lý số điện thoại có chứa mã vùng quốc gia:** Copilot mặc định số điện thoại chỉ bắt đầu bằng số `0` (EC5, EC6). AI bỏ sót kịch bản người dùng nhập số điện thoại hợp lệ theo định dạng chuẩn quốc tế (Ví dụ: `+84987654321` hoặc `84987654321`), dẫn đến nguy cơ hệ thống đánh rớt nhầm các case dữ liệu chuẩn của người dùng.
* **Xử lý khoảng trắng nghiệp vụ trong Họ Tên (Sanitization & Trim):** AI nhận diện lỗi họ tên rỗng nhưng bỏ sót lỗi định dạng khoảng trắng thực tế (Ví dụ: Tên có khoảng trắng thừa ở đầu/cuối `"  Nguyễn Văn A "` hoặc cách quãng bất thường `"Nguyễn   Văn   A"`). Thiếu kịch bản kiểm thử xem hệ thống có tự động tối ưu hóa dữ liệu chuỗi (trim/sanitize) trước khi ghi nhận vào Database hay không.
* **Sự xung đột logic giữa Token và ID trong URL (Cross-Site Request Forgery / IDOR):** Mặc dù tại `EC20` có nhắc đến việc `User_ID từ Token ≠ User_ID trong URL`, AI chưa cụ thể hóa kịch bản kiểm thử việc **phân quyền chéo giữa các User thường với nhau**. Nếu một User A đã đăng nhập hợp lệ nhưng thay đổi ID trên URL/Payload thành ID của User B, hệ thống bảo mật ở Client hay API Gateway sẽ chặn? Kịch bản này cần được làm rõ ở cả tầng API Response Code (403 Forbidden hay 404 Not Found để giấu thông tin).
* **Bỏ sót kịch bảng test cập nhật UI khi người dùng cập nhật thông tin thành công**: Khi người dùng cập nhật thành công và tên người dùng hiển thị ở góc trên bên phải màn hình có được cập nhật ngay không hay phải load lại trang, AI chưa đưa ra kịch bản để test UI này.

---

### 🔹 Nguyên nhân phân tích (Why AI missed them)

* **Sự giới hạn về mặt ngữ cảnh của kỹ thuật (Method Limitation):** Các kỹ thuật Domain Testing và BVA chỉ xem xét giá trị biên trên một trục tọa độ tuyến tính độc lập (ví dụ: độ dài chuỗi từ 1 đến 255). Nó không thể tự giả định các ngữ cảnh thực tế của dữ liệu như quy chuẩn viễn thông (mã vùng quốc gia) hay các lỗi logic lồng ghép luồng bảo mật (IDOR phân quyền ngang) nếu không có sự can thiệp tư duy nghiệp vụ của QA.
* **Sự phụ thuộc vào tài liệu đặc tả tĩnh (Specification Dependency):** Tài liệu SRS của EShop không quy chuẩn rõ ràng định dạng Regex cho `Phone Number` cũng như cơ chế thiết kế API RESTful (Sử dụng endpoint `/api/user/profile` chung dựa hoàn toàn vào token hay endpoint định danh `/api/user/profile/:id`). Do Copilot chỉ phân tích dựa trên câu chữ mơ hồ có sẵn, nó bị kẹt lại ở các kịch bản kiểm thử bề mặt (UI/Validation căn bản) và bỏ sót kiến trúc tích hợp phía sau.

---

## 6. Bug Reporting

| Bug ID |  Mức độ (Severity) | TC ID | Mô tả Kịch Bản Chi Tiết | Dữ liệu đầu vào | Kết quả mong đợi | Kết quả thực tế | Trạng thái |
| :---: | :---: | :---: | :--- | :--- | :--- | :--- |
| **BUG-01** | **MAJOR** |  **FR-04-TC-01** | Cập nhật Họ Tên hợp lệ | `Full Name = "Trần Thị B"`, `Phone = ""`, `Address = ""` | Success: "Cập nhật thành công", Họ Tên = "Trần Thị B" | Hệ thống hiển thị thông báo "Số điện thoại không hợp lệ. Vui lòng nhập đúng 9-10 chữ số." | **FAIL** |
| **BUG-02** | **CRITICAL** | **FR-04-TC-03** | Họ Tên chứa XSS payload | `Full Name = "<script>alert(1)</script>"` | Error: Từ chối hoặc escape (bảo mật XSS) | Hệ thống lưu thành công | **FAIL** |
| **BUG-03** | **MEDIUM** | **FR-04-TC-04** | Họ Tên quá dài (max+1, 256 ký tự) | `Full Name = [256 ký tự]` | Error: "Họ Tên quá dài" | Hệ thống lưu thành công toàn bộ chuỗi 256 ký tự | **FAIL** |
| **BUG-04** | **MAJOR** | **FR-04-TC-07** | Phone 10 chữ số, bắt đầu "0" (min hợp lệ) | `Phone = "0987654321"` | Success: "Cập nhật thành công", Phone = "0987654321" | Hệ thống hiển thị thông báo "Số điện thoại không hợp lệ. Vui lòng nhập đúng 9-10 chữ số." | **FAIL** |
| **BUG-05** | **MAJOR** | **FR-04-TC-08** | Phone 11 chữ số, bắt đầu "0" (max hợp lệ) | `Phone = "09876543210"` | Success: "Cập nhật thành công", Phone = "09876543210" | Hệ thống hiển thị thông báo "Số điện thoại không hợp lệ. Vui lòng nhập đúng 9-10 chữ số." | **FAIL** |
| **BUG-06** | **MAJOR** | **FR-04-TC-09** | Phone để trống (optional, min-1 nhưng Valid) | `Phone = ""` | Success: "Cập nhật thành công", Phone = NULL/empty | Hệ thống không chấp nhận để trống trường số điện thoại | **FAIL** |
| **BUG-07** | **MEDIUM** | **FR-04-TC-10** | Phone không bắt đầu "0" (format error) | `Phone = "1987654321"` | Error: "Số điện thoại phải bắt đầu bằng 0" | Hệ thống báo cập nhật thành công | **FAIL** |
| **BUG-08** | **CRITICAL** | **FR-04-TC-17** | Address chứa XSS payload | `Full Name = "Nguyễn Văn M"`, `Address = "<img src=x onerror=alert(1)>"` | Error: Từ chối hoặc escape (bảo mật XSS) | Hệ thống chấp nhận bỏ trống trường địa chỉ chưa mã độc được mã hóa ký tự entities, không kích hoạt alert | **FAIL** |


---

## 7. Tóm tắt Kế hoạch Kiểm thử

| Chỉ số | Giá trị |
| --- | --- |
| **Tổng Test Case cuối (TC)** | 26 |
| **Equivalence Classes (EC)** | 24 |
| **Boundary Value Points (BV)** | 13 |
| **Tỷ lệ phủ EC** | 100% (24/24) |
| **Tỷ lệ phủ BV** | 100% (13/13) |
| **Số DT Case** | 24 |
| **Số BVA Case** | 13 |
| **Số TC sau tối ưu** | 26 (gộp các case DT+BVA trùng lặp) |


---
# Tính năng FR-07: Giỏ hàng (Shopping Cart)

## 1. Phân tích Thành phần Hộp đen

### **Inputs & Triggers:**

#### **Explicit Inputs (Dữ liệu người dùng điền/chọn):**
1. **Quantity (Số lượng)** — Người dùng nhập trực tiếp ở trang chi tiết sản phẩm (FR-06) hoặc chỉnh sửa bằng nút +/- trong giỏ
   - Loại dữ liệu: Integer
   - Điều kiện: "chỉ nhận số nguyên dương, tối thiểu là 1" (FR-06)

#### **Implicit Inputs (Trạng thái/Điều kiện hệ thống):**
1. **Trạng thái giỏ hàng** — Giỏ trống hay có sản phẩm
2. **Danh sách sản phẩm trong giỏ** — Mỗi item có (Product_ID, Quantity, Unit_Price từ DB)
3. **Sự trùng lặp sản phẩm** — Sản phẩm A đã có trong giỏ → Thêm A lần 2 phải merge Qty (không tạo dòng mới)

#### **Triggers (Hành động bấm nút):**
1. **Thêm vào giỏ hàng** — Bấm nút "Thêm vào giỏ hàng" (từ FR-06)
2. **Tăng số lượng** — Bấm nút + trong giỏ
3. **Giảm số lượng** — Bấm nút - trong giỏ
4. **Xóa sản phẩm** → Dialog xác nhận → Bấm "Có" hoặc "Không"
5. **Tiếp tục mua sắm** — Bấm nút để quay về trang chủ

---

### **Outputs (Phản hồi/Thông báo mong đợi):**

1. **Danh sách sản phẩm trong giỏ** — Hiển thị cột: Sản phẩm | Đơn giá | Số lượng | Thành tiền | Thao tác
2. **Tổng tiền** — Nhãn: **"Tổng cộng"** (không phải "Tổng tạm tính")
3. **Giỏ trống** — Hiển thị: (a) Hình minh họa; (b) Thông báo rõ ràng
4. **Dialog xác nhận xóa** — Trước khi xóa sản phẩm
5. **Cập nhật danh sách & Tổng tiền** — Sau mỗi hành động (thêm/tăng/giảm/xóa)

---

## 2. Bảng Phân Hoạch Lớp Tương Đương (Equivalence Classes)

| Biến Đầu Vào | Mã Lớp | Miền Giá Trị / Mô Tả | Loại |
| --- | --- | --- | --- |
| **Quantity (Số lượng — Ordered Field)** | | | |
| | EC1 | Qty = 1 (tối thiểu hợp lệ theo FR-06) | Valid |
| | EC2 | 2 ≤ Qty ≤ 999 (phạm vi bình thường) | Valid |
| | EC3 | Qty = 0 (không hợp lệ, vì "tối thiểu là 1") | Invalid |
| | EC4 | Qty < 0 (số âm, không hợp lệ) | Invalid |
| | EC5 | Qty ≥ 1000 (vượt phạm vi hợp lý) | Invalid |
| | EC6 | Qty = ký tự không phải số ("abc", "@", "12.5") | Invalid |
| **Trạng thái Sản phẩm trùng lặp** | | | |
| | EC7 | Sản phẩm A thêm lần 1 (không trùng) | Valid |
| | EC8 | Sản phẩm A thêm lần 2+ (trùng → merge Qty) | Valid |
| | EC9 | Thêm sản phẩm B khác A (không trùng) | Valid |
| **Trạng thái Giỏ hàng** | | | |
| | EC10 | Giỏ trống (0 sản phẩm) | Valid |
| | EC11 | Giỏ có ≥ 1 sản phẩm | Valid |
| **Hành động Xóa sản phẩm** | | | |
| | EC12 | Click Xóa → Dialog → Xác nhận "Có" | Valid |
| | EC13 | Click Xóa → Dialog → Hủy "Không" | Valid |
| **Hành động Tăng/Giảm Qty** | | | |
| | EC14 | Click nút + để tăng Qty | Valid |
| | EC15 | Click nút - để giảm Qty (Qty > 1) | Valid |
| | EC16 | Click nút - khi Qty = 1 (edge case: có xóa hay giữ?) | TBD* |
| **Hành động Tiếp tục mua sắm** | | | |
| | EC17 | Click nút (Giỏ có sản phẩm) → Chuyển trang chủ | Valid |
| | EC18 | Click nút (Giỏ trống) → Chuyển trang chủ | Valid |
| **Nhãn Tổng cộng** | | | |
| | EC19 | Hiển thị chính xác: "Tổng cộng" | Valid |
| | EC20 | Hiển thị sai: "Tổng tạm tính" hay tên khác | Invalid |

**TBD* = Cần xác nhận từ SRS hoặc hành vi thực tế (có xóa sản phẩm khi Qty=1 click -, hay giữ Qty=1?)**

---

## 3. Các Bảng Kịch Bản Thành Phần (Rời Rạc)

### 3.1. Bảng Kịch Bản Domain Testing (DT)

| DT ID | Lớp Bao Phủ | Mô tả Kịch Bản | Dữ liệu đầu vào | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| FR-07-DT-01 | EC1 | Thêm sản phẩm với Qty=1 (tối thiểu hợp lệ) | Product_A, Qty=1, Price=50.000₫ | Giỏ hiển thị: [Product_A \| 50.000₫ \| 1 \| 50.000₫] |
| FR-07-DT-02 | EC2 | Thêm sản phẩm với Qty trung bình (VD: Qty=50) | Product_B, Qty=50, Price=30.000₫ | Giỏ hiển thị: [Product_B \| 30.000₫ \| 50 \| 1.500.000₫] |
| FR-07-DT-03 | EC3 | Nhập Qty=0 (không hợp lệ) | Product_C, Qty=0 | **Hệ thống từ chối**, thông báo lỗi |
| FR-07-DT-04 | EC4 | Nhập Qty âm (VD: Qty=-5) | Product_D, Qty=-5 | **Hệ thống từ chối**, thông báo lỗi |
| FR-07-DT-05 | EC5 | Nhập Qty vượt phạm vi (VD: Qty=1500) | Product_E, Qty=1500 | **Hệ thống từ chối**, thông báo lỗi |
| FR-07-DT-06 | EC6 | Nhập ký tự không phải số (VD: Qty="abc") | Product_F, Qty="abc" | **Hệ thống từ chối**, validation error |
| FR-07-DT-07 | EC7 | Thêm Product_A lần 1 (không trùng) | Product_A, Qty=3 | Giỏ: [Product_A, Qty=3] (1 dòng) |
| FR-07-DT-08 | EC8 | Thêm Product_A lần 2 (trùng → merge Qty) | Giỏ: [Product_A, Qty=3]; Thêm Product_A, Qty=2 | Giỏ: [Product_A, Qty=5] (vẫn 1 dòng, không 2 dòng) |
| FR-07-DT-09 | EC9 | Thêm Product_B khác A (không trùng) | Giỏ: [Product_A, Qty=3]; Thêm Product_B, Qty=2 | Giỏ: 2 dòng [A, Qty=3] + [B, Qty=2] |
| FR-07-DT-10 | EC10 | Truy cập giỏ hàng trống | Chưa thêm sản phẩm nào | Hiển thị: (1) Hình minh họa giỏ trống; (2) Thông báo rõ ràng |
| FR-07-DT-11 | EC11 | Giỏ có sản phẩm → Xem giao diện | Giỏ: [Product_A, Product_B] | Hiển thị danh sách đầy đủ, không thấy hình trống |
| FR-07-DT-12 | EC12 | Click Xóa sản phẩm → Dialog → "Có" | Click Xóa Product_A → Click "Có" | Product_A bị xóa, danh sách & Tổng tiền cập nhật |
| FR-07-DT-13 | EC13 | Click Xóa sản phẩm → Dialog → "Không" | Click Xóa Product_A → Click "Không" | Dialog đóng, Product_A vẫn ở giỏ |
| FR-07-DT-14 | EC14 | Click nút + để tăng Qty | Product_A: Qty=1 → Click + | Qty tăng lên 2, Thành tiền tăng, Tổng cộng cập nhật |
| FR-07-DT-15 | EC15 | Click nút - để giảm Qty | Product_B: Qty=5 → Click - | Qty giảm xuống 4, Thành tiền giảm, Tổng cộng cập nhật |
| FR-07-DT-16 | EC17 | Click "Tiếp tục mua sắm" (giỏ có sản phẩm) | Giỏ: [Product_A, Product_B]; Click nút | Chuyển về trang chủ, Giỏ được giữ lại |
| FR-07-DT-17 | EC18 | Click "Tiếp tục mua sắm" (giỏ trống) | Giỏ trống; Click nút | Chuyển về trang chủ |
| FR-07-DT-18 | EC19 | Kiểm tra nhãn "Tổng cộng" | Giỏ có sản phẩm → Xem phần tổng | Nhãn hiển thị: **"Tổng cộng"** (chính xác) |

---

### 3.2. Kịch Bản Giá Trị Biên (BVA)

#### **Xác định các điểm biên:**

* **Biến Quantity (Ordered Field — có thứ tự):**
  - Biên dưới hợp lệ: $\min = 1$
  - Ngay dưới biên (không hợp lệ): $\min - 1 = 0$
  - Biên trên hợp lệ: $\max = 999$ (giả sử từ SRS hoặc hành vi thực tế)
  - Ngay trên biên (không hợp lệ): $\max + 1 = 1000$

* **Biến Trạng thái Giỏ (Discrete — không có thứ tự):**
  - Giỏ từ **Trống** → **Có 1 sản phẩm** (transition edge)
  - Giỏ từ **Có 1 sản phẩm** → **Trống** (transition edge)

* **Biến Hành động Tăng/Giảm (Sequential):**
  - Tăng Qty từ 1 → 2 (biên dưới tăng)
  - Giảm Qty từ 2 → 1 (biên dưới giảm)

#### **Bảng Kịch Bản Kiểm Thử Biên (BVA):**

| BVA ID | Biên Phân Tích | Mô tả Kịch Bản Biên | Dữ liệu đầu vào | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| FR-07-BVA-01 | Qty: min hợp lệ ($\min = 1$) | Thêm sản phẩm với Qty=1 | Product_A, Qty=1, Price=100.000₫ | Qty=1 hiển thị, Thành tiền=100.000₫ |
| FR-07-BVA-02 | Qty: $\min - 1 = 0$ (không hợp lệ) | Nhập Qty=0 | Product_B, Qty=0 | **Lỗi:** "Số lượng phải ≥ 1" |
| FR-07-BVA-03 | Qty: max hợp lệ ($\max = 999$) | Thêm sản phẩm với Qty=999 | Product_C, Qty=999, Price=10.000₫ | Qty=999 hiển thị, Thành tiền=9.990.000₫ |
| FR-07-BVA-04 | Qty: $\max + 1 = 1000$ (không hợp lệ) | Nhập Qty=1000 | Product_D, Qty=1000 | **Lỗi:** "Vượt giới hạn tối đa (999)" |
| FR-07-BVA-05 | Giỏ: Trống → 1 sản phẩm (edge transition) | Giỏ trống; Thêm sản phẩm 1 | Giỏ: [] → [Product_A] | Hình trống ẩn, danh sách [Product_A] hiển thị |
| FR-07-BVA-06 | Giỏ: 1 sản phẩm → Trống (edge transition) | Xóa sản phẩm duy nhất; Xác nhận "Có" | Giỏ: [Product_A] → [] | Giỏ trở về trống, hiển thị hình + thông báo |
| FR-07-BVA-07 | Qty +: từ 1 → 2 (tăng từ min) | Qty=1; Click + | Product_E: Qty=1 → + | Qty=2, Thành tiền×2 |
| FR-07-BVA-08 | Qty -: từ 2 → 1 (giảm về min) | Qty=2; Click - | Product_F: Qty=2 → - | Qty=1, Thành tiền÷2 |

---

## 4. Bảng Tổng Hợp Kịch Bản Kiểm Thử Cuối Cùng (Optimized)

| TC ID | Nguồn Gốc (Coverage) | Mô tả Kịch Bản Chi Tiết | Dữ liệu đầu vào | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| FR-07-TC-01 | DT-01 / BVA-01 | Thêm sản phẩm với Qty=1 (tối thiểu hợp lệ, biên dưới) từ trang 'Xem chi tiết' của sản phẩm | Product_A, Qty=1, Price=50.000₫ | Giỏ: [Product_A \| 50.000₫ \| 1 \| 50.000₫] |
| FR-07-TC-02 | DT-02 | Thêm sản phẩm với Qty=50 (giá trị trung bình) | Product_B, Qty=50, Price=30.000₫ | Giỏ: [Product_B \| 30.000₫ \| 50 \| 1.500.000₫] |
| FR-07-TC-03 | DT-03 / BVA-02 | Nhập Qty=0 (biên không hợp lệ, $\min - 1$) | Product_C, Qty=0 | **Lỗi:** "Số lượng phải ≥ 1" |
| FR-07-TC-04 | DT-04 | Nhập Qty=-5 (số âm) | Product_D, Qty=-5 | **Lỗi:** "Số lượng không hợp lệ" |
| FR-07-TC-05 | DT-05 | Nhập Qty=1500 (vượt phạm vi) | Product_E, Qty=1500 | **Lỗi:** "Vượt giới hạn" |
| FR-07-TC-06 | DT-06 | Nhập Qty="abc" (ký tự không phải số) | Product_F, Qty="abc" | **Lỗi:** "Nhập số" |
| FR-07-TC-07 | DT-07 | Thêm Product_A lần 1 (không trùng) | Product_A, Qty=3 | Giỏ: [Product_A, Qty=3] (1 dòng) |
| FR-07-TC-08 | DT-08 | Thêm Product_A lần 2 (merge Qty, không tạo dòng mới) | Giỏ [A, Qty=3]; Thêm A, Qty=2 | Giỏ: [Product_A, Qty=5] (1 dòng, merge thành công) |
| FR-07-TC-09 | DT-09 | Thêm Product_B khác A (không trùng, tạo dòng mới) | Giỏ [A, Qty=3]; Thêm B, Qty=2 | Giỏ: 2 dòng [A, Qty=3] + [B, Qty=2] |
| FR-07-TC-10 | DT-10 / BVA-05 | Giỏ trống (edge state) → Xem hình + thông báo | Truy cập giỏ lần đầu (chưa add) | Hiển thị: (1) Icon/hình giỏ trống; (2) "Giỏ hàng trống" |
| FR-07-TC-11 | DT-11 | Giỏ có ≥1 sản phẩm (không trống) | Giỏ: [Product_A, Product_B] | Danh sách đầy đủ, không thấy hình trống |
| FR-07-TC-12 | DT-12 | Xóa sản phẩm + Xác nhận "Có" | Click Xóa Product_A → Dialog → "Có" | Product_A xóa, danh sách cập nhật, Tổng tiền recalc |
| FR-07-TC-13 | DT-13 | Xóa sản phẩm + Hủy "Không" | Click Xóa Product_A → Dialog → "Không" | Dialog đóng, Product_A vẫn ở giỏ, không thay đổi |
| FR-07-TC-14 | DT-14 / BVA-07 | Tăng Qty bằng nút +: từ 1 → 2 (tăng từ biên dưới) | Product_A: Qty=1 → Click + | Qty=2, Thành tiền=100.000₫ (×2), Tổng cộng cập nhật |
| FR-07-TC-15 | DT-15 / BVA-08 | Giảm Qty bằng nút -: từ 2 → 1 (giảm về biên dưới) | Product_B: Qty=2 → Click - | Qty=1, Thành tiền giảm ÷2, Tổng cộng cập nhật |
| FR-07-TC-16 | DT-16 | Click "Tiếp tục mua sắm" (giỏ có sản phẩm) | Giỏ: [Product_A, Product_B]; Click nút | Chuyển về trang chủ, Giỏ được lưu |
| FR-07-TC-17 | DT-17 | Click "Tiếp tục mua sắm" (giỏ trống) | Giỏ trống; Click nút | Chuyển về trang chủ |
| FR-07-TC-18 | DT-18 | Kiểm tra nhãn "Tổng cộng" (chính xác) | Giỏ có sản phẩm → Xem nhãn | Nhãn = **"Tổng cộng"** (chính xác, không phải "Tổng tạm tính") |
| FR-07-TC-19 | BVA-03 / BVA-04 | Thêm sản phẩm với Qty=999 (biên trên hợp lệ) | Product_C, Qty=999, Price=10.000₫ | Qty=999, Thành tiền=9.990.000₫ (tính chính xác) |
| FR-07-TC-20 | DT-01 / BVA-01 | Thêm sản phẩm trực tiếp từ trang 'Danh sách sản phẩm' | Product_B, Qty=1, Price=30.000₫ | Giỏ: [Product_B \| 30.000₫ \| 1 \| 30.000₫] |
| FR-07-TC-21 | BVA-06 | Xóa sản phẩm duy nhất → Giỏ trở về trống (edge transition) | 1 sản phẩm → Xóa → "Có" | Giỏ: [] (trống), hiển thị hình + "Giỏ hàng trống" |

---

## 5. AI Gap Analysis (User-defined Section)

### 🔹 Các khoảng trống kịch bản bị AI bỏ sót 

* **Xử lý bất đồng bộ khi cập nhật số lượng liên tục (Race Condition / UI Lag):** Khi người dùng nhấn nút `+` hoặc `-` liên tục nhiều lần (spam click), hệ thống cần thời gian gửi request API hoặc tính toán lại. AI bỏ sót kịch bản kiểm thử việc bất đồng bộ này, dễ dẫn đến hiện tượng UI hiển thị sai số lượng so với dữ liệu thực tế lưu trong DB hoặc tính toán sai `Tổng cộng`.
* **Tràn số hiển thị giao diện (UI Overflow - Price Layout):** AI đã thiết lập biên trên hợp lệ là `999` sản phẩm (`BVA-03`), nhưng hoàn toàn bỏ qua việc kiểm thử giao diện (UI Grid/Layout) khi số lượng lớn kết hợp với đơn giá cao (Ví dụ: 999 cái Điện thoại trị giá 30.000.000₫ sẽ tạo ra con số Thành tiền khổng lồ lên tới hàng chục tỷ). Mobile App rất dễ bị lỗi vỡ layout, tràn chuỗi, rớt dòng hoặc hiển thị dấu ba chấm (`...`) ở cột `Thành tiền` hoặc `Tổng cộng`.
* **Bỏ lửng kịch bản xóa sản phẩm gián tiếp (`EC16`):** Tại mục `EC16` (`Click nút - khi Qty = 1`), AI đánh dấu trạng thái là `TBD` (To Be Defined) và không đưa vào danh sách Test Case cuối cùng. Một QA thực tế cần phải phủ cả 2 trường hợp: Hệ thống chặn không cho giảm (giữ nguyên Qty = 1) hoặc tự động kích hoạt Dialog hỏi người dùng có muốn xóa sản phẩm đó khỏi giỏ hàng hay không.

---

### 🔹 Nguyên nhân phân tích (Why AI missed them)

* **Sự giới hạn về mặt ngữ cảnh của kỹ thuật (Method Limitation):** Kỹ thuật Phân hoạch tương đương (EC) và Phân tích giá trị biên (BVA) chỉ kiểm tra tính đúng đắn của dữ liệu tĩnh đơn thuần (con số 1, 0, 999). Các lỗi liên quan đến hành vi động (spam click), trải nghiệm thiết bị di động (vỡ layout do chuỗi quá dài trên màn hình hẹp), hay luồng lặp logic giao diện không thể bao phủ hết nếu chỉ nhìn vào các biến số độc lập.
* **Sự phụ thuộc vào tài liệu đặc tả tĩnh (Specification Dependency):** Tài liệu SRS [KTPM-Eshop-Mobile](https://github.com/huiw14/KTPM-Eshop-Mobile/blob/Nhu/README.md) chỉ quy định điều kiện thô là *"chỉ nhận số nguyên dương, tối thiểu là 1"* ở tính năng xem chi tiết sản phẩm chứ không hề định nghĩa rõ UX khi nhấn nút `-` tại trang Giỏ hàng hay giới hạn tối đa (`Max Qty`) cho phép mua. Do Copilot suy luận máy móc trực tiếp từ văn bản tĩnh được cung cấp, nó buộc phải đánh dấu `TBD` hoặc tự giả định con số `999` mà không thể đưa ra giải pháp kiểm thử toàn diện cho các lỗ hổng nghiệp vụ này.


---

## 6. Bug Reporting

| Bug ID |  Mức độ (Severity) | TC ID | Mô tả Kịch Bản Chi Tiết | Dữ liệu đầu vào | Kết quả mong đợi | Kết quả thực tế | Trạng thái |
| :---: | :---: | :---: | :--- | :--- | :--- | :--- |
| **BUG-01** | **MAJOR** | **FR-07-TC-01** | Thêm sản phẩm với Qty=1 (tối thiểu hợp lệ, biên dưới) từ trang 'Xem chi tiết' | `Product_A`, `Qty=1`, `Price=50.000₫` | Giỏ: [Product_A \| 50.000₫ \| 1 \| 50.000₫] | Hệ thống không hiển thị dòng sản phẩm vừa thêm vào giỏ hàng nếu chỉ nhấp vào nút lệnh 1 lần mà phải nhấp đúp 2 lần liên tục mới thêm vào giỏ | **FAIL** |
| **BUG-02** | **CRITICAL** | **FR-07-TC-03** | Nhập Qty=0 (biên không hợp lệ, $min-1$) | `Product_C`, `Qty=0` | Lỗi: "Số lượng phải ≥ 1" | Hệ thống vẫn hiển thị dòng sản phẩm vừa thêm vào giỏ hàng với số lượng là 0 | **FAIL** |
| **BUG-03** | **CRITICAL** | **FR-07-TC-04** | Nhập Qty=-5 (số âm) | `Product_D`, `Qty=-5` | Lỗi: "Số lượng không hợp lệ" | Hệ thống vẫn hiển thị dòng sản phẩm vừa thêm vào giỏ hàng với số lượng là -5 | **FAIL** |
| **BUG-04** | **MAJOR** | **FR-07-TC-05** | Nhập Qty=1500 (vượt phạm vi) | `Product_E`, `Qty=1500` | Lỗi: "Vượt giới hạn" | Hệ thống vẫn hiển thị dòng sản phẩm vừa thêm vào giỏ hàng với số lượng là 1500 | **FAIL** |
| **BUG-05** | **MAJOR** | **FR-07-TC-08** | Thêm Product_A lần 2 (merge Qty, không tạo dòng mới) | Giỏ `[A, Qty=3]`; Thêm `A`, `Qty=2` | Giỏ: [Product_A, Qty=5] (1 dòng, merge thành công) | Tăng số dòng; dòng Product_A cũ không được cộng dồn số lượng lên | **FAIL** |
| **BUG-06** | **MEDIUM** | **FR-07-TC-12** | Xóa sản phẩm + Xác nhận "Có" | Click Xóa `Product_A` → Dialog → "Có" | Product_A xóa, danh sách cập nhật, Tổng tiền recalc | Dòng sản phẩm biến mất lập tức, không có dialog xác nhận được hiện lên | **FAIL** |
| **BUG-07** | **MINOR** | **FR-07-TC-18** | Kiểm tra nhãn "Tổng cộng" (chính xác) | Giỏ có sản phẩm → Xem nhãn | Nhãn = "Tổng cộng" (chính xác, không phải "Tổng tạm tính") | Giao diện ghi  chữ "Tổng tạm tính" không theo tiêu chuẩn đặc tả | **FAIL** |

---

## 7. Tóm tắt Kế hoạch Kiểm thử

| Chỉ số | Giá trị |
| --- | --- |
| **Tổng Test Case cuối (TC)** | 21 |
| **Equivalence Classes (EC)** | 20 |
| **Boundary Value Points (BV)** | 8 |
| **Tỷ lệ phủ EC** | 100% (20/20) |
| **Tỷ lệ phủ BV** | 100% (8/8) |
| **Số TC trùng lặp được loại** | DT-01+BVA-01 → TC-01; DT-03+BVA-02 → TC-03; v.v. |

---

# Tính năng FR-14: Quản lý Danh mục (Category CRUD)

## 1. Phân tích Thành phần Hộp đen

### **Inputs & Triggers:**

#### **Explicit Inputs (Dữ liệu Admin điền/chọn):**
1. **Tên danh mục (Category Name)** — Admin nhập vào trường text
   - Loại dữ liệu: String
   - Điều kiện: Bắt buộc, không được để trống (FR-14)

2. **Mã danh mục (Category ID)** — Được sinh tự động bởi hệ thống (khi tạo mới) hoặc hiển thị khi xem
   - Loại dữ liệu: Integer / UUID
   - Điều kiện: Read-only (không cho edit)

#### **Implicit Inputs (Trạng thái/Điều kiện hệ thống):**
1. **Trạng thái đăng nhập** — Admin **phải đã đăng nhập** (JWT Token hợp lệ)
2. **Role trong Token** — Admin **phải có `role = 'admin'`** (FR-12 — Access Control)
3. **Danh sách danh mục hiện tại** — Từ database
4. **Danh mục cần xóa** — Có sản phẩm liên kết hay không? (Có cascade delete hay soft delete?)

#### **Triggers (Hành động bấm nút):**
1. **Thêm danh mục** — Bấm nút "Thêm danh mục" / "Tạo mới"
2. **Xem danh sách danh mục** — Truy cập trang quản lý danh mục
3. **Xem chi tiết danh mục** — Click vào 1 danh mục (nếu có chức năng edit)
4. **Xóa danh mục** — Bấm nút "Xóa" → Xác nhận (có dialog không?)
5. **Hủy bỏ** — Bấm nút "Hủy" (không lưu)

---

### **Outputs (Phản hồi/Thông báo mong đợi):**

1. **Danh sách danh mục:**
   - Bảng/List hiển thị: ID | Tên danh mục | Thao tác (Xem/Xóa)
   - Khi danh sách trống: Empty state + thông báo "Chưa có danh mục"

2. **Form thêm danh mục:**
   - Trường nhập: Tên danh mục (bắt buộc, có `*`)
   - Nút: "Lưu" / "Hủy"

3. **Validation Messages (Thông báo lỗi):**
   - "Tên danh mục không được để trống"
   - "Tên danh mục không được vượt quá [N] ký tự" (nếu có limit)
   - "Tên danh mục đã tồn tại" (nếu có unique constraint)

4. **Success Messages (Thông báo thành công):**
   - "Thêm danh mục thành công" (Toast)
   - "Xóa danh mục thành công" (Toast)

5. **Authorization Messages (Lỗi quyền hạn):**
   - "Bạn không có quyền truy cập tính năng này" (nếu không phải admin)
   - "Vui lòng đăng nhập" (nếu chưa đăng nhập)

6. **Dialog xác nhận:**
   - Khi xóa danh mục: "Bạn có chắc muốn xóa danh mục này?" → "Có" / "Không"

---

## 2. Bảng Phân Hoạch Lớp Tương Đương (Equivalence Classes)

| Biến Đầu Vào | Mã Lớp | Miền Giá Trị / Mô Tả | Loại |
| --- | --- | --- | --- |
| **Tên danh mục (Category Name — String)** | | | |
| | EC1 | Tên danh mục: 1–255 ký tự hợp lệ (VD: "Điện tử") | Valid |
| | EC2 | Tên danh mục: Rỗng ("") | Invalid |
| | EC3 | Tên danh mục: Chứa ký tự XSS (VD: "<script>alert(1)</script>") | Invalid (Security) |
| | EC4 | Tên danh mục: Quá dài (> 255 ký tự) | Invalid |
| | EC5 | Tên danh mục: Chỉ chứa khoảng trắng ("   ") | Invalid (sau trim = rỗng) |
| | EC6 | Tên danh mục: Trùng lặp với danh mục hiện có (unique constraint) | Invalid |
| **Hành động Thêm danh mục** | | | |
| | EC7 | Click nút "Thêm danh mục" → Nhập Tên hợp lệ → "Lưu" | Valid |
| | EC8 | Click nút "Thêm danh mục" → Nhập Tên không hợp lệ → "Lưu" → Lỗi validation | Invalid |
| | EC9 | Click nút "Thêm danh mục" → "Hủy" (không lưu) | Valid (Cancel) |
| **Hành động Xem danh sách danh mục** | | | |
| | EC10 | Xem danh sách danh mục (có ≥1 danh mục) | Valid |
| | EC11 | Xem danh sách danh mục (trống, 0 danh mục) | Valid |
| **Hành động Xóa danh mục** | | | |
| | EC12 | Click Xóa → Dialog xác nhận → "Có" | Valid |
| | EC13 | Click Xóa → Dialog xác nhận → "Không" (hủy xóa) | Valid |
| | EC14 | Xóa danh mục có sản phẩm liên kết → Cascade delete hay error? | TBD* |
| **Trạng thái đăng nhập (Authentication — Implicit)** | | | |
| | EC15 | Admin đã đăng nhập (JWT Token hợp lệ, role = 'admin') | Valid |
| | EC16 | Admin chưa đăng nhập (không có Token) | Invalid |
| | EC17 | User thường (role = 'user') cố truy cập → Từ chối quyền | Invalid |
| **Mã danh mục (Category ID — Implicit)** | | | |
| | EC18 | Mã danh mục: Read-only (không thể edit) | Valid |
| | EC19 | Cố gắng thay đổi mã danh mục (VD: API bypass) | Invalid |

**TBD* = Cần xác nhận từ SRS (có xóa cascade sản phẩm hay reject nếu có sản phẩm?)**

---

## 3. Các Bảng Kịch Bản Thành Phần (Rời Rạc)

### 3.1. Bảng Kịch Bản Domain Testing (DT)

| DT ID | Lớp Bao Phủ | Mô tả Kịch Bản | Dữ liệu đầu vào | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| FR-14-DT-01 | EC1 | Thêm danh mục với tên hợp lệ | Category Name = "Điện tử" | **Success:** "Thêm danh mục thành công", danh mục "Điện tử" xuất hiện trong danh sách |
| FR-14-DT-02 | EC2 | Thêm danh mục với tên để trống | Category Name = "" → Click "Lưu" | **Error:** "Tên danh mục không được để trống" |
| FR-14-DT-03 | EC3 | Thêm danh mục với tên chứa XSS | Category Name = "<script>alert(1)</script>" | **Error/Security:** Từ chối hoặc escape payload |
| FR-14-DT-04 | EC4 | Thêm danh mục với tên quá dài (> 255) | Category Name = [256 ký tự] | **Error:** "Tên danh mục quá dài" |
| FR-14-DT-05 | EC5 | Thêm danh mục với tên chỉ khoảng trắng | Category Name = "   " → Click "Lưu" | **Error:** "Tên danh mục không được để trống" (sau trim) |
| FR-14-DT-06 | EC6 | Thêm danh mục với tên trùng danh mục hiện có | DB: ["Điện tử", "Quần áo"]; Nhập "Điện tử" | **Error:** "Tên danh mục đã tồn tại" |
| FR-14-DT-07 | EC7 | Thêm danh mục hợp lệ → Click "Lưu" | Category Name = "Thực phẩm" → Click "Lưu" | **Success:** Danh mục "Thực phẩm" được thêm, form reset, danh sách cập nhật |
| FR-14-DT-08 | EC8 | Nhập Tên không hợp lệ → Click "Lưu" | Category Name = "" → Click "Lưu" | **Validation Error:** Form không gửi lên server, hiển thị lỗi client-side |
| FR-14-DT-09 | EC9 | Click "Thêm danh mục" → "Hủy" (không lưu) | Click "Hủy" button | **Pass:** Form đóng, không thêm danh mục mới |
| FR-14-DT-10 | EC10 | Xem danh sách danh mục (có dữ liệu) | Truy cập trang quản lý danh mục | **Pass:** Hiển thị danh sách: [Danh mục 1], [Danh mục 2], ... |
| FR-14-DT-11 | EC11 | Xem danh sách danh mục (trống) | DB: 0 danh mục; Truy cập trang | **Pass:** Empty state + thông báo "Chưa có danh mục" |
| FR-14-DT-12 | EC12 | Xóa danh mục → Dialog → "Có" | Click Xóa [Danh mục A] → Click "Có" | **Success:** "Xóa danh mục thành công", Danh mục A bị xóa khỏi danh sách |
| FR-14-DT-13 | EC13 | Xóa danh mục → Dialog → "Không" (hủy xóa) | Click Xóa [Danh mục A] → Click "Không" | **Pass:** Dialog đóng, Danh mục A vẫn ở danh sách |
| FR-14-DT-14 | EC14 | Xóa danh mục có sản phẩm liên kết | DB: Danh mục A có 5 sản phẩm; Click Xóa | **TBD:** (a) Cascade delete; (b) Error "Không thể xóa, có sản phẩm liên kết" |
| FR-14-DT-15 | EC15 | Admin đã đăng nhập (Token hợp lệ, role='admin') → Truy cập trang | JWT Token: {role: "admin"} | **Pass:** Truy cập trang quản lý danh mục thành công |
| FR-14-DT-16 | EC16 | Admin chưa đăng nhập → Truy cập trang | Không có Token | **Error/Redirect:** "Vui lòng đăng nhập", chuyển trang đăng nhập |
| FR-14-DT-17 | EC17 | User thường (role='user') → Truy cập trang admin | JWT Token: {role: "user"} → Truy cập /admin/categories | **Error:** "Bạn không có quyền truy cập tính năng này" (403 Forbidden) |
| FR-14-DT-18 | EC18 | Mã danh mục hiển thị read-only | Xem form/danh sách, kiểm tra ID field | **Pass:** ID không thể chỉnh sửa (disabled / text-only) |
| FR-14-DT-19 | EC19 | Cố gắng thay đổi ID danh mục qua API | PUT /api/admin/categories/5 {id: 999, name: "..."}  | **Error/No-op:** ID không thay đổi, hoặc lỗi 400 Bad Request |

---

### 3.2. Kịch Bản Giá Trị Biên (BVA)

#### **Xác định các điểm biên:**

* **Biến Tên danh mục (Category Name — String, Length-ordered):**
  - Biên dưới hợp lệ: $\min = 1$ ký tự
  - Ngay dưới biên (không hợp lệ): $\min - 1 = 0$ ký tự (rỗng)
  - Biên trên hợp lệ: $\max = 255$ ký tự (giả sử, tương tự FR-15 Product name)
  - Ngay trên biên (không hợp lệ): $\max + 1 = 256$ ký tự

* **Biến Số lượng danh mục trong danh sách (Discrete — State Transition):**
  - Danh sách từ **trống** (0 danh mục) → **có 1 danh mục** (edge transition)
  - Danh sách từ **có N danh mục** → **trống** (khi xóa hết) (edge transition)

* **Ký tự đầu tiên của tên (Format Check):**
  - Biên: Ký tự hợp lệ (a-z, A-Z, 0-9, tiếng Việt) vs. Ký tự đặc biệt / XSS

#### **Bảng Kịch Bản Kiểm Thử Biên (BVA):**

| BVA ID | Biên Phân Tích | Mô tả Kịch Bản Biên | Dữ liệu đầu vào | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| FR-14-BVA-01 | Name: min = 1 ký tự | Tên danh mục = "A" (biên dưới hợp lệ) | Category Name = "A" | **Success:** Danh mục "A" được thêm |
| FR-14-BVA-02 | Name: min - 1 = 0 ký tự (rỗng) | Tên danh mục = "" (không hợp lệ) | Category Name = "" | **Error:** "Tên danh mục không được để trống" |
| FR-14-BVA-03 | Name: max = 255 ký tự | Tên danh mục = [chính xác 255 ký tự] | Category Name = [255 ký tự hợp lệ] | **Success:** Danh mục được thêm |
| FR-14-BVA-04 | Name: max + 1 = 256 ký tự | Tên danh mục = [256 ký tự] (vượt max) | Category Name = [256 ký tự] | **Error:** "Tên danh mục quá dài" |
| FR-14-BVA-05 | Danh sách: Từ trống → 1 danh mục (edge transition) | Danh sách trống; Thêm danh mục 1 | Danh sách: [] → [Danh mục A] | **Pass:** Danh sách hiển thị 1 danh mục, Empty state ẩn |
| FR-14-BVA-06 | Danh sách: Từ 1 danh mục → trống (xóa hết) (edge transition) | Danh sách có 1 danh mục; Xóa nó | Danh sách: [Danh mục A] → [] | **Pass:** Danh sách trống, Empty state + thông báo hiển thị |
| FR-14-BVA-07 | Danh sách: Từ N danh mục → N-1 (xóa 1) | Danh sách: [A, B, C]; Xóa B | Danh sách: [A, B, C] → [A, C] | **Success:** Danh sách cập nhật: [A, C] |

---

## 4. Bảng Tổng Hợp Kịch Bản Kiểm Thử Cuối Cùng (Optimized)

| TC ID | Nguồn Gốc (Coverage) | Mô tả Kịch Bản Chi Tiết | Dữ liệu đầu vào | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| FR-14-TC-01 | DT-01 | Thêm danh mục với tên hợp lệ | Category Name = "Điện tử" | **Success:** "Thêm danh mục thành công", "Điện tử" xuất hiện trong danh sách |
| FR-14-TC-02 | DT-02 / BVA-02 | Thêm danh mục với tên để trống (min-1, không hợp lệ) | Category Name = "" → Click "Lưu" | **Error:** "Tên danh mục không được để trống" |
| FR-14-TC-03 | DT-03 | Thêm danh mục với tên chứa XSS payload | Category Name = "<script>alert(1)</script>" | **Security Pass:** Từ chối hoặc escape, không render HTML |
| FR-14-TC-04 | DT-04 / BVA-04 | Thêm danh mục với tên quá dài (max+1, 256 ký tự) | Category Name = [256 ký tự] | **Error:** "Tên danh mục quá dài" |
| FR-14-TC-05 | BVA-01 | Thêm danh mục với tên tối thiểu hợp lệ (min, 1 ký tự) | Category Name = "A" | **Success:** Danh mục "A" được thêm |
| FR-14-TC-06 | BVA-03 | Thêm danh mục với tên tối đa hợp lệ (max, 255 ký tự) | Category Name = [255 ký tự] | **Success:** Danh mục được thêm |
| FR-14-TC-07 | DT-05 | Thêm danh mục với tên chỉ khoảng trắng | Category Name = "   " → Click "Lưu" | **Error:** "Tên danh mục không được để trống" (sau trim) |
| FR-14-TC-08 | DT-06 | Thêm danh mục với tên trùng danh mục hiện có | DB: ["Điện tử"]; Nhập "Điện tử" | **Error:** "Tên danh mục đã tồn tại" |
| FR-14-TC-09 | DT-10 / BVA-05 | Xem danh sách danh mục (có dữ liệu) | Truy cập trang, danh sách có ≥1 danh mục | **Pass:** Hiển thị danh sách đầy đủ |
| FR-14-TC-10 | DT-11 / BVA-06 | Xem danh sách danh mục (trống, edge transition) | Truy cập trang, DB: 0 danh mục | **Pass:** Empty state + "Chưa có danh mục" |
| FR-14-TC-11 | DT-12 / BVA-07 | Xóa danh mục | Click Xóa [Danh mục A] | **Success:** "Xóa danh mục thành công", Danh mục A xóa khỏi danh sách |
| FR-14-TC-12 | DT-14 | Xóa danh mục có sản phẩm liên kết | DB: Danh mục A có 5 sản phẩm; Click Xóa | **TBD:** (a) Cascade delete; (b) Error "Có sản phẩm liên kết" |
| FR-14-TC-13 | DT-15 | Admin đã đăng nhập → Truy cập trang | JWT Token: {role: "admin"} | **Success:** Truy cập trang quản lý danh mục |
| FR-14-TC-14 | DT-16 | Admin chưa đăng nhập → Truy cập trang → Redirect | Không có Token | **Error/Redirect:** "Vui lòng đăng nhập" |
| FR-14-TC-15 | DT-17 | User thường (role='user') → Truy cập trang admin | JWT Token: {role: "user"} | **Error:** 403 Forbidden, "Bạn không phải là admin" |
| FR-14-TC-16 | DT-18 | Mã danh mục (ID) hiển thị read-only | Xem form/danh sách, kiểm tra ID | **Pass:** ID disabled, không thể edit |
| FR-14-TC-17 | DT-19 | Cố gắng thay đổi ID danh mục qua API | PUT /api/admin/categories/5 {id: 999} | **Error/No-op:** ID không thay đổi |

---

## 5. AI Gap Analysis (User-defined Section)


### 🔹 Các khoảng trống kịch bản bị AI bỏ sót 

* **Xử lý khoảng trắng thừa (Leading/Trailing Trimming):** AI nhận diện được lớp tương đương chỉ chứa khoảng trắng (EC5) nhưng bỏ sót kịch bản người dùng nhập tên danh mục hợp lệ có cố ý hoặc vô ý chèn khoảng trắng ở đầu/cuối (Ví dụ: `"  Điện tử   "`). AI chưa có ca kiểm thử để xác nhận hệ thống có tự động cắt bỏ khoảng trắng thừa trước khi lưu hay không nhằm tránh trùng lặp dữ liệu ẩn.
* **Luồng lặp vô tận của Dialog (Spam Click/Double Submit):** Thiếu kịch bản kiểm thử độ trễ phản hồi khi Admin bấm nút "Lưu" hoặc "Xóa -> Có" liên tục. Hành vi spam click này có thể sinh ra nhiều request trùng lặp (Race Condition) gửi lên server làm lỗi DB unique constraint hoặc xóa nhầm phần tử kế tiếp.
* **Đặc thù ràng buộc dữ liệu liên kết thực tế (Cascade/Reject Integrity):** Tại vị trí lớp `EC14`, AI ghi trạng thái là `TBD` (To Be Defined) và bỏ lửng. Một chuyên gia QA thực tế cần phải đưa ra cả 2 kịch bản cấu hình của hệ thống (Hoặc chặn không cho xóa và báo lỗi UI, hoặc cho xóa và chuyển các sản phẩm liên quan về danh mục mặc định `Uncategorized`) thay vì để trống trong bảng kịch bản.

---

### 🔹 Nguyên nhân phân tích (Why AI missed them)

* **Sự giới hạn về mặt ngữ cảnh của kỹ thuật (Method Limitation):** Kỹ thuật Kiểm thử miền (Domain Testing) thông thường chia các phân vùng dựa trên độ dài chuỗi hoặc định dạng ký tự độc lập, tuyến tính. Do đó, thuật toán sinh test case của AI không thể tự liên kết với luồng vận hành động (Dynamic workflow) của cơ sở dữ liệu và các tương tác bất đồng bộ trên giao diện.
* **Sự phụ thuộc vào tài liệu đặc tả tĩnh (Specification Dependency):** Do đặc tả tính năng `FR-14` trong file SRS được cung cấp quá sơ sài, không làm rõ các quy tắc nghiệp vụ ràng buộc (Business Rules) như cách xử lý khoảng trắng hay ràng buộc toàn vẹn dữ liệu (Foreign Key Constraints) với sản phẩm. Copilot chỉ phân tích máy móc trên câu chữ có sẵn nên không thể tự suy luận ra các kịch bản biên tích hợp sâu này.

---

## 6. Bug Reporting

| Bug ID |  Mức độ (Severity) | TC ID | Mô tả Kịch Bản Chi Tiết | Dữ liệu đầu vào | Kết quả mong đợi | Kết quả thực tế | Trạng thái |
| :---: | :---: | :---: | :--- | :--- | :--- | :--- |
| **BUG-01** | **MAJOR** | **FR-14-TC-02** | Thêm danh mục với tên để trống (min-1, không hợp lệ) | `Category Name = ""` → Click "Lưu" | Error: "Tên danh mục không được để trống" | Danh mục vẫn được tạo nhưng không có tên và cập nhật real-time lên giao diện danh sách | **FAIL** |
| **BUG-02** | **CRITICAL** | **FR-14-TC-03** | Thêm danh mục với tên chứa XSS payload | `Category Name = "<script>alert(1)</script>"` | Security Pass: Từ chối hoặc escape, không render HTML | Danh mục vẫn được tạo và cập nhật real-time lên giao diện danh sách | **FAIL** |
| **BUG-03** | **MEDIUM** | **FR-14-TC-04** | Thêm danh mục với tên quá dài (max+1, 256 ký tự) | `Category Name = [256 ký tự]` | Error: "Tên danh mục quá dài" | Danh mục vẫn được tạo và cập nhật real-time lên giao diện danh sách | **FAIL** |
| **BUG-04** | **MAJOR** | **FR-14-TC-07** | Thêm danh mục với tên chỉ khoảng trắng | `Category Name = "   "` → Click "Lưu" | Error: "Tên danh mục không được để trống" (sau trim) | Danh mục vẫn được tạo nhưng không thấy tên và cập nhật real-time lên giao diện danh sách | **FAIL** |
| **BUG-05** | **MAJOR** | **FR-14-TC-08** | Thêm danh mục với tên trùng danh mục hiện có | DB: `["Điện tử"]`; Nhập `"Điện tử"` | Error: "Tên danh mục đã tồn tại" | Danh mục vẫn được tạo và cập nhật real-time lên giao diện danh sách | **FAIL** |

---

## 7. Tóm tắt Kế hoạch Kiểm thử

| Chỉ số | Giá trị |
| --- | --- |
| **Tổng Test Case cuối (TC)** | 21 |
| **Equivalence Classes (EC)** | 19 |
| **Boundary Value Points (BV)** | 7 |
| **Tỷ lệ phủ EC** | 100% (19/19) |
| **Tỷ lệ phủ BV** | 100% (7/7) |
| **Số DT Case** | 19 |
| **Số BVA Case** | 7 |
| **Số TC sau tối ưu** | 17 (gộp các case DT+BVA trùng lặp) |

---
# Tính năng FR-05: Xem danh sách & Tìm kiếm sản phẩm (Mobile App)

## 1. Phân tích Thành phần Hộp đen

### **Inputs & Triggers:**

#### **Explicit Inputs (Dữ liệu người dùng điền/chọn):**
1. **Từ khóa tìm kiếm (Search Keyword)** — Người dùng nhập vào thanh tìm kiếm
   - Loại dữ liệu: String
   - Điều kiện: Optional (trang chủ hiển thị tất cả sản phẩm nếu không tìm kiếm)

2. **Danh sách sản phẩm** — Hiển thị từ database
   - Loại dữ liệu: Array of Products
   - Mỗi sản phẩm: {ID, Name, Price, Image, Description, Category_ID}

#### **Implicit Inputs (Trạng thái/Điều kiện hệ thống):**
1. **Trạng thái kết nối mạng** — Có kết nối hay không (ảnh hưởng loading)
2. **Trạng thái tải dữ liệu** — Đang tải (loading) / Đã tải (loaded) / Lỗi (error)
3. **Số lượng sản phẩm trong DB** — Có sản phẩm hay trống
4. **Kết quả tìm kiếm** — Có kết quả hay trống (empty state)
5. **Độ phân giải màn hình** — Mobile responsive (layout grid)

#### **Triggers (Hành động bấm nút/sự kiện):**
1. **Truy cập trang chủ** — Mở app / Quay về trang chủ
2. **Nhập từ khóa tìm kiếm** — Gõ vào thanh search
3. **Click nút "Tìm kiếm"** — Bấm Search button (nếu có)
4. **Pull-to-refresh** — Kéo xuống để tải lại danh sách (mobile)
5. **Click vào sản phẩm** — Chuyển đến trang chi tiết sản phẩm
6. **Scroll** — Cuộn danh sách (pagination / infinite scroll)

---

### **Outputs (Phản hồi/Thông báo mong đợi):**

1. **Danh sách sản phẩm (Grid Layout):**
   - Hiển thị grid với các item sản phẩm
   - Mỗi item: Ảnh | Tên | Giá (định dạng ₫, phân cách hàng nghìn)
   - Alt text trên ảnh (accessibility)

2. **Thanh tìm kiếm:**
   - Placeholder: "Tìm kiếm sản phẩm..."
   - Input field để nhập từ khóa

3. **Loading State:**
   - Spinner / Skeleton loading hiển thị khi đang tải
   - "Đang tải..." message (optional)

4. **Empty State:**
   - Khi DB trống: "Chưa có sản phẩm nào" + Icon
   - Khi tìm kiếm không có kết quả: "Không tìm thấy sản phẩm" + Icon

5. **Search Results:**
   - Hiển thị kết quả tìm kiếm (filter by name)
   - Từ khóa được escape (không render HTML)

6. **Thẻ Heading (<h1>):**
   - Chỉ 1 `<h1>` duy nhất trên trang (accessibility requirement)
   - VD: `<h1>Danh sách sản phẩm</h1>` hoặc `<h1>Trang chủ</h1>`

7. **Price Format:**
   - Định dạng: "₫XXX.XXX" (VD: ₫50.000, ₫1.500.000)

8. **Accessibility Features:**
   - Mỗi ảnh sản phẩm có `alt` text mô tả
   - Tab order hợp lý (top-to-bottom, left-to-right)

---

## 2. Bảng Phân Hoạch Lớp Tương Đương (Equivalence Classes)

| Biến Đầu Vào | Mã Lớp | Miền Giá Trị / Mô Tả | Loại |
| --- | --- | --- | --- |
| **Từ khóa tìm kiếm (Search Keyword — String)** | | | |
| | EC1 | Từ khóa: Không nhập (rỗng) — Hiển thị tất cả sản phẩm | Valid |
| | EC2 | Từ khóa: 1–255 ký tự, hợp lệ (VD: "Điện thoại") | Valid |
| | EC3 | Từ khóa: Chứa ký tự XSS / HTML (VD: "<script>alert(1)</script>") | Invalid (Security) |
| | EC4 | Từ khóa: Chứa ký tự đặc biệt (VD: "@#$%^&*") | Valid (nếu dùng để tìm) |
| | EC5 | Từ khóa: Không có kết quả (VD: "Sản phẩm không tồn tại XYZ123") | Valid (Empty result) |
| | EC6 | Từ khóa: Case-insensitive match (VD: "điện thoại" vs "ĐIỆN THOẠI") | Valid (nên support) |
| | EC7 | Từ khóa: Quá dài (> 255 ký tự) | Invalid |
| | EC8 | Từ khóa: Partial match (VD: "điện" match "Điện thoại Samsung") | Valid |
| **Danh sách sản phẩm từ DB** | | | |
| | EC9 | DB: Có ≥1 sản phẩm | Valid |
| | EC10 | DB: Trống (0 sản phẩm) | Valid (Empty state) |
| **Trạng thái tải dữ liệu** | | | |
| | EC11 | Loading: Đang tải (spinner/skeleton hiển thị) | Valid |
| | EC12 | Loaded: Đã tải xong (danh sách hiển thị) | Valid |
| | EC13 | Error: Lỗi tải dữ liệu (network error, timeout, server error) | Valid (Error message) |
| **Hình ảnh sản phẩm** | | | |
| | EC14 | Ảnh: Có (hợp lệ, tỷ lệ chuẩn) + Alt text | Valid |
| | EC15 | Ảnh: Không tải được (broken link) | Valid (Placeholder / Error icon) |
| | EC16 | Ảnh: Alt text rỗng (accessibility issue) | Invalid (Security/A11y) |
| **Giá sản phẩm** | | | |
| | EC17 | Giá: > 0, định dạng ₫ phân cách hàng nghìn (VD: ₫50.000) | Valid |
| | EC18 | Giá: = 0 (VD: ₫0) | Valid (nếu cho phép) |
| | EC19 | Giá: < 0 (âm) — không hợp lệ | Invalid |
| | EC20 | Giá: Missing / null — không hiển thị | Invalid |
| **Tên sản phẩm** | | | |
| | EC21 | Tên: 1–255 ký tự hợp lệ | Valid |
| | EC22 | Tên: Rỗng (missing) — không hiển thị | Invalid |
| | EC23 | Tên: Chứa ký tự XSS (VD: "<img src=x onerror=alert(1)>") | Invalid (Security) |
| **Layout Grid (Responsive)** | | | |
| | EC24 | Grid: Hiển thị đúng trên mobile (1–2 cột tùy theo độ rộng) | Valid |
| | EC25 | Grid: Hiển thị đúng trên tablet (2–3 cột) | Valid |
| **Thẻ Heading <h1>** | | | |
| | EC26 | H1: Chỉ có đúng 1 `<h1>` trên trang | Valid |
| | EC27 | H1: Có 0 hoặc 2+ `<h1>` | Invalid (Accessibility) |
| **Escape Output (XSS Prevention)** | | | |
| | EC28 | Keyword rendered safe: Escape HTML entities | Valid |
| | EC29 | Keyword rendered unsafe: innerHTML used | Invalid (Security/XSS) |

---

## 3. Các Bảng Kịch Bản Thành Phần (Rời Rạc)

### 3.1. Bảng Kịch Bản Domain Testing (DT)

| DT ID | Lớp Bao Phủ | Mô tả Kịch Bản | Dữ liệu đầu vào | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| FR-05-DT-01 | EC1 | Truy cập trang chủ (không tìm kiếm) | Không nhập keyword | Hiển thị tất cả sản phẩm từ DB dạng grid |
| FR-05-DT-02 | EC2 | Tìm kiếm sản phẩm với keyword hợp lệ | Keyword = "Điện thoại" | Hiển thị sản phẩm có tên chứa "Điện thoại" |
| FR-05-DT-03 | EC3 | Tìm kiếm với keyword chứa XSS payload | Keyword = "<script>alert(1)</script>" | **Security:** Payload được escape, không render HTML |
| FR-05-DT-04 | EC4 | Tìm kiếm với ký tự đặc biệt | Keyword = "@#$%^&*" | Tìm kiếm hoạt động (hoặc không có kết quả) |
| FR-05-DT-05 | EC5 | Tìm kiếm không có kết quả | Keyword = "Sản phẩm không tồn tại XYZ123" | Empty state: "Không tìm thấy sản phẩm" + Icon |
| FR-05-DT-06 | EC6 | Tìm kiếm không phân biệt hoa/thường | Keyword = "ĐIỆN THOẠI" hoặc "điện thoại" | Cả hai đều match sản phẩm "Điện thoại" |
| FR-05-DT-07 | EC7 | Tìm kiếm với keyword quá dài (> 255) | Keyword = [256+ ký tự] | Từ chối hoặc cắt bớt, hoặc không có kết quả |
| FR-05-DT-08 | EC8 | Tìm kiếm partial match | Keyword = "điện" | Hiển thị "Điện thoại", "Điều hòa", ... (partial match) |
| FR-05-DT-09 | EC9 | Danh sách có ≥1 sản phẩm | DB: 5 sản phẩm | Grid hiển thị 5 item |
| FR-05-DT-10 | EC10 | Danh sách trống | DB: 0 sản phẩm | Empty state: "Chưa có sản phẩm nào" + Icon |
| FR-05-DT-11 | EC11 | Đang tải dữ liệu | API call được gửi, chờ response | Loading spinner/skeleton hiển thị |
| FR-05-DT-12 | EC12 | Đã tải xong | API trả về dữ liệu | Danh sách sản phẩm hiển thị (loading ẩn) |
| FR-05-DT-13 | EC13 | Lỗi tải dữ liệu | Network error / timeout / 500 error | Error message: "Không thể tải sản phẩm, vui lòng thử lại" |
| FR-05-DT-14 | EC14 | Ảnh sản phẩm hợp lệ + Alt text | Ảnh: valid URL, alt = "Điện thoại Samsung Galaxy S21" | Ảnh hiển thị chính xác, alt text accessible |
| FR-05-DT-15 | EC15 | Ảnh sản phẩm không tải được | Ảnh: broken link (404) | Placeholder / Error icon hiển thị |
| FR-05-DT-16 | EC16 | Ảnh sản phẩm không có alt text | Alt = "" (rỗng) | **Accessibility issue:** Cảnh báo hoặc sử dụng fallback alt |
| FR-05-DT-17 | EC17 | Giá sản phẩm hợp lệ (> 0) | Price = 50000 | Hiển thị: ₫50.000 (định dạng phân cách hàng nghìn) |
| FR-05-DT-18 | EC18 | Giá sản phẩm = 0 | Price = 0 | Hiển thị: ₫0 (hoặc "Miễn phí") |
| FR-05-DT-19 | EC19 | Giá sản phẩm âm | Price = -50000 | **Error:** Không hiển thị hoặc error message |
| FR-05-DT-20 | EC20 | Giá sản phẩm missing/null | Price = null | **Error:** Không hiển thị sản phẩm hoặc placeholder |
| FR-05-DT-21 | EC21 | Tên sản phẩm hợp lệ | Name = "Điện thoại Samsung Galaxy S21" | Hiển thị tên đầy đủ |
| FR-05-DT-22 | EC22 | Tên sản phẩm rỗng/missing | Name = "" | **Error:** Sản phẩm không hiển thị hoặc placeholder |
| FR-05-DT-23 | EC23 | Tên sản phẩm chứa XSS | Name = "<img src=x onerror=alert('XSS')>" | **Security:** HTML escaped, hiển thị text literal |
| FR-05-DT-24 | EC24 | Grid responsive trên mobile | Mobile (375px width) | Grid: 1–2 cột, layout hợp lý |
| FR-05-DT-25 | EC25 | Grid responsive trên tablet | Tablet (768px width) | Grid: 2–3 cột, layout hợp lý |
| FR-05-DT-26 | EC26 | Page có đúng 1 `<h1>` | Inspect DOM | Chỉ 1 `<h1>` duy nhất |
| FR-05-DT-27 | EC27 | Page có 0 hoặc 2+ `<h1>` | Inspect DOM | **Accessibility issue:** Nhiều hơn 1 hoặc không có |
| FR-05-DT-28 | EC28 | Keyword được escape safe | Keyword = "<b>Test</b>" được render | HTML entities escaped: `&lt;b&gt;Test&lt;/b&gt;` |
| FR-05-DT-29 | EC29 | Keyword được render unsafe (XSS) | Keyword = "<b>Test</b>" được render với innerHTML | **XSS:** `<b>Test</b>` render thành bold text (vulnerability) |

---

### 3.2. Kịch Bản Giá Trị Biên (BVA)

#### **Xác định các điểm biên:**

* **Biến Từ khóa tìm kiếm (Search Keyword — String, Length-ordered):**
  - Biên dưới hợp lệ: $\min = 0$ ký tự (rỗng — hiển thị tất cả)
  - Ngay dưới biên: không applicable (min = 0)
  - Biên trên hợp lệ: $\max = 255$ ký tự
  - Ngay trên biên (không hợp lệ): $\max + 1 = 256$ ký tự

* **Biến Số lượng sản phẩm kết quả (Discrete — State):**
  - Biên dưới: 0 sản phẩm (empty result)
  - Biên trên: Toàn bộ DB (tất cả sản phẩm match)

* **Biến Giá sản phẩm (Numeric, Ordered):**
  - Biên dưới hợp lệ: $\min = 1$ ₫
  - Ngay dưới biên (không hợp lệ): $\min - 1 = 0$ ₫
  - Biên trên: Không giới hạn (hoặc rất cao, VD: 1 tỷ ₫)

* **Biến Độ dài tên sản phẩm (Length-ordered):**
  - Biên dưới hợp lệ: $\min = 1$ ký tự
  - Ngay dưới biên (không hợp lệ): $\min - 1 = 0$ ký tự (rỗng)
  - Biên trên hợp lệ: $\max = 255$ ký tự

#### **Bảng Kịch Bản Kiểm Thử Biên (BVA):**

| BVA ID | Biên Phân Tích | Mô tả Kịch Bản Biên | Dữ liệu đầu vào | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| FR-05-BVA-01 | Keyword: min = 0 ký tự (rỗng) | Không nhập keyword (min hợp lệ) | Keyword = "" | Hiển thị tất cả sản phẩm |
| FR-05-BVA-02 | Keyword: max = 255 ký tự | Tìm kiếm với keyword chính xác 255 ký tự | Keyword = [255 ký tự] | Tìm kiếm hoạt động |
| FR-05-BVA-03 | Keyword: max + 1 = 256 ký tự | Tìm kiếm với keyword 256 ký tự (vượt max) | Keyword = [256 ký tự] | Từ chối hoặc cắt bớt |
| FR-05-BVA-04 | Search result: 0 sản phẩm (empty) | Không có kết quả match | Keyword = "XYZ không tồn tại" | Empty state: "Không tìm thấy..." |
| FR-05-BVA-05 | Search result: All products (full) | Tìm kiếm match tất cả sản phẩm | Keyword = "" hoặc pattern match all | Hiển thị toàn bộ sản phẩm |
| FR-05-BVA-06 | Price: min hợp lệ = 1₫ | Sản phẩm với giá 1₫ | Price = 1 | Hiển thị: ₫1 (hoặc ₫1) |
| FR-05-BVA-07 | Price: min - 1 = 0₫ (không hợp lệ) | Sản phẩm với giá 0₫ | Price = 0 | Hiển thị ₫0 hoặc error/skip |
| FR-05-BVA-08 | Product name: min = 1 ký tự | Tên sản phẩm = "A" | Name = "A" | Hiển thị "A" |
| FR-05-BVA-09 | Product name: min - 1 = 0 ký tự (rỗng) | Tên sản phẩm = "" | Name = "" | Sản phẩm không hiển thị hoặc placeholder |
| FR-05-BVA-10 | Product name: max = 255 ký tự | Tên sản phẩm chính xác 255 ký tự | Name = [255 ký tự] | Hiển thị đầy đủ |
| FR-05-BVA-11 | Product name: max + 1 = 256 ký tự | Tên sản phẩm 256 ký tự (vượt max) | Name = [256 ký tự] | Truncate hoặc error |
| FR-05-BVA-12 | Loading state transition: Idle → Loading | API call bắt đầu | Bấm search → API call | Spinner hiển thị |
| FR-05-BVA-13 | Loading state transition: Loading → Loaded | API response received | API response successful | Spinner ẩn, danh sách hiển thị |
| FR-05-BVA-14 | Loading state transition: Loaded → Error | Network error sau khi tải | Network failure | Error message hiển thị |

---

## 4. Bảng Tổng Hợp Kịch Bản Kiểm Thử Cuối Cùng (Optimized)

| TC ID | Nguồn Gốc (Coverage) | Mô tả Kịch Bản Chi Tiết | Dữ liệu đầu vào | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| FR-05-TC-01 | DT-01 / BVA-01 | Truy cập trang chủ (không tìm kiếm, keyword min=0) | Không nhập keyword | Hiển thị tất cả sản phẩm dạng grid |
| FR-05-TC-02 | DT-02 | Tìm kiếm sản phẩm với keyword hợp lệ | Keyword = "Điện thoại" | Danh sách sản phẩm match "Điện thoại" hiển thị |
| FR-05-TC-03 | DT-03 | Tìm kiếm với XSS payload (security) | Keyword = "<script>alert(1)</script>" | **Security:** Payload escaped, không render HTML |
| FR-05-TC-04 | DT-04 | Tìm kiếm với ký tự đặc biệt | Keyword = "@#$%^&*" | Tìm kiếm hoạt động (hoặc không kết quả) |
| FR-05-TC-05 | DT-05 / BVA-04 | Tìm kiếm không có kết quả (0 match) | Keyword = "XYZ không tồn tại 123" | Empty state: "Không tìm thấy sản phẩm" + Icon |
| FR-05-TC-06 | DT-06 | Tìm kiếm case-insensitive | Keyword = "ĐIỆN THOẠI" vs "điện thoại" | Cả hai match "Điện thoại" (nếu support) |
| FR-05-TC-07 | DT-07 / BVA-03 | Tìm kiếm quá dài (max+1=256 ký tự) | Keyword = [256 ký tự] | Từ chối, cắt bớt, hoặc không kết quả |
| FR-05-TC-08 | DT-08 | Tìm kiếm partial match | Keyword = "điện" | Match "Điện thoại", "Điều hòa", ... |
| FR-05-TC-09 | DT-09 | Danh sách có ≥1 sản phẩm | DB: 5 sản phẩm | Grid hiển thị 5 item |
| FR-05-TC-10 | DT-10 | Danh sách trống | DB: 0 sản phẩm | Empty state: "Chưa có sản phẩm nào" |
| FR-05-TC-11 | DT-11 / BVA-12 | Đang tải dữ liệu (loading state) | API call gửi, chờ response | Loading spinner/skeleton hiển thị |
| FR-05-TC-12 | DT-12 / BVA-13 | Đã tải xong (loaded state) | API response successful | Spinner ẩn, danh sách hiển thị |
| FR-05-TC-13 | DT-13 / BVA-14 | Lỗi tải dữ liệu (error state) | Network error / timeout / 500 error | Error message: "Không thể tải..." |
| FR-05-TC-14 | DT-14 | Ảnh sản phẩm hợp lệ + Alt text | Ảnh: valid URL, alt = "Điện thoại Samsung..." | Ảnh hiển thị, alt text accessible |
| FR-05-TC-15 | DT-15 | Ảnh sản phẩm không tải (broken) | Ảnh: broken link (404) | Placeholder / Error icon hiển thị |
| FR-05-TC-16 | DT-16 | Ảnh không có alt text (accessibility) | Alt = "" (rỗng) | **A11y issue:** Cảnh báo hoặc fallback alt |
| FR-05-TC-17 | DT-17 / BVA-06 | Giá > 0 (min hợp lệ = 1₫) | Price = 50000 hoặc 1 | Hiển thị: ₫50.000 hoặc ₫1 (format phân cách) |
| FR-05-TC-18 | DT-18 / BVA-07 | Giá = 0 (min-1, edge case) | Price = 0 | Hiển thị ₫0 hoặc "Miễn phí" |
| FR-05-TC-19 | DT-19 | Giá < 0 (âm, không hợp lệ) | Price = -50000 | **Error:** Không hiển thị hoặc error |
| FR-05-TC-20 | DT-20 | Giá missing/null | Price = null | **Error:** Skip sản phẩm hoặc placeholder |
| FR-05-TC-21 | DT-21 / BVA-08 | Tên sản phẩm hợp lệ (min=1) | Name = "Điện thoại" | Hiển thị tên đầy đủ |
| FR-05-TC-22 | DT-22 / BVA-09 | Tên sản phẩm rỗng (min-1=0, không hợp lệ) | Name = "" | Skip sản phẩm hoặc placeholder |
| FR-05-TC-23 | DT-23 | Tên sản phẩm chứa XSS (security) | Name = "<img src=x onerror=alert('XSS')>" | **Security:** HTML escaped, text literal |
| FR-05-TC-24 | DT-24 | Grid responsive mobile (1–2 cột) | Mobile 375px width | Layout hợp lý, items readable |
| FR-05-TC-25 | DT-25 | Grid responsive tablet (2–3 cột) | Tablet 768px width | Layout hợp lý, items readable |
| FR-05-TC-26 | DT-26 | Page có đúng 1 `<h1>` (accessibility) | Inspect DOM | Chỉ 1 `<h1>` trên page |
| FR-05-TC-27 | DT-28 / BVA-02 | Keyword max hợp lệ (255 ký tự) | Keyword = [255 ký tự] | Tìm kiếm hoạt động |
| FR-05-TC-28 | DT-29 | Keyword được escape safe (XSS prevention) | Keyword = "<b>Test</b>" | HTML escaped: `&lt;b&gt;Test&lt;/b&gt;` |

---

## 5. AI Gap Analysis (User-defined Section)

### 🔹 Các khoảng trống kịch bản bị AI bỏ sót (What Copilot Missed)

* **Xử lý bất đồng bộ & Độ trễ nhập liệu (Debounce/Real-time Search):** Copilot bỏ sót kịch bản kiểm thử hành vi gửi API liên tục khi người dùng gõ phím nhanh, dễ gây nghẽn mạng hoặc lỗi Race Condition (kết quả của từ khóa cũ hiển thị đè lên từ khóa mới).
* **Đặc thù ngôn ngữ (Accent & Diacritics Sensitivity):** Thiếu kịch bản kiểm thử việc đồng bộ font/dấu tiếng Việt. Hệ thống có tự động hiểu và chuyển đổi giữa dữ liệu có dấu và không dấu hay không (Ví dụ: Tìm `"Dien thoai"` có ra kết quả `"Điện thoại"` hay không).
* **Tải dữ liệu vô hạn (Infinite Scroll/Pagination):** AI chỉ phân tích danh sách tĩnh mà bỏ qua kịch bản kiểm thử hiệu năng và bộ nhớ của thiết bị Mobile khi người dùng cuộn liên tục qua hàng trăm sản phẩm.

---

### 🔹 Nguyên nhân phân tích (Why AI missed them)

* **Hạn chế kỹ thuật kiểm thử (Method Limitation):** Các kỹ thuật Domain Testing và BVA thuần túy chỉ tập trung vào kiểm tra giá trị của các biến đầu vào tĩnh độc lập. Các lỗi về trải nghiệm, hiệu năng vuốt chạm động (Dynamic Mobile UX) và xử lý ký tự vùng miền nằm ngoài phạm vi bao phủ của các thuật toán sinh test case tự động này.
* **Sự phụ thuộc vào đặc tả tĩnh (Specification Dependency):** Bản thân tài liệu đặc tả (SRS) của EShop chỉ mô tả giao diện hiển thị cơ bản mà không quy định rõ thuật toán tìm kiếm backend hay cơ chế phân trang. Vì Copilot hoạt động dựa trên ngữ cảnh văn bản được cung cấp, nó không thể tự sinh các ca kiểm thử động nếu không được con người bổ sung các kịch bản thực tế của nền tảng di động.

---

## 6. Bug Reporting

| Bug ID |  Mức độ (Severity) | TC ID | Mô tả Kịch Bản Chi Tiết | Dữ liệu đầu vào | Kết quả mong đợi | Kết quả thực tế | Trạng thái |
| :---: | :---: | :---: | :--- | :--- | :--- | :--- |
| **BUG-01** | **CRITICAL** | **FR-05-TC-01** | Truy cập trang chủ (không tìm kiếm, keyword min=0) | Không nhập keyword | Hiển thị tất cả sản phẩm dạng grid | Hệ thống  hiển thị thông báo "Network request timed out" | **FAIL** |
| **BUG-02** | **MAJOR** | **FR-05-TC-02** | Tìm kiếm sản phẩm với keyword hợp lệ | `Keyword = "Điện thoại"` | Danh sách sản phẩm match "Điện thoại" hiển thị | Hệ thống  hiển thị thông báo "Network request timed out" | **FAIL** |
| **BUG-03** | **MAJOR** | **FR-05-TC-03** | Tìm kiếm với XSS payload (security) | `Keyword = "<script>alert(1)</script>"` | Security: Payload escaped, không render HTML | Hệ thống  hiển thị thông báo "Network request timed out" | **FAIL** |
| **BUG-04** | **MAJOR** | **FR-05-TC-04** | Tìm kiếm với ký tự đặc biệt | `Keyword = "@#$%^&*"` | Tìm kiếm hoạt động (hoặc không kết quả) | Hệ thống  hiển thị thông báo "Network request timed out" | **FAIL** |
| **BUG-05** | **MAJOR** | **FR-05-TC-05** | Tìm kiếm không có kết quả (0 match) | `Keyword = "XYZ không tồn tại 123"` | Empty state: "Không tìm thấy sản phẩm" + Icon | Hệ thống  hiển thị thông báo "Network request timed out" | **FAIL** |
| **BUG-06** | **MAJOR** | **FR-05-TC-06** | Tìm kiếm case-insensitive | `Keyword = "ĐIỆN THOẠI"` và `"điện thoại"` | Cả hai match "Điện thoại" (nếu support) | Hệ thống  hiển thị thông báo "Network request timed out" | **FAIL** |
| **BUG-07** | **MAJOR** | **FR-05-TC-07** | Tìm kiếm quá dài (max+1=256 ký tự) | `Keyword = [256 ký tự]` | Từ chối, cắt bớt, hoặc không kết quả | Hệ thống  hiển thị thông báo "Network request timed out" | **FAIL** |
| **BUG-08** | **MAJOR** | **FR-05-TC-08** | Tìm kiếm partial match | `Keyword = "điện"` | Match "Điện thoại", "Điều hòa", ... | Hệ thống  hiển thị thông báo "Network request timed out" | **FAIL** |

---

## 7. Tóm tắt Kế hoạch Kiểm thử

| Chỉ số | Giá trị |
| --- | --- |
| **Tổng Test Case cuối (TC)** | 29 |
| **Equivalence Classes (EC)** | 29 |
| **Boundary Value Points (BV)** | 14 |
| **Tỷ lệ phủ EC** | 100% (29/29) |
| **Tỷ lệ phủ BV** | 100% (14/14) |
| **Số DT Case** | 29 |
| **Số BVA Case** | 14 |
| **Số TC sau tối ưu** | 28 (gộp các case DT+BVA trùng lặp) |
| **Các TC gộp** | TC-01 (DT-01+BVA-01), TC-05 (DT-05+BVA-04), TC-07 (DT-07+BVA-03), TC-11 (DT-11+BVA-12), TC-12 (DT-12+BVA-13), TC-13 (DT-13+BVA-14), TC-17 (DT-17+BVA-06), TC-18 (DT-18+BVA-07), TC-21 (DT-21+BVA-08), TC-22 (DT-22+BVA-09), TC-27 (DT-28+BVA-02) |

---
