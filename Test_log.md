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
  | FR-06-BVA-01 | Kiểm tra giá trị ngay dưới biên | `0` | Từ chối và hiển thị lỗi | Cho phép thêm vào giỏ hàng (xem FR-06-DT-03) | FAIL |
  | FR-06-BVA-02 | Kiểm tra giá trị tối thiểu hợp lệ | `1` | Chấp nhận, có thể thêm vào giỏ hàng | Chấp nhận, nút thêm vào giỏ hàng hoạt động bình thường (xem FR-06-DT-02)| PASS |
  | FR-06-BVA-03 | Kiểm tra giá trị ngay trên biên | `2` | Chấp nhận, thêm vào giỏ hàng thành công | Thêm vào giỏ hàng thành công, có thông báo đã thêm (xem FR-06-DT-07) | PASS |
  | FR-06-BVA-04 | Kiểm tra giá trị âm | `-1` | Từ chối, hiển thị lỗi | Cho phép thêm vào giỏ hàng (xem FR-06-DT-04) | FAIL |
  | FR-06-BVA-05 | Kiểm tra giá trị thập phân | `1.5` | Từ chối, hiển thị lỗi | Cho phép thêm vào giỏ hàng (xem FR-06-DT-05) | FAIL |
  | FR-06-BVA-06 | Kiểm tra giá trị rỗng | `` (empty) | Từ chối, hiển thị lỗi | Cho phép thêm vào giỏ hàng với số lượng NaN (xem FR-06-DT-06) | FAIL |
  | FR-08-DT-01 | Người dùng chưa đăng nhập thực hiện thanh toán | Chưa đăng nhập, có giỏ hàng | Chặn thao tác, chuyển về đăng nhập hoặc hiển thị thông báo chưa đăng nhập | Not executed | Pending |
  | FR-08-DT-02 | Người dùng đã đăng nhập, giỏ hàng có sản phẩm | Đã đăng nhập, giỏ hàng có 1 sản phẩm | Hiển thị đầy đủ danh sách sản phẩm và tổng tiền tự động tính | Not executed | Pending |
  | FR-08-DT-03 | Thanh toán với giỏ hàng rỗng | Đã đăng nhập, giỏ hàng không có sản phẩm | Chặn thanh toán, hiển thị thông báo giỏ hàng trống | Not executed | Pending |
  | FR-08-DT-04 | Client gửi `total_amount` sai so với giỏ hàng | Đã đăng nhập, giỏ hàng có sản phẩm, `total_amount` bị chỉnh sửa | Backend tự tính lại tổng tiền và không chấp nhận giá trị client gửi | Not executed | Pending |
  | FR-08-DT-05 | Thanh toán thành công | Đã đăng nhập, giỏ hàng hợp lệ, dữ liệu thanh toán đúng | Hiển thị thông báo thành công, giỏ hàng được xóa | Not executed | Pending |
  | FR-08-DT-06 | Kiểm tra hiển thị danh sách sản phẩm ở màn hình thanh toán | Đã đăng nhập, giỏ hàng có nhiều sản phẩm | Hiển thị đầy đủ tên, số lượng, giá từng sản phẩm và tổng tiền | Not executed | Pending |
  | FR-08-DT-07 | Kiểm tra phản hồi khi backend từ chối dữ liệu không hợp lệ | Đã đăng nhập, `total_amount` không đúng | Hiển thị lỗi và không tạo đơn hàng | Not executed | Pending |
  | FR-08-BVA-01 | Kiểm tra biên đăng nhập | Người dùng chưa đăng nhập | Thanh toán bị chặn | Not executed | Pending |
  | FR-08-BVA-02 | Kiểm tra biên tối thiểu giỏ hàng | Giỏ hàng có `0` sản phẩm | Chặn thanh toán | Not executed | Pending |
  | FR-08-BVA-03 | Kiểm tra giá trị tối thiểu hợp lệ của giỏ hàng | Giỏ hàng có `1` sản phẩm | Cho phép thanh toán và tính tổng tiền | Not executed | Pending |
  | FR-08-BVA-04 | Kiểm tra giá trị trên biên của giỏ hàng | Giỏ hàng có `2` sản phẩm | Thanh toán vẫn hợp lệ và hiển thị đầy đủ thông tin | Not executed | Pending |
  | FR-08-BVA-05 | Kiểm tra biên tổng tiền bằng `0` | Tổng tiền tính được bằng `0` | Không cho phép thanh toán nếu không có sản phẩm hợp lệ | Not executed | Pending |
  | FR-08-BVA-06 | Kiểm tra tổng tiền tối thiểu hợp lệ | Tổng tiền tính được bằng `1` | Chấp nhận và tạo đơn hàng nếu dữ liệu khác hợp lệ | Not executed | Pending |
  | FR-08-BVA-07 | Kiểm tra giá trị `total_amount` bị chỉnh sửa bởi client | `total_amount` gửi lên khác với giá trị backend tính | Backend ghi đè bằng giá trị tính lại từ giỏ hàng | Not executed | Pending |