document.addEventListener("DOMContentLoaded", function() {

    // دالة لتحميل الحدث بناءً على الحدث المحدد
    function loadEvent(selectedEventId) {
        const uId = "114641970515039712519";  // معرف المستخدم

        // تنفيذ الطلب بناءً على الحدث المحدد
        fetch("https://api.jawaheradmin.xyz/events/today", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "gzip, deflate, br",
                "User-Agent": "okhttp/4.10.0"
            },
            body: `eventId=${selectedEventId}&uId=${uId}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.errorCode === 0) {
                let sortedAnalytics = data.analytics.sort((a, b) => b.diamonds - a.diamonds); // ترتيب تنازلي

                let table = `
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>الاسم</th>
                                <th>المجوهرات</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                sortedAnalytics.forEach(user => {
                    // استخدم الصورة الافتراضية لجميع الحسابات في حال عدم وجود صورة مخصصة
                    let avatarSrc = "assets/avatar.png"; // نستخدم صورة avatar.png الافتراضية

                    table += `
                        <tr>
                            <td><img src="${avatarSrc}" alt="Avatar"></td>
                            <td>${user.name}</td>
                            <td>${user.diamonds}</td>
                        </tr>
                    `;
                });

                table += `</tbody></table>`;
                document.getElementById("leaderboard").innerHTML = table;
            } else {
                document.getElementById("leaderboard").innerHTML = `<span style="color: red;">Error: ${data.message}</span>`;
            }
        })
        .catch(error => {
            document.getElementById("leaderboard").innerHTML = `<span style="color: red;">Error: ${error}</span>`;
        });
    }

    // دالة لحساب eventId بناءً على التاريخ الحالي
    function getEventIdForToday() {
        const currentDate = new Date();
        const baseDate = new Date("March 19, 2025"); // بداية تاريخ الحدث (اليوم الأول)

        const diffDays = Math.floor((currentDate - baseDate) / (1000 * 60 * 60 * 24)); // حساب الفرق بين اليوم وتاريخ البداية

        // الحدث الأول يبدأ من 134 (مارس 19)، إذا كان diffDays 0، يكون eventId 134
        return 135 + diffDays; 
    }

    // تحميل الحدث بناءً على تاريخ اليوم
    function loadEventForToday() {
        const eventId = getEventIdForToday();  // حساب eventId بناءً على التاريخ
        loadEvent(eventId);  // تحميل الحدث
    }

    // تحميل الحدث عند تحميل الصفحة
    loadEventForToday();

    // التحقق كل دقيقة لتحديث الحدث بعد منتصف الليل
    setInterval(loadEventForToday, 60000);  // تحقق كل دقيقة

});
