<!DOCTYPE html>
<html lang="ta">
<head>
<meta charset="UTF-8">
<style>
    /* 🔥 Fixes the Page Size strictly to A4 Landscape */
    @page { size: A4 landscape; margin: 0; }
    
    body {
        margin: 0;
        padding: 0;
        font-family: 'Helvetica', sans-serif;
        background-color: #fff;
    }

    /* 🔥 Main Container with Full Border */
    .cert-body {
        width: 297mm;
        height: 210mm;
        position: relative;
        box-sizing: border-box;
        border: 20px solid #1a237e; /* Royal Blue Outer */
        background-color: #fdfdfd;
    }

    /* Inner Gold Pattern Border */
    .inner-frame {
        position: absolute;
        top: 10px; left: 10px; right: 10px; bottom: 10px;
        border: 5px solid #c9a646; /* Gold Inner */
        padding: 40px;
        text-align: center;
    }

    /* Corners Decoration */
    .corner-decor {
        position: absolute;
        width: 100px;
        height: 100px;
        border: 10px solid #c9a646;
    }
    .tl { top: -20px; left: -20px; border-right: none; border-bottom: none; }
    .br { bottom: -20px; right: -20px; border-left: none; border-top: none; }

    /* Text Styling */
    .main-head {
        font-size: 60px;
        color: #1a237e;
        margin-top: 50px;
        letter-spacing: 15px;
        font-weight: bold;
    }

    .sub-head {
        font-size: 20px;
        color: #c9a646;
        letter-spacing: 5px;
        margin-bottom: 40px;
    }

    .student-name {
        font-size: 65px;
        color: #1a237e;
        margin: 20px 0;
        font-weight: bold;
        display: inline-block;
        border-bottom: 3px double #c9a646;
        padding: 0 50px;
    }

    .message {
        font-size: 20px;
        line-height: 1.6;
        color: #444;
        width: 70%;
        margin: 20px auto;
    }

    .event-tag {
        font-weight: bold;
        color: #1a237e;
        font-size: 26px;
    }

    .prize-box {
        margin-top: 30px;
        background: #1a237e;
        color: #fff;
        display: inline-block;
        padding: 15px 50px;
        font-size: 24px;
        font-weight: bold;
        border-radius: 5px;
        box-shadow: 5px 5px 0px #c9a646;
    }

    /* Footer Section */
    .footer-table {
        width: 100%;
        position: absolute;
        bottom: 80px;
        left: 0;
        padding: 0 100px;
    }

    .sign-line {
        border-top: 2px solid #333;
        width: 200px;
        margin: 0 auto 5px;
    }
</style>
</head>

<body>

<div class="cert-body">
    <div class="inner-frame">
        <div class="corner-decor tl"></div>
        <div class="corner-decor br"></div>

        <div class="main-head">CERTIFICATE</div>
        <div class="sub-head">OF EXCELLENCE</div>

        <p style="font-style: italic; font-size: 22px; color: #666;">This award is presented to</p>

        <div class="student-name">{{ $student->name }}</div>

        <p class="message">
            In recognition of your exceptional achievement and victory in the 
            <br> <span class="event-tag">{{ $event->name }}</span>
        </p>

        <div class="prize-box">
            {{ $prize }} PRIZE
        </div>

        <table class="footer-table">
            <tr>
                <td align="left">
                    <strong>Date:</strong> {{ \Carbon\Carbon::parse($event->event_date)->format('d-m-Y') }}
                </td>
                <td align="right">
                    <div class="sign-line"></div>
                    <strong>AUTHORIZED SIGNATURE</strong>
                </td>
            </tr>
        </table>
    </div>
</div>

</body>
</html>