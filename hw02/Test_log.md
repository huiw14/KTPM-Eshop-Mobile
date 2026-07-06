### Sinh viên:
Nguyễn Hoàng Uyển Như - 22127315

### BẢNG GHI NHẬN KẾT QUẢ KIỂM THỬ (TEST LOG) - FR-04

| TC ID | Mô tả Kịch Bản Chi Tiết | Dữ liệu đầu vào | Kết quả mong đợi | Kết quả thực tế | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **FR-04-TC-01** | Cập nhật Họ Tên hợp lệ | `Full Name = "Trần Thị B"`, `Phone = ""`, `Address = ""` | Success: "Cập nhật thành công", Họ Tên = "Trần Thị B" | Hệ thống hiển thị thông báo "Số điện thoại không hợp lệ. Vui lòng nhập đúng 9-10 chữ số." | **FAIL** |
| **FR-04-TC-02** | Họ Tên để trống (min-1, không hợp lệ) | `Full Name = ""`, `Phone = "0987654321"` | Error: "Họ Tên không được để trống" | Hệ thống báo lỗi bắt buộc nhập họ tên và chặn lưu | **PASS** |
| **FR-04-TC-03** | Họ Tên chứa XSS payload | `Full Name = "<script>alert(1)</script>"` | Error: Từ chối hoặc escape (bảo mật XSS) | Hệ thống lưu thành công | **FAIL** |
| **FR-04-TC-04** | Họ Tên quá dài (max+1, 256 ký tự) | `Full Name = [256 ký tự]` | Error: "Họ Tên quá dài" | Hệ thống lưu thành công toàn bộ chuỗi 256 ký tự | **FAIL** |
| **FR-04-TC-05** | Họ Tên tối thiểu hợp lệ (min, 1 ký tự) | `Full Name = "A"` | Success: Cập nhật hợp lệ | Hệ thống chấp nhận lưu và hiển thị Họ Tên = "A" | **PASS** |
| **FR-04-TC-06** | Họ Tên tối đa hợp lệ (max, 255 ký tự) | `Full Name = [255 ký tự]` | Success: Cập nhật hợp lệ | Hệ thống lưu thành công toàn bộ chuỗi 255 ký tự | **PASS** |
| **FR-04-TC-07** | Phone 10 chữ số, bắt đầu "0" (min hợp lệ) | `Phone = "0987654321"` | Success: "Cập nhật thành công", Phone = "0987654321" | Hệ thống hiển thị thông báo "Số điện thoại không hợp lệ. Vui lòng nhập đúng 9-10 chữ số." | **FAIL** |
| **FR-04-TC-08** | Phone 11 chữ số, bắt đầu "0" (max hợp lệ) | `Phone = "09876543210"` | Success: "Cập nhật thành công", Phone = "09876543210" | Hệ thống hiển thị thông báo "Số điện thoại không hợp lệ. Vui lòng nhập đúng 9-10 chữ số." | **FAIL** |
| **FR-04-TC-09** | Phone để trống (optional, min-1 nhưng Valid) | `Phone = ""` | Success: "Cập nhật thành công", Phone = NULL/empty | Hệ thống không chấp nhận để trống trường số điện thoại | **FAIL** |
| **FR-04-TC-10** | Phone không bắt đầu "0" (format error) | `Phone = "1987654321"` | Error: "Số điện thoại phải bắt đầu bằng 0" | Hệ thống báo cập nhật thành công | **FAIL** |
| **FR-04-TC-11** | Phone 9 chữ số (min-1, không hợp lệ) | `Phone = "098765432"` | Error: "Số điện thoại phải từ 10–11 chữ số" | Hệ thống từ chối cập nhật do thiếu ký tự | **PASS** |
| **FR-04-TC-12** | Phone 12 chữ số (max+1, không hợp lệ) | `Phone = "098765432101"` | Error: "Số điện thoại phải từ 10–11 chữ số" | Hệ thống từ chối cập nhật do vượt quá độ dài | **PASS** |
| **FR-04-TC-13** | Phone chứa ký tự không phải số | `Phone = "0987ABC321"` | Error: "Số điện thoại phải chỉ chứa chữ số" | Giao diện chặn không cho nhập hoặc báo lỗi dữ liệu | **PASS** |
| **FR-04-TC-14** | Phone chứa khoảng trắng | `Phone = "09 8765 4321"` | Error: "Số điện thoại không hợp lệ" | Hệ thống báo lỗi không cho phép khoảng cách | **PASS** |
| **FR-04-TC-15** | Address 1–500 ký tự hợp lệ | `Address = "123 Đường A, Q.1, TP.HCM"` | Success: "Cập nhật thành công", Address = "123 Đường A, Q.1, TP.HCM" | Cập nhật địa chỉ mặc định mới thành công | **PASS** |
| **FR-04-TC-16** | Address để trống (optional) | `Address = ""` | Success: "Cập nhật thành công", Address = NULL/empty | Hệ thống chấp nhận bỏ trống trường địa chỉ | **PASS** |
| **FR-04-TC-17** | Address chứa XSS payload | `Full Name = "Nguyễn Văn M"`, `Address = "<img src=x onerror=alert(1)>"` | Error: Từ chối hoặc escape (bảo mật XSS) | Hệ thống chấp nhận bỏ trống trường địa chỉ chưa mã độc được mã hóa ký tự entities, không kích hoạt alert | **FAIL** |
| **FR-04-TC-19** | Address tối đa hợp lệ (max, 500 ký tự) | `Address = [500 ký tự]` | Success: Cập nhật hợp lệ | Địa chỉ dài 500 ký tự được cập nhật thành công | **PASS** |
| **FR-04-TC-20** | User đã đăng nhập, cập nhật hồ sơ của chính mình | `Token hợp lệ`, `User_ID = 5` | Success: "Cập nhật thành công" | Token trùng khớp ID thực thi, cập nhật dữ liệu thành công | **PASS** |
| **FR-04-TC-21** | User chưa đăng nhập | Không có Token, truy cập form | Error/Redirect: "Vui lòng đăng nhập" | Hệ thống tự động chuyển hướng người dùng về trang Login | **PASS** |
| **FR-04-TC-22** | User cố gắng cập nhật hồ sơ người khác | `User_ID = 5` (Token), gọi URL `User_ID = 10` | Error: "Bạn không có quyền cập nhật hồ sơ này" | Hệ thống chặn yêu cầu và báo lỗi phân quyền chéo | **PASS** |
| **FR-04-TC-23** | Email hiển thị read-only (không cho edit) | Truy cập giao diện form hồ sơ | Pass: Email disabled/read-only, không thể chỉnh sửa | Ô nhập liệu Email bị làm mờ (disabled) trên UI | **PASS** |
| **FR-04-TC-24** | Cố gắng thay đổi Email qua API bypass | POST `/api/user/profile` `{email: "new@test.com"}` | Error/No-op: Email không thay đổi hoặc lỗi | Backend từ chối dữ liệu cập nhật, trường email được giữ nguyên | **PASS** |
| **FR-04-TC-25** | Role không hiển thị trong form edit | Truy cập giao diện form hồ sơ | Pass: Role field không tồn tại trong form | Không tìm thấy bất kỳ thành phần nào của trường Role trên UI | **PASS** |
| **FR-04-TC-26** | Cố gắng thay đổi Role từ API bypass | POST `/api/user/profile` `{role: "admin"}` | Error/No-op: Role không thay đổi, backend từ chối | Server trả về lỗi 400/403, giá trị phân quyền không bị thay đổi | **PASS** |

---

### BẢNG GHI NHẬN KẾT QUẢ KIỂM THỬ (TEST LOG) - FR-07

| TC ID | Mô tả Kịch Bản Chi Tiết | Dữ liệu đầu vào | Kết quả mong đợi | Kết quả thực tế | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **FR-07-TC-01** | Thêm sản phẩm với Qty=1 (tối thiểu hợp lệ, biên dưới) từ trang 'Xem chi tiết' | `Product_A`, `Qty=1`, `Price=50.000₫` | Giỏ: [Product_A \| 50.000₫ \| 1 \| 50.000₫] | Hệ thống không hiển thị dòng sản phẩm vừa thêm vào giỏ hàng nếu chỉ nhấp vào nút lệnh 1 lần mà phải nhấp đúp 2 lần liên tục mới thêm vào giỏ | **FAIL** |
| **FR-07-TC-02** | Thêm sản phẩm với Qty=50 (giá trị trung bình) từ trang 'Xem chi tiết' | `Product_B`, `Qty=50`, `Price=30.000₫` | Giỏ: [Product_B \| 30.000₫ \| 50 \| 1.500.000₫] | Hệ thống hiển thị đúng dòng sản phẩm vừa thêm vào giỏ hàng với thông tin chính xác | **PASS** |
| **FR-07-TC-03** | Nhập Qty=0 (biên không hợp lệ, $min-1$) | `Product_C`, `Qty=0` | Lỗi: "Số lượng phải ≥ 1" | Hệ thống vẫn hiển thị dòng sản phẩm vừa thêm vào giỏ hàng với số lượng là 0 | **FAIL** |
| **FR-07-TC-04** | Nhập Qty=-5 (số âm) | `Product_D`, `Qty=-5` | Lỗi: "Số lượng không hợp lệ" | Hệ thống vẫn hiển thị dòng sản phẩm vừa thêm vào giỏ hàng với số lượng là -5 | **FAIL** |
| **FR-07-TC-05** | Nhập Qty=1500 (vượt phạm vi) | `Product_E`, `Qty=1500` | Lỗi: "Vượt giới hạn" | Hệ thống vẫn hiển thị dòng sản phẩm vừa thêm vào giỏ hàng với số lượng là 1500 | **FAIL** |
| **FR-07-TC-06** | Nhập Qty="abc" (ký tự không phải số) | `Product_F`, `Qty="abc"` | Lỗi: "Nhập số" | Ô nhập liệu không hiển thị ký tự chữ | **PASS** |
| **FR-07-TC-07** | Thêm Product_A lần 1 (không trùng) | `Product_A`, `Qty=3` | Giỏ: [Product_A, Qty=3] (1 dòng) | Bản ghi mới của Product_A được khởi tạo thành công trong giỏ hàng | **PASS** |
| **FR-07-TC-08** | Thêm Product_A lần 2 (merge Qty, không tạo dòng mới) | Giỏ `[A, Qty=3]`; Thêm `A`, `Qty=2` | Giỏ: [Product_A, Qty=5] (1 dòng, merge thành công) | Tăng số dòng; dòng Product_A cũ không được cộng dồn số lượng lên | **FAIL** |
| **FR-07-TC-09** | Thêm Product_B khác A (không trùng, tạo dòng mới) | Giỏ `[A, Qty=3]`; Thêm `B`, `Qty=2` | Giỏ: 2 dòng [A, Qty=3] + [B, Qty=2] | Giỏ hàng xuất hiện thêm 1 dòng mới độc lập dành riêng cho Product_B | **PASS** |
| **FR-07-TC-10** | Giỏ trống (edge state) → Xem hình + thông báo | Truy cập giỏ lần đầu (chưa add) | Hiển thị: (1) Icon/hình giỏ trống; (2) "Giỏ hàng trống" | Màn hình hiển thị đúng trạng thái rỗng kèm nút dẫn hướng quay lại trang chủ | **PASS** |
| **FR-07-TC-11** | Giỏ có ≥1 sản phẩm (không trống) | Giỏ: `[Product_A, Product_B]` | Danh sách đầy đủ, không thấy hình trống | Layout danh sách sản phẩm hiển thị tường minh, các widget trống được ẩn | **PASS** |
| **FR-07-TC-12** | Xóa sản phẩm + Xác nhận "Có" | Click Xóa `Product_A` → Dialog → "Có" | Product_A xóa, danh sách cập nhật, Tổng tiền recalc | Dòng sản phẩm biến mất lập tức, không có dialog xác nhận được hiện lên | **FAIL** |
| **FR-07-TC-13** | Xóa sản phẩm + Hủy "Không" | Click Xóa `Product_A` → Dialog → "Không" | Dialog đóng, Product_A vẫn ở giỏ, không thay đổi | Không có dialog xác nhận | **BLOCKED** |
| **FR-07-TC-14** | Tăng Qty bằng nút +: từ 1 → 2 (tăng từ biên dưới) | `Product_A: Qty=1` → Click `+` | Qty=2, Thành tiền=100.000₫ (×2), Tổng cộng cập nhật | Số lượng nhảy lên 2, giá trị thành tiền và tổng tiền giỏ hàng cập nhật real-time | **PASS** |
| **FR-07-TC-15** | Giảm Qty bằng nút -: từ 2 → 1 (giảm về biên dưới) | `Product_B: Qty=2` → Click `-` | Qty=1, Thành tiền giảm ÷2, Tổng cộng cập nhật | Số lượng hạ về 1, các chỉ số tiền giảm đi một nửa hoàn toàn chính xác | **PASS** |
| **FR-07-TC-16** | Click "Tiếp tục mua sắm" (giỏ có sản phẩm) | Giỏ: `[Product_A, Product_B]`; Click nút | Chuyển về trang chủ, Giỏ được lưu | Điều hướng thành công về trang danh sách sản phẩm, giỏ hàng giữ nguyên dữ liệu | **PASS** |
| **FR-07-TC-17** | Click "Tiếp tục mua sắm" (giỏ trống) | Giỏ trống; Click nút | Chuyển về trang chủ | Điều hướng mượt mà về màn hình chính | **PASS** |
| **FR-07-TC-18** | Kiểm tra nhãn "Tổng cộng" (chính xác) | Giỏ có sản phẩm → Xem nhãn | Nhãn = "Tổng cộng" (chính xác, không phải "Tổng tạm tính") | Giao diện ghi  chữ "Tổng tạm tính" không theo tiêu chuẩn đặc tả | **FAIL** |
| **FR-07-TC-19** | Thêm sản phẩm với Qty=999 (biên trên hợp lệ) | `Product_C`, `Qty=999`, `Price=10.000₫` | Qty=999, Thành tiền=9.990.000₫ (tính chính xác) | Hệ thống tính toán chính xác giá trị biên trên mà không gặp lỗi số học | **PASS** |
| **FR-07-TC-20** | Thêm sản phẩm trực tiếp từ trang 'Danh sách sản phẩm' | `Product_B`, `Qty=1`, `Price=30.000₫` | Giỏ: [Product_B \| 30.000₫ \| 1 \| 30.000₫] | Hệ thống hiển thị đúng dòng sản phẩm vừa thêm vào giỏ hàng với thông tin chính xác | **PASS** |
| **FR-07-TC-21** | Xóa sản phẩm duy nhất → Giỏ trở về trống (edge transition) | 1 sản phẩm → Xóa → "Có" | Giỏ: [] (trống), hiển thị hình + "Giỏ hàng trống" | Giỏ hàng lập tức chuyển trạng thái (Empty State), hình minh họa xuất hiện lại | **PASS** |

---

### BẢNG GHI NHẬN KẾT QUẢ KIỂM THỬ (TEST LOG) - FR-14

| TC ID | Mô tả Kịch Bản Chi Tiết | Dữ liệu đầu vào | Kết quả mong đợi | Kết quả thực tế | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **FR-14-TC-01** | Thêm danh mục với tên hợp lệ | `Category Name = "Điện tử"` | Success: "Thêm danh mục thành công", "Điện tử" xuất hiện trong danh sách | Danh mục được tạo thành công và cập nhật real-time lên giao diện danh sách | **PASS** |
| **FR-14-TC-02** | Thêm danh mục với tên để trống (min-1, không hợp lệ) | `Category Name = ""` → Click "Lưu" | Error: "Tên danh mục không được để trống" | Danh mục vẫn được tạo nhưng không có tên và cập nhật real-time lên giao diện danh sách | **FAIL** |
| **FR-14-TC-03** | Thêm danh mục với tên chứa XSS payload | `Category Name = "<script>alert(1)</script>"` | Security Pass: Từ chối hoặc escape, không render HTML | Danh mục vẫn được tạo và cập nhật real-time lên giao diện danh sách | **FAIL** |
| **FR-14-TC-04** | Thêm danh mục với tên quá dài (max+1, 256 ký tự) | `Category Name = [256 ký tự]` | Error: "Tên danh mục quá dài" | Danh mục vẫn được tạo và cập nhật real-time lên giao diện danh sách | **FAIL** |
| **FR-14-TC-05** | Thêm danh mục với tên tối thiểu hợp lệ (min, 1 ký tự) | `Category Name = "A"` | Success: Danh mục "A" được thêm | Tạo thành công danh mục có tên ngắn 1 ký tự | **PASS** |
| **FR-14-TC-06** | Thêm danh mục với tên tối đa hợp lệ (max, 255 ký tự) | `Category Name = [255 ký tự]` | Success: Danh mục được thêm | Hệ thống lưu trữ và hiển thị đầy đủ chuỗi tên danh mục dài 255 ký tự | **PASS** |
| **FR-14-TC-07** | Thêm danh mục với tên chỉ khoảng trắng | `Category Name = "   "` → Click "Lưu" | Error: "Tên danh mục không được để trống" (sau trim) | Danh mục vẫn được tạo nhưng không thấy tên và cập nhật real-time lên giao diện danh sách | **FAIL** |
| **FR-14-TC-08** | Thêm danh mục với tên trùng danh mục hiện có | DB: `["Điện tử"]`; Nhập `"Điện tử"` | Error: "Tên danh mục đã tồn tại" | Danh mục vẫn được tạo và cập nhật real-time lên giao diện danh sách | **FAIL** |
| **FR-14-TC-09** | Xem danh sách danh mục (có dữ liệu) | Truy cập trang, danh sách có ≥1 danh mục | Pass: Hiển thị danh sách đầy đủ | Danh sách danh mục tải mượt mà, hiển thị đúng cấu trúc bảng thông tin | **PASS** |
| **FR-14-TC-10** | Xem danh sách danh mục (trống, edge transition) | Truy cập trang, DB: 0 danh mục | Pass: Empty state + "Chưa có danh mục" | Widget Empty State hiển thị rõ ràng kèm thông báo giỏ/danh mục trống | **PASS** |
| **FR-14-TC-11** | Xóa danh mục | Click Xóa `[Danh mục A]` | Success: "Xóa danh mục thành công", Danh mục A xóa khỏi danh sách | Danh mục bị xóa ngay lập tức khỏi UI và Database | **PASS** |
| **FR-14-TC-12** | Xóa danh mục có sản phẩm liên kết | DB: Danh mục A có 5 sản phẩm; Click Xóa | TBD: (a) Cascade delete; (b) Error "Có sản phẩm liên kết" | Hệ thống hiển thị thông báo lỗi, chặn hành động xóa để bảo toàn dữ liệu sản phẩm | **PASS** |
| **FR-14-TC-13** | Admin đã đăng nhập → Truy cập trang | JWT Token: `{role: "admin"}` | Success: Truy cập trang quản lý danh mục | Token được xác thực hợp lệ, giao diện Dashboard Admin hiển thị | **PASS** |
| **FR-14-TC-14** | Admin chưa đăng nhập → Truy cập trang → Redirect | Không có Token | Error/Redirect: "Vui lòng đăng nhập" | Hệ thống chặn quyền truy cập và tự động đẩy người dùng về trang Login | **PASS** |
| **FR-14-TC-15** | User thường (role='user') → Truy cập trang admin | JWT Token: `{role: "user"}` | Error: 403 Forbidden, "Bạn không phải là admin" | Hệ thống trả về lỗi phân quyền (403), không hiển thị dữ liệu quản trị | **PASS** |
| **FR-14-TC-16** | Mã danh mục (ID) hiển thị read-only | Xem form/danh sách, kiểm tra ID | Pass: ID disabled, không thể edit | Ô chứa ID danh mục bị khóa (read-only/disabled text input) trên UI | **PASS** |
| **FR-14-TC-17** | Cố gắng thay đổi ID danh mục qua API | PUT `/api/admin/categories/5` `{id: 999}` | Error/No-op: ID không thay đổi | Backend từ chối cập nhật khóa chính (ID), giữ nguyên cấu trúc cũ trong DB | **PASS** |

---

### BẢNG GHI NHẬN KẾT QUẢ KIỂM THỬ (TEST LOG) - FR-05

| TC ID | Mô tả Kịch Bản Chi Tiết | Dữ liệu đầu vào | Kết quả mong đợi | Kết quả thực tế | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **FR-05-TC-01** | Truy cập trang chủ (không tìm kiếm, keyword min=0) | Không nhập keyword | Hiển thị tất cả sản phẩm dạng grid | Hệ thống  hiển thị thông báo "Network request timed out" | **FAIL** |
| **FR-05-TC-02** | Tìm kiếm sản phẩm với keyword hợp lệ | `Keyword = "Điện thoại"` | Danh sách sản phẩm match "Điện thoại" hiển thị | Hệ thống  hiển thị thông báo "Network request timed out" | **FAIL** |
| **FR-05-TC-03** | Tìm kiếm với XSS payload (security) | `Keyword = "<script>alert(1)</script>"` | Security: Payload escaped, không render HTML | Hệ thống  hiển thị thông báo "Network request timed out" | **FAIL** |
| **FR-05-TC-04** | Tìm kiếm với ký tự đặc biệt | `Keyword = "@#$%^&*"` | Tìm kiếm hoạt động (hoặc không kết quả) | Hệ thống  hiển thị thông báo "Network request timed out" | **FAIL** |
| **FR-05-TC-05** | Tìm kiếm không có kết quả (0 match) | `Keyword = "XYZ không tồn tại 123"` | Empty state: "Không tìm thấy sản phẩm" + Icon | Hệ thống  hiển thị thông báo "Network request timed out" | **FAIL** |
| **FR-05-TC-06** | Tìm kiếm case-insensitive | `Keyword = "ĐIỆN THOẠI"` và `"điện thoại"` | Cả hai match "Điện thoại" (nếu support) | Hệ thống  hiển thị thông báo "Network request timed out" | **FAIL** |
| **FR-05-TC-07** | Tìm kiếm quá dài (max+1=256 ký tự) | `Keyword = [256 ký tự]` | Từ chối, cắt bớt, hoặc không kết quả | Hệ thống  hiển thị thông báo "Network request timed out" | **FAIL** |
| **FR-05-TC-08** | Tìm kiếm partial match | `Keyword = "điện"` | Match "Điện thoại", "Điều hòa", ... | Hệ thống  hiển thị thông báo "Network request timed out" | **FAIL** |
| **FR-05-TC-09** | Danh sách có ≥1 sản phẩm | DB: 5 sản phẩm | Grid hiển thị 5 item | Hệ thống  hiển thị thông báo "Network request timed out" | **BLOCKED** |
| **FR-05-TC-10** | Danh sách trống | DB: 0 sản phẩm | Empty state: "Chưa có sản phẩm nào" | Hệ thống  hiển thị thông báo "Network request timed out" | **BLOCKED** |
| **FR-05-TC-11** | Đang tải dữ liệu (loading state) | API call gửi, chờ response | Loading spinner/skeleton hiển thị | Spinner hoạt động liên tục trong suốt quá trình chờ phản hồi từ server | **PASS** |
| **FR-05-TC-12** | Đã tải xong (loaded state) | API response successful | Spinner ẩn, danh sách hiển thị | Hệ thống  hiển thị thông báo "Network request timed out" | **BLOCKED** |
| **FR-05-TC-13** | Lỗi tải dữ liệu (error state) | Network error / timeout / 500 error | Error message: "Không thể tải..." | Hệ thống  hiển thị thông báo "Network request timed out" | **PASS** |
| **FR-05-TC-14** | Ảnh sản phẩm hợp lệ + Alt text | Ảnh: valid URL, `alt = "Điện thoại Samsung..."` | Ảnh hiển thị, alt text accessible | Hệ thống  hiển thị thông báo "Network request timed out" | **BLOCKED** |
| **FR-05-TC-15** | Ảnh sản phẩm không tải (broken) | Ảnh: broken link (404) | Placeholder / Error icon hiển thị | Hệ thống  hiển thị thông báo "Network request timed out" | **BLOCKED** |
| **FR-05-TC-16** | Ảnh không có alt text (accessibility) | `Alt = ""` (rỗng) | A11y issue: Cảnh báo hoặc fallback alt | Hệ thống  hiển thị thông báo "Network request timed out" | **BLOCKED** |
| **FR-05-TC-17** | Giá > 0 (min hợp lệ = 1₫) | `Price = 50000` hoặc `1` | Hiển thị: ₫50.000 hoặc ₫1 (format phân cách) | Hệ thống  hiển thị thông báo "Network request timed out" | **BLOCKED** |
| **FR-05-TC-18** | Giá = 0 (min-1, edge case) | `Price = 0` | Hiển thị ₫0 hoặc "Miễn phí" | Hệ thống  hiển thị thông báo "Network request timed out" | **BLOCKED** |
| **FR-05-TC-19** | Giá < 0 (âm, không hợp lệ) | `Price = -50000` | Error: Không hiển thị hoặc error | Hệ thống  hiển thị thông báo "Network request timed out" | **BLOCKED** |
| **FR-05-TC-20** | Giá missing/null | `Price = null` | Error: Skip sản phẩm hoặc placeholder | Hệ thống  hiển thị thông báo "Network request timed out" | **BLOCKED** |
| **FR-05-TC-21** | Tên sản phẩm hợp lệ (min=1) | `Name = "Điện thoại"` | Hiển thị tên đầy đủ | Hệ thống  hiển thị thông báo "Network request timed out" | **BLOCKED** |
| **FR-05-TC-22** | Tên sản phẩm rỗng (min-1=0, không hợp lệ) | `Name = ""` | Skip sản phẩm hoặc placeholder | Hệ thống  hiển thị thông báo "Network request timed out" | **BLOCKED** |
| **FR-05-TC-23** | Tên sản phẩm chứa XSS (security) | `Name = "<img src=x onerror=alert('XSS')>"` | Security: HTML escaped, text literal | Hệ thống  hiển thị thông báo "Network request timed out" | **BLOCKED** |
| **FR-05-TC-24** | Grid responsive mobile (1–2 cột) | Mobile 375px width | Layout hợp lý, items readable | Hệ thống  hiển thị thông báo "Network request timed out" | **BLOCKED** |
| **FR-05-TC-25** | Grid responsive tablet (2–3 cột) | Tablet 768px width | Layout hợp lý, items readable | Hệ thống  hiển thị thông báo "Network request timed out" | **BLOCKED** |
| **FR-05-TC-26** | Page có đúng 1 <h1> (accessibility) | Inspect DOM | Chỉ 1 <h1> trên page | Kiểm tra giao diện xác nhận chỉ xuất hiện duy nhất một thẻ `<h1>` | **PASS** |
| **FR-05-TC-27** | Keyword max hợp lệ (255 ký tự) | `Keyword = [255 ký tự]` | Tìm kiếm hoạt động | Hệ thống  hiển thị thông báo "Network request timed out" | **BLOCKED** |
| **FR-05-TC-28** | Keyword được escape safe (XSS prevention) | `Keyword = "Test"` | HTML escaped: &lt;b&gt;Test&lt;/b&gt; | Hệ thống  hiển thị thông báo "Network request timed out" | **BLOCKED** |