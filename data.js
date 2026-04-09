const lessonData = {
    "3": {
        "1": [
            { icon: "fa-desktop", title: "Máy tính và em" },
            { icon: "fa-mouse", title: "Làm quen với chuột máy tính" },
            { icon: "fa-keyboard", title: "Khám phá bàn phím" },
            { icon: "fa-info-circle", title: "Các dạng thông tin thường gặp" }
        ],
        "2": [
            { icon: "fa-folder", title: "Tệp và Cây thư mục" },
            { icon: "fa-paint-brush", title: "Vẽ tranh cùng Paint" },
            { icon: "fa-file-word", title: "Tập gõ văn bản cơ bản" },
            { icon: "fa-globe", title: "Lướt web và An toàn" }
        ]
    },
    "4": {
        "1": [
            { icon: "fa-hard-drive", title: "Phần cứng và Phần mềm" },
            { icon: "fa-globe", title: "Tìm kiếm thông tin an toàn" },
            { icon: "fa-file-word", title: "Soạn thảo văn bản nâng cao" }
        ],
        "2": [
            { icon: "fa-file-powerpoint", title: "Trình chiếu và Hiệu ứng" },
            { icon: "fa-cat", title: "Làm quen với Scratch (Tiếng Việt)" },
            { icon: "fa-shapes", title: "Chèn hình ảnh đa phương tiện" }
        ]
    },
    "5": {
        "1": [
            { icon: "fa-copyright", title: "Bản quyền tác giả" },
            { icon: "fa-search", title: "Thủ thuật tìm kiếm thông tin" },
            { icon: "fa-envelope", title: "Thư điện tử Email" }
        ],
        "2": [
            { icon: "fa-code", title: "Cấu trúc lặp và rẽ nhánh (Scratch)" },
            { icon: "fa-diagram-project", title: "Sơ đồ tư duy (Mindmap)" },
            { icon: "fa-bug", title: "Biến và Gỡ lỗi Scratch" }
        ]
    }
};

const quizData = {
    "3": {
        "1": Array.from({length: 30}, (_, i) => {
            const pool = [
                { q: "Bộ phận nào của máy tính dùng để gõ chữ?", o: ["Chuột", "Màn hình", "Bàn phím", "Thân máy"], a: 2 },
                { q: "Khi ngồi dùng máy tính, khoảng cách từ mắt đến màn hình khoảng bao nhiêu là vừa?", o: ["10-20 cm", "50-80 cm", "Hơn 2 mét", "Không giới hạn"], a: 1 },
                { q: "Máy tính giúp em làm được việc gì?", o: ["Học tập, giải trí", "Nấu cơm tự động", "Tưới cây trong vườn", "Quét nhà"], a: 0 },
                { q: "Bộ phận nào được ví như 'bộ não' của máy tính?", o: ["Chuột máy tính", "Bàn phím", "Thân máy tính (CPU)", "Màn hình"], a: 2 },
                { q: "Thông tin dạng âm thanh là gì?", o: ["Tiếng chim hót, tiếng còi xe", "Bức ảnh", "Đoạn văn bản", "Đoạn video câm"], a: 0 },
                { q: "Thao tác bấm và thả nút trái chuột ngay gọi là gì?", o: ["Nháy chuột", "Nháy chuột phải", "Kéo thả chuột", "Nháy đúp chuột"], a: 0 },
                { q: "Hình ảnh một biển báo giao thông chứa thông tin dạng gì?", o: ["Hình ảnh", "Âm thanh", "Văn bản", "Hình ảnh và Âm thanh"], a: 0 },
                { q: "Hai phím có gai trên bàn phím là phím nào?", o: ["A và S", "F và J", "Z và X", "Enter và Space"], a: 1 },
                { q: "Phím dài nhất trên bàn phím là phím nào?", o: ["Phím Enter", "Phím Shift", "Phím Dấu cách (Space)", "Phím Caps Lock"], a: 2 },
                { q: "Thao tác giữ nút trái chuột, di chuyển con trỏ rồi thả ra gọi là gì?", o: ["Nháy đúp", "Nháy phải", "Kéo thả chuột", "Di chuyển chuột"], a: 2 }
            ];
            return pool[i % pool.length]; 
        }).map((item, idx) => ({ ...item, question: `Câu ${idx+1}: ${item.q}` })),
        "2": Array.from({length: 30}, (_, i) => {
            const pool = [
                { q: "Biểu tượng của thư mục (folder) trên máy tính thường có màu gì?", o: ["Màu đỏ", "Màu vàng", "Màu trắng", "Màu xanh dướng"], a: 1 },
                { q: "Trình duyệt web dùng để làm gì?", o: ["Xem thông tin trên Internet", "Vẽ tranh", "Nghe gọi điện thoại di động", "Sửa máy in"], a: 0 },
                { q: "Đâu là phần mềm dùng để vẽ tranh cho học sinh?", o: ["Word", "Paint", "Chrome", "Windows"], a: 1 },
                { q: "Trong thư mục máy tính có thể chứa những gì?", o: ["Chỉ chứa hình ảnh", "Đồ chơi", "Tệp (file) và các thư mục con", "Chỉ chứa âm thanh"], a: 2 },
                { q: "Nút lệnh nào trên trình duyệt để tải lại trang web?", o: ["Nút Tải lại (Refresh/Reload)", "Nút Back (Quay lại)", "Nút Home (Trang chủ)", "Nút Kính lúp"], a: 0 },
                { q: "Khi gõ văn bản, phím Enter dùng để làm gì?", o: ["Viết hoa", "Xuống dòng", "Xoá chữ", "In nghiêng"], a: 1 },
                { q: "Chia sẻ mật khẩu hoặc thông tin cá nhân lên mạng có an toàn không?", o: ["Có, rất an toàn", "Không an toàn", "Chỉ nên chia sẻ cho người lạ", "Tuỳ lúc"], a: 1 },
                { q: "Công cụ 'Fill with color' (Cái xô màu) trong Paint dùng để làm gì?", o: ["Tô màu nền/vùng kín", "Xoá nét vẽ", "Viết chữ", "Phóng to hình"], a: 0 },
                { q: "Trong Paint, công cụ Text (ký hiệu chữ A) dùng làm gì?", o: ["Xoá chữ", "Chèn vào vùng văn bản", "Lật hình", "Đổ màu chữ"], a: 1 },
                { q: "Làm thế nào để đổi tên một hộp thư mục?", o: ["Nhấp chuột phải -> Rename", "Nhấp chuột phải -> Delete", "Nhấp chuột phải -> Copy", "Không thể đổi tên"], a: 0 }
            ];
            return pool[i % pool.length];
        }).map((item, idx) => ({ ...item, question: `Câu ${idx+1}: ${item.q}` }))
    },
    "4": {
        "1": Array.from({length: 30}, (_, i) => {
            const pool = [
                { q: "Phần cứng (Hardware) của máy tính là?", o: ["Các thiết bị vật lý thu nhận, xử lý, lưu trữ như màn hình, thùng máy", "Các ứng dụng Word, Paint", "Mạng Internet", "Trò chơi máy tính"], a: 0 },
                { q: "Phần mềm (Software) là gì?", o: ["Chuột và bàn phím", "Màn hình và máy in", "Các chương trình hoạt động bên trong máy tính", "Dây cáp điện"], a: 2 },
                { q: "Khi tìm kiếm thông tin trên web, em nên nhập gì vào ô tìm kiếm?", o: ["Tên tài khoản mạng xã hội", "Từ khoá (ví dụ: Tự nhiên xã hội lớp 4)", "Mật khẩu máy tính", "Địa chỉ nhà của em"], a: 1 },
                { q: "Phần mềm Microsoft Word thuộc loại phần mềm nào?", o: ["Chỉnh sửa video", "Soạn thảo văn bản", "Nghe nhạc", "Phần mềm diệt virus"], a: 1 },
                { q: "Nút B (Bold) trong Word dùng để làm gì?", o: ["In đậm văn bản", "In nghiêng", "Gạch chân", "Đổi màu đỏ"], a: 0 },
                { q: "Thiết bị nào sau đây dùng để đưa dữ liệu RA ngoài (Thiết bị ra)?", o: ["Bàn phím", "Chuột", "Máy in", "Micro thu âm"], a: 2 },
                { q: "Thông tin trên mạng Internet có phải luôn đúng sự thật không?", o: ["Luôn đúng sự thật", "Luôn sai", "Cần phải chắt lọc vì có thông tin chưa kiểm chứng", "Chỉ đúng với máy tính"], a: 2 },
                { q: "Để chèn thêm một hình ảnh vào tài liệu Word, em nhấp vào thẻ lệnh nào?", o: ["Home", "Insert", "Design", "View"], a: 1 },
                { q: "Cách gõ dấu Ngã (~) theo kiểu Telex là thêm phím nào?", o: ["S", "X", "J", "F"], a: 1 },
                { q: "Cách gõ dấu Sắc (´) theo kiểu Telex là thêm phím nào?", o: ["S", "X", "J", "F"], a: 0 }
            ];
            return pool[i % pool.length];
        }).map((item, idx) => ({ ...item, question: `Câu ${idx+1}: ${item.q}` })),
        "2": Array.from({length: 30}, (_, i) => {
            const pool = [
                { q: "Trong Scratch, khối lệnh 'Di chuyển (10) bước' thuộc nhóm lệnh màu gì?", o: ["Màu vàng (Sự kiện)", "Màu cam (Điều khiển)", "Màu xanh dương (Chuyển động)", "Màu tím (Hiển thị)"], a: 2 },
                { q: "Khối lệnh 'Khởi động (Khi bấm vào lá cờ xanh)' nằm ở nhóm nào trong Scratch?", o: ["Hiển thị", "Âm thanh", "Sự kiện", "Chuyển động"], a: 2 },
                { q: "Để nhân vật nói 'Xin chào!' trong Scratch, em cần dùng khối lệnh nào?", o: ["Khối lệnh 'Nói (Xin chào!)'", "Khối lệnh 'Phát âm thanh'", "Khối lệnh 'Di chuyển'", "Khối lệnh 'Nghĩ'"], a: 0 },
                { q: "Phần mềm PowerPoint dùng ứng dụng chính để làm gì?", o: ["Thiết kế bài giảng, bài trình chiếu", "Tính toán tiền", "Vẽ sơ đồ tư duy", "Chỉnh sửa hình ảnh độ phân giải cao"], a: 0 },
                { q: "Hiệu ứng 'Transitions' trong PowerPoint có nghĩa là gì?", o: ["Đổi màu nền", "Hiệu ứng chuyển đổi giữa các Trang (Slide)", "Hiệu ứng cho từng đối tượng hình ảnh con", "Kiểu chữ nghiêng"], a: 1 },
                { q: "Trong Scratch, nhân vật (mặc định là chú mèo) được gọi là gì?", o: ["Nhân vật (Sprite)", "Sân khấu (Stage)", "Kịch bản (Script)", "Khối lệnh (Blocks)"], a: 0 },
                { q: "Làm thế nào để thay đổi phông nền (Sân khấu) trong Scratch?", o: ["Click vào chọn Phông nền (Backdrop) ở góc dưới bên phải", "Xoá nhân vật", "Kéo thả lệnh 'Di chuyển'", "Tắt màn hình đi bật lại"], a: 0 },
                { q: "Trong PowerPoint, nút 'Slide Show' (biểu tượng hình cốc) nằm ở đâu và dùng để làm gì?", o: ["Góc dưới bên phải, để Trình chiếu toàn màn hình", "Góc trên bên trái, để xoá Slide", "Để chèn video", "Để lưu bài"], a: 0 },
                { q: "Khối lệnh 'Quay phải (15) độ' sẽ làm nhân vật làm gì?", o: ["Lùi lại sau", "Nhảy múa", "Xoay mặt về bên phải", "Biến mất"], a: 2 },
                { q: "Hành động nào giúp tạo thêm Slide mới trong bài trình chiếu?", o: ["Home -> New Slide", "Insert -> Pictures", "File -> Save", "View -> Zoom"], a: 0 }
            ];
            return pool[i % pool.length];
        }).map((item, idx) => ({ ...item, question: `Câu ${idx+1}: ${item.q}` }))
    },
    "5": {
        "1": Array.from({length: 30}, (_, i) => {
            const pool = [
                { q: "Bản quyền (Copyright) tác phẩm kỹ thuật số là gì?", o: ["Quyền của người tạo ra tác phẩm đó", "Bộ nhớ máy tính", "Chuẩn nén ảnh", "Tốc độ chép dữ liệu"], a: 0 },
                { q: "Hành vi nào vi phạm bản quyền tác giả?", o: ["Tự vẽ tranh", "Chép nguyên văn bài viết trên mạng mà không xin phép, ghi rõ nguồn", "Hỏi mượn đĩa CD", "Mua phần mềm ủng hộ tác giả"], a: 1 },
                { q: "Để tìm chính xác một cụm từ (ví dụ: 'Hoa hồng xanh'), em đặt từ khoá vào đâu trên cỗ máy tìm kiếm?", o: ["Trong dấu [ ]", "Trong dấu ngoặc kép \" \"", "Trong dấu cộng +", "Trong dấu hỏi ?"], a: 1 },
                { q: "Thư điện tử (Email) mang lại lợi ích gì nổi bật so với thư tay?", o: ["Gửi đi xa mất vài tuần mới tới", "Gửi nhận tin nhắn, hình ảnh, tệp đính kèm ngay lập tức qua mạng", "Chỉ gửi được tờ giấy", "Phải tốn tiền mua tem"], a: 1 },
                { q: "Tài khoản Email thường có chứa ký tự bắt buộc nào?", o: ["Ký tự @", "Ký tự #", "Ký tự $", "Ký tự &"], a: 0 },
                { q: "Dịch vụ cung cấp Thư điện tử phổ biến nhất hiện nay của Google là?", o: ["Google Maps", "Gmail", "Google Drive", "Google Search"], a: 1 },
                { q: "Khi tổ chức tệp tin khoa học, em nên nhóm các tệp như thế nào?", o: ["Bỏ lộn xộn ở Desktop", "Tạo các thư mục theo chủ đề (Học tập, Giải trí, Ảnh...)", "Đổ hết vào Thùng rác (Recycle Bin)", "Chép vào USB rồi vứt đi"], a: 1 },
                { q: "Trong khi soạn Email, trường 'To' (Tới) dùng để điền gì?", o: ["Chủ đề thư", "Địa chỉ email của người nhận", "Nội dung thư", "Tệp đính kèm"], a: 1 },
                { q: "Công cụ tìm kiếm thông tin bằng Hình ảnh gọi là gì?", o: ["Google Images", "Google Play", "Microsoft Word", "Notepad"], a: 0 },
                { q: "Trong PowerPoint 365, em có thể chèn video từ mạng bằng cách nào?", o: ["Insert -> Video -> Online Videos", "Design -> Colors", "Home -> Copy", "Transitions -> Morph"], a: 0 }
            ];
            return pool[i % pool.length];
        }).map((item, idx) => ({ ...item, question: `Câu ${idx+1}: ${item.q}` })),
        "2": Array.from({length: 30}, (_, i) => {
            const pool = [
                { q: "Trong Scratch, nhánh lệnh (Cấu trúc điều kiện) được thể hiện qua khối lệnh nào?", o: ["Đợi (1) giây", "Lặp lại (10)", "Nếu ‹điều kiện› thì", "Nói (Xin chào)"], a: 2 },
                { q: "Sơ đồ tư duy (Mindmap) có hình dáng như thế nào?", o: ["Hình tròn", "Hình vuông", "Ý tưởng trung tâm ở giữa, phân nhánh toả ra xung quanh", "Đường thẳng một chiều"], a: 2 },
                { q: "Khối lệnh 'Lặp lại (10)' dùng để làm gì?", o: ["Làm một thao tác đúng 1 lần", "Giúp khối lệnh bên trong nó tự động chạy lại 10 lần", "Làm đứng máy", "Nhân bản nhân vật 10 lần"], a: 1 },
                { q: "Khối lệnh 'Liên tục' có ý nghĩa gì trong cấu trúc lặp?", o: ["Lặp một lần", "Lặp 10 lần rồi dừng", "Lặp lại mã lệnh ở bên trong mãi mãi đến khi dừng game", "Không có tác dụng"], a: 2 },
                { q: "Trong phần mềm Scratch, nếu muốn nhân vật Di chuyển 50 bước nhưng chia làm 10 lần nhỏ (mỗi lần 5 bước), em ghép khối lệnh nào?", o: ["Nói 50", "Nếu 10 thì 5", "Lặp lại (10) [ Di chuyển (5) bước ]", "Đợi (10) giây"], a: 2 },
                { q: "Lỗi chương trình (Bug) trong lập trình là gì?", o: ["Một con bọ trên bàn phím", "Lỗi do viết sai lệnh khiến chương trình chạy không đúng như mong muốn", "Lỗi do cúp điện", "Do máy tính bị cũ"], a: 1 },
                { q: "Cách tốt nhất để Sửa lỗi (Debug) là gì?", o: ["Vứt máy tính đi", "Xoá chương trình không làm nữa", "Theo dõi từng khối lệnh xem nó đang làm gì để tìm ra lệnh sai", "Đập bàn phím"], a: 2 },
                { q: "Sơ đồ tư duy dùng phần mềm nào sau đây để vẽ trên máy tính?", o: ["XMind hoặc MindMaple", "Paint", "Trình duyệt Safari", "Máy tính Calculator"], a: 0 },
                { q: "Trong Scratch, khối lệnh 'Đi tới vị trí con trỏ chuột' thuộc nhóm lệnh nào?", o: ["Sự kiện", "Chuyển động", "Cảm biến", "Âm thanh"], a: 1 },
                { q: "Một kịch bản đúng để nhân vật chú Mèo vừa chạm vào biên sân khấu thì quay đầu thu lại là block nào?", o: ["Nếu tiếp xúc cạnh, bật lại", "Lặp lại liên tục", "Tới toạ độ X,Y", "Thay đổi hướng 15 độ"], a: 0 }
            ];
            return pool[i % pool.length];
        }).map((item, idx) => ({ ...item, question: `Câu ${idx+1}: ${item.q}` }))
    }
};

window.lessonData = lessonData;
window.quizData = quizData;
