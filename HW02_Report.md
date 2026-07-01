# Domain Testing & Boundary Value Analysis
23127420 - Đỗ Thành Minh

---

## Tính năng 1: FR-06 (Product detail view - Pool A)

### 1.1. Domain Testing
- **Xác định các biến đầu vào:**
  - `Số lượng` (input nhập từ người dùng)
  - `Trạng thái sản phẩm` (đã tải xong chi tiết sản phẩm hay chưa)
  - `Hành động Thêm vào giỏ hàng` (click nút)

- **Phân tích miền giá trị (Valid/Invalid):**
  - `Số lượng`:
    - Valid: số nguyên dương, tối thiểu là `1`
    - Invalid: `0`, số âm, số thập phân, ký tự chữ, chuỗi rỗng, khoảng trắng
  - `Trạng thái sản phẩm`:
    - Valid: sản phẩm đã được load đầy đủ thông tin
    - Invalid: sản phẩm chưa load hoặc thiếu dữ liệu quan trọng
  - `Hành động Thêm vào giỏ hàng`:
    - Valid: người dùng bấm nút khi `số lượng` hợp lệ và sản phẩm sẵn sàng
    - Invalid: bấm nút khi `số lượng` không hợp lệ hoặc sản phẩm chưa sẵn sàng

- **Bảng Test Case:**
  | TC ID | Description | Input Data | Expected Output | Actual Result | Status |
  |---|---|---|---|---|---|
  | FR-06-DT-01 | Kiểm tra giao diện hiển thị đầy đủ thông tin sản phẩm | Mở trang chi tiết sản phẩm đã có dữ liệu | Hiển thị ảnh lớn, tên, giá, mô tả, danh mục đầy đủ | Hiển thị ảnh lớn, tên, giá, mô tả | FAIL |
  | FR-06-DT-02 | Kiểm tra nhập số lượng hợp lệ | `1` | Chấp nhận, nút thêm vào giỏ hàng hoạt động bình thường | Chấp nhận, nút thêm vào giỏ hàng hoạt động bình thường | PASS |
  | FR-06-DT-03 | Kiểm tra số lượng không hợp lệ bằng `0` | `0` | Hiển thị lỗi/không cho thêm vào giỏ hàng | Cho phép thêm vào giỏ hàng | FAIL |
  | FR-06-DT-04 | Kiểm tra số lượng âm | `-1` | Từ chối, hiển thị thông báo lỗi | Cho phép thêm vào giỏ hàng | FAIL |
  | FR-06-DT-05 | Kiểm tra nhập số thập phân | `1.5` | Từ chối, hiển thị thông báo lỗi | Cho phép thêm vào giỏ hàng | FAIL |
  | FR-06-DT-06 | Kiểm tra nhập ký tự không phải số | `e` | Từ chối, hiển thị thông báo lỗi | Hệ thống không cho phép nhập ký tự không phải số trừ ký tự 'e'. Cho phép thêm vào giỏ hàng với số lượng NaN | FAIL |
  | FR-06-DT-07 | Kiểm tra thêm vào giỏ hàng với số lượng hợp lệ | `2` + click nút | Hiển thị toast hoặc badge giỏ hàng cập nhật | Thêm vào giỏ hàng thành công, có thông báo đã thêm | PASS |
  | FR-06-DT-08 | Kiểm tra thêm vào giỏ hàng khi số lượng không hợp lệ | `0` + click nút | Không thêm vào giỏ hàng, hiển thị lỗi | Cho phép thêm vào giỏ hàng (xem FR-06-DT-03) | FAIL |

### 1.2. Boundary Value Analysis
- **Xác định các điểm biên:**
  - Giá trị tối thiểu hợp lệ: `1`
  - Giá trị ngay dưới biên: `0`
  - Giá trị ngay trên biên: `2`
  - Giá trị không hợp lệ ngoài miền: `-1`, `1.5`, `abc`
  - Vì yêu cầu không quy định giới hạn tối đa, nên chỉ tập trung vào biên dưới của miền giá trị

- **Bảng Test Case Giá trị biên:**
  | TC ID | Description | Input Data | Expected Output | Actual Result | Status |
  |---|---|---|---|---|---|
  | FR-06-BVA-01 | Kiểm tra giá trị ngay dưới biên | `0` | Từ chối và hiển thị lỗi | Cho phép thêm vào giỏ hàng (xem FR-06-DT-03) | FAIL |
  | FR-06-BVA-02 | Kiểm tra giá trị tối thiểu hợp lệ | `1` | Chấp nhận, có thể thêm vào giỏ hàng | Chấp nhận, nút thêm vào giỏ hàng hoạt động bình thường (xem FR-06-DT-02)| PASS |
  | FR-06-BVA-03 | Kiểm tra giá trị ngay trên biên | `2` | Chấp nhận, thêm vào giỏ hàng thành công | Thêm vào giỏ hàng thành công, có thông báo đã thêm (xem FR-06-DT-07) | PASS |
  | FR-06-BVA-04 | Kiểm tra giá trị âm | `-1` | Từ chối, hiển thị lỗi | Cho phép thêm vào giỏ hàng (xem FR-06-DT-04) | FAIL |
  | FR-06-BVA-05 | Kiểm tra giá trị thập phân | `1.5` | Từ chối, hiển thị lỗi | Cho phép thêm vào giỏ hàng (xem FR-06-DT-05) | FAIL |
  | FR-06-BVA-06 | Kiểm tra giá trị rỗng | `` (empty) | Từ chối, hiển thị lỗi | Cho phép thêm vào giỏ hàng với số lượng NaN (xem FR-06-DT-06) | FAIL |


### 1.3. AI Gap Analysis
* **Lỗi Logic (Double-click Bug):** Copilot bỏ sót kiểm thử hàm `handleAddToCart` bắt buộc phải click 2 lần mới hoạt động.
* **Lỗi Hiển thị (Missing Field):** Copilot không phát hiện giao diện thiếu hoàn toàn trường *Danh mục* so với yêu cầu FR-06.
* **Sai lệch kiểu dữ liệu:** Copilot kỳ vọng chặn số thập phân `1.5`, nhưng code thực tế dùng `parseInt()` làm tròn thành `1` và cho qua.
* **Lỗi Giao diện (GUI):** Copilot bỏ qua kiểm thử nút sai màu (Dùng xanh lá thay vì xanh dương), thiếu kiểm tra số lượng thẻ `<h1>` và thuộc tính `alt` của ảnh.
* **Nguyên nhân:** AI chỉ phân tích "hộp đen" theo mô tả bề nổi, hoàn toàn không thực hiện kiểm thử tĩnh (Static Analysis) để đối chiếu mã nguồn với tài liệu đặc tả (SRS).

### 1.4. Bug Reporting
*Danh sách các lỗi phát hiện khi chạy thực tế trên EShop SUT*.
- **Bug 1:** FR-06-DT-01 - https://github.com/huiw14/KTPM-Eshop-Mobile/issues/1
- **Bug 2:** FR-06-DT-03 - https://github.com/huiw14/KTPM-Eshop-Mobile/issues/2
- **Bug 3:** FR-06-DT-04 - https://github.com/huiw14/KTPM-Eshop-Mobile/issues/3
- **Bug 4:** FR-06-DT-05 - https://github.com/huiw14/KTPM-Eshop-Mobile/issues/4
- **Bug 5:** FR-06-DT-06 - https://github.com/huiw14/KTPM-Eshop-Mobile/issues/5
---

## Tính năng 2: FR-08 (Checkout - Pool B)

### 2.1. Domain Testing
- **Xác định các biến đầu vào:**
  - Trạng thái đăng nhập của người dùng
  - Danh sách sản phẩm trong giỏ hàng
  - Giá trị tổng tiền thanh toán
  - Hành động thanh toán
  - Kết quả sau thanh toán (giỏ hàng có bị xóa hay không)

- **Phân tích miền giá trị (Valid/Invalid):**
  - Trạng thái đăng nhập:
    - Valid: người dùng đã đăng nhập
    - Invalid: chưa đăng nhập / là khách vãng lai
  - Giỏ hàng:
    - Valid: có ít nhất 1 sản phẩm trong giỏ hàng, có đủ thông tin sản phẩm
    - Invalid: giỏ hàng rỗng, thiếu sản phẩm, dữ liệu sản phẩm không hợp lệ
  - Tổng tiền:
    - Valid: hệ thống tự tính lại từ giỏ hàng, giá trị dương và phù hợp với dữ liệu thực tế
    - Invalid: client gửi `total_amount` sai, bị chỉnh sửa thủ công, hoặc bằng `0` khi giỏ hàng có sản phẩm
  - Hành động thanh toán:
    - Valid: người dùng đã đăng nhập, giỏ hàng hợp lệ, thao tác thanh toán được phép
    - Invalid: thanh toán khi chưa đăng nhập, giỏ hàng rỗng, hoặc backend từ chối dữ liệu không hợp lệ

- **Bảng Test Case:**
  | TC ID | Description | Input Data | Expected Output | Actual Result | Status |
  |---|---|---|---|---|---|
  | FR-08-DT-01 | Người dùng chưa đăng nhập thực hiện thanh toán | Chưa đăng nhập, có giỏ hàng | Chặn thao tác, chuyển về đăng nhập hoặc hiển thị thông báo chưa đăng nhập | Chặn thao tác, chuyển về đăng nhập | PASS |
  | FR-08-DT-02 | Người dùng đã đăng nhập, giỏ hàng có sản phẩm | Đã đăng nhập, giỏ hàng có 1 sản phẩm | Hiển thị đầy đủ danh sách sản phẩm và tổng tiền tự động tính | Hiển thị đầy đủ danh sách sản phẩm và tổng tiền tự động tính | PASS |
  | FR-08-DT-03 | Thanh toán với giỏ hàng rỗng | Đã đăng nhập, giỏ hàng không có sản phẩm | Chặn thanh toán, hiển thị thông báo giỏ hàng trống | Chặn thanh toán, hiển thị thông báo giỏ hàng trống | PASS |
  | FR-08-DT-04 | Client gửi `total_amount` sai so với giỏ hàng | Đã đăng nhập, giỏ hàng có sản phẩm, `total_amount` bị chỉnh sửa | Backend tự tính lại tổng tiền và không chấp nhận giá trị client gửi | Backend chấp nhận giá trị client gửi | FAIL |
  | FR-08-DT-05 | Thanh toán thành công | Đã đăng nhập, giỏ hàng hợp lệ, dữ liệu thanh toán đúng | Hiển thị thông báo thành công, giỏ hàng được xóa | Thông báo thanh toán thành công, giỏ hàng không được xóa | FAIL |
  | FR-08-DT-06 | Kiểm tra hiển thị danh sách sản phẩm ở màn hình thanh toán | Đã đăng nhập, giỏ hàng có nhiều sản phẩm | Hiển thị đầy đủ tên, số lượng, giá từng sản phẩm và tổng tiền | Hiển thị đầy đủ tên, số lượng, giá từng sản phẩm và tổng tiền | PASS |
  | FR-08-DT-07 | Kiểm tra phản hồi khi backend từ chối dữ liệu không hợp lệ | Đã đăng nhập, `total_amount` không đúng | Hiển thị lỗi và không tạo đơn hàng | Backend chấp nhận giá trị client gửi và chấp nhận thanh toán (xem FR-08-DT-04) | FAIL |

### 2.2. Boundary Value Analysis
- **Xác định các điểm biên:**
  - Trạng thái đăng nhập: chưa đăng nhập (Invalid) và đã đăng nhập (Valid)
  - Số lượng sản phẩm trong giỏ hàng:
    - `0` sản phẩm → biên dưới, Invalid
    - `1` sản phẩm → giá trị tối thiểu hợp lệ, Valid
    - `2` sản phẩm → giá trị trên biên, Valid
  - Tổng tiền:
    - `0` → biên dưới, Invalid trong trường hợp có thanh toán
    - `1` → giá trị tối thiểu hợp lệ về mặt số học, nhưng phải phù hợp với giỏ hàng
    - `>1` → giá trị hợp lệ
  - Giá trị `total_amount` do client gửi:
    - Giá trị đúng → Valid
    - Giá trị sai / bị chỉnh sửa → Invalid

- **Bảng Test Case Giá trị biên:**
  | TC ID | Description | Input Data | Expected Output | Actual Result | Status |
  |---|---|---|---|---|---|
  | FR-08-BVA-01 | Kiểm tra biên đăng nhập | Người dùng chưa đăng nhập | Thanh toán bị chặn | Thanh toán bị chặn | PASS |
  | FR-08-BVA-02 | Kiểm tra biên tối thiểu giỏ hàng | Giỏ hàng có `0` sản phẩm | Chặn thanh toán | Chặn thanh toán | PASS |
  | FR-08-BVA-03 | Kiểm tra giá trị tối thiểu hợp lệ của giỏ hàng | Giỏ hàng có `1` sản phẩm | Cho phép thanh toán và tính tổng tiền | Cho phép thanh toán và tính tổng tiền | PASS |
  | FR-08-BVA-04 | Kiểm tra giá trị trên biên của giỏ hàng | Giỏ hàng có `2` sản phẩm | Thanh toán vẫn hợp lệ và hiển thị đầy đủ thông tin | Thanh toán vẫn hợp lệ và hiển thị đầy đủ thông tin | PASS |
  | FR-08-BVA-05 | Kiểm tra biên tổng tiền bằng `0` | Tổng tiền tính được bằng `0` | Không cho phép thanh toán nếu không có sản phẩm hợp lệ | Cho phép thanh toán (xem FR-08-DT-04) | FAIL |
  | FR-08-BVA-06 | Kiểm tra tổng tiền tối thiểu hợp lệ | Tổng tiền tính được bằng `1` | Chấp nhận và tạo đơn hàng nếu dữ liệu khác hợp lệ | Cho phép thanh toán | PASS |
  | FR-08-BVA-07 | Kiểm tra giá trị `total_amount` bị chỉnh sửa bởi client | `total_amount` gửi lên khác với giá trị backend tính | Backend ghi đè bằng giá trị tính lại từ giỏ hàng | Backend chấp nhận giá trị gửi từ client (xem FR-08-DT-04) | FAIL |

### 2.3. AI Gap Analysis
* **Lỗi Bảo mật (Trust Client Data):** Copilot kỳ vọng Backend tự tính lại tổng tiền (TC FR-08-DT-04, BVA-07), nhưng trong thực tế server.js hoàn toàn tin tưởng và lưu trực tiếp total_amount từ client gửi lên mà không hề xác minh lại.
* **Lỗi Giao diện (Editable Total):** Đặc tả cấm người dùng chỉnh sửa tổng tiền, nhưng Copilot không phát hiện ra mã nguồn Checkout.jsx lại sử dụng thẻ `<input type="number" onChange={...}>` cho phép người dùng tự do sửa editableTotal.
* **Lỗi Logic (Not Clearing Cart):** Copilot kỳ vọng giỏ hàng được xóa sau khi thanh toán thành công, nhưng trong Checkout.jsx, trạng thái success chỉ hiển thị thông báo chứ không hề gọi hàm `clearCart()`.
* **Nguyên nhân:** AI chỉ bám vào mô tả lý thuyết của SRS để sinh test case mà không thực sự đọc hiểu và phân tích tĩnh (Static Analysis) luồng mã nguồn thực tế nối giữa Frontend và Backend.

### 2.4. Bug Reporting
*Danh sách các lỗi phát hiện khi chạy thực tế trên EShop SUT*.
- **Bug 6:** FR-08-DT-05 - https://github.com/huiw14/KTPM-Eshop-Mobile/issues/6
- **Bug 7:** FR-08-DT-04 - https://github.com/huiw14/KTPM-Eshop-Mobile/issues/7

---

## Tính năng 3: FR-16 (Product import from CSV - Pool C)
*(Lặp lại cấu trúc 4 phần tương tự)*

---

## Tính năng 4: Mobile FR-012 (Pool D)
*(Lặp lại cấu trúc 4 phần tương tự)*