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
  | FR-08-DT-01 | Người dùng chưa đăng nhập thực hiện thanh toán | Chưa đăng nhập, có giỏ hàng | Chặn thao tác, chuyển về đăng nhập hoặc hiển thị thông báo chưa đăng nhập | Chặn thao tác, chuyển về đăng nhập | PASS |
  | FR-08-DT-02 | Người dùng đã đăng nhập, giỏ hàng có sản phẩm | Đã đăng nhập, giỏ hàng có 1 sản phẩm | Hiển thị đầy đủ danh sách sản phẩm và tổng tiền tự động tính | Hiển thị đầy đủ danh sách sản phẩm và tổng tiền tự động tính | PASS |
  | FR-08-DT-03 | Thanh toán với giỏ hàng rỗng | Đã đăng nhập, giỏ hàng không có sản phẩm | Chặn thanh toán, hiển thị thông báo giỏ hàng trống | Chặn thanh toán, hiển thị thông báo giỏ hàng trống | PASS |
  | FR-08-DT-04 | Client gửi `total_amount` sai so với giỏ hàng | Đã đăng nhập, giỏ hàng có sản phẩm, `total_amount` bị chỉnh sửa | Backend tự tính lại tổng tiền và không chấp nhận giá trị client gửi | Backend chấp nhận giá trị client gửi | FAIL |
  | FR-08-DT-05 | Thanh toán thành công | Đã đăng nhập, giỏ hàng hợp lệ, dữ liệu thanh toán đúng | Hiển thị thông báo thành công, giỏ hàng được xóa | Thông báo thanh toán thành công, giỏ hàng không được xóa | FAIL |
  | FR-08-DT-06 | Kiểm tra hiển thị danh sách sản phẩm ở màn hình thanh toán | Đã đăng nhập, giỏ hàng có nhiều sản phẩm | Hiển thị đầy đủ tên, số lượng, giá từng sản phẩm và tổng tiền | Hiển thị đầy đủ tên, số lượng, giá từng sản phẩm và tổng tiền | PASS |
  | FR-08-DT-07 | Kiểm tra phản hồi khi backend từ chối dữ liệu không hợp lệ | Đã đăng nhập, `total_amount` không đúng | Hiển thị lỗi và không tạo đơn hàng | Backend chấp nhận giá trị client gửi và chấp nhận thanh toán (xem FR-08-DT-04) | FAIL |
  | FR-08-BVA-01 | Kiểm tra biên đăng nhập | Người dùng chưa đăng nhập | Thanh toán bị chặn | Thanh toán bị chặn | PASS |
  | FR-08-BVA-02 | Kiểm tra biên tối thiểu giỏ hàng | Giỏ hàng có `0` sản phẩm | Chặn thanh toán | Chặn thanh toán | PASS |
  | FR-08-BVA-03 | Kiểm tra giá trị tối thiểu hợp lệ của giỏ hàng | Giỏ hàng có `1` sản phẩm | Cho phép thanh toán và tính tổng tiền | Cho phép thanh toán và tính tổng tiền | PASS |
  | FR-08-BVA-04 | Kiểm tra giá trị trên biên của giỏ hàng | Giỏ hàng có `2` sản phẩm | Thanh toán vẫn hợp lệ và hiển thị đầy đủ thông tin | Thanh toán vẫn hợp lệ và hiển thị đầy đủ thông tin | PASS |
  | FR-08-BVA-05 | Kiểm tra biên tổng tiền bằng `0` | Tổng tiền tính được bằng `0` | Không cho phép thanh toán nếu không có sản phẩm hợp lệ | Cho phép thanh toán (xem FR-08-DT-04) | FAIL |
  | FR-08-BVA-06 | Kiểm tra tổng tiền tối thiểu hợp lệ | Tổng tiền tính được bằng `1` | Chấp nhận và tạo đơn hàng nếu dữ liệu khác hợp lệ | Cho phép thanh toán | PASS |
  | FR-08-BVA-07 | Kiểm tra giá trị `total_amount` bị chỉnh sửa bởi client | `total_amount` gửi lên khác với giá trị backend tính | Backend ghi đè bằng giá trị tính lại từ giỏ hàng | Backend chấp nhận giá trị gửi từ client (xem FR-08-DT-04) | FAIL |
  | FR-16-DT-01 | Import file CSV hợp lệ với đầy đủ header và dữ liệu đúng | File `.csv` đúng header và 2 dòng dữ liệu hợp lệ | Import thành công, hiển thị báo cáo đúng số dòng thành công | Not executed | Pending |
  | FR-16-DT-02 | Import file có đuôi không phải `.csv` | File `.md` | Từ chối import, hiển thị lỗi định dạng file | Import thành công và hiện nội dung file | FAIL |
  | FR-16-DT-03 | Import file CSV header sai | Header thiếu `category_id` | Từ chối import, hiển thị lỗi header không hợp lệ | Import thành công | FAIL |
  | FR-16-DT-04 | Import dữ liệu có `name` rỗng | Dòng có `name=""` | Từ chối toàn bộ import, báo lỗi dòng này | Not executed | Pending |
  | FR-16-DT-05 | Import dữ liệu có `price` bằng 0 | Dòng có `price=0` | Từ chối toàn bộ import, báo lỗi dòng này | Not executed | Pending |
  | FR-16-DT-06 | Import dữ liệu có `price` âm | Dòng có `price=-50000` | Từ chối toàn bộ import, báo lỗi dòng này | Import thành công | FAIL |
  | FR-16-DT-07 | Import dữ liệu có trường chứa dấu phẩy được bọc đúng | `description="Áo thun, cotton"` | Import thành công, parser đọc đúng dữ liệu | Not executed | Pending |
  | FR-16-DT-08 | Import dữ liệu có trường chứa dấu phẩy không được bọc | `description=Áo thun, cotton` | Từ chối import hoặc parser sai cấu trúc, báo lỗi | Not executed | Pending |
  | FR-16-DT-09 | Import có một dòng lỗi và một dòng hợp lệ | 1 dòng hợp lệ + 1 dòng `price=0` | Rollback toàn bộ, không insert dòng nào | Import thành công | FAIL |
  | FR-16-DT-10 | Import thành công hiển thị báo cáo | File CSV có 3 dòng hợp lệ | Hiển thị `3 success, 0 error` và thông tin rõ ràng | Not executed | Pending |
  | FR-16-BVA-01 | Kiểm tra biên file extension | `product.csv` | Chấp nhận | Not executed | Pending |
  | FR-16-BVA-02 | Kiểm tra file extension invalid | `product.xls` | Từ chối | Not executed | Pending |
  | FR-16-BVA-03 | Kiểm tra tên rỗng | `name=""` | Báo lỗi, rollback | Not executed | Pending |
  | FR-16-BVA-04 | Kiểm tra tên tối thiểu hợp lệ | `name="A"` | Chấp nhận | Not executed | Pending |
  | FR-16-BVA-05 | Kiểm tra giá trị price dưới biên | `price=0` | Báo lỗi, rollback | Not executed | Pending |
  | FR-16-BVA-06 | Kiểm tra giá trị price tối thiểu hợp lệ | `price=0.01` | Chấp nhận | Not executed | Pending |
  | FR-16-BVA-07 | Kiểm tra giá trị price âm | `price=-1` | Báo lỗi, rollback | Not executed | Pending |
  | FR-16-BVA-08 | Kiểm tra rollback khi có 1 dòng lỗi | 1 dòng hợp lệ + 1 dòng lỗi | Không có dòng nào được insert | Not executed | Pending |
  | FR-04-DT-01 | Người dùng chưa đăng nhập cập nhật hồ sơ | Chưa đăng nhập | Chặn thao tác, yêu cầu đăng nhập | Not executed | Pending |
  | FR-04-DT-02 | Cập nhật họ tên hợp lệ | Họ tên: `Nguyễn Văn A` | Hồ sơ cập nhật thành công | Not executed | Pending |
  | FR-04-DT-03 | Cập nhật họ tên không hợp lệ | Họ tên: `""` | Từ chối, hiển thị lỗi | Not executed | Pending |
  | FR-04-DT-04 | Cập nhật số điện thoại hợp lệ | SĐT: `0901234567` | Hồ sơ cập nhật thành công | Not executed | Pending |
  | FR-04-DT-05 | Cập nhật số điện thoại invalid không bắt đầu bằng 0 | SĐT: `1901234567` | Từ chối, hiển thị lỗi | Not executed | Pending |
  | FR-04-DT-06 | Cập nhật số điện thoại invalid quá ngắn | SĐT: `09012345` | Từ chối, hiển thị lỗi | Not executed | Pending |
  | FR-04-DT-07 | Cập nhật số điện thoại invalid quá dài | SĐT: `090123456789` | Từ chối, hiển thị lỗi | Not executed | Pending |
  | FR-04-DT-08 | Cập nhật địa chỉ hợp lệ | Địa chỉ: `123 Lê Lợi, Q1` | Hồ sơ cập nhật thành công | Not executed | Pending |
  | FR-04-DT-09 | Cập nhật địa chỉ rỗng | Địa chỉ: `""` | Từ chối, hiển thị lỗi | Not executed | Pending |
  | FR-04-DT-10 | Cố ý thay đổi email trên giao diện | Email nhập khác giá trị cũ | Email không được thay đổi, giữ nguyên giá trị cũ | Not executed | Pending |
  | FR-04-DT-11 | Cố tình thay đổi role từ client | Payload gửi `role=admin` | Backend từ chối, role không đổi | Not executed | Pending |
  | FR-04-BVA-01 | Kiểm tra số điện thoại dưới biên | `09012345` (9 số) | Từ chối | Not executed | Pending |
  | FR-04-BVA-02 | Kiểm tra số điện thoại tối thiểu hợp lệ | `0901234567` (10 số) | Chấp nhận | Not executed | Pending |
  | FR-04-BVA-03 | Kiểm tra số điện thoại tối đa hợp lệ | `09012345678` (11 số) | Chấp nhận | Not executed | Pending |
  | FR-04-BVA-04 | Kiểm tra số điện thoại trên biên | `090123456789` (12 số) | Từ chối | Not executed | Pending |
  | FR-04-BVA-05 | Kiểm tra số điện thoại không bắt đầu bằng 0 | `1901234567` | Từ chối | Not executed | Pending |
  | FR-04-BVA-06 | Kiểm tra họ tên rỗng | `""` | Từ chối | Not executed | Pending |
  | FR-04-BVA-07 | Kiểm tra họ tên có 1 ký tự | `"A"` | Chấp nhận | Not executed | Pending |
  | FR-04-BVA-08 | Kiểm tra địa chỉ rỗng | `""` | Từ chối | Not executed | Pending |
  | FR-04-BVA-09 | Kiểm tra địa chỉ có 1 ký tự | `"A"` | Chấp nhận | Not executed | Pending |