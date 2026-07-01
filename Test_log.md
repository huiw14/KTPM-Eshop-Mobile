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
