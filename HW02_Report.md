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
*(Lặp lại cấu trúc 4 phần: 2.1 Domain Testing, 2.2 Boundary Value Analysis, 2.3 AI Gap Analysis, 2.4 Bug Reporting giống FR-06 ở trên)*

---

## Tính năng 3: FR-16 (Product import from CSV - Pool C)
*(Lặp lại cấu trúc 4 phần tương tự)*

---

## Tính năng 4: Mobile FR-012 (Pool D)
*(Lặp lại cấu trúc 4 phần tương tự)*